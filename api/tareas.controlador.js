const{
    getTareasService, getTareasIdService,postTareaService //metodo
}= require("./tareas.service");



module.exports={
    //peticiones: get para recuperar todas las tareas
    getTareas:(req, res) =>{
        getTareasService(req,(err,results)=> {
            console.log("¡Llego al Controlador!",req.params.id, req.params.body);
           //el requerimiento siempre esta, pero me responde con una llamada a una funcion+
           console.log("Enviar json"); 
           return res.json({
                success: true,
                data: results,
            });
        });
    },
    //pedir tarea en particular con id 
    getTareasId:(req, res) =>{
        const id= req.params.id;
        getTareasIdService(id,(err,results)=> {
           console.log("Enviar json"); 
           return res.json({
                success: true,
                data: results,
            });
        });
    },
    //post para peticion enviando los datos de la tarea en el body como Json 
    //async es asincronica la funcion p esperar resultados    
    
        postTarea:(req, res) => {
            
            const tarea = {

            idTarea: req.body.idTarea,
            nombreTarea: req.body.nombreTarea,
            fecha: req.body.fecha,
            estadoTarea: req.body.estadoTarea,
            }
            console.log("llego!",tarea);
            try{
           // revisar 

                postTareaService(tarea,(err,results)=>{
                    if(err){
                            console.log(err);
                            return ;
                    }
                    return  res.status(200).json({
                            success: true,
                            data: results
                    });

                });
           
            }catch(err){
                console.log(err);
            res.json({message: err});
            }
        }
    
    
} 