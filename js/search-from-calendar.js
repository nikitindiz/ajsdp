




// Settings

var weekDayName = [
                "Su",
                "Mo",
                "Tu",
                "We",
                "Th",
                "Fr",
                "Sa"
];

var MonthName = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
];

var dateTodayDay = new Date().getDate();
var dateTodayMonth = new Date().getMonth();
var dateTodayYear = new Date().getFullYear();
var colWidth    = '519';

// console.log(getCalendar(12,2014,2,2015));

var dataRange = {};

// Angular.js dirrectives


function datePickerController($scope) {

  // ToDo : Generate calendar range: start date - end date

  var startYear   = 2014;
  var startMonth  = 12;
  var endYear     = 2015;
  var endMonth    = 11;
  var daysInMonth = 0;

  $scope.pickerDates = getCalendar(startMonth, startYear, endMonth, endYear);
  $scope.weekDays = weekDayName;
  $scope.calendarWrapperWidth = colWidth * getMonthsLength($scope.pickerDates);

  $scope.checkInDate = '';
  $scope.checkOutDate = '';
  $scope.chosenStatus = '';

  $scope.keepOnlyTwoDates = function(date, whereChange) {

    if (whereChange == undefined) {
      whereChange = 'at-the-end';
    }

    if (countChosenDates($scope.pickerDates) == 2) {
      if (whereChange == undefined) {
        whereChange = 'after';
      }

      if (whereChange == 'before') {
        setPropertyById($scope.pickerDates,
                        getPrevMin($scope.pickerDates),
                        'dateChosen',
                        false);
      } else {
        setPropertyById($scope.pickerDates,
                        getPrevMax($scope.pickerDates),
                        'dateChosen',
                        false);
      }
    }

  };

  $scope.updateDatesDecoration = function(date) {

    $scope.checkInDate =  getPropertyById($scope.pickerDates,
                                          getPrevMin($scope.pickerDates),
                                          'dateDayOfWeek') + ', ' +
                          MonthName[getPropertyById($scope.pickerDates,
                                          getPrevMin($scope.pickerDates),
                                          'dateMonth')-1] + ' '+
                          getPropertyById($scope.pickerDates,
                                          getPrevMin($scope.pickerDates),
                                          'dateDay') + ', ' +
                          getPropertyById($scope.pickerDates,
                                          getPrevMin($scope.pickerDates),
                                          'dateYear');

    $scope.checkOutDate = getPropertyById($scope.pickerDates,
                                          getPrevMax($scope.pickerDates),
                                          'dateDayOfWeek') + ', ' +
                          MonthName[getPropertyById($scope.pickerDates,
                                          getPrevMax($scope.pickerDates),
                                          'dateMonth')-1] + ' '+
                          getPropertyById($scope.pickerDates,
                                          getPrevMax($scope.pickerDates),
                                          'dateDay') + ', ' +
                          getPropertyById($scope.pickerDates,
                                          getPrevMax($scope.pickerDates),
                                          'dateYear');

    $scope.chosenStatus = 'chosen';

    //if (countChosenDates($scope.pickerDates) == 2) {

      for (var y = 0; y < $scope.pickerDates.length; y++) {
        for (var m = 0; m < $scope.pickerDates[y].months.length; m++) {
          for (var d = 0; d < $scope.pickerDates[y].months[m].dates.length; d++) {
            if ($scope.pickerDates[y].months[m].dates[d].dateChosen) {
              $scope.pickerDates[y].months[m].dates[d].dateType = 'chosen-one';
            } else if ( ($scope.pickerDates[y].months[m].dates[d].dateId < getPrevMax($scope.pickerDates)) &&
                        ($scope.pickerDates[y].months[m].dates[d].dateId > getPrevMin($scope.pickerDates))
                      ) {
              $scope.pickerDates[y].months[m].dates[d].dateType = 'range';
            } else if ($scope.pickerDates[y].months[m].dates[d].dateType != 'disabled') {
              $scope.pickerDates[y].months[m].dates[d].dateType = 'simple-date';
            }
          }
        }
      }
    //}


  };

}

// Count chosen dates
function countChosenDates(date) {

  var counter = 0;

  for (var y = 0; y < date.length; y++) {
    for (var m = 0; m < date[y].months.length; m++) {
      for (var d = 0; d < date[y].months[m].dates.length; d++) {
        if (date[y].months[m].dates[d].dateChosen) {
          counter++;
        }
      }
    }
  }

  return counter;

}

