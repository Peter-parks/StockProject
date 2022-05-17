
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateStock = document.getElementById('template-stock').content
const fragment = document.createDocumentFragment()

let stockProductos = {

};

/* Eventos */
document.addEventListener('DOMContentLoaded', () => {

    fetchData()
    if (localStorage.getItem('stock')) {
        stockProductos = JSON.parse(localStorage.getItem('stock'))
        pintarStock()
    }


})
cards.addEventListener('click', e => {
    addStock(e)

})

items.addEventListener('click', e => {
    btnSum(e)
})

/* fetch ---- productos.Json */

const fetchData = async () => {
    try {
        const res = await fetch('productos.json')
        const data = await res.json()
        pintarCard(data)
    } catch (error) {
        console.log(error)
    }
}

/* funcion , pinta la info de productos.json  */
const pintarCard = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.producto
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.img)
        /* atributo para vinvular boton al producto(ID) */
        templateCard.querySelector('.btn-dark').dataset.id = producto.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}


const addStock = e => {
    if (e.target.classList.contains('btn-dark')) {

        setStock(e.target.parentElement)
        swal({
            title: "Producto Agregado",
            icon: "success",
        });

    }
    e.stopPropagation()
}

const setStock = objeto => {

    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        producto: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1

    }

    if (stockProductos.hasOwnProperty(producto.id)) {
        producto.cantidad = stockProductos[producto.id].cantidad + 1
    }

    /* convierte el objeto en Array */
    stockProductos[producto.id] = { ...producto }
    pintarStock()
}

const pintarStock = () => {
    items.innerHTML = ``
    Object.values(stockProductos).forEach(producto => {
        templateStock.querySelector('th').textContent = producto.id
        templateStock.querySelectorAll('td')[0].textContent = producto.producto
        templateStock.querySelectorAll('td')[1].textContent = producto.cantidad
        templateStock.querySelector('.btn-primary').dataset.id = producto.id
        templateStock.querySelector('.btn-secondary').dataset.id = producto.id
        templateStock.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateStock.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    pintarFooter()

    localStorage.setItem('stock', JSON.stringify(stockProductos))
}

const pintarFooter = () => {
    footer.innerHTML = ``
    if (Object.keys(stockProductos).length === 0) {
        footer.innerHTML = `- comience a incorporar Productos!`

        return
    }

    const nCantidad = Object.values(stockProductos).reduce((acumulacion, { cantidad }) => acumulacion + cantidad, 0)

    const nPrecio = Object.values(stockProductos).reduce((acumulador, { cantidad, precio }) => acumulador + cantidad * precio, 0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnClear = document.getElementById('vaciar-carrito')

    btnClear.addEventListener('click', () => {
        stockProductos = {}
        pintarStock()
    })
}

const btnSum = e => {

    if (e.target.classList.contains('btn-primary')) {

        const producto = stockProductos[e.target.dataset.id]
        producto.cantidad = stockProductos[e.target.dataset.id].cantidad + 1
        stockProductos[e.target.dataset.id] = { ...producto }

        pintarStock()
    }

    if (e.target.classList.contains('btn-secondary')) {
        const producto = stockProductos[e.target.dataset.id]
        producto.cantidad = stockProductos[e.target.dataset.id].cantidad - 1
        stockProductos[e.target.dataset.id] = { ...producto }

        if (producto.cantidad === 0) {
            delete stockProductos[e.target.dataset.id]
        }
        pintarStock()

    }

    e.stopPropagation()


}








