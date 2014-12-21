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

var dataRange = {};

// Angular.js dirrectives

function datesController($scope) {
  $scope.currentDate = "dec";

  $scope.dates = getDatesInRange(11, 2014, 1, 2015);


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