// Get months length

function getMonthsLength(date) {
  var length = 0;
  for (var y = 0; y < date.length; y++) {
    length += date[y].months.length;
  }
  return length;
}


// Set property by Id
function setPropertyById(date, id, provertyName, propertyValue) {
  if (id == -1) {
    return false;
  }
  var status = false;
  for (var y = 0; y < date.length; y++) {
    for (var m = 0; m < date[y].months.length; m++) {
      for (var d = 0; d < date[y].months[m].dates.length; d++) {
        if (date[y].months[m].dates[d].dateId == id) {
          date[y].months[m].dates[d][provertyName] = propertyValue;
          status = true;
        }
      }
    }
  }
  return status;
}

function getPropertyById(date, id, provertyName) {
  if (id == -1) {
    return false;
  }
  var property = '';
  for (var y = 0; y < date.length; y++) {
    for (var m = 0; m < date[y].months.length; m++) {
      for (var d = 0; d < date[y].months[m].dates.length; d++) {
        if (date[y].months[m].dates[d].dateId == id) {
          property = date[y].months[m].dates[d][provertyName];
        }
      }
    }
  }
  return property;
}


// Previous Max and Min
function getPrevMax(date) {
  var prevMaxId = -1;
  for (var y = 0; y < date.length; y++) {
    for (var m = 0; m < date[y].months.length; m++) {
      for (var d = 0; d < date[y].months[m].dates.length; d++) {
        if (date[y].months[m].dates[d].dateChosen) {
          prevMaxId = date[y].months[m].dates[d].dateId;
        }
      }
    }
  }
  return prevMaxId;
}

function getPrevMin(date) {
  var prevMinId = -1;
  for (var y = date.length-1; y >= 0; y--) {
    for (var m = date[y].months.length-1; m >= 0 ; m--) {
      for (var d = date[y].months[m].dates.length-1; d >= 0 ; d--) {
        if (date[y].months[m].dates[d].dateChosen) {
          prevMinId = date[y].months[m].dates[d].dateId;
        }
      }
    }
  }
  return prevMinId;
}




// Generate calendar

function getCalendar(startMonth, startYear, endMonth, endYear) {

  var dateId = 1;
  var calendar = [];
  var calendarMonths = [];
  var calendarDates = [];
  var monthsStart = startMonth;
  var monthsEnd = (startYear == endYear) ? endMonth : 12;
  var daysInMonth = 0;
  var today = new Date();
  var currentDate;
  var dateType;
  var inputAdditions = '';
  var inputDisabled = false;

  for (var year = startYear; year <= endYear; year++) {

    monthsStart = (year > startYear) ? 1 : monthsStart;
    monthsEnd = (year == endYear) ? endMonth : monthsEnd;

    for (var month = monthsStart; month <= monthsEnd; month++) {
      daysInMonth = new Date(year, month, 0).getDate();
      for (var day = 1; day <= daysInMonth; day++) {
        dateId++;

        currentDate = new Date(year, month-1, day);

        if (today >= currentDate) {
          dateType = 'disabled';
          inputAdditions = 'disabled';
          inputDisabled = true;
        } else {
          dateType = 'simple-date';
          inputAdditions = '';
          inputDisabled = false;
        }


        calendarDates.push({
                            dateDay: day,
                            dateMonth: month,
                            dateYear: year,
                            dateDayOfWeek:  weekDayName[
                                            new Date(year, month-1, day).getDay()],
                            dateChosen: false,
                            'dateType': dateType, // simple-date, chosen-one, range,
                                                  // disabled
                            dateId: dateId,
                            inputAdditions: inputAdditions,
                            disabled: inputDisabled
                            });
      }
      calendarMonths.push({
                            name: MonthName[month-1],
                            dates: calendarDates,
                            daysShift: new Date(year, month-1, 1).getDay()
                            });
      calendarDates = [];
    }
    calendar.push({
                  'year': year,
                  'months': calendarMonths
                  });
    calendarMonths = [];
  }

  return calendar;
}













