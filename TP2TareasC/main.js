input = document.getElementById("nuevaTarea"); //manipular input para saber el valor que se escribira en el 
agregar = document.getElementById("guardarTarea"); //boton para añadir una tarea para que cuando haga click ahga algo
lista = document.getElementById("lista"); //lista donde agregamos todos los elementos 
screen = document.getElementById("fullScreen"); //constante para el fullScren

let tareas=[]; //declaro el array vacio sin objetos
let geo= {lat: null, lon: null};


window.onload= function(){
  recuperarUbicacion();
  console.log(geo); //me muestra la ubicacion
tareas = JSON.parse(localStorage.getItem("tareas")) || []; //en tareas parseo lo que traje en el string 

for (let i = 0; i < tareas.length; i++) {
  agregarTarea(tareas[i].texto,false);
}
}

agregar.addEventListener("click",function(e){//escuchador de eventos
e.preventDefault();
const text = input.value; //cuando se toque el boton agarrara lo q esta escrito en el input (add taks) y lo guarda en la variable
if (text !== ""){
  agregarTarea(text,true);//le paso el texto
}
});
function agregarTarea(texto,v){
  const nuevoLi= document.createElement("li"); //fuera del body crea un elemento de tipo li
  let time = new Date().getTime();
  nuevoLi.setAttribute("data-id", time);
  nuevoLi.innerHTML= 
    `
    <input type="checkbox" onClick="funcionCheck(this)" ${tareas.completado ? 'checked':''};>
    <p> ${texto} </p>
    <button onclick= "eliminarTarea(this)"> 🗑</button>
    <button onclick= "copiarTarea(this.closest('li'))"> 📄</button>
    <button onclick= "compartirTarea(this)"> ↗ </button>
    `;
  lista.prepend(nuevoLi);
  input.value="";
  if(v){
      tareas.push({
      id : time,
      "texto": texto, //texto es el parametro de agregar
      "completado": false,
      "ubicacion": {"lat":geo.lat, "lon": geo.lon},
    });
    guardarLocal();
  }
}
//metodo para guardar la actualidad de c/tarea
 function guardarLocal(){
   window.localStorage.setItem("tareas", JSON.stringify(tareas));
 }
 

function eliminarTarea(nuevoLi) {
  nuevoLi.parentElement.remove();
  tareas.splice(tareas.findIndex(a => a.id == nuevoLi.id), 1) 
  guardarLocal();
}
//checkbox
const funcionCheck = (e) =>{
  let index = tareas.findIndex(tareas => tareas.id == e.target.parentElement.dataset.id);
  tareas[index].completado = !tareas[index].completado; 
  //localstorage.setItem('tareas', JSON.stringify(tareas));
  guardarLocal();
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
//FUNCION GEOLOCALIZACION para la ubicacion de cada tarea
function recuperarUbicacion(){
  //pregunto si tengo disponibilidad en el navegador de la api geolocalizacion
  if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(
      function(location){
        geo.lat= location.coords.latitude;
        geo.lon= location.coords.longitude;
      }, 
      function(error){
        console.warn(error); //advertencia en la consola
        geo.lat= null;
        geo.log= null;
      }
    );
  } else{
    return null; 
  }
  
}
//realizo una estructura de datos(todo o q contiene tarea) p las tareas y colocar su ubicacion
//ventana con carga

screen.addEventListener("click",function(e){//escuchador de eventos
  if(document.fullscreenElement == null) {
    document.documentElement.requestFullscreen();
    fullscreenBtn.innerHTML = "Salir";
} else {
    document.exitFullscreen();
    fullscreenBtn.innerHTML = "aaaa";
}
});
 
