
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
})
cards.addEventListener('click', e => {
    addStock(e)
    swal({
        title: "Producto Agregado",
        icon: "success",
    });
})

/* fetch ---- productos.Json */

const fetchData = async () => {
    try {
        const res = await fetch('productos.json')
        const data = await res.json()
        pintarCars(data)
    } catch (error) {
        console.log(error)
    }
}

/* funcion , pinta la info de productos.json  */
const pintarCars = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.producto
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl)
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
    items.innerHTML = ""
    Object.values(stockProductos).forEach(producto => {
        templateStock.querySelector('th').textContent = producto.id
        templateStock.querySelectorAll('td')[0].textContent = producto.producto
        templateStock.querySelectorAll('td')[1].textContent = producto.cantidad
        templateStock.querySelector('.btn-info').dataset.id = producto.id
        templateStock.querySelector('.btn-danger').dataset.id = producto.id
        templateStock.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateStock.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    pintarfooter()
}

const pintarfooter = () => {
    footer.innerHTML = ""
    if (Object.keys($stockProductos).

    }


