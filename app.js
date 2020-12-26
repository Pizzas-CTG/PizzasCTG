const cards = document.getElementById('cards')

const footer = document.getElementById('footer')



const templateFooter = document.getElementById('template-footer').content

const templateCarrito = document.getElementById('template-carrito').content

const templateCard = document.getElementById('template-card').content

const fragment = document.createDocumentFragment()

let items = document.getElementById('items')

let carrito = {}

// DocumentFragment son Nodos del DOM que nunca forman parte del arbol DOM. El caso de uso mas comun es crear un document fragment, agregar elementos al document fragment y luego agregar dicho document fragment al arbol del DOM. En el arbol del DOM, el document fragment es remplazado por todos sus hijos.

// Dado que el document fragment es generado en memoria y no como parte del arbol del DOM, agregar elementos al mismo no causan reflow (computo de la posicion y geometria de los elementos) en la pagina. Como consecuencia, usar document fragments usualmente resultan en mejor performance.

//all el content es para templates



// addEventListener()Registra un evento a un objeto en específico. El Objeto
//  especifico  puede ser un elemento simple en un archivo, el mismo  documento,
//   una ventana o un  XMLHttpRequest.

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})
cards.addEventListener('click', e => {
        addCarrito(e);
})

items.addEventListener('click',e => {
    btnAccion(e)
})



const fetchData  =  async  () => {
//     La declaración de función async define una función asíncrona, la cual devuelve un objeto AsyncFunction.

// Es posible definir también funciones asíncronas a través de una expresión de función async.
    try{
// El operador await es usado para esperar a una Promise. Sólo puede ser usado dentro de una función async function.
        const res = await fetch('api.json')
        const data = await res.json()
        // La API Fetch proporciona una interfaz JavaScript para acceder y manipular 
        // partes del canal HTTP, tales como peticiones y respuestas. También provee un método global fetch() 
        // que proporciona una
        //  forma fácil y lógica de obtener recursos de forma asíncrona por la red.
//         expression
// Una Promise o cualquier otro valor por el cual haya que esperar.
// rv
// Regresa el valor terminado de la promesa o solamente un valor si no es unaPromise.
        //console.log(data)
        pintarCards(data)
    }catch(error){
        console.log(error)
    }   
    // La declaración 
    // try...catch señala un bloque de instrucciones a intentar (try), y
    //  especifica una respuesta si se produce una excepción (catch).
}

//lo de arriba dice que  va a modificar el DOMContentLoaded con la funcion fetchData()
//despues creamos fetch data con una funcion asincrona que si va correcto accedera a api.json
// y lo que leyo del json, lo copiara y almacenara en otro json 
// se mostrara los datos si todo va bien

//dará error si todo vamal

