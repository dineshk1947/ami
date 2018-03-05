(function ()
{
    'use strict';

    angular
        .module('app.powerFactor')
        .controller('PowerFactorController',PowerFactorController);

    /** @ngInject */
    function PowerFactorController($http, baseUrl2, $localStorage, MessageInfo)
    {
        var vm = this;

        var data = {};
        var meterSearch = {};
        var userDetails = {};
        var location = [];
        var currentUser = $localStorage.globals;
        userDetails = currentUser.currentUser;


        vm.evnt = [{a : 1,
                  b : "1210",
                  c : "5",
                  d : "6",
                  e : "3",
                  f : "9"
                },
                {a : 2,
                  b : "1210",
                  c : "4",
                  d : "8",
                  e : "4",
                  f : "9"
                },
                {a : 3,
                  b : "1210",
                  c : "5",
                  d : "6",
                  e : "3",
                  f : "9"
                },
                {a : 4,
                  b : "1210",
                  c : "5",
                  d : "6",
                  e : "3",
                  f : "9"
                }]

        vm.dtOptions = {
                    dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                    pagingType: 'simple',
                    autoWidth : false,
                    responsive: true
                  }
        //substations
        vm.getSubStations = function() {
          console.log("SectionID");
          console.log(vm.sectionid);
          vm.vmArray[5] = Number(vm.sectionid);
          for (var i = 6; i < vm.vmArray.length; i++) {
            vm.vmArray[i] = null;
          }
          console.log(vm.vmArray);
          $http({
              method : "GET",
              url : baseUrl2 +"mdm/substation/"+vm.sectionid
          }).then(function mySuccess(response) {
              console.log(response.data);
              vm.substations = response.data;
              console.log(vm.substations);
          }, function myError(response) {
              console.log(response);
          });
        }

        //feders
        vm.getFeeder = function() {
          console.log("SubstationID");
          console.log(vm.substationid);
          vm.vmArray[6] = Number(vm.substationid);
          for (var i = 7; i < vm.vmArray.length; i++) {
            vm.vmArray[i] = null;
          }
          console.log(vm.vmArray);
          $http({
              method : "GET",
              url: baseUrl2 + "mdm/feeder?id1=" +vm.substationid + "&id2=" + vm.sectionid
          }).then(function mySuccess(response) {
              console.log(response.data);
              vm.feeders = response.data;
          }, function myError(response) {
              console.log(response);
          });
        }

        //dtrs
        vm.getDtr = function() {
          console.log("FeederID");
          console.log(vm.feederid);
          vm.vmArray[7] = Number(vm.feederid);
          for (var i = 8; i < vm.vmArray.length; i++) {
            vm.vmArray[i] = null;
          }
          console.log("dtr check data",vm.vmArray);
          $http({
              method : "GET",
              url: baseUrl2 + "mdm/dtr?id1=" +vm.feederid + "&id2=" + vm.sectionid
          }).then(function mySuccess(response) {
            console.log("dtr");
              vm.dtrs = response.data;
              console.log("--------------------",vm.dtrs );
          }, function myError(response) {
            console.log("dtr");
              console.log(response);
          });
        }

        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        var minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 2);

        vm.minDate = minDate;
        vm.maxDate = yesterday;
        console.log(vm.maxDate);
        // function validate(powerFactor) {
        //   if (powerFactor.fromDate == undefined && powerFactor.toDate == undefined) {
        //     MessageInfo.showMessage(1017, '', '', '');
        //   }
        //   if (powerFactor.fromDate < powerFactor.toDate) {
        //     MessageInfo.showMessage(1501, '', '', '');
        //   }
        //
        // }

        //mETERS
        vm.getMeter = function() {
          console.log("DtrID");
          console.log(vm.selectedItem.dtrId);
          vm.vmArray[8] = Number(vm.selectedItem.dtrId);
          console.log(vm.vmArray);
          console.log("Dtr id is ", vm.selectedItem);
        }


    }
})();
