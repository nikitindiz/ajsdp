<!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.28/angular.min.js"></script>
  <script src="bsearch/js/underscore-min.js"></script>
  <script src="bsearch/js/jquery-1.11.2.min.js"></script>
  <script src="bsearch/js/search-from-calendar.js"></script>
  <link rel="stylesheet" href="bsearch/css/property-search-style.css">
  <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="bsearch/css/font-awesome.min.css">
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>

  <div class="banner-simulator"></div>

  <div class="search-wrapper" ng-app ng-controller="datePickerController">
    <div class="form-background">
      <div class="location-wrapper">
        <input type="text" class="location-field" placeholder="e.g. city, region, country, or specific property">
      </div>
      <div class="options-wrapper">
        <!-- Check-in calendar -->
        <div class="checkout-calendar-picker check-in hide">
          <div>
            <span class="calendar-control close"><i class="fa fa-close"></i></span>
            <span class="calendar-control move-left"><i class="fa fa-chevron-left"></i></span>
            <span class="calendar-control move-right"><i class="fa fa-chevron-right"></i></span>
            <div class="header-title">
              <h1>Check-in Date</h1>
            </div>
            <div class="picker-year" ng-repeat="date in pickerDates">
              <ul class="col-wrapper" style="width: {{calendarWrapperWidth}}px">
                <li ng-repeat="month in date.months" class="month">
                  <div class="header">
                    <h1>{{month.name}} {{date.year}}</h1>
                  </div>
                  <ul>
                    <li class="week-days">
                      <ul>
                        <li ng-repeat="weekDay in weekDays">
                          {{weekDay}}
                        </li>
                      </ul>
                    </li>
                    <li class="days-shift-{{month.daysShift}}"></li>
                    <li ng-repeat="date in month.dates" class="single-date {{date.dateType}} day-of-week-{{date.dateDayOfWeek}}">
                      <label>
                        <input type="checkbox"
                          ng-model="date.dateChosen"
                          ng-click="keepOnlyTwoDates(date, 'before')"
                          ng-change="updateDatesDecoration(date)"
                          {{date.inputAdditions}} class="date"
                          ng-disabled="date.disabled">
                        {{date.dateDay}}
                      </label>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- / Check-in calendar -->

        <!-- Check-out calendar -->
        <div class="checkout-calendar-picker check-out hide">
          <div>
            <span class="calendar-control close"><i class="fa fa-close"></i></span>
            <span class="calendar-control move-left"><i class="fa fa-chevron-left"></i></span>
            <span class="calendar-control move-right"><i class="fa fa-chevron-right"></i></span>
            <div class="header-title">
              <h1>Check-out Date</h1>
            </div>
            <div class="picker-year" ng-repeat="date in pickerDates">
              <ul class="col-wrapper" style="width: {{calendarWrapperWidth}}px">
                <li ng-repeat="month in date.months" class="month">
                  <div class="header">
                    <h1>{{month.name}} {{date.year}}</h1>
                  </div>
                  <ul>
                    <li class="week-days">
                      <ul>
                        <li ng-repeat="weekDay in weekDays">
                          {{weekDay}}
                        </li>
                      </ul>
                    </li>
                    <li class="days-shift-{{month.daysShift}}"></li>
                    <li ng-repeat="date in month.dates" class="single-date {{date.dateType}} day-of-week-{{date.dateDayOfWeek}}">
                      <label>
                        <input type="checkbox"
                          ng-model="date.dateChosen"
                          ng-click="keepOnlyTwoDates(date, 'after')"
                          ng-change="updateDatesDecoration(date)"
                          {{date.inputAdditions}} class="date"
                          ng-disabled="date.disabled">
                        {{date.dateDay}}
                      </label>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- / Check-out calendar -->

        <span class="date-picker check-in-picker-show inline-field {{chosenStatus}}">
          <span class="title">Check-in Date</span>
          <span class="chosen-date">{{checkInDate}}</span>
        </span>
        <span class="date-picker check-out-picker-show inline-field {{chosenStatus}}">
          <span class="title">Check-out Date</span>
          <span class="chosen-date">{{checkOutDate}}</span>
        </span>
        <span class="adults-dropdown">
          <select name="" id="" class="adults-counter inline-field">
            <option value="1">1 adults</option>
            <option value="2" selected>2 adults</option>
            <option value="3">3 adults</option>
            <option value="4">4 adults</option>
            <option value="5">5 adults</option>
            <option value="6">6 adults</option>
            <option value="7">7 adults</option>
            <option value="8">8 adults</option>
            <option value="9">9 adults</option>
            <option value="10">10 adults</option>
            <option value="11">11 adults</option>
            <option value="12">12 adults</option>
            <option value="13">13 adults</option>
            <option value="14">14 adults</option>
            <option value="15">15 adults</option>
            <option value="16">16 adults</option>
            <option value="17">17 adults</option>
            <option value="18">18 adults</option>
            <option value="19">19 adults</option>
            <option value="20">20 adults</option>
          </select>
        </span>
        <span class="search-button">
          <button type="submit">Search</button>
        </span>
      </div>
      <span class="i-dont-know-chekbox">
        <label for="">I don't have specific dates yet
          <input type="checkbox" name="" id="">
        </label>
      </span>
    </div>
  </div>
  <script src="js/init.js"></script>

</body>
</html>