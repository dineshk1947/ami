(function ()
{
    'use strict';
    angular
        .module('app.algconfig')
        .controller('AlgconfigController', AlgconfigController);
    /** @ngInject */
    function AlgconfigController($http,baseUrl2, Clear, MessageInfo)
    {
        var vm = this;
        vm.Clear = Clear;
        // Data
        // Methods
        //////////
        console.log("+++++++++++++++++++++");
        //////////////////////////////////////////////////////
        // circles
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/hierarchy/1000"
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.circles = response.data;
        }, function myError(response1) {
            console.log(response1);
        });
      //divisions
      vm.getDivisions = function() {
        console.log("+++++++++++++");
        console.log(vm.selectedItem1);
      //console.log(vm.circleid);
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/hierarchy/" + vm.selectedItem1[1]
            //console.log(url);
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.divisions = response.data;
        }, function myError(response) {
            console.log(response);
        });
      }
      // //subdivisions
      vm.getSubDivisions = function() {
        console.log("++++++++++++++++++");
        console.log(vm.selectedItem2);
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/hierarchy/" + vm.selectedItem2[1]
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.subdivisions = response.data;
        }, function myError(response) {
            console.log(response);
        });
      }
      //
      // //sections
      vm.getSections = function() {
        console.log("+++++++++++++++++++");
        console.log(vm.selectedItem3);
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/hierarchy/" + vm.selectedItem3[1]
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.sections = response.data;
        }, function myError(response) {
            console.log(response);
        });
      }
      //
      //substations
      vm.getSubStations = function() {
        console.log("+++++++++++++++++++");
        console.log(vm.selectedItem4);
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/substation/" + vm.selectedItem4[1]
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.substations = response.data;
        }, function myError(response) {
            console.log(response);
        });
      }
      //
      // //feders
      vm.getFeeder = function() {
        console.log("++++++++++++++++++");
        console.log(vm.selectedItem5);
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/feeder/" + vm.selectedItem5[1]
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.feeders = response.data;
        }, function myError(response) {
            console.log(response);
        });
      }
      // //dtrs
      vm.getDtr = function() {
        console.log("+++++++++++++++++++");
        console.log(vm.selectedItem6);
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/dtr/" + vm.selectedItem6[1]
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.dtrs = response.data;
        }, function myError(response) {
            console.log(response);
        });
      }
      //Get meters
      $http({
          method : "GET",
          url : "http://d76683d6.ngrok.io/mdm/vee/config/get-meterId"
      }).then(function mySuccess(response) {
          console.log(response.data);
          vm.mtrs = response.data;
      }, function myError(response) {
          console.log(response);
      });
      vm.mtrInactive = "N";
      vm.mtrCIC = "N";
      vm.mtrMIC = "N";
      vm.mtrMsngInt = "N";
      vm.mtrKvarh = "N";
      vm.mtrTou = "N";
      vm.mtrCtrctDem = "N";
      vm.mtrSpike = "N";
      vm.mtrCzc = "N";
      vm.mtrPulseOv = "N";
      vm.mtrDialRoll = "N";
      vm.mtrHigh = "N";
      vm.mtrLow = "N";
      vm.mtrSpi = "N";
      vm.algConfig = function () {
        vm.meterSelected = {};
          var data = {};
          var date = new Date() + "";
          var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
          data.createdDate = dateFormat;
          data.adminEntityValueId = 1000;
          data.createdBy = 1111;
          data.lastUpdatedBy = 1111;
          data.lastUpdatedDate = dateFormat;
          data.lastUpdatedLogin = 1111;
          data.typecic = vm.mtrInactive;
          data.typemic = vm.mtrMIC;
          data.typeinactive = vm.mtrInactive;
          data.typeemi = vm.mtrMsngInt;
          data.typekvarh = vm.mtrKvarh;
          data.typetou = vm.mtrTou;
          data.typecd = vm.mtrCtrctDem;
          data.typees = vm.mtrSpike;
          data.typeczc = vm.mtrCzc;
          data.typepof = vm.mtrPulseOv;
          data.typealg11 = vm.mtrDialRoll;
          data.typealg12 = vm.mtrHigh;
          data.typealg13 = vm.mtrLow;
          data.typealg14 = vm.mtrSpi;
          //data.meterSelected = vm.meterSelected;
          //console.log(vm.meterSelected);
          console.log("++++++++++++++++++++++");
          console.log(data);
          $http({
              method : "POST",
              url : "http://d76683d6.ngrok.io/mdm/vee/config/insert",
                //url : "http://localhost:5000/mdm/holidays",
              data: data
          }).then(function mySuccess(response) {
              console.log(response);
              alert("Submitted Sucessfully");
          }, function myError(response) {
              console.log(response);
          });
      }
    }
})();