const pintarCards = data => {
    // console.log(data)
    data.forEach(producto => {
        
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src",producto.thumbnailUrl)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id
        //La propiedad dataset en HTMLElement proporciona una interfaz lectura/escritura para obtener todos los atributos de datos personalizados (data-*) de cada uno de los elementos. Está disponible el acceso en HTML y en el DOM.  Dentro del map of DOMString, aparece una entrada por cada atributo de datos. Hay que tener en cuenta que la propiedad dataset puede leerse, pero no modificarse directamente.  En vez de eso, las escrituras deben ser realizadas a través de cada propiedad individual del dataset, que representan a cada atributo correspondiente. Además un HTML data-attribute y su correspondiente DOM dataset.property no comparten el mismo nombre, pero son siempre similares:
        
//Establece el valor de un atributo en el elemento indicado. Si el atributo ya existe, el valor es actualizado, en
//  caso contrario, el nuevo atributo es añadido con el nombre y valor indicado.

// Para obtener el valor actual de un atributo, se utiliza getAttribute(); para eliminar un atributo, se llama a 
// removeAttribute().
        // templateCard.querySelector('.btn-dark').dataset.id = producto.id
        // La propiedad dataset en HTMLElement proporciona una interfaz lectura/escritura
        //  para obtener todos los atributos de datos personalizados (data-*) de cada uno de los elementos.
        //   Está disponible el acceso en HTML y en el DOM.  Dentro del map of DOMString, aparece una entrada por cada
        //    atributo de datos. Hay que tener en cuenta que la propiedad dataset puede leerse, pero no modificarse
        //     directamente.  En vez de eso, las escrituras deben ser realizadas a través de cada propiedad individual
        //      del dataset, que representan a cada atributo correspondiente. Además un HTML data-attribute y su
        //       correspondiente DOM dataset.property 
        // no comparten el mismo nombre, pero son siempre similares:
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}


const addCarrito = e => {
    // console.log(e.target)
    // console.log(e.target.classList.contains('btn-dark'))
    // si le das a button te lanza un true 
    if(e.target.classList.contains('btn-dark')){
        
        console.log()
        //te pasa al hunidr el boton, toda la informacion de la tarjeta
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
    //El stopPropagation()método de la Eventinterfaz
    //  evita una mayor propagación del evento actual en las fases de captura y burbujeo
    //  . Sin embargo, no evita que se produzcan comportamientos predeterminados; por ejemplo, los clics
    //   en los enlaces todavía se procesan. Si desea detener esos comportamientos, consulte el  preventDefault()método.



}

const setCarrito = objeto =>  {
    
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)){
            producto.cantidad = carrito[producto.id].cantidad + 1
            //all para sumar su cantidad
    }
    carrito[producto.id] = { ...producto}
    //El método hasOwnProperty() devuelve un booleano indicando si el objeto tiene la propiedad especificada.
    pintarCarrito()

}

const pintarCarrito = () =>{
    items.innerHTML = ""
    Object.values(carrito).forEach(producto =>{
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id= producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id= producto.id
        templateCarrito.querySelector('span').textContent= producto.cantidad * producto.precio
        //se multiplica la cantidad por el precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })



    items.appendChild(fragment)
    pintarFooter()

}
// abajo haremos para que cuando el footer este el vacio, aparezca el texto ese que dice que compres xd
const pintarFooter = () => {
    footer.innerHTML = "" //para limpiar
    if(Object.keys(carrito).length  === 0){
        footer.innerHTML= `
        <!-- Con este if cuando el usuario vacie, volvera a aparecer el mensaje-->
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>

        
        `
        return
        
    }
    const nCantidad = Object.values(carrito).reduce((acc,{cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc,{cantidad,precio}) => acc + cantidad * precio,0)
    console.log(nPrecio)
    // lo de arriba suma el total de lo que compraste, lo de abajo lo pinta en la template

templateFooter.querySelectorAll('td')[0].textContent = nCantidad
templateFooter.querySelector('span').textContent = nPrecio

const clone = templateFooter.cloneNode(true)
fragment.appendChild(clone)

footer.appendChild(fragment)

//abajo es para vaciar el carrito
const btnVaciar = document.getElementById('vaciar-carrito')
btnVaciar.addEventListener('click', () =>{
    carrito = {}
    pintarCarrito()
})
}
//para aumentar y reducir, arriba[38] hicimos que mandara todo lo que tocaramos despues de comprar 
const btnAccion = e => {
   //console.log(e.target)
   //accion de aumentar
   if(e.target.classList.contains('btn-info')){
      // console.log(carrito[e.target.dataset.id])
       //     carrito[e.target.dataset.id]
       const producto =  carrito[e.target.dataset.id]
       producto.cantidad  ++
       carrito[e.target.dataset.id] = {...producto}
       pintarCarrito()
   }
   if(e.target.classList.contains('btn-danger')){
    const producto =  carrito[e.target.dataset.id]
    producto.cantidad --
    pintarCarrito()
    if(producto.cantidad === 0){
        delete carrito[e.target.dataset.id] 
    }
    mostrarId()
    pintarCarrito()
   }
   e.stopPropagation()
   
}



