const input = document.querySelector("#nuevaTarea"); //donde ira la lista que queremso agregar
const agregar = document.querySelector("#guardarTarea"); //boton para añadir una tarea con la clase add
const ul = document.querySelector("ul"); //lista donde agregamos todos los elementos 

//AddEventListener() es un método que toma el evento y lo pone a escuchar(click es el evento);
//(e) que le pasa un elemento;
agregar.addEventListener("click", (e) => {
  e.preventDefault(); //para que no se recargue la pagina 

    const text = input.value; //cuando se toque el boton agarrara el valor que esta en el input (add taks) y lo guarda en la variable

    const li = document.createElement("li");  //crea el elemtento de la lista
    const parrafo = document.createElement("p"); //crea el elemento parrafo q contendra el texto
    parrafo.textContent = text; //al textcontent del parrafo (contenido) y lo guardamos en text
    const eliminar = document.createElement("button"); //creamos el boton para eliminar
    const check = document.createElement("input"); //creo checkbox de la misma manera q el boton eliminar
    check.setAttribute("type","checkbox");
    eliminar.textContent = "🗑"; //nombre del boton 
    eliminar.setAttribute("onlick","elimina(this)")//escuchador del evento;
    //necesito saber en donde hago click para ellos pasamos por la funcion en el parametro
    li.appendChild(check);
    li.appendChild(parrafo); // El método appendChild() para añadirle a la lista el parrafo
   //dentro de li agrego un hijo que es el parrafo
    li.appendChild(eliminar); //llama la funcion crea el boton y lo agrega a la lista
    
    //una opcion para meter mi il dentro de la lista (apendear)
   // ul.appendChild(li);
    //pero como tengo que hacerlo en orden inverso usare :
    ul.insertBefore(li,ul.firstChild); //de ul busco el primer hijo (li);

    input.value=""; //cada vez q agrego una tarea el valor del input se hace blanco p q no se quede la tarea anterior y borrarla
     
   
});

function eliminar(e) {//la funcion recibe el evento
  const item = e.target.parentElement;//target hace ref al boton y p no eliminar el boton pero si el texto parentElement el q contiene al item
  ul.removeChild(item); //lo elimina 
}

