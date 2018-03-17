(function ()
{
    'use strict';

    angular
        .module('app.communicated')
        .controller('CommunicatedController',CommunicatedController);

    /** @ngInject */
    function CommunicatedController($http, baseUrl2, $localStorage, hierarchy,MessageInfo,Clear)
    {
      var vm = this;
      vm.Clear = Clear;
      vm.assetCommunicated={};
      vm.communicated = {};
      vm.communicated.showtabledata =  false;
      vm.assetCommunicated.progressShow = false;
      vm.assetCommunicated.inputShow = true;
      vm.communicated.showReport = false;

            var splitDate =  function(dt) {
              console.log(dt);
              var x=dt+"";
               var newDt1 = x.split(' ')[2] + "-" + x.split(' ')[1] + "-" + x.split(' ')[3];
               console.log(newDt1);
              return  newDt1;
            }
      // vm.dtOptions = {
      //             dom       : '<"top"f>rt<"bottom"<"left"<"length"l><"pagination"p>><"right"<"info"i><"pagination"p>>>',
      //             pagingType: 'simple',
      //             autoWidth : false,
      //             responsive: true
      //           }
      //
      //

                vm.dtOptions = {
                            dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                            pagingType: 'simple',
                            autoWidth : false,
                            responsive: true
                          }

      vm.assetCommunicated.region=false;
      vm.assetCommunicated.region1=false;

      vm.dynamicShow=function (){
        vm.assetCommunicated.inputShow=true;
        vm.assetCommunicated.showReport=false;
      }

      var data = {};
      var userDetails = {};
      console.log("In billingDemandController");
      var modelArray = [null, null, null, null, null, null];
      vm.modelArray = modelArray;
      var currentUser = $localStorage.globals;
      userDetails = currentUser.currentUser;
      console.log(userDetails);
      vm.assetCommunicated.discom = userDetails.discom;
      vm.assetCommunicated.discomid = userDetails.discomId;
      vm.modelArray[0]= vm.assetCommunicated.discomid;
      console.log(vm.modelArray);

      //regions
      vm.getRegions = function(item) {
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/"+item
        }).then(function mySuccess(response) {
          console.log(response);
            vm.assetCommunicated.regions = response.data;
            console.log(vm.assetCommunicated.regions);
        }, function myError(response) {
            console.log(response);
        });
      }

      // circles
      vm.getCircles = function(item) {
        console.log(item);
        console.log("RegionId");
        vm.modelArray[1] = Number(item);
        console.log(vm.modelArray);
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/"+item
        }).then(function mySuccess(response) {
            vm.assetCommunicated.circles = response.data;
            console.log(vm.assetCommunicated.circles);
        }, function myError(response) {
            console.log(response);
        });
      }

      //divisions
      vm.getDivision = function(item) {
        console.log(item);
        console.log("CircleId");
        vm.modelArray[2] = Number(item);
        for (var i = 3; i < vm.modelArray.length; i++) {
          vm.modelArray[i] = null;
        }
        console.log(vm.modelArray);
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/"+item
        }).then(function mySuccess(response) {
            vm.assetCommunicated.divisions = response.data;
            console.log(vm.assetCommunicated.divisions);
        }, function myError(response) {
            console.log(response);
        });
      }

      //subdivisions
      vm.getSubDivisions=function(item){
        console.log(item);
        console.log("DivisionID");
        vm.modelArray[3] = Number(item);
        for (var i = 4; i < vm.modelArray.length; i++) {
          vm.modelArray[i] = null;
        }
        console.log(vm.modelArray);
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/"+item
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.assetCommunicated.subdivisions = response.data;
        }, function myError(response) {
            console.log(response);
        });
      }

      //sections
      vm.getSections = function(item) {
        console.log("SubDivisionID");
        console.log(item);
        vm.modelArray[4] = Number(item);
        for (var i = 5; i < vm.modelArray.length; i++) {
          vm.modelArray[i] = null;
        }
        console.log(vm.modelArray);
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/" + item
        }).then(function mySuccess(response) {
            vm.assetCommunicated.sections = response.data;
            console.log(response.data);
            console.log(vm.assetCommunicated.sections);
        }, function myError(response) {
            console.log(response);
        });
      }



      if(userDetails.levelName == "SUB-DIVISION"){
        vm.assetCommunicated.region=true;
        vm.assetCommunicated.circle=true;
        vm.assetCommunicated.division=true;
        vm.assetCommunicated.subdivision=true;
        vm.assetCommunicated.regionName=userDetails.region;
        vm.assetCommunicated.circleName=userDetails.circle;
        vm.assetCommunicated.divisionName= userDetails.division;
        vm.assetCommunicated.subdivisionName=userDetails.hierarchyName;
        vm.assetCommunicated.subdivisionid = userDetails.hierarchyId;
        vm.assetCommunicated.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.modelArray[3] = userDetails.divisionId;
        vm.getSections(vm.assetCommunicated.subdivisionid);
      }

      if(userDetails.levelName == "REGION"){
          vm.assetCommunicated.region=true;
          vm.assetCommunicated.regionName= userDetails.hierarchyName;
          vm.assetCommunicated.regionid=userDetails.hierarchyId;
          vm.assetCommunicated.circle1=true;
          vm.assetCommunicated.division1=true;
          vm.assetCommunicated.subdivision1=true;
          vm.assetCommunicated.section1 =true;
          vm.modelArray[1]= userDetails.regionId;
          vm.getCircles(vm.assetCommunicated.regionid);
        }

      if(userDetails.levelName == "DIVISION"){
        vm.assetCommunicated.region=true;
        vm.assetCommunicated.circle=true;
        vm.assetCommunicated.division=true;
        vm.assetCommunicated.regionName=userDetails.region;
        vm.assetCommunicated.circleName=userDetails.circle;
        vm.assetCommunicated.divisionName= userDetails.hierarchyName;
        vm.assetCommunicated.divisionid=userDetails.hierarchyId;
        vm.assetCommunicated.subdivision1=true;
        vm.assetCommunicated.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.getSubDivisions(vm.assetCommunicated.divisionid);
      }

      if(userDetails.levelName == "CIRCLE"){
        vm.assetCommunicated.region=true;
        vm.assetCommunicated.circle=true;
        vm.assetCommunicated.regionName=userDetails.region;
        vm.assetCommunicated.circleName= userDetails.hierarchyName;
        vm.assetCommunicated.circleid=userDetails.hierarchyId;
        vm.assetCommunicated.division1=true;
        vm.assetCommunicated.subdivision1=true;
        vm.assetCommunicated.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.getDivision(vm.assetCommunicated.circleid);
      }

      if(userDetails.levelName == "DISCOM"){
          vm.assetCommunicated.regionName=userDetails.region;
          vm.assetCommunicated.discom= userDetails.hierarchyName;
          vm.assetCommunicated.discomid=userDetails.hierarchyId;
          vm.assetCommunicated.region1=true;
          vm.assetCommunicated.circle1=true;
          vm.assetCommunicated.division1=true;
          vm.assetCommunicated.subdivision1=true;
          vm.assetCommunicated.section1 =true;
          vm.modelArray[0]= userDetails.hierarchyId;
          vm.getRegions(vm.assetCommunicated.discomid);
     }


     vm.getMeters = function(item) {

        //  vm.modelArray[5] = Number(item);
        console.log(item);
        console.log("SectionId");
        vm.modelArray[5] = Number(item);
        for (var i = 6; i < vm.modelArray.length; i++) {
          vm.modelArray[i] = null;
        }
        console.log(vm.modelArray);


     }





     vm.assetMgmtCommunicatedSubmit = function(){
       if (validateassetMgmtCommunicated()) {
      vm.assetCommunicated.progressShow=true;
       data.modelArray = vm.modelArray;
       vm.communicated.fromdate1 = splitDate(vm.communicated.fromdate);
       vm.communicated.todate1 = splitDate(vm.communicated.todate);
       data.fromDate = splitDate(vm.communicated.fromdate);
       data.toDate = splitDate(vm.communicated.todate);
       console.log(data);
       $http({
         method : "POST",
         url : hierarchy + "mdm/reports/assetManage/communicated-meter",
         data: data
       }).then(function mySuccess(response) {
         vm.assetCommunicated.progressShow=false;
         console.log(response);
        console.log(response.data.statistics);
         vm.assetCommunicated.dataList = response.data.statistics;
         console.log(vm.assetCommunicated.dataList);
         vm.assetCommunicated.inputShow = false;
         vm.communicated.showReport = true;
       }, function myError(response) {
           console.log(response);
       });
     }

     }

     function validateassetMgmtCommunicated() {
       if(vm.communicated.fromdate === undefined || vm.communicated.todate===undefined ){
        //vm.errorToast("Please Select All Fields.");
        MessageInfo.showMessage(7002, '', '', '');
         return false;
      }
      if(vm.communicated.fromdate > vm.communicated.todate){
        //vm.errorToast("Please Select All Fields.");
          MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
         return false;
      }
      return true;
     }
    }
})();
