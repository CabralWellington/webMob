const moment = require('moment');


var start = moment("2021-04-08 10:34:00");
var end = moment("2021-04-13 08:53:00");

var bizHours = {
    1: { start: "09:00", end: "18:00" },
    2: { start: "09:00", end: "18:00" },
    3: { start: "09:00", end: "18:00" },
    4: { start: "09:00", end: "18:00" },
    5: { start: "09:00", end: "17:00" },
    6: { },
    7: { }
};

var minutes = minutesWorked(start, end, bizHours);
console.log( minutes );



// calculation function
function minutesWorked(startJob, endJob, bizHrs) {
  if (endJob.isBefore(start, 'second')) {
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