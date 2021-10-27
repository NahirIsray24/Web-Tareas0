const{
    getTareas, getTareasId, postTarea} = require("./tareas.controlador");

//declaro el router
const router = require('express').Router(); //le pido que me haga un nuevo router

router.get('/',getTareas);

router.get('/:id',getTareasId);

router.post('/',postTarea);

//para requerir desde index el tareas ruter debo exportarlo:
module.exports = router;
//me permite exponer las cosas hacia afuera 

