(function ()
{
    'use strict';

    angular
        .module('app.installed')
        .controller('InstalledController',InstalledController);

    /** @ngInject */
    function InstalledController($http, $localStorage, hierarchy, MessageInfo, Clear)
    {
      var vm = this;
      vm.Clear = Clear
      vm.installedReport = {};

      vm.progressShow = false;

      vm.dtOptions = {
                  dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                  pagingType: 'simple',
                  autoWidth : false,
                  responsive: true
                }

      vm.installed={};
      vm.installed.showReport = false;
      vm.installed.inputShow = true;
      vm.installed.region=false;
      vm.installed.region1=false;

      vm.dynamicShow=function (){
        vm.installed.inputShow=true;
        vm.installed.showReport=false;
      }

      var data = {};
      var userDetails = {};
      console.log("In installedController");
      var modelArray = [null, null, null, null, null, null];
      vm.modelArray = modelArray;
      var currentUser = $localStorage.globals;
      userDetails = currentUser.currentUser;
      console.log(userDetails);
      vm.installed.discom = userDetails.discom;
      vm.installed.discomid = userDetails.discomId;
      vm.modelArray[0]= vm.installed.discomid;
      console.log(vm.modelArray);
      console.log(vm.installed.discom);

      vm.installed.metersCount1 = [{instaCount : 200,commuCount : 200,commiCount : 200}];


      //regions
      vm.getRegions = function() {
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/"+vm.installed.discomid
        }).then(function mySuccess(response) {
          console.log(response);
            vm.installed.regions = response.data;
            console.log(vm.installed.regions);
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
            vm.installed.circles = response.data;
            console.log(vm.installed.circles);
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
            vm.installed.divisions = response.data;
            console.log(vm.installed.divisions);
            //vm.installed.divisionid = vm.installed.divisions[0].name;
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
            vm.installed.subdivisions = response.data;
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
            vm.installed.sections = response.data;
            console.log(response.data);
            console.log(vm.installed.sections);
        }, function myError(response) {
            console.log(response);
        });
      }


      if(userDetails.levelName == "SUB-DIVISION"){
        console.log("In SubDivision");

        vm.installed.region=true;
        vm.installed.circle=true;
        vm.installed.division=true;
        vm.installed.subdivision=true;
        vm.installed.discom = userDetails.discom;
        vm.installed.regionName=userDetails.region;
        vm.installed.circleName=userDetails.circle;
        vm.installed.divisionName= userDetails.division;
        vm.installed.subdivisionName=userDetails.hierarchyName;
        vm.installed.subdivisionid = userDetails.hierarchyId;
        vm.installed.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.modelArray[3] = userDetails.divisionId;
        console.log(vm.installed.discom);
        console.log(vm.installed.regionName);
        vm.getSections(vm.installed.subdivisionid);

      }

      if(userDetails.levelName == "REGION"){
          vm.installed.region=true;
          vm.installed.regionName= userDetails.hierarchyName;
          vm.installed.regionid = userDetails.hierarchyId;
          vm.installed.circle1=true;
          vm.installed.division1=true;
          vm.installed.subdivision1=true;
          vm.installed.section1 =true;
          vm.modelArray[1]= userDetails.regionId;
          vm.getCircles(vm.installed.regionid);
        }

      if(userDetails.levelName == "DIVISION"){
        vm.installed.region=true;
        vm.installed.circle=true;
        vm.installed.division=true;
        vm.installed.regionName=userDetails.region;
        vm.installed.circleName=userDetails.circle;
        vm.installed.divisionName= userDetails.hierarchyName;
        vm.installed.divisionid=userDetails.hierarchyId;
        vm.installed.subdivision1=true;
        vm.installed.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.getSubDivisions(vm.installed.divisionid);
      }

      if(userDetails.levelName == "CIRCLE"){
        vm.installed.region=true;
        vm.installed.circle=true;
        vm.installed.regionName=userDetails.region;
        vm.installed.circleName= userDetails.hierarchyName;
        vm.installed.circleid=userDetails.hierarchyId;
        vm.installed.division1=true;
        vm.installed.subdivision1=true;
        vm.installed.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.getDivision(vm.installed.circleid);
      }

      if(userDetails.levelName == "DISCOM"){
          vm.installed.regionName=userDetails.region;
          vm.installed.discom= userDetails.hierarchyName;
          vm.installed.discomid=userDetails.hierarchyId;
          vm.installed.region1=true;
          vm.installed.circle1=true;
          vm.installed.division1=true;
          vm.installed.subdivision1=true;
          vm.installed.section1 =true;
          vm.modelArray[0]= userDetails.hierarchyId;
          vm.getRegions(vm.installed.discomid);
     }

     vm.setMeter = function (item) {
       console.log(item.mtrNo);
       vm.mtrNo = item.mtrNo;
     }
     //
     vm.getMeters = function (item) {
       if (item != null) {
         vm.modelArray[5] = Number(item);
         console.log(vm.modelArray[5]);
       }

       data.modelArray = vm.modelArray;
       console.log(data.modelArray);
       if (vm.sectionid) {
         data.sectionid = data.sectionid;
       }
       $http({
         method : "POST",
         url : hierarchy + "mdm/reports/mtr-number",
         data: data
       }).then(function mySuccess(response) {
         console.log(response);
           vm.installed.meters = response.data;
           console.log(vm.installed.meters);
       }, function myError(response) {
           console.log(response);
       });

     }


     function validateInstalled() {
       if(vm.installedReport.fromDate === undefined || vm.installedReport.toDate===undefined ){
        //vm.errorToast("Please Select All Fields.");
        MessageInfo.showMessage(7002, '', '', '');
         return false;
      }
      if(vm.installedReport.fromDate > vm.installedReport.toDate){
        //vm.errorToast("Please Select All Fields.");
          MessageInfo.showMessage(1008, 'From Year', 'To Year', '');
         return false;
      }
      return true;
     }


     var splitDate =  function(dt) {
       var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
       var newDt =   dt.getDate() + "-" +  months[dt.getMonth()] + "-" + dt.getFullYear() + "";
       console.log(newDt);
       return newDt;
     }


     vm.installedSubmit = function() {
       if (validateInstalled(vm.installedReport)) {
         vm.progressShow = true;
         if (vm.installed.sectionid != null) {
           vm.modelArray[5] = Number(vm.installed.sectionid);
           console.log(vm.modelArray[5]);
         }
         var fromDate = splitDate(vm.installedReport.fromDate);
         var toDate = splitDate(vm.installedReport.toDate);
         console.log(fromDate);
         data.fromDate = fromDate;
         data.toDate = toDate;
         data.modelArray = vm.modelArray;
         console.log(data.modelArray);
         $http({
           method : "POST",
           url : hierarchy + "mdm/reports/assetManage/installed-meter",
           data: data
         }).then(function mySuccess(response) {
           vm.progressShow = false;
           console.log(response);
             vm.installed.metersCount = response.data.statistics;
            // vm.installed.metersCount1 = [{instaCount : 200,commuCount : 200,commiCount : 200}];
             vm.installed.showReport = true;
             vm.installed.inputShow = false;
             console.log(vm.installed.metersCount);
             console.log(vm.installed.meters[0].cumEngKvah);
         }, function myError(response) {
             console.log(response);
         });
       }
     }
    //  vm.getMeters(userDetails.hierarchyId);


    }

})();
