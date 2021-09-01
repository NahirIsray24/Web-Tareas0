input = document.getElementById("nuevaTarea"); //manipular input para saber el valor que se escribira en el 
agregar = document.getElementById("guardarTarea"); //boton para añadir una tarea para que cuando haga click ahga algo
lista = document.getElementById("lista"); //lista donde agregamos todos los elementos 
screen = document.getElementById("fullScreen"); //constante para el fullScren
//Comportamiento para boton fullScreen

screen.addEventListener("click",function(e){//escuchador de eventos

      if(document.fullscreenElement == null) {
        document.documentElement.requestFullscreen();
        fullscreenBtn.innerHTML = "Salir";
    } else {
        document.exitFullscreen();
        fullscreenBtn.innerHTML = "aaaa";
    }
  });

//Comportamiento para boton click para que cuando se seleccione traiga el valor que tenemos
//Paradigma orientado a eventos:
agregar.addEventListener("click",function(e){//escuchador de eventos
//cuando suceda el click desata fuction();
e.preventDefault();
const text = input.value; //cuando se toque el boton agarrara lo q esta escrito en el input (add taks) y lo guarda en la variable
if (text !== ""){
  agregarTarea(text);//le paso el texto
}

});
//funcion para agregar la tarea con el texto de la tarea
function agregarTarea(texto){
  const nuevoLi= document.createElement("li"); //fuera del body crea un elemento de tipo li
  //este atributo dira lo que va adentro del li (html)
  nuevoLi.innerHTML= 
    `
    <input type = "checkbox" >
    <p> ${texto} </p>
    <button onclick= "eliminarTarea(this)"> 🗑</button>
    <button onclick= "copiarTarea(this)"> 📄</button>
    <button onclick= "compartirTarea(this)"> ↗ </button>
    `;
  lista.prepend(nuevoLi);
  input.value="";
}
function eliminarTarea(e){
  e.parentElement.remove(); //Nodo.parentElement devuelve el nodo padre del DOM y remove elimina
}
function copiarTarea(e){
  console.log ("COPIAR");
  //me refiero al navegador xq ya no es capacidad del documento si no es una propiedad del navegador
  //La API del portapapeles agrega a la Navigatorinterfaz la clipboard propiedad de solo lectura , que devuelve el Clipboard objeto utilizado para leer y escribir el contenido del portapapeles.
  if(navigator.clipboard != undefined){//si tiene un valor q no es indefinido
    navigator.clipboard.writeText(e.parentElement.children[1].innerText)//La propiedad de Clipboardla interfaz writeText()escribe la cadena de texto especificada en el portapapeles del sistema.
    //recupera el objeto y se ese objeto llama a la funcion writeText q agarra el texto y lo escribe en el porta papeles
      .then(
        () => console.log("Copiado")
        )
    
      .catch(err => console.error("ERROR",err));
  }
}
function compartirTarea(e){
    if (!("share" in navigator)) { //si no esta API share en el navegador tiro un mensaje
      console.log("😭");	
      return;
  }

  text = e.parentElement.children[1].innerText;
  navigator.share(
      // JSON se basa en la sintaxis que tiene Javascript para crear objetos
      {
          title: 'Compartir tarea de la lista',
          text: text,
          url: document.URL
      }
    ).then(
        () => console.log('Compartido')
    )
    .catch(
        error => console.error('ERROR:', error)
  );
}