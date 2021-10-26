//archivo que monta el servidor
var express = require('express');
var app = express(); //posee métodos para el enrutamiento de las peticiones HTTP
//peticion de tipo get a una url / ...  y me responde con una funcion que tiene 
const tareasRouter= require('./api/tareas.router');
//req peticion y res respuesta 

app.use(express.json());
//express.json()es un método incorporado en Express para reconocer el objeto de solicitud entrante como un objeto JSON
app.get('/docs', function(req, res) {
  res.status(500).send('Hola Mundo!!!');
});

  //'ruta' , archivo 
  app.use('/api/tareas',tareasRouter ); //importo tareasrouter
  //tengo que declarar tareasRouter 

app.listen(3000, function() {
  console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});

//vamos a armar rutas para responder 
//para eso armo una base de datos local en la compu 
