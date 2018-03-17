(function ()
{
    'use strict';

    angular
        .module('app.powerFactor')
        .controller('PowerFactorController',PowerFactorController);

    /** @ngInject */
    function PowerFactorController($http,hierarchy, baseUrl2, $localStorage, MessageInfo, Clear)
    {
        var vm = this;
        vm.Clear = Clear;

        vm.pf={};
        var data = {};
        var userDetails = {};
        vm.powerFactor = {};
        vm.datatableshow = false;
        vm.inputShow=true;
        vm.showReport=false;
        vm.dynamicShow=function (){
          vm.inputShow=true;
          vm.showReport=false;
        }

        console.log("In HierarchyController");
        var modelArray = [null, null, null, null, null, null,null,null,null];
        vm.modelArray = modelArray;
        var currentUser = $localStorage.globals;
        userDetails = currentUser.currentUser;
        console.log(userDetails);
        vm.pf.discom = userDetails.discom;
        vm.pf.discomid = userDetails.discomId;
        vm.modelArray[0]= vm.pf.discomid;
        console.log(vm.modelArray);
        vm.powerFactor.progressShow = false;;

        vm.dtOptions = {
                    dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                    pagingType: 'simple',
                    autoWidth : false,
                    responsive: true
                  }
        //substations
        //substations
        vm.getSubStations = function() {
          //console.log("SectionID");
          //vm.modelArray[5] = Number(vm.pf.sectionid);
          for (var i = 6; i < vm.modelArray.length; i++) {
            vm.modelArray[i] = null;
          }
          data.modelArray = vm.modelArray;
          console.log(vm.modelArray);
          $http({
              method : "POST",
              url : hierarchy +"/mdm/reports/load-subStation-number",
              data : data
          }).then(function mySuccess(response) {
              console.log(response.data);
              vm.pf.substations = response.data;
              console.log(vm.pf.substations);
              vm.getMeters();
          }, function myError(response) {
              console.log(response);
          });
        }

        //feders
        vm.getFeeder = function() {
          console.log("SubstationID");
          console.log(vm.powerFactor.substationid);
          vm.modelArray[6] = Number(vm.powerFactor.substationid);
          for (var i = 7; i < vm.modelArray.length; i++) {
            vm.modelArray[i] = null;
          }
          console.log(vm.modelArray);
          $http({
              method : "GET",
              url: hierarchy + "/mdm/load-feeder/" +vm.powerFactor.substationid

              //url : hierarchy + "mdm/feeder/" + vm.powerFactor.substationid
          }).then(function mySuccess(response) {
              console.log(response.data);
              vm.pf.feeders = response.data;
              vm.getMeters();
          }, function myError(response) {
              console.log(response);
          });
        }

        //dtrs
        vm.getDtr = function() {
          console.log("FeederID");
          console.log(vm.powerFactor.feederid);
          vm.modelArray[7] = Number(vm.powerFactor.feederid);
          for (var i = 8; i < vm.modelArray.length; i++) {
            vm.modelArray[i] = null;
          }
          console.log(vm.modelArray);
          $http({
              method : "GET",
              // url : hierarchy + "mdm/dtr/" + vm.powerFactor.feederid
              url: hierarchy + "/mdm/load-dtr/" +vm.powerFactor.feederid
          }).then(function mySuccess(response) {
            console.log("dtr");
              console.log(response.data);
              vm.pf.dtrs = response.data;
              vm.getMeters();

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
        // function validate(pf) {
        //   if (pf.fromDate == undefined && pf.toDate == undefined) {
        //     MessageInfo.showMessage(1017, '', '', '');
        //   }
        //   if (pf.fromDate < pf.toDate) {
        //     MessageInfo.showMessage(1501, '', '', '');
        //   }
        //
        // }

        //mETERS
        vm.getMeter = function(item) {
          vm.mtrNo = item.mtrNo;
          console.log("MeterID");
          console.log(vm.mtrNo);
          //vm.modelArray[8] = Number(vm.mtrNo);
          console.log(vm.modelArray);
          //console.log("Meter Id is ", vm.selectedItem);
        }


        if(userDetails.levelName == "SUB-DIVISION"){
          vm.pf.discom = userDetails.discom;
          vm.pf.regionName=userDetails.region;
          vm.pf.circleName=userDetails.circle;
          vm.pf.divisionName= userDetails.division;
          vm.pf.subdivisionName=userDetails.hierarchyName;
          vm.pf.subdivisionid = userDetails.hierarchyId;
          vm.modelArray[1]= userDetails.regionId;
          vm.modelArray[2]= userDetails.circleId;
          vm.modelArray[3] = userDetails.divisionId;
          vm.getSubStations();
        }

        if(userDetails.levelName == "REGION"){
            vm.pf.regionName= userDetails.hierarchyName;
            vm.pf.regionid=userDetails.hierarchyId;

            //vm.modelArray[0]= userDetails.regionId;
            vm.getSubStations();
          }

        if(userDetails.levelName == "DIVISION"){
          vm.pf.regionName=userDetails.region;
          vm.pf.circleName=userDetails.circle;
          vm.pf.divisionName= userDetails.hierarchyName;
          vm.pf.divisionid=userDetails.hierarchyId;
          vm.modelArray[1]= userDetails.regionId;
          vm.modelArray[2]= userDetails.circleId;
          vm.getSubStations();
        }

        if(userDetails.levelName == "CIRCLE"){

          vm.pf.regionName=userDetails.region;
          vm.pf.circleName= userDetails.hierarchyName;
          vm.pf.circleid=userDetails.hierarchyId;
          vm.modelArray[1]= userDetails.regionId;
          vm.getSubStations();
        }

        if(userDetails.levelName == "DISCOM"){
            vm.pf.regionName=userDetails.region;
            vm.pf.discom= userDetails.hierarchyName;
            vm.pf.discomid=userDetails.hierarchyId;
            vm.modelArray[0]= userDetails.hierarchyId;
            vm.getSubStations();
       }


       vm.getMeters = function () {
         if (vm.pf.sectionid != null) {
           vm.modelArray[5] = Number(vm.pf.sectionid);
           console.log(vm.modelArray[5]);
         }
         else {
           console.log("DTRId");
           console.log(vm.powerFactor.dtrid);
           vm.modelArray[8] = Number(vm.powerFactor.dtrid);
           data.modelArray = vm.modelArray;
           console.log(data.modelArray);
         }
         data.modelArray = vm.modelArray;

         // if (vm.sectionid) {
         //   data.sectionid = data.sectionid;
         // }
         $http({
           method : "POST",
           url : hierarchy + "mdm/reports/pf-mtr-number",
           data: data
         }).then(function mySuccess(response) {
           console.log(response);
             vm.pf.meters = response.data;
             console.log(vm.pf.meters);
         }, function myError(response) {
             console.log(response);
         });
       }

       var splitDate =  function(dt) {
         var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
         var newDt =   dt.getDate() + "-" +  months[dt.getMonth()] + "-" + dt.getFullYear() + "";
         console.log(newDt);
         return newDt;
       }

       function validatePowerFactor(){
        //  if (vm.mtrNo === undefined || vm.mtrNo === null ) {
        //    MessageInfo.showMessage(1017, 'Meter No', '', '');
        //     return false;
        //  }
       if(vm.powerFactor.fromDate === undefined || vm.powerFactor.toDate === undefined ){
         MessageInfo.showMessage(7002, '', '', '');
          return false;
       }
       if(vm.powerFactor.fromDate > vm.powerFactor.toDate  ){
         MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
          return false;
       }

       return true;
       }



       vm.pfSubmit = function() {
         if(validatePowerFactor()){
         vm.powerFactor.progressShow = true;
         console.log("In pfSubmit");
         data.modelArray = vm.modelArray;
         var fromDate = splitDate(vm.powerFactor.fromDate);
         var toDate = splitDate(vm.powerFactor.toDate);
         data.fromDate = fromDate;
         data.toDate = toDate;
         data.modelArray = vm.modelArray;
         data.mtrNumber = vm.mtrNo;
         console.log(vm.mtrNo);
         console.log(data.modelArray);
         console.log(data);
         $http({
           method : "POST",
           url : hierarchy + "mdm/reports/powerFactor",
           data: data
         }).then(function mySuccess(response) {
           console.log(response);
             vm.powerFactorList = response.data.statistics.powerFactorList;
             console.log(vm.powerFactorList);
             vm.powerFactor.progressShow = false;
             vm.inputShow=false;
             vm.showReport=true;
             vm.subSationDisplayName=response.data.subStation;
             vm.feederDisplayName=response.data.feeder;
             vm.dtrDisplayName=response.data.dtr;
             vm.meterDisplayName=response.data.meterNumber;
         }, function myError(response) {
            MessageInfo.showMessage(1010, '', '', '');
            vm.powerFactor.progressShow = false;
             console.log(response);
         });
       }
       }

       vm.getMeters();
  }
})();