function datesController($scope) {
  $scope.currentDate = "dec";

  $scope.dates = getDatesInRange(11, 2014, 1, 2015);

  $scope.years = [2014,2015];

  $scope.checkYear = function(currentDate) {
    console.log(currentDate);
    //console.log($scope.year);
    return true;
    /* true if you want item, false if not */
  }

  $scope.updateDecoration = function(date) {

    var filtredDates = _.filter($scope.dates, function(dates) {
      return dates.chosen;
    });

    var minDate = -1;
    var maxDate = -1;

    if ((filtredDates.length >= 2)) {
      minDate = getMinDate($scope.dates);
      maxDate = getMaxDate($scope.dates);
      console.log('ok');
      for(i in $scope.dates) {
        if (($scope.dates[i].dateId < maxDate) && ($scope.dates[i].dateId > minDate)) {
          $scope.dates[i].dateType = 'range';
        } else if (($scope.dates[i].dateId == maxDate) || ($scope.dates[i].dateId == minDate)){
          $scope.dates[i].dateType = 'chosen-one';
        } else {
          $scope.dates[i].dateType = 'simple-date';
        }
      }
    }
  }


  $scope.updateDatesRange = function(date) {

    var filtredDates = _.filter($scope.dates, function(dates) {
      return dates.chosen;
    });

    var minDate = -1;
    var maxDate = -1;

    var side = 'back';

    // Count filtredDates

    if ((filtredDates.length >= 2) && (side == 'none')) {
      minDate = getMinDate($scope.dates);
      maxDate = getMaxDate($scope.dates);
      if( ((maxDate - date.dateId) < 0) && ((minDate - date.dateId) < 0) ) {
        for(i in $scope.dates) {
          if ($scope.dates[i].dateId == maxDate) {
            $scope.dates[i].chosen = false;
          }
        }
      } else if ( ((maxDate - date.dateId) > 0) && ((minDate - date.dateId) > 0) ) {
         for(i in $scope.dates) {
          if ($scope.dates[i].dateId == minDate) {
            $scope.dates[i].chosen = false;
          }
        }
      } else if ( ((maxDate - date.dateId) > 0) && ((minDate - date.dateId) < 0) ) {
        if ( Math.abs(maxDate - date.dateId) > Math.abs(minDate - date.dateId) ) {
          for(i in $scope.dates) {
            if ($scope.dates[i].dateId == minDate) {
              $scope.dates[i].chosen = false;
            }
          }
        } else {
          for(i in $scope.dates) {
            if ($scope.dates[i].dateId == maxDate) {
              $scope.dates[i].chosen = false;
            }
          }
        }
      }
    } else if ((filtredDates.length >= 2) && (side == 'front')) {
      minDate = getMinDate($scope.dates);
      maxDate = getMaxDate($scope.dates);
      for(i in $scope.dates) {
        if ($scope.dates[i].dateId == maxDate) {
          $scope.dates[i].chosen = false;
        }
      }
    } else if ((filtredDates.length >= 2) && (side == 'back')) {
      minDate = getMinDate($scope.dates);
      maxDate = getMaxDate($scope.dates);
      for(i in $scope.dates) {
        if ($scope.dates[i].dateId == minDate) {
          $scope.dates[i].chosen = false;
        }
      }
    }

  };
}


// Additional functions

function getMaxDate(dates) {
  var maxDate = -1;
  for (var i in dates) {
    if (dates[i].chosen) {
      maxDate = dates[i].dateId;
    }
  }
  return maxDate;
}

function getMinDate(dates) {
  var minDate = -1;
  for (var i in dates) {
    if (dates[dates.length - 1 - i].chosen) {
      minDate = dates[dates.length - 1 - i].dateId;
    }
  }
  return minDate;
}


/*
  copyDates(From,To)
*/
function copyDates(fromDate) {
  toDate = [];
  // console.log(fromDate[0]);
  for (i in fromDate) {
    toDate.push(fromDate[i]);
  }
  return toDate;
}

