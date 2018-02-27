// (function ()
// {
//     'use strict';
//
//     angular
//         .module('app.season')
//         .controller('SeasonController', SeasonController);
//
//     /** @ngInject */
//     function SeasonController($http, $mdToast, baseUrl2) {
//         var vm = this;
//
//         vm.minDate = new Date(new Date().getFullYear(), 0, 1);
//
//         var splitDate =  function(dt) {
//           var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
//           var newDt = dt.getDate() + "-" +  months[dt.getMonth()] + "-" + dt.getFullYear() + "";
//           console.log("splitDare  " + newDt);
//           return newDt;
//         }
//
//         vm.errorToast = function(mesg) {
//         //  var pinTo = vm.getToastPosition();
//
//          $mdToast.show(
//            $mdToast.simple()
//              .textContent(mesg)
//              .position('top right')
//              .hideDelay(3000)
//              .toastClass('error')
//
//            );
//          };
//          vm.successToast = function(mesg) {
//          //  var pinTo = vm.getToastPosition();
//
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
//         setData();
//         getData();
//
//         function isInBetween(t1, t2, t3) {
//           console.log(t1 + " t1\n" + t2 + " t2\n" + t3 + " t3\n");
//           if(t1 === null || t2 === null  || t3 === null){
//             return false;
//           }
//           var t1 = new Date(t1).getTime();
//           var t2 = new Date(t2).getTime();
//           var t3 = new Date(t3).getTime();
//
//           if(t3 >= t1 && t3 <= t2) {
//             return true;
//           } else {
//             return false;
//           }
//         }
//
//         function validate(seasons) {
//
//           console.log(seasons);
//
//           for(var i = 0; i < seasons.length; i++) {
//             var season = seasons[i];
//             season.valid = true;
//           }
//
//
//           var j = 0;
//           for(var i = 0; i < seasons.length; i++) {
//             var season = seasons[i];
//             if(season.start === "" || season.end === "") {
//               j++;
//             }
//             console.log(":::::::::::::  " + j);
//             if(j > 3) {
//               return false;
//             }
//
//             if(season.start != "" && season.end != "") {
//               if(season.start >= season.end){
//                   season.valid = false;
//                   return false;
//               }
//             }
//
//           }
//
//           j = 0;
//
//           for(var i = 0; i < seasons.length; i++) {
//
//             var seasonA = seasons[i];
//
//             for(var j = 0; j < seasons.length; j++) {
//
//               if(i === j) {
//                 continue;//skip
//               } else {
//                 var seasonB = seasons[j];
//                 if(seasonB.start === "" || seasonB.end === "") {
//                   console.log("continue validity 2");
//                   continue;
//                 }
//                 for(var k = 0; k < 2; k++) {
//                   if(k % 2 === 0) {
//                     if(isInBetween(seasonB.start, seasonB.end, seasonA.start)) {
//                       console.log(i + " / " + j + " / " + k + " / " + seasonB.start +  " / " + seasonB.end+ " / " + seasonA.start +  " / " + seasonA.end);
//                       seasonA.valid = false;
//                       seasonB.valid = false;
//
//                       return false
//                     }
//
//                   } else {
//                     if(isInBetween(seasonB.start, seasonB.end, seasonA.end)) {
//                       console.log(i + " / " + j + " / " + k + " / " + seasonB.start +  " / " + seasonB.end+ " / " + seasonA.start +  " / " + seasonA.end);
//                       seasonA.valid = false;
//                       seasonB.valid = false;
//                       return false
//                     }
//
//                   }
//                 }
//
//               }
//
//             }
//
//           }
//           return true;
//         }
//         var data = {};
//
//         vm.seasonss = function () {
//           console.log("zones submit");
//           console.log(vm.seasons);
//           var selectedSeasons = [];
//
//           for(var i = 0; i < vm.seasons.length; i++) {
//             var season = vm.seasons[i];
//             if(season.start === "" || season.end === "") {
//               continue;
//             }
//             selectedSeasons.push(season);
//
//           }
//
//           if(selectedSeasons.length === 0) {
//             vm.errorToast("cannot submit empty inputs");
//             return false;
//           }
//
//           if(validate(selectedSeasons)) {
//
//             var dateFormat = splitDate(new Date());
//
//             data.createdDate = dateFormat;
//             data.adminEntityValueId = 1000;
//             data.createdBy = 1111;
//             data.lastUpdatedBy = 1111;
//             data.lastUpdatedDate = dateFormat;
//             data.lastUpdatedLogin = 1111;
//             console.log(vm.seasons.name);
//
//
//             var a = {};
//             var b = [];
//             for(var i = 0; i < vm.seasons.length; i++) {
//              var k=0;
//              if(vm.seasons[i].start === "") {
//                console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
//                continue;
//              }
//               for(var key in vm.seasons[i]) {
//                 if(k==0){
//                   a.name=vm.seasons[i][key];
//                 }
//                 else if(k==1){
//
//                   a.id=vm.seasons[i][key];
//                 }
//               else if(k==2){
//                 // var timestampString = vm.seasons[i][key] + "";
//                 // var timestampTime = timestampString.split(' ')[2] + "-" + timestampString.split(' ')[1] + "-" + timestampString.split(' ')[3];
//                 a.startDate = splitDate(vm.seasons[i][key]);
//                 //console.log(timestampString);
//               }else if(k==3){
//                   // var timestampString = vm.seasons[i][key] + "";
//                   // var timestampTime = timestampString.split(' ')[2] + "-" + timestampString.split(' ')[1] + "-" + timestampString.split(' ')[3];
//                   a.endDate = splitDate(vm.seasons[i][key]);
//                   //console.log(timestampString);
//                 }
//               k++;
//               }
//               b.push(a);
//               a = {};
//             }
//
//             data.seasons = b;
//             console.log("==========================================");
//             console.log(data);
//
//             $http({
//                 method : "POST",
//                 url : baseUrl2 + "mdm/seasons",
//                 data: data
//             }).then(function mySuccess(response) {
//                 console.log(response);
//                 vm.successToast("Submitted Sucessfully");
//                  //$state.reload();
//                  setData();
//                  getData();
//
//             }, function myError(response) {
//
//                 console.log(response);
//             });
//           }
//           else {
//             vm.errorToast("Invalid input dates. Please correct and proceeddd.");
//           }
//
//         }
//
//         //================================================================
//
//         function addSeason() {
//           var season = {
//             id: null,
//             name : "",
//             start: "",
//             end: "",
//             valid: true
//           };
//           vm.seasons.push(season);
//         }
//
//         function setData() {
//           console.log("setData");
//           vm.seasons = [];
//
//           addSeason();
//           addSeason();
//           addSeason();
//           addSeason();
//         }
//
//
//         function getData() {
//           console.log("getData");
//           $http({
//               method : "GET",
//               url : baseUrl2 + "mdm/get-seasons"
//           }).then(function mySuccess(response) {
//             console.log("get seasons");
//               vm.seasons = [];
//               var count = response.data.length;
//               console.log(count);
//               for(var i = 0; i < 4; i++) {
//                 var seasonData = {};
//                 if(i < count) {
//                   console.log("i: " + i + "   count " + count);
//                   var season = response.data[i];
//                   console.log(season);
//
//                   //for(var j = 0; j < season.length; j++) {
//                     seasonData.name = season.seasonName;
//                     seasonData.id = season.seasonId;
//                     seasonData.start = toDateSeason(season.startDate);
//                     seasonData.end = toDateSeason(season.endDate);
//                     seasonData.valid = true;
//                   //}
//                 } else {
//                   seasonData.name = "";
//                   seasonData.id = null
//                   seasonData.start = "";
//                   seasonData.end = "";
//                   seasonData.valid = true;
//                 }
//
//
//
//                 console.log(seasonData);
//                 vm.seasons.push(seasonData);
//
//               }
//
//           }, function myError(response) {
//               console.log(response);
//           });
//
//         }
//
//         function toDateSeason(date) {
//           var dyt = new Date(date);
//           return dyt;
//         }
//     }
// })();
