const moment = require('moment');
const db = require("../db/db");
const { updateSla, getSla } = require('../db/ticketToDb');

module.exports = {run}

//run();

async function run(){

    const [rows] = await getSla();

    console.log(rows.length)

    for(i=0;i<rows.length;i++){
        //console.log(rows[i].numero_atendimento)
        var start = moment(await getDtInicio(rows[i].numero_atendimento))
        var end =  moment(await getDtFechado(rows[i].numero_atendimento))
        var minutes = minutesWorked(start, end);
        
        await updateSla(minutes,rows[i].numero_atendimento)
    }

    

}

function minutesWorked(startJob, endJob) {
    var bizHrs = {
        1: { start: "07:30", end: "17:30" },
        2: { start: "07:30", end: "17:30" },
        3: { start: "07:30", end: "17:30" },
        4: { start: "07:30", end: "17:30" },
        5: { start: "07:30", end: "16:30" },
        6: { },
        7: { }
    };

    if (endJob.isBefore(startJob, 'second')) {
      return 0;
    }
  
    var timeDiff = moment.duration(endJob.diff(startJob));
    var startDay = startJob.format('YYYY-MM-DD');
    var endDay = endJob.format('YYYY-MM-DD');
    var current = startJob;
    var currentDay = current.format('YYYY-MM-DD');
  
    var totalMin = 0;
    var endTime, startTime;
    var weekday, bizStartTime, bizEndTime, duration;
  
    do {
      weekday = current.format('E');
      bizStartTime = bizHrs[weekday].start;
      bizEndTime = bizHrs[weekday].end;
  
      if ( bizStartTime && bizStartTime ) {
          if (currentDay == startDay) {
              startTime = startJob.format("HH:mm");
              startTime = startTime > bizStartTime ? startTime : bizStartTime;
              startTime = startTime < bizEndTime ? startTime : bizEndTime;
          } else {
              startTime = bizStartTime;
          }
  
          if (currentDay == endDay) {
              endTime = endJob.format("HH:mm");
              endTime = endTime < bizEndTime ? endTime : bizEndTime;
              endTime = endTime > bizStartTime ? endTime : bizStartTime;
          } else {
              endTime = bizEndTime;
          }
  
          startTime = moment(currentDay + ' ' + startTime);
          endTime = moment(currentDay + ' ' + endTime);
  
          duration = moment.duration(endTime.diff(startTime)).as('minutes');
          totalMin += duration;
      }
  
      // next day
      current.add(1, "days");
      currentDay = current.format('YYYY-MM-DD');
    }
    while (currentDay <= endDay);
  
    return totalMin;
  }

async function updateSLA(){
    const conn = await db.connect();
    const [rows] = await conn.query('select numero_atendimento from atendimentos where atend_sla = "X_X"  and dt_fechamento != "2000-01-01 00:00:00" ' );
    return rows
}  

async function getDtInicio(option){
    const conn = await db.connect();
    const [rows] = await conn.query('select dt_abertura from atendimentos where numero_atendimento = "'+option+'"' );
    var x = moment(rows[0].dt_abertura, 'DD/MM/YYYY HH:mm', true).format('YYYY-MM-DD HH:mm:ss');
    //console.log(x)
    return x
}

async function getDtFechado(option){
    const conn = await db.connect();
    const [rows] = await conn.query('select dt_fechamento from atendimentos where numero_atendimento = "'+option+'"' );
    var x = moment(rows[0].dt_fechamento, 'DD/MM/YYYY HH:mm', true).format('YYYY-MM-DD HH:mm:ss');
    //console.log(x)
    return x
}