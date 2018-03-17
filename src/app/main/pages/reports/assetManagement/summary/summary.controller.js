(function ()
{
    'use strict';

    angular
        .module('app.installedCommunicated')
        .controller('SummaryController',SummaryController);

    /** @ngInject */
    function SummaryController($http, baseUrl2, $localStorage, hierarchy,MessageInfo,Clear)
    {
      var vm = this;

      vm.Clear = Clear;
      vm.assetInstCommunicated={};
      vm.assetInstCom = {};
      vm.assetInstCom.showtabledata =  false;
      vm.assetInstCommunicated.progressShow = false;
      vm.assetInstCommunicated.inputShow = true;
      vm.assetInstCom.showReport = false;

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
      vm.assetInstCommunicated.region=false;
      vm.assetInstCommunicated.region1=false;

      vm.dynamicShow=function (){
        vm.assetInstCommunicated.inputShow=true;
        vm.assetInstCommunicated.showReport=false;
      }

      var data = {};
      var userDetails = {};
      console.log("In billingDemandController");
      var modelArray = [null, null, null, null, null, null];
      vm.modelArray = modelArray;
      var currentUser = $localStorage.globals;
      userDetails = currentUser.currentUser;
      console.log(userDetails);
      vm.assetInstCommunicated.discom = userDetails.discom;
      vm.assetInstCommunicated.discomid = userDetails.discomId;
      vm.modelArray[0]= vm.assetInstCommunicated.discomid;
      console.log(vm.modelArray);





      //regions
      vm.getRegions = function(item) {
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/"+item
        }).then(function mySuccess(response) {
          console.log(response);
            vm.assetInstCommunicated.regions = response.data;
            console.log(vm.assetInstCommunicated.regions);
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
            vm.assetInstCommunicated.circles = response.data;
            console.log(vm.assetInstCommunicated.circles);
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
            vm.assetInstCommunicated.divisions = response.data;
            console.log(vm.assetInstCommunicated.divisions);
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
            vm.assetInstCommunicated.subdivisions = response.data;
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
            vm.assetInstCommunicated.sections = response.data;
            console.log(response.data);
            console.log(vm.assetInstCommunicated.sections);
        }, function myError(response) {
            console.log(response);
        });
      }



      if(userDetails.levelName == "SUB-DIVISION"){
        vm.assetInstCommunicated.region=true;
        vm.assetInstCommunicated.circle=true;
        vm.assetInstCommunicated.division=true;
        vm.assetInstCommunicated.subdivision=true;
        vm.assetInstCommunicated.regionName=userDetails.region;
        vm.assetInstCommunicated.circleName=userDetails.circle;
        vm.assetInstCommunicated.divisionName= userDetails.division;
        vm.assetInstCommunicated.subdivisionName=userDetails.hierarchyName;
        vm.assetInstCommunicated.subdivisionid = userDetails.hierarchyId;
        vm.assetInstCommunicated.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.modelArray[3] = userDetails.divisionId;
        vm.getSections(vm.assetInstCommunicated.subdivisionid);
      }

      if(userDetails.levelName == "REGION"){
          vm.assetInstCommunicated.region=true;
          vm.assetInstCommunicated.regionName= userDetails.hierarchyName;
          vm.assetInstCommunicated.regionid=userDetails.hierarchyId;
          vm.assetInstCommunicated.circle1=true;
          vm.assetInstCommunicated.division1=true;
          vm.assetInstCommunicated.subdivision1=true;
          vm.assetInstCommunicated.section1 =true;
          vm.modelArray[1]= userDetails.regionId;
          vm.getCircles(vm.assetInstCommunicated.regionid);
        }

      if(userDetails.levelName == "DIVISION"){
        vm.assetInstCommunicated.region=true;
        vm.assetInstCommunicated.circle=true;
        vm.assetInstCommunicated.division=true;
        vm.assetInstCommunicated.regionName=userDetails.region;
        vm.assetInstCommunicated.circleName=userDetails.circle;
        vm.assetInstCommunicated.divisionName= userDetails.hierarchyName;
        vm.assetInstCommunicated.divisionid=userDetails.hierarchyId;
        vm.assetInstCommunicated.subdivision1=true;
        vm.assetInstCommunicated.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.getSubDivisions(vm.assetInstCommunicated.divisionid);
      }

      if(userDetails.levelName == "CIRCLE"){
        vm.assetInstCommunicated.region=true;
        vm.assetInstCommunicated.circle=true;
        vm.assetInstCommunicated.regionName=userDetails.region;
        vm.assetInstCommunicated.circleName= userDetails.hierarchyName;
        vm.assetInstCommunicated.circleid=userDetails.hierarchyId;
        vm.assetInstCommunicated.division1=true;
        vm.assetInstCommunicated.subdivision1=true;
        vm.assetInstCommunicated.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.getDivision(vm.assetInstCommunicated.circleid);
      }

      if(userDetails.levelName == "DISCOM"){
          vm.assetInstCommunicated.regionName=userDetails.region;
          vm.assetInstCommunicated.discom= userDetails.hierarchyName;
          vm.assetInstCommunicated.discomid=userDetails.hierarchyId;
          vm.assetInstCommunicated.region1=true;
          vm.assetInstCommunicated.circle1=true;
          vm.assetInstCommunicated.division1=true;
          vm.assetInstCommunicated.subdivision1=true;
          vm.assetInstCommunicated.section1 =true;
          vm.modelArray[0]= userDetails.hierarchyId;
          vm.getRegions(vm.assetInstCommunicated.discomid);
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





     vm.assetInstCommunicatedSubmit = function(){
       if (validateassetInstCommunicated()) {
      vm.assetInstCommunicated.progressShow=true;
       data.modelArray = vm.modelArray;
       vm.assetInstCom.fromdate1 = splitDate(vm.assetInstCom.fromdate);
       vm.assetInstCom.todate1 = splitDate(vm.assetInstCom.todate);
       data.fromDate = splitDate(vm.assetInstCom.fromdate);
       data.toDate = splitDate(vm.assetInstCom.todate);
       console.log(data);
       $http({
         method : "POST",
         url : hierarchy + "mdm/reports/assetManage/summary-meter",
         data: data
       }).then(function mySuccess(response) {
         vm.assetInstCommunicated.progressShow=false;
         console.log(response);
         console.log(response.data.statistics);
         var resArr =[];
         resArr[0]  = response.data.statistics;
         vm.assetInstCommunicated.dataList = resArr;
         console.log(vm.assetInstCommunicated.dataList.installedCount);
         vm.assetInstCommunicated.inputShow = false;
         vm.assetInstCom.showReport = true;
       }, function myError(response) {
           console.log(response);
       });
     }

     }

     function validateassetInstCommunicated() {
       if(vm.assetInstCom.fromdate === undefined || vm.assetInstCom.todate===undefined ){
        //vm.errorToast("Please Select All Fields.");
        MessageInfo.showMessage(7002, '', '', '');
         return false;
      }
      if(vm.assetInstCom.fromdate > vm.assetInstCom.todate){
        //vm.errorToast("Please Select All Fields.");
          MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
         return false;
      }
      return true;
     }
    }
})();
