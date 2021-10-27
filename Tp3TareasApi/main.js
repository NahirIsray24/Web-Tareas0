const url = "http://localhost:3000/api/tareas";
input = document.getElementById("nuevaTarea"); //manipular input para saber el valor que se escribira en el 
agregar = document.getElementById("guardarTarea"); //boton para añadir una tarea para que cuando haga click ahga algo
lista = document.getElementById("lista"); //lista donde agregamos todos los elementos 
screen = document.getElementById("fullScreen"); //constante para el fullScren
let tasks = []; //declaro el array vacio sin objetos
let geo = { lat: null, lon: null };

window.onload = function () {
  if (window.matchMedia) { //si esta soportado 
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.add('light');
    }

  } else {
    console.log("NO SOPORTADO");
  }
  console.log(geo);
  recuperarUbicacion();
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("DATA: ", data)
      tareas = data == null ? [] : data
      console.log(tareas)
      tareas.data.forEach((t) => agregarTareaMejorado(t))

    })
    .catch(err => console.error(err));
}
agregar.addEventListener("click", function (e) {
  e.preventDefault();
  const text = input.value; 
  let miNuevaTarea = {
    id: new Date().getTime(), //hago un nuevo id
    texto: text,
    ubicacion: {
      lat: geo.lat,
      lon: geo.lon
    },
    completado: false
  }
  /*parte que sustituimos
  tasks.push(miNuevaTarea); //array de tareas actualizado
  guardarLocal(); // guardar en localstorage el array
  */
  //agregarTareaMejorado(miNuevaTarea);
  options = {
    method: 'POST',
    body: JSON.stringify(miNuevaTarea),
    headers: { 'Content-Type': 'application/json' }
  }
  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      console.log(data.text)
      agregarTareaMejorado(data);
      input.value = "";
      console.log("data::",data);
      
      //mostrar la tarea 
      //tasks.data.push(data);
      
    })
    .catch(err => console.error(err))
});

function agregarTareaMejorado(tarea) { //tarea es un objeto
  const nuevoLi = document.createElement("li"); //fuera del body crea un elemento de tipo li
  nuevoLi.setAttribute("data-id", tarea.idTarea);
  nuevoLi.innerHTML =
    `
    <input type="checkbox" onClick="funcionCheck(this)" ${tarea.estadoTarea ? 'checked' : ''}>
    <p> ${tarea.nombreTarea} </p>
    <button onclick= "eliminarTarea(this)"> 🗑</button>
    <button onclick= "copiarTarea(this.closest('li'))"> 📄</button>
    <button onclick= "compartirTarea(this)"> ↗ </button>
    `;
  lista.prepend(nuevoLi);
}
//metodo para guardar la actualidad de c/tarea
function guardarLocal() {
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
}


function eliminarTarea(nuevoLi) {
  nuevoLi.parentElement.remove();
  tasks.splice(tasks.findIndex(a => a.id == nuevoLi.id), 1)
  guardarLocal();
}
//checkbox
const funcionCheck = (e) => {
  let index = tasks.findIndex(tasks => tasks.id == e.target.parentElement.dataset.id);
  tasks[index].completado = !tasks[index].completado;
  localstorage.setItem('tasks', JSON.stringify(tasks));
  guardarLocal();
}

function copiarTarea(e) {
  console.log("COPIAR");
  //me refiero al navegador xq ya no es capacidad del documento si no es una propiedad del navegador
  //La API del portapapeles agrega a la Navigatorinterfaz la clipboard propiedad de solo lectura , que devuelve el Clipboard objeto utilizado para leer y escribir el contenido del portapapeles.
  if (navigator.clipboard != undefined) {//si tiene un valor q no es indefinido
    navigator.clipboard.writeText(e.parentElement.children[1].innerText)//La propiedad de Clipboardla interfaz writeText()escribe la cadena de texto especificada en el portapapeles del sistema.
      //recupera el objeto y se ese objeto llama a la funcion writeText q agarra el texto y lo escribe en el porta papeles
      .then(
        () => console.log("Copiado")
      )

      .catch(err => console.error("ERROR", err));
  }
}
function compartirTarea(e) {
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
function recuperarUbicacion() {
  //pregunto si tengo disponibilidad en el navegador de la api geolocalizacion
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (location) {
        geo.lat = location.coords.latitude;
        geo.lon = location.coords.longitude;
      },
      function (error) {
        console.warn(error); //advertencia en la consola
        geo.lat = null;
        geo.log = null;
      }
    );
  } else {
    return null;
  }


}
//realizo una estructura de datos(todo o q contiene tarea) p las tareas y colocar su ubicacion
//ventana con carga

screen.addEventListener("click", function (e) {//escuchador de eventos
  if (document.fullscreenElement == null) {
    document.documentElement.requestFullscreen();
    fullscreenBtn.innerHTML = "Salir";
  } else {
    document.exitFullscreen();
    fullscreenBtn.innerHTML = "aaaa";
  }
});
