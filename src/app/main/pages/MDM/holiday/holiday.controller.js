// (function ()
// {
//     'use strict';
//
//     angular
//         .module('app.holiday')
//         .controller('HolidayController', HolidayController);
//
//     /** @ngInject */
//     function HolidayController($http, $mdToast, baseUrl2, $mdDialog){
//         var vm = this;
//
//         vm.errorToast = function(mesg) {
//         //  var pinTo = vm.getToastPosition();
//          $mdToast.show(
//            $mdToast.simple()
//              .textContent(mesg)
//              .position('top right')
//              .hideDelay(3000)
//              .toastClass('error')
//
//            );
//          }
//
//          var dt = new Date();
//          var year = dt.getFullYear();
//
//          vm.changeYear = function(a) {
//            vm.past = true;
//            var changedYear = year;
//            var el_name =angular.element('.previous1');
//           //  var el_date =angular.element('.previous');
//            el_name.removeAttr('disabled','disabled');
//            vm.minDate = new Date(new Date().getFullYear(), 0, 1);
//            vm.maxDate = new Date(new Date().getFullYear(), 11, 31);
//            vm.disabled = false;
//            //vm.submit_button = false;
//            if (a == 1) {
//              vm.past = false;
//              changedYear = year - 1;
//              el_name.attr('disabled','disabled');
//              vm.disabled = true;
//              //vm.submit_button = true;
//              vm.minDate = new Date(new Date().getFullYear()-1, 0, 1);
//              vm.maxDate = new Date(new Date().getFullYear()-1, 11, 31);
//            } else if(a == 3) {
//              vm.past = true;
//              el_name.removeAttr('disabled','disabled');
//              vm.disabled = false;
//              //vm.submit_button = false;
//              vm.minDate = new Date(new Date().getFullYear()+1, 0, 1);
//              vm.maxDate = new Date(new Date().getFullYear()+1, 11, 31);
//              changedYear = year + 1;
//            }
//            getData(changedYear);
//          }
//          vm.successToast = function(mesg) {
//          //  var pinTo = vm.getToastPosition();
//           $mdToast.show(
//             $mdToast.simple()
//               .textContent(mesg)
//               .position('top right')
//               .hideDelay(3000)
//               .toastClass('success')
//
//           );
//         };
//
//         vm.showConfirm = function() {
//           // Appending dialog to document.body to cover sidenav in docs app
//           console.log("dialog function");
//           var confirm = $mdDialog.confirm()
//                 .title('After submitting data cannot be deleted, would you like to proceed?')
//                 .textContent('')
//                 .ariaLabel('Lucky day')
//                 .targetEvent()
//                 .ok('Yes')
//                 .cancel('No');
//
//           $mdDialog.show(confirm).then(function() {
//             vm.holiday();
//             vm.status = 'You decided to get rid of your debt.';
//           }, function() {
//             vm.status = 'You decided to keep your debt.';
//           });
//         };
//
//
//         //////////
//         vm.holidays = [{
//           'id' : null,
//           'name' : '',
//           'date' : '',
//           'opt' : true,
//           'valid' : true
//         }];
//
//         vm.addHols = function() {
//           var holiday = {
//             'id' : null,
//             'name' : '',
//             'date' : '',
//             'opt' : true,
//             'valid' : true
//            };
//           vm.holidays.push(holiday);
//         }
//
//         vm.deleteHols = function(i) {
//            console.log(i);
//            vm.holidays.splice(i,1);
//         }
//
//         getData();
//
//         function validateHols(hols) {
//           var j = 0;
//           var counter = 0;
//
//           if(hols.length == 0){
//               //vm.errorToast("Enter holiday name and date");
//               return false;
//           }
//
//           for(var i = 0; i < hols.length; i++) {
//             hols[i].valid = true;
//           }
//
//          for (var i = 0; i < hols.length; i++) {
//            if(hols[i].name === "" || hols[i].date === "") {
//              hols[i].valid = false;
//              return false;
//            }
//          }
//
//          var count = 0;
//           for (var i = 0; i < hols.length; i++) {
//             var holsA = hols[i];
//             //console.log(holsc.length);
//             for (var j = 0; j < hols.length; j++) {
//               if (i == j) {
//                 //skip
//               }else {
//                 var holsB = hols[j];
//                 if (new Date(holsA.date).getTime() == new Date(holsB.date).getTime()) {
//                   holsA.valid = false;
//                   holsB.valid = false;
//                   //return false;
//                   count++;
//                 }
//                 else if (holsA.name == holsB.name) {
//                   holsA.valid = false;
//                   holsB.valid = false;
//                   count++;
//                   //return false;
//                 }
//               }
//             }
//           }
//           if (count >= 1) {
//             return false;
//           }
//
//           return true;
//         }
//
//         vm.holiday = function () {
//
//           var data = {};
//           var a = {};
//           var b = [];
//           var resHol = [];
//           var j = 0;
//
//           //Skipping not filled holiday name and holiday date rows and taking only filled rows
//           for (var i = 0; i < vm.holidays.length; i++) {
//             if((vm.holidays[i].name === "" || vm.holidays[i].date === "")) {
//               continue;
//             }
//             resHol[j] = vm.holidays[i];
//             j++;
//           }
//
//           if(validateHols(vm.holidays)) {
//             for(var i = 0; i < resHol.length; i++) {
//               var k = 0;
//               for(var key in resHol[i]) {
//                 if(key == 'id') {
//
//                   a.id = resHol[i][key];
//                 } else if ( key == 'name') {
//                   a.name = resHol[i][key];
//
//                 } else if(key == 'date') {
//                   var datestampString = resHol[i][key] + "";
//                   var datestamp = datestampString.split(' ')[2] + "-" + datestampString.split(' ')[1] + "-" + datestampString.split(' ')[3];
//                   a.date = datestamp;
//                   console.log(datestamp);
//                 }
//                 k++;
//               }
//               b.push(a);
//
//               a = {};
//             }
//
//
//             var date = new Date() + "";
//             var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
//             data.createdDate = dateFormat;
//             data.adminEntityValueId = 1000;
//             data.createdBy = 1111;
//             data.lastUpdatedBy = 1111;
//             data.lastUpdatedDate = dateFormat;
//             data.lastUpdatedLogin = 1111;
//             data.holidays = b;
//
//
//             console.log(data.holidays);
//             $http({
//                 method : "POST",
//                 url : baseUrl2 + "mdm/holidays",
//                 data: data
//             }).then(function mySuccess(response) {
//                 console.log(response);
//                 vm.successToast("Submitted Sucessfully");
//                 getData();
//
//             }, function myError(response) {
//                 console.log(response);
//             });
//           } else {
//             vm.errorToast("Invalid Holiday inputs");
//           }
//
//
//
//         }
//
//
//         //================================================================
//
//         function getData(year) {
//           console.log("getData");
//           $http({
//               method : "GET",
//               url : baseUrl2 + "mdm/get-holidays/" + year
//           }).then(function mySuccess(response) {
//             console.log("get holidays");
//               vm.holidays = [];
//               var count = response.data.length;
//               console.log(count);
//               for(var i = 0; i < count; i++) {
//                 var holidayData = {};
//                 var holiday = response.data[i];
//                 holidayData.name = holiday.holiday;
//                 holidayData.id = holiday.holidayId;
//                 holidayData.date = toDateHoliday(holiday.holidayDate);
//                 holidayData.opt = false;
//                 holidayData.valid = true;
//
//                 console.log(holidayData);
//                 vm.holidays.push(holidayData);
//                 holidayData = {};
//               }
//               if(vm.holidays.length == 0) {
//                 vm.holidays = [{
//                   'id' : null,
//                   'name' : '',
//                   'date' : '',
//                   'opt' : true,
//                   'valid' : true
//                 }];
//               }
//
//           }, function myError(response) {
//               console.log(response);
//           });
//         }
//
//         function toDateHoliday(date) {
//           var dyt = new Date(date);
//           return dyt;
//         }
//     }
// })();
