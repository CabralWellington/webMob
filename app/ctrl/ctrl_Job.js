var moment = require('moment'); // require
async function getJobStatus(){
    if(moment().weekday()=="6" || moment().weekday()=="7"){
        //console.log("Final de Semana")
        return false;
     }else{
         //console.log("Dia de Semana")
         if(moment().format("HH:mm")>="06:00" && moment().format("HH:mm")<="18:00" ){
             //console.log("No horario de trabalho")
            return true;
         }else{
             return false;
         }    
     }
}

module.exports = {getJobStatus}