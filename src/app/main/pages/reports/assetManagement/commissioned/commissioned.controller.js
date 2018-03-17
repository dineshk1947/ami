(function ()
{
    'use strict';

    angular
        .module('app.assetMgmtCommissioned')
        .controller('CommissionedController',CommissionedController);

    /** @ngInject */
    function CommissionedController($http, baseUrl2, $localStorage, hierarchy,MessageInfo,Clear)
    {
      var vm = this;

      vm.Clear = Clear;
      vm.assetMgmtCommissioned={};
      vm.assetCommissioned = {};
      vm.assetCommissioned.showtabledata =  false;
      vm.assetMgmtCommissioned.progressShow = false;
      vm.assetMgmtCommissioned.inputShow = true;
      vm.assetCommissioned.showReport = false;

            var splitDate =  function(dt) {
              console.log(dt);
              var x=dt+"";
               var newDt1 = x.split(' ')[2] + "-" + x.split(' ')[1] + "-" + x.split(' ')[3];
               console.log(newDt1);
              return  newDt1;
            }
      vm.dtOptions = {
                  dom       : '<"top"f>rt<"bottom"<"left"<"length"l><"pagination"p>><"right"<"info"i><"pagination"p>>>',
                  pagingType: 'simple',
                  autoWidth : false,
                  responsive: true
                }

                // vm.dtOptions = {
                //   dom       : '<"top"f>rt<"bottom"<"left"<"length"l><"pagination"p>><"right"<"info"i><"pagination"p>>>',
                //   pagingType: 'simple',
                //   autoWidth : false,
                //   responsive: true
                // }
      vm.assetMgmtCommissioned.region=false;
      vm.assetMgmtCommissioned.region1=false;

      vm.dynamicShow=function (){
        vm.assetMgmtCommissioned.inputShow=true;
        vm.assetMgmtCommissioned.showReport=false;
      }

      var data = {};
      var userDetails = {};
      console.log("In billingDemandController");
      var modelArray = [null, null, null, null, null, null];
      vm.modelArray = modelArray;
      var currentUser = $localStorage.globals;
      userDetails = currentUser.currentUser;
      console.log(userDetails);
      vm.assetMgmtCommissioned.discom = userDetails.discom;
      vm.assetMgmtCommissioned.discomid = userDetails.discomId;
      vm.modelArray[0]= vm.assetMgmtCommissioned.discomid;
      console.log(vm.modelArray);





      //regions
      vm.getRegions = function(item) {
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/"+item
        }).then(function mySuccess(response) {
          console.log(response);
            vm.assetMgmtCommissioned.regions = response.data;
            console.log(vm.assetMgmtCommissioned.regions);
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
            vm.assetMgmtCommissioned.circles = response.data;
            console.log(vm.assetMgmtCommissioned.circles);
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
            vm.assetMgmtCommissioned.divisions = response.data;
            console.log(vm.assetMgmtCommissioned.divisions);
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
            vm.assetMgmtCommissioned.subdivisions = response.data;
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
            vm.assetMgmtCommissioned.sections = response.data;
            console.log(response.data);
            console.log(vm.assetMgmtCommissioned.sections);
        }, function myError(response) {
            console.log(response);
        });
      }



      if(userDetails.levelName == "SUB-DIVISION"){
        vm.assetMgmtCommissioned.region=true;
        vm.assetMgmtCommissioned.circle=true;
        vm.assetMgmtCommissioned.division=true;
        vm.assetMgmtCommissioned.subdivision=true;
        vm.assetMgmtCommissioned.regionName=userDetails.region;
        vm.assetMgmtCommissioned.circleName=userDetails.circle;
        vm.assetMgmtCommissioned.divisionName= userDetails.division;
        vm.assetMgmtCommissioned.subdivisionName=userDetails.hierarchyName;
        vm.assetMgmtCommissioned.subdivisionid = userDetails.hierarchyId;
        vm.assetMgmtCommissioned.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.modelArray[3] = userDetails.divisionId;
        vm.getSections(vm.assetMgmtCommissioned.subdivisionid);
      }

      if(userDetails.levelName == "REGION"){
          vm.assetMgmtCommissioned.region=true;
          vm.assetMgmtCommissioned.regionName= userDetails.hierarchyName;
          vm.assetMgmtCommissioned.regionid=userDetails.hierarchyId;
          vm.assetMgmtCommissioned.circle1=true;
          vm.assetMgmtCommissioned.division1=true;
          vm.assetMgmtCommissioned.subdivision1=true;
          vm.assetMgmtCommissioned.section1 =true;
          vm.modelArray[1]= userDetails.regionId;
          vm.getCircles(vm.assetMgmtCommissioned.regionid);
        }

      if(userDetails.levelName == "DIVISION"){
        vm.assetMgmtCommissioned.region=true;
        vm.assetMgmtCommissioned.circle=true;
        vm.assetMgmtCommissioned.division=true;
        vm.assetMgmtCommissioned.regionName=userDetails.region;
        vm.assetMgmtCommissioned.circleName=userDetails.circle;
        vm.assetMgmtCommissioned.divisionName= userDetails.hierarchyName;
        vm.assetMgmtCommissioned.divisionid=userDetails.hierarchyId;
        vm.assetMgmtCommissioned.subdivision1=true;
        vm.assetMgmtCommissioned.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.getSubDivisions(vm.assetMgmtCommissioned.divisionid);
      }

      if(userDetails.levelName == "CIRCLE"){
        vm.assetMgmtCommissioned.region=true;
        vm.assetMgmtCommissioned.circle=true;
        vm.assetMgmtCommissioned.regionName=userDetails.region;
        vm.assetMgmtCommissioned.circleName= userDetails.hierarchyName;
        vm.assetMgmtCommissioned.circleid=userDetails.hierarchyId;
        vm.assetMgmtCommissioned.division1=true;
        vm.assetMgmtCommissioned.subdivision1=true;
        vm.assetMgmtCommissioned.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.getDivision(vm.assetMgmtCommissioned.circleid);
      }

      if(userDetails.levelName == "DISCOM"){
          vm.assetMgmtCommissioned.regionName=userDetails.region;
          vm.assetMgmtCommissioned.discom= userDetails.hierarchyName;
          vm.assetMgmtCommissioned.discomid=userDetails.hierarchyId;
          vm.assetMgmtCommissioned.region1=true;
          vm.assetMgmtCommissioned.circle1=true;
          vm.assetMgmtCommissioned.division1=true;
          vm.assetMgmtCommissioned.subdivision1=true;
          vm.assetMgmtCommissioned.section1 =true;
          vm.modelArray[0]= userDetails.hierarchyId;
          vm.getRegions(vm.assetMgmtCommissioned.discomid);
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





     vm.assetMgmtCommissionedSubmit = function(){
       if (validateassetMgmtCommissioned()) {
      vm.assetMgmtCommissioned.progressShow=true;
       data.modelArray = vm.modelArray;
       vm.assetCommissioned.fromdate1 = splitDate(vm.assetCommissioned.fromdate);
       vm.assetCommissioned.todate1 = splitDate(vm.assetCommissioned.todate);
       data.fromDate = splitDate(vm.assetCommissioned.fromdate);
       data.toDate = splitDate(vm.assetCommissioned.todate);
       console.log(data);
       $http({
         method : "POST",
         url : hierarchy + "mdm/reports/assetManage/commissioned-meter",
         data: data
       }).then(function mySuccess(response) {
         vm.assetMgmtCommissioned.progressShow=false;
         console.log(response);
         console.log(response.data.statistics);
         vm.assetMgmtCommissioned.dataList = response.data.statistics;
         vm.assetMgmtCommissioned.inputShow = false;
         vm.assetCommissioned.showReport = true;
       }, function myError(response) {
           console.log(response);
       });
     }

     }

     function validateassetMgmtCommissioned() {
       if(vm.assetCommissioned.fromdate === undefined || vm.assetCommissioned.todate===undefined ){
        //vm.errorToast("Please Select All Fields.");
        MessageInfo.showMessage(7002, '', '', '');
         return false;
      }
      if(vm.assetCommissioned.fromdate > vm.assetCommissioned.todate){
        //vm.errorToast("Please Select All Fields.");
          MessageInfo.showMessage(1008, 'From Year', 'To Year', '');
         return false;
      }
      return true;
     }
    }
})();
