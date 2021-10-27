const pool = require("../config/db"); // en esta cte guardo la conexion de la base de datos cuando la requiero

module.exports = {
    getTareasService: (req, callBack) => {
//responde en el callback quiere decir en el res del metodo que llamo 
//va a ir al pool que se conecta a la base de datos y le va a hacer la consulta
    console.log("¡Llego al Servicio!",req.params.id, req.params.body);        
    pool.query(`SELECT * FROM tarea;`, //consulta a la tabla de base de datos
        [],
        (error,results) => {
            console.log(results);
            if (error) {
                console.log("UPS!");
                return callBack(error,null);
            } else {
                console.log("No hay error!!");
                return callBack(null, results);
             }
        
    
        });
    },
    getTareasIdService: (req, callBack) => {
            console.log("¡Llego al Servicio!",req);        
            pool.query(`SELECT * FROM tarea where idTarea =?;`, //consulta a la tabla de base de datos
                [req],
                (error,results) => {
                    console.log(results);
                    if (error) {
                        console.log("UPS!");
                        return callBack(error,null);
                    } else {
                        console.log("No hay error!!");
                        return callBack(null, results);
                     }
                
            
                });
            },
            postTareaService: (tarea, callBack) => {
                console.log("¡Llego al Servicio!",tarea);        
                pool.query(`INSERT INTO tarea(nombreTarea,fecha,estadoTarea)
                VALUES (?,?,?);`, //consulta a la tabla de base de datos
                    [
                        
                        tarea.nombreTarea,
                        tarea.fecha,
                        tarea.estadoTarea
                    ],
                    (error,results) => {
                        console.log(results);
                        if (error) {
                            console.log("UPS!");
                            return callBack(error,null);
                        } else {
                            console.log("No hay error!!");
                            return callBack(null, results);
                         }
                    
                
                    });
                }
        
    
}