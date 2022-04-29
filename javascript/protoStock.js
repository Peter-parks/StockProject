const lista = document.getElementById('lista')
console.log("lista")
let productos = []
let usuarios = []
let client
let pass

function nuevoUsuario(nombre, contraseña) {
    this.usuario = nombre
    this.contraseña = contraseña
}

function nuevoProducto(nombre, precio, wats) {

    this.nombre = nombre
    this.precio = precio
    this.wats = wats
}

/* do {
    let usuario = new nuevoUsuario(prompt("ingrese nombre de usuario"), prompt("ingrese contraseña"))
    usuarios.push(usuario)
    respuesta = prompt("crear o seguir creando")
}
while (respuesta === "seguir") */



/* usuarios.forEach(usuario => {
    client = usuario.usuario
    pass = usuario.contraseña
    console.log(client, pass)
})

let preguntaUsuario = prompt("ingrese el Usuario")
let preguntaPass = prompt("ingrese su contraseña")

while (preguntaUsuario != client || preguntaPass != pass) {



    alert("usuario o contraseña incorrecta")
    preguntaUsuario = prompt("ingrese el Usuario")
    preguntaPass = prompt("ingrese su contraseña")

} */


/* if (preguntaUsuario == client && preguntaPass == pass) {

    let entrar = "yes"
    let salir = "out"

    let inicio = prompt("desea cargar productos Yes/out");

    while (inicio == entrar) {

        let objeto = nuevoProducto(prompt("ingrese nombre del producto"), prompt("precio"), prompt("wats"))
        productos.push(objeto)

        inicio = prompt("Quieres cargar mas productos (yes / out)")
    }

} */



/* DOM - Eventos */

const btnAumentar = document.querySelector('.btn_A')
const btnDisminuir = document.querySelector('.btn_D')

const container = document.querySelector('.container')
const span = document.getElementById('span')
let contador = 0

container.addEventListener('click', e => {
    console.log(e.target.classList.contains('btn_A'))

    if (e.target.classList.contains('btn_A')) {

        contador++

    }

    if (e.target.classList.contains('btn_D')) {

        contador--

    }

    span.textContent = contador
    e.stopPropagation()
})
