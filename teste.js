const moment = require('moment');
var start = moment( "2021-06-04 07:21" );
var end = moment( "2021-06-07 10:30" );

var bizHours = {
    1: { start: "07:30", end: "17:30" },
    2: { start: "07:30", end: "17:30" },
    3: { start: "07:30", end: "17:30" },
    4: { start: "07:30", end: "17:30" },
    5: { start: "07:30", end: "16:30" },
    6: { },
    7: { }
};

var minutes = minutesWorked(start, end, bizHours);
console.log( minutes );



// calculation function
function minutesWorked(startJob, endJob, bizHrs) {
  if (end.isBefore(start, 'second')) {
    return 0;
  }

  var timeDiff = moment.duration(end.diff(start));
  var startDay = start.format('YYYY-MM-DD');
  var endDay = end.format('YYYY-MM-DD');
  var current = start;
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
            startTime = start.format("HH:mm");
            startTime = startTime > bizStartTime ? startTime : bizStartTime;
            startTime = startTime < bizEndTime ? startTime : bizEndTime;
        } else {
            startTime = bizStartTime;
        }

        if (currentDay == endDay) {
            endTime = end.format("HH:mm");
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