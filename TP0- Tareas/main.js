const input = document.querySelector("input"); //donde ira la lista que queremso agregar
const agregar = document.querySelector(".add"); //boton para añadir una tarea con la clase add
const ul = document.querySelector("ul"); //lista donde agregamos todos los elementos 

var miCheckbox = document.getElementById('miElementoCheckbox');
var msg = document.getElementById('msg');


//AddEventListener() es un método que toma el evento y lo pone a escuchar(click es el evento);
//(e) que le pasa un elemento;
agregar.addEventListener("click", (e) => {
  e.preventDefault(); //para que no se recargue la pagina 

    const text = input.value; //cuando se toque el boton agarrara el valor que esta en el input (add taks) y lo guarda en la variable

    const lista = document.createElement("lista");  //crea el elemtento lista
    const parrafo = document.createElement("parrafo"); //crea el elemento parrafo q contendra el texto
    parrafo.textContent = text; //al textcontect del parrafo (contenido) y lo guardamos en text

    lista.appendChild(parrafo); // El método appendChild() para añadirle a la lista el parrafo
    lista.appendChild(eliminar()); //llama la funcion crea el boton y lo agrega a la lista
    
    ul.appendChild(lista);
    
    input.value=""; //cada vez q agrego una tarea el valor del input se hace blanco p q no se quede la tarea anterior y borrarla
     
    lista.insertBefore(lista,parrafo); //orden inverso

    lista.innerHTML=
    ` 
    <div>
        <input type="checkbox" name="" >
    </div>
    <button>🗑</button>
    
      `;
});

function eliminar() {
  const eliminar = document.createElement("button"); //creamos el boton para eliminar

  eliminar.textContent = "🗑"; //nombre del boton 

  eliminar.addEventListener("click", (e) => {
    const item = e.target.parentElement;//target hace ref al boton y p no eliminar el boton pero si el texto parentElement el q contiene al item
    ul.removeChild(item); //lo elimina 
  });

  return eliminar;
}

