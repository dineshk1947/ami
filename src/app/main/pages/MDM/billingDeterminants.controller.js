(function ()
{
    'use strict';

    angular
        .module('app.billingDet')
        .controller('BillingDetContoller', BillingDetContoller);

    function BillingDetContoller($http, $mdToast, baseUrl2, $mdDialog, MessageInfo, Clear, $localStorage) {
        var vm = this;
        vm.Clear = Clear;
        //var valid = true;

        vm.errorToast = function(mesg) {
        //  var pinTo = vm.getToastPosition();

         $mdToast.show(
           $mdToast.simple()
             .textContent(mesg)
             .position('top right')
             .hideDelay(3000)
             .toastClass('error')

           );
         };
         vm.successToast = function(mesg) {
         //  var pinTo = vm.getToastPosition();

          $mdToast.show(
            $mdToast.simple()
              .textContent(mesg)
              .position('top right')
              .hideDelay(3000)
              .toastClass('success')

          );
        };

        var splitDate =  function(dt) {
          var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
          var newDt =   dt.getDate() + "-" +  months[dt.getMonth()] + "-" + dt.getFullYear() + "";
          console.log(newDt);
          return newDt;
        }


        //TOU

        setTimezoneData();
        getTimezoneData();

        function addZone() {
            var timezone = {
              name: "",
              id: null,
              start: "",
              end: "",
              status: "In Active",
              valid: false
            };
            vm.timezones.push(timezone);

        };


        function setTimezoneData() {
          console.log("setTimezoneData");
          vm.timezones = [];
          addZone();
          addZone();
          addZone();
          addZone();
          addZone();
          addZone();
          addZone();
          addZone();
          console.log(vm.timezones);
        }


        function getTimezoneData() {
          console.log("getTimezoneData");
          console.log("$localStorage.globals.token",$localStorage.globals.token);
          $http({
              method : "GET",
              url : baseUrl2 + "mdm/get-timezones",
              headers:  {
                      "x-token" : $localStorage.globals.token
                  }
          }).then(function mySuccess(response) {
            console.log("get timezones");
              vm.timezones = [];
              //var count = response.data.length;
              //console.log(count);
              for(var i = 0; i < 8; i++) {
                var timezoneData = {};
                //console.log(">>>>>>>>>>>>>>>>> " + i + " response.data " + response.data[i]);
                if(response.data[i] != undefined) {
                  //console.log("i: " + i + "   count " + count);
                  var timezone = response.data[i];
                  console.log(timezone);
                  timezoneData.name = timezone.timezone;
                  timezoneData.id = timezone.timeZoneId;
                  timezoneData.start = toDateWithOutTimeZone(timezone.startTime);
                  timezoneData.end = toDateWithOutTimeZone(timezone.endTime);
                  timezoneData.status = timezone.timeZoneStatus;
                  timezoneData.valid = false;

                } else {
                  timezoneData.name = "";
                  timezoneData.id = null
                  timezoneData.start = "";
                  timezoneData.end = "";
                  timezoneData.status = "In Active";
                  timezoneData.valid = false;
                }
                //console.log(timezoneData);
                vm.timezones.push(timezoneData);
              }

          }, function myError(response) {
              console.log(response);
          });
        }

        function isInBetweenTz(t1, t2, t3) {
          //console.log(t1 + " t1\n" + t2 + " t2\n" + t3 + " t3\n");
          if(t1 === null || t2 === null  || t3 === null){
            return false;
          }

          if(t3 >= t1 && t3 <= t2) {
            return true;
          } else {
            return false;
          }
        }

        function validateTimezone(timeZones) {

          for(var i = 0; i < timeZones.length; i++) {
            var timeZone = timeZones[i];
            timeZone.valid = false;
          }
          var count = 0;
          for(var i = 0; i < timeZones.length; i++) {
            var timeZone = timeZones[i];

            if((timeZone.start === null && timeZone.end != null) || (timeZone.start != null && timeZone.end === null)) {
              timeZone.valid = true;
              count++;
              //return false;

            }

            if(timeZone.start === null || timeZone.end === null) {
              continue;
            }

            if(timeZone.start >= timeZone.end){
                timeZone.valid = true;
                count++;
                //return false;
            }

          }

          for(var i = 0; i < timeZones.length; i++) {
            var timeZoneA = timeZones[i];

            if(timeZoneA.start === null || timeZoneA.end === null) {
              continue;
            }
            console.log("AAAAAAAAAAAAAAAAAAAAAA");
            console.log(timeZoneA);

            for(var j = 0; j < timeZones.length; j++) {
              if(i === j) {
                console.log("[][][][][][][][][][][][][][][][][][][]");
                continue;//skip
              } else {
                var timeZoneB = timeZones[j];


                if(timeZoneB.start === null || timeZoneB.end === null) {
                  continue;
                }
                console.log("BBBBBBBBBBBBBBBBBBBBBBB");
                console.log(timeZoneB);
                for(var k = 0; k < 2; k++) {
                  if(k % 2 == 0) {
                    if(isInBetweenTz(timeZoneB.start, timeZoneB.end, timeZoneA.start)) {
                      //console.log(i + " / " + j + " / " + k + " / " + timeZoneB.start +  " / " + timeZoneB.end+ " / " + timeZoneA.start +  " / " + timeZoneA.end);
                      timeZoneA.valid = true;
                      timeZoneB.valid = true;
                      count++;
                      //return false
                    }

                  } else {
                    if(isInBetweenTz(timeZoneB.start, timeZoneB.end, timeZoneA.end)) {
                      //console.log(i + " / " + j + " / " + k + " / " + timeZoneB.start +  " / " + timeZoneB.end+ " / " + timeZoneA.start +  " / " + timeZoneA.end);
                      timeZoneA.valid = true;
                      timeZoneB.valid = true;
                      count++;
                      //return false
                    }

                  }
                }

              }

            }
          }
          if(count >= 1) {
            return false;
          }

          return true;
        }
        var data = {};


        vm.zoness = function () {
          console.log("zones submit");
          console.log(" ...................     ,,,,,,,,,,,,,,,");
          console.log(vm.timezones);
          var selectedTimezones = [];

          for(var i = 0; i < vm.timezones.length; i++) {
            var timezone = vm.timezones[i];
            if((timezone.start === null && timezone.end != null) || (timezone.start != null && timezone.end === null)) {
              timezone.valid = true;
              //vm.errorToast("not a valid timezone times");
              MessageInfo.showMessage(1506, '', '', '');
              return false;
            }
            if(timezone.start === null || timezone.end === null) {
              continue;
            }
            selectedTimezones.push(timezone);

          }

          console.log(selectedTimezones);
          console.log("::::::::::::::::::");
          if(validateTimezone(selectedTimezones)) {

            var date = new Date();
            var dateFormat = splitDate(date);
            data.createdDate = dateFormat;
            data.adminEntityValueId = 1000;
            data.createdBy = 1111;
            data.lastUpdatedBy = 1111;
            data.lastUpdatedDate = dateFormat;
            data.lastUpdatedLogin = 1111;

            var a = [];
            var tz = {};
            var b = [];
            //console.log(vm.timezones);
            for(var i = 0; i < vm.timezones.length; i++) {
              var p = 0;
              //console.log(".............");
              //console.log(vm.timezones[i].start);
              if(vm.timezones[i].start === null || vm.timezones[i].end === null) {
                //console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
                continue;
              }
              for(var key in vm.timezones[i]) {
                if(key == 'name') {
                  tz.name = vm.timezones[i][key];
                } else if(key == 'id') {
                  tz.id = vm.timezones[i][key];
                } else if(key == 'start') {
                  var timestampString = vm.timezones[i][key] + "";
                  var timestampTime = timestampString.split(' ')[4];
                  tz.start = timestampTime;
                } else if(key == 'end') {
                  var timestampString = vm.timezones[i][key] + "";
                  var timestampTime = timestampString.split(' ')[4];
                  tz.end = timestampTime;
                } else if(key == 'status') {
                  a.push(vm.timezones[i][key]);
                  tz.status = vm.timezones[i][key];
                } else {

                }
                p++;
              }
              b.push(tz);
              tz = {};
              a = [];
            }

            data.timezoness = b;
            console.log("==========================================");
            console.log(data);

            $http({
                method : "POST",
                url : baseUrl2 + "mdm/time-zones",
                data: data,
                headers:  {
                        "x-token" : $localStorage.globals.token
                    }
            }).then(function mySuccess(response) {
                console.log(response);
                //vm.successToast("Submitted Sucessfully");
                MessageInfo.showMessage(1012, '', '', '');
                setTimezoneData();
                getTimezoneData();
            }, function myError(response) {
                console.log(response);
            });
          } else {
            //vm.errorToast("not a valid timezone times");
            MessageInfo.showMessage(1506, '', '', '');
          }

        }



        function toDateWithOutTimeZone(date) {
          var tempTime = date.split(":");
          var dt = new Date();
          dt.setHours(tempTime[0]);
          dt.setMinutes(tempTime[1]);
          dt.setSeconds('00');
          dt.setMilliseconds('000');
          console.log(dt);

          return dt;
        }


        //Seasons

        vm.minDate = new Date(new Date().getFullYear(), 0, 1);

        setSeasonData();
        getSeasonData();

        function isInBetweenSeason(t1, t2, t3) {
          console.log(t1 + " t1\n" + t2 + " t2\n" + t3 + " t3\n");
          if(t1 === null || t2 === null  || t3 === null){
            return false;
          }
          var t1 = new Date(t1).getTime();
          var t2 = new Date(t2).getTime();
          var t3 = new Date(t3).getTime();

          if(t3 >= t1 && t3 <= t2) {
            return true;
          } else {
            return false;
          }
        }

        function validateSeason(seasons) {

          console.log(seasons);

          for(var i = 0; i < seasons.length; i++) {
            var season = seasons[i];
            season.valid = true;
          }


          var j = 0;
          for(var i = 0; i < seasons.length; i++) {
            var season = seasons[i];
            if(season.start === "" || season.end === "") {
              j++;
            }
            console.log(":::::::::::::  " + j);
            if(j > 3) {
              return false;
            }

            if(season.start != "" && season.end != "") {
              if(season.start >= season.end){
                  season.valid = false;
                  return false;
              }
            }

          }

          j = 0;

          for(var i = 0; i < seasons.length; i++) {

            var seasonA = seasons[i];

            for(var j = 0; j < seasons.length; j++) {

              if(i === j) {
                continue;//skip
              } else {
                var seasonB = seasons[j];
                if(seasonB.start === "" || seasonB.end === "") {
                  console.log("continue validity 2");
                  continue;
                }
                for(var k = 0; k < 2; k++) {
                  if(k % 2 === 0) {
                    if(isInBetweenSeason(seasonB.start, seasonB.end, seasonA.start)) {
                      console.log(i + " / " + j + " / " + k + " / " + seasonB.start +  " / " + seasonB.end+ " / " + seasonA.start +  " / " + seasonA.end);
                      seasonA.valid = false;
                      seasonB.valid = false;

                      return false
                    }

                  } else {
                    if(isInBetweenSeason(seasonB.start, seasonB.end, seasonA.end)) {
                      console.log(i + " / " + j + " / " + k + " / " + seasonB.start +  " / " + seasonB.end+ " / " + seasonA.start +  " / " + seasonA.end);
                      seasonA.valid = false;
                      seasonB.valid = false;
                      return false
                    }

                  }
                }

              }

            }

          }
          return true;
        }
        var data = {};

        vm.seasonss = function () {
          console.log("zones submit");
          console.log(vm.seasons);
          var selectedSeasons = [];

          for(var i = 0; i < vm.seasons.length; i++) {
            var season = vm.seasons[i];
            if(season.start === "" || season.end === "") {
              continue;
            }
            selectedSeasons.push(season);

          }

          if(selectedSeasons.length === 0) {
            //vm.errorToast("cannot submit empty inputs");
            MessageInfo.showMessage(1412, 'Timezone', '', '');
            return false;
          }

          if(validateSeason(selectedSeasons)) {

            var dateFormat = splitDate(new Date());

            data.createdDate = dateFormat;
            data.adminEntityValueId = 1000;
            data.createdBy = 1111;
            data.lastUpdatedBy = 1111;
            data.lastUpdatedDate = dateFormat;
            data.lastUpdatedLogin = 1111;
            console.log(vm.seasons.name);


            var a = {};
            var b = [];
            for(var i = 0; i < vm.seasons.length; i++) {
             var k=0;
             if(vm.seasons[i].start === "") {
               console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
               continue;
             }
              for(var key in vm.seasons[i]) {
                if(k==0){
                  a.name=vm.seasons[i][key];
                }
                else if(k==1){

                  a.id=vm.seasons[i][key];
                }
              else if(k==2){
                // var timestampString = vm.seasons[i][key] + "";
                // var timestampTime = timestampString.split(' ')[2] + "-" + timestampString.split(' ')[1] + "-" + timestampString.split(' ')[3];
                a.startDate = splitDate(vm.seasons[i][key]);
                //console.log(timestampString);
              }else if(k==3){
                  // var timestampString = vm.seasons[i][key] + "";
                  // var timestampTime = timestampString.split(' ')[2] + "-" + timestampString.split(' ')[1] + "-" + timestampString.split(' ')[3];
                  a.endDate = splitDate(vm.seasons[i][key]);
                  //console.log(timestampString);
                }
              k++;
              }
              b.push(a);
              a = {};
            }

            data.seasons = b;
            console.log("==========================================");
            console.log(data);

            $http({
                method : "POST",
                url : baseUrl2 + "mdm/seasons",
                data: data,
                headers:  {
                        "x-token" : $localStorage.globals.token
                    }
            }).then(function mySuccess(response) {
                console.log(response);
                //vm.successToast("Submitted Sucessfully");
                MessageInfo.showMessage(1012, '', '', '');
                 //$state.reload();
                 setSeasonData();
                 getSeasonData();

            }, function myError(response) {

                console.log(response);
            });
          }
          else {
            //vm.errorToast("Invalid input dates. Please correct and proceeddd.");
            MessageInfo.showMessage(1416, '', '', '');
          }

        }

        //================================================================

        function addSeason() {
          var season = {
            id: null,
            name : "",
            start: "",
            end: "",
            valid: true
          };
          vm.seasons.push(season);
        }

        function setSeasonData() {
          console.log("setSeasonData");
          vm.seasons = [];

          addSeason();
          addSeason();
          addSeason();
          addSeason();
        }


        function getSeasonData() {
          console.log("getSeasonData");
          $http({
              method : "GET",
              url : baseUrl2 + "mdm/get-seasons",
              headers:  {
                      "x-token" : $localStorage.globals.token
                  }
          }).then(function mySuccess(response) {
            console.log("get seasons");
              vm.seasons = [];
              var count = response.data.length;
              console.log(count);
              for(var i = 0; i < 4; i++) {
                var seasonData = {};
                if(i < count) {
                  console.log("i: " + i + "   count " + count);
                  var season = response.data[i];
                  console.log(season);

                  //for(var j = 0; j < season.length; j++) {
                    seasonData.name = season.seasonName;
                    seasonData.id = season.seasonId;
                    seasonData.start = toDateSeason(season.startDate);
                    seasonData.end = toDateSeason(season.endDate);
                    seasonData.valid = true;
                  //}
                } else {
                  seasonData.name = "";
                  seasonData.id = null
                  seasonData.start = "";
                  seasonData.end = "";
                  seasonData.valid = true;
                }



                console.log(seasonData);
                vm.seasons.push(seasonData);

              }

          }, function myError(response) {
              console.log(response);
          });

        }

        function toDateSeason(date) {
          var dyt = new Date(date);
          return dyt;
        }


        //Holiday

         var dt = new Date();
         var year = dt.getFullYear();

         vm.changeYear = function(a) {
           vm.past = true;
           var changedYear = year;
           var el_name =angular.element('.previous1');
          //  var el_date =angular.element('.previous');
           el_name.removeAttr('disabled','disabled');
           vm.minDate = new Date(new Date().getFullYear(), 0, 1);
           vm.maxDate = new Date(new Date().getFullYear(), 11, 31);
           vm.disabled = false;
           //vm.submit_button = false;
           if (a == 1) {
             vm.past = false;
             changedYear = year - 1;
             el_name.attr('disabled','disabled');
             vm.disabled = true;
             //vm.submit_button = true;
             vm.minDate = new Date(new Date().getFullYear()-1, 0, 1);
             vm.maxDate = new Date(new Date().getFullYear()-1, 11, 31);
           } else if(a == 3) {
             vm.past = true;
             el_name.removeAttr('disabled','disabled');
             vm.disabled = false;
             //vm.submit_button = false;
             vm.minDate = new Date(new Date().getFullYear()+1, 0, 1);
             vm.maxDate = new Date(new Date().getFullYear()+1, 11, 31);
             changedYear = year + 1;
           }
           getHolidayData(changedYear);
         }


        vm.showConfirm = function() {
          // Appending dialog to document.body to cover sidenav in docs app
          console.log("dialog function");
          var confirm = $mdDialog.confirm()
                .title('After submitting data cannot be deleted, would you like to proceed?')
                .textContent('')
                .ariaLabel('Lucky day')
                .targetEvent()
                .ok('Yes')
                .cancel('No');

          $mdDialog.show(confirm).then(function() {
            vm.holiday();
            vm.status = 'You decided to get rid of your debt.';
          }, function() {
            vm.status = 'You decided to keep your debt.';
          });
        };


        //////////
        vm.holidays = [{
          'id' : null,
          'name' : '',
          'date' : '',
          'opt' : true,
          'valid' : true
        }];

        vm.addHols = function() {
          var holiday = {
            'id' : null,
            'name' : '',
            'date' : '',
            'opt' : true,
            'valid' : true
           };
          vm.holidays.push(holiday);
        }

        vm.deleteHols = function(i) {
           console.log(i);
           vm.holidays.splice(i,1);
        }

        getHolidayData();

        function validateHols(hols) {
          var j = 0;
          var counter = 0;

          if(hols.length == 0){

              //vm.errorToast("Enter holiday name and date");

              return false;
          }

          for(var i = 0; i < hols.length; i++) {
            hols[i].valid = true;
          }

         for (var i = 0; i < hols.length; i++) {
           if(hols[i].name === "" || hols[i].date === "") {
             hols[i].valid = false;
             return false;
           }
         }

         var count = 0;
          for (var i = 0; i < hols.length; i++) {
            var holsA = hols[i];
            //console.log(holsc.length);
            for (var j = 0; j < hols.length; j++) {
              if (i == j) {
                //skip
              }else {
                var holsB = hols[j];
                if (new Date(holsA.date).getTime() == new Date(holsB.date).getTime()) {
                  holsA.valid = false;
                  holsB.valid = false;
                  //return false;
                  count++;
                }
                else if (holsA.name == holsB.name) {
                  holsA.valid = false;
                  holsB.valid = false;
                  count++;
                  //return false;
                }
              }
            }
          }
          if (count >= 1) {
            return false;
          }
          return true;
        }

        vm.holiday = function () {

          var data = {};
          var a = {};
          var b = [];
          var resHol = [];
          var j = 0;

          //Skipping not filled holiday name and holiday date rows and taking only filled rows
          for (var i = 0; i < vm.holidays.length; i++) {
            if((vm.holidays[i].name === "" || vm.holidays[i].date === "")) {
              continue;
            }
            resHol[j] = vm.holidays[i];
            j++;
          }

          if(validateHols(vm.holidays)) {
            for(var i = 0; i < resHol.length; i++) {
              var k = 0;
              for(var key in resHol[i]) {
                if(key == 'id') {

                  a.id = resHol[i][key];
                } else if ( key == 'name') {
                  a.name = resHol[i][key];

                } else if(key == 'date') {
                  var datestampString = resHol[i][key] + "";
                  var datestamp = datestampString.split(' ')[2] + "-" + datestampString.split(' ')[1] + "-" + datestampString.split(' ')[3];
                  a.date = datestamp;
                  console.log(datestamp);
                }
                k++;
              }
              b.push(a);

              a = {};
            }


            var date = new Date() + "";
            var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
            data.createdDate = dateFormat;
            data.adminEntityValueId = 1000;
            data.createdBy = 1111;
            data.lastUpdatedBy = 1111;
            data.lastUpdatedDate = dateFormat;
            data.lastUpdatedLogin = 1111;
            data.holidays = b;


            console.log(data.holidays);
            $http({
                method : "POST",
                url : baseUrl2 + "mdm/holidays",
                data: data,
                headers:  {
                        "x-token" : $localStorage.globals.token
                    }
            }).then(function mySuccess(response) {
                console.log(response);
                MessageInfo.showMessage(1501, 'Holidays Info', '', '');
                //vm.successToast("Submitted Sucessfully");
                getHolidayData();

            }, function myError(response) {
                console.log(response);
            });
          } else {
            //vm.errorToast("Invalid Holiday inputs");
            MessageInfo.showMessage(1502, '', '', '');
          }
        }


        //================================================================

        function getHolidayData(year) {
          console.log("getHolidayData");
          $http({
              method : "GET",
              url : baseUrl2 + "mdm/get-holidays/" + year,
              headers:  {
                      "x-token" : $localStorage.globals.token
                  }
          }).then(function mySuccess(response) {
            console.log("get holidays");
              vm.holidays = [];
              var count = response.data.length;
              console.log(count);
              for(var i = 0; i < count; i++) {
                var holidayData = {};
                var holiday = response.data[i];
                holidayData.name = holiday.holiday;
                holidayData.id = holiday.holidayId;
                holidayData.date = toDateHoliday(holiday.holidayDate);
                holidayData.opt = false;
                holidayData.valid = true;

                console.log(holidayData);
                vm.holidays.push(holidayData);
                holidayData = {};
              }
              if(vm.holidays.length == 0) {
                vm.holidays = [{
                  'id' : null,
                  'name' : '',
                  'date' : '',
                  'opt' : true,
                  'valid' : true
                }];
              }

          }, function myError(response) {
              console.log(response);
          });
        }

        function toDateHoliday(date) {
          var dyt = new Date(date);
          return dyt;
        }
    }
})();