/*
  getNewRange(changedDates, oldDates) - returns date object with only two dates
*/
function getNewRange(changedDates, oldDates) {

  var changedIndex = -1;
  var lastMin = -1;
  var lastMax = -1;

  for (var i in changedDates) {

    if(oldDates[i].chosen && (lastMin == -1) ) {
      lastMin = i;
    }
    else if (oldDates[i].chosen)
    {
      lastMax = i;
    }

    if(changedDates[i].chosen != oldDates[i].chosen) {
      changedIndex = i;
    } else {
      console.log(changedDates[i].chosen +' : '+ oldDates[i].chosen);
    }
  }

  console.log(changedIndex);


  if ( (lastMax == -1) || (lastMin == -1) ) {
    return changedDates;
  } else if ( (changedIndex == -1) && (lastMax == -1) && (lastMin == -1) ) {
    return changedDates;
  } else if ( (changedIndex == -1) || (changedIndex == lastMax) || (changedIndex == lastMin) ) {
    return oldDates;
  } else if (changedIndex > lastMax) {
    oldDates[lastMax].chosen = false;
    oldDates[changedIndex].chosen = true;
  } else if (changedIndex < lastMin) {
    oldDates[lastMin].chosen = false;
    oldDates[changedIndex].chosen = true;
  } else if ( (changedIndex < lastMax) && (changedIndex > lastMin) ) {
    if( (lastMax - changedIndex) > (changedIndex - lastMin) ) {
      oldDates[lastMin].chosen = false;
      oldDates[changedIndex].chosen = true;
    } else {
      oldDates[lastMax].chosen = false;
      oldDates[changedIndex].chosen = true;
    }
  }

}


/*
  getDatesInRange(startMonth, startYear, endMonth, endYear) - returns dates[{date, day of week, chosen or not yet}] object
  in a date range
*/

var dateId = 0;

function getDatesInRange(startMonth, startYear, endMonth, endYear) {

  dateId = 0;

  var dates = [];
  var endOfMonthsCount = 12;
  var StartOfMonthsCount = startMonth;

  for(var year = startYear; year <= endYear; year++) {

    if(year == endYear) {
      endOfMonthsCount = endMonth;
      StartOfMonthsCount = 1;
    }

    for(var month = StartOfMonthsCount; month <= endOfMonthsCount; month++) {

      var date = getDatesInMonth(month, year);

      for(var n in date) {
        dates.push(date[n]);
      }
    }

  }
  return dates;
}




/*
  getDatesInMonth(month,year) - returns dates[{date, day of week, chosen or not yet}] object
*/
function getDatesInMonth(month, year) {

  var dates = [];

  for(var i = 1; i <= countDaysInMonth(month,year); i++) {
    dates.push({
                currentDateDay: i,
                currentDateMonth: month,
                currentDateYear: year,
                currentDateDayOfWeek: weekDayName[new Date(year, month-1, i).getDay()],
                chosen: false,
                chosenTime: 0,
                dateType: 'simple-date', //simple-date, chosen-one, range
                dateId: dateId
                });
    dateId++;
  }
  return dates;

}

/*
  Returns counter - days in mounth
*/
function countDaysInMonth(month,year) {
  return new Date(year, month, 0).getDate();
}


$.noConflict();
jQuery( document ).ready(function( $ ) {
    $(document).on('click','span.calendar-control.move-right', function() {
      if( ( Math.abs(parseInt($('.col-wrapper').css('left'),10) - (258.5*2)) < (258.5*2)*6 ) ||
        $('.col-wrapper').css('left') == 'auto') {
        $('.col-wrapper').animate({left : '-='+(258.5*2)});
      }
      console.log(Math.abs(parseInt($('.col-wrapper').css('left'),10) - 5 - (258.5*2)));
      console.log((258.5*2)*6);
    });
    $(document).on('click','span.calendar-control.move-left', function() {
      if( !($('.col-wrapper').css('left') == '0px') && !($('.col-wrapper').css('left') == 'auto') ) {
        $('.col-wrapper').animate({left : '+='+(258.5*2)});
      }
      console.log($('.col-wrapper').css('left'));
    });
    $(document).on('click','.checkout-calendar-picker.check-in span.calendar-control.close', function() {
      $('.checkout-calendar-picker.check-in').toggleClass('hide');
    });
    $(document).on('click','.checkout-calendar-picker.check-out span.calendar-control.close', function() {
      $('.checkout-calendar-picker.check-out').toggleClass('hide');
    });
    $(document).on('click','span.date-picker.check-in-picker-show', function() {
      $('.checkout-calendar-picker.check-out').addClass('hide');
      $('.checkout-calendar-picker.check-in').toggleClass('hide');
      console.log('close');
    });
  $(document).on('click','span.date-picker.check-out-picker-show', function() {
      $('.checkout-calendar-picker.check-in').addClass('hide');
      $('.checkout-calendar-picker.check-out').toggleClass('hide');
      console.log('close');
    });




});


