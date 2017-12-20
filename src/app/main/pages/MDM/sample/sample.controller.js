(function ()
{
    'use strict';

    angular
        .module('app.sample')
        .controller('SampleController', SampleController);

    function SampleController(SampleData, $http, $mdToast, baseUrl2) {
        var vm = this;

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

        setData();
        getData();

        function addZone() {
            var timezone = {
              name: "",
              id: null,
              start: "",
              end: "",
              status: "In Active",
              valid: true
            };
            vm.timezones.push(timezone);
        };

        var splitDate =  function(dt) {
          var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
          var newDt =   dt.getDate() + "-" +  months[dt.getMonth()] + "-" + dt.getFullYear() + "";
          console.log(newDt);
          return newDt;
        }

        function setData() {
          console.log("setData");
          vm.timezones = [];
          addZone();
          addZone();
          addZone();
          addZone();
          addZone();
          addZone();
          addZone();
          addZone();
        }

        function getData() {
          console.log("getData");
          $http({
              method : "GET",
              url : baseUrl2 + "mdm/get-timezones"
          }).then(function mySuccess(response) {
            console.log("get timezones");
              vm.timezones = [];
              var count = response.data.length;
              console.log(count);
              for(var i = 0; i < 8; i++) {
                var timezoneData = {};
                //console.log(">>>>>>>>>>>>>>>>> " + i + " response.data " + response.data[i]);
                if(response.data[i] != undefined) {
                  console.log("i: " + i + "   count " + count);
                  var timezone = response.data[i];

                  for(var j = 0; j < timezone.length; j++) {
                    timezoneData.name = timezone[1];
                    timezoneData.id = timezone[0];
                    timezoneData.start = toDateWithOutTimeZone(timezone[2]);
                    timezoneData.end = toDateWithOutTimeZone(timezone[3]);
                    timezoneData.status = timezone[4];
                    timezoneData.valid = true;
                  }

                } else {
                  timezoneData.name = "";
                  timezoneData.id = null
                  timezoneData.start = "";
                  timezoneData.end = "";
                  timezoneData.status = "In Active";
                  timezoneData.valid = true;
                }
                //console.log(timezoneData);
                vm.timezones.push(timezoneData);
              }

          }, function myError(response) {
              console.log(response);
          });
        }

        function isInBetween(t1, t2, t3) {
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

        function validate(timeZones) {

          for(var i = 0; i < timeZones.length; i++) {
            var timeZone = timeZones[i];
            timeZone.valid = true;
          }

          for(var i = 0; i < timeZones.length; i++) {
            var timeZone = timeZones[i];

            if((timeZone.start === null && timeZone.end != null) || (timeZone.start != null && timeZone.end === null)) {
              timeZone.valid = false;
              return false;
            }

            if(timeZone.start === null || timeZone.end === null) {
              continue;
            }

            if(timeZone.start >= timeZone.end){
                timeZone.valid = false;
                return false;
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
                    if(isInBetween(timeZoneB.start, timeZoneB.end, timeZoneA.start)) {
                      //console.log(i + " / " + j + " / " + k + " / " + timeZoneB.start +  " / " + timeZoneB.end+ " / " + timeZoneA.start +  " / " + timeZoneA.end);
                      timeZoneA.valid = false;
                      timeZoneB.valid = false;
                      return false
                    }

                  } else {
                    if(isInBetween(timeZoneB.start, timeZoneB.end, timeZoneA.end)) {
                      //console.log(i + " / " + j + " / " + k + " / " + timeZoneB.start +  " / " + timeZoneB.end+ " / " + timeZoneA.start +  " / " + timeZoneA.end);
                      timeZoneA.valid = false;
                      timeZoneB.valid = false;
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


        vm.zoness = function () {
          console.log("zones submit");
          console.log(" ...................     ,,,,,,,,,,,,,,,");
          console.log(vm.timezones);
          var selectedTimezones = [];

          for(var i = 0; i < vm.timezones.length; i++) {
            var timezone = vm.timezones[i];
            if((timezone.start === null && timezone.end != null) || (timezone.start != null && timezone.end === null)) {
              timezone.valid = false;
              vm.errorToast("not a valid timezone times");
              return false;
            }
            if(timezone.start === null || timezone.end === null) {
              continue;
            }
            selectedTimezones.push(timezone);

          }

          console.log(selectedTimezones);
          console.log("::::::::::::::::::");
          if(validate(selectedTimezones)) {

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
                data: data
            }).then(function mySuccess(response) {
                console.log(response);
                vm.successToast("Submitted Sucessfully");
                setData();
                getData();
            }, function myError(response) {
                console.log(response);
            });
          } else {
            vm.errorToast("not a valid timezone times");
          }


        }



        function toDateWithOutTimeZone(date) {
          let tempTime = date.split(":");
          let dt = new Date();
          dt.setHours(tempTime[0]);
          dt.setMinutes(tempTime[1]);
          dt.setSeconds('00');
          dt.setMilliseconds('000');
          return dt;
        }
    }
})();
