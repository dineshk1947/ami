(function ()
{
    'use strict';

    angular
        .module('app.billingConsumption')
        .controller('BillingConsumptionController',BillingConsumptionController);

    /** @ngInject */
    function BillingConsumptionController($http, baseUrl2, $localStorage, hierarchy,MessageInfo,Clear)
    {
      var vm = this;
      vm.Clear = Clear;
      vm.billingConsumption={};
      vm.billConsumption = {};
      vm.billingTable = false;
      vm.billingConsumption.progressShow = false;

      vm.dtOptions = {
                  dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                  pagingType: 'simple',
                  autoWidth : false,
                  responsive: true
                }

      vm.billingConsumption.region=false;
      vm.billingConsumption.region1=false;
      var data = {};
      var userDetails = {};
      console.log("In BillingConsumptionController");
      var modelArray = [null, null, null, null, null, null];
      vm.modelArray = modelArray;
      var currentUser = $localStorage.globals;
      userDetails = currentUser.currentUser;
      console.log(userDetails);
      vm.billingConsumption.discom = userDetails.discom;
      vm.billingConsumption.discomid = userDetails.discomId;
      vm.modelArray[0]= vm.billingConsumption.discomid;
      console.log(vm.modelArray);

      var dt = new Date();
      vm.currentYear = dt.getFullYear();
      vm.pastYear1 = vm.currentYear - 1;
      vm.pastYear2 = vm.currentYear - 2;


      vm.fmonthDisable= true;
      vm.tmonthDisable= true;
      var currDate= new Date();
      var monthArr = [
        {'month':"January",'value':"01"},
        {'month':"February",'value':"02"},
        {'month':"March",'value':"03"},
        {'month':"April",'value':"04"},
        {'month':"May",'value':"05"},
        {'month':"June",'value':"06"},
        {'month':"July",'value':"07"},
        {'month':"August",'value':"08"},
        {'month':"September",'value':"09"},
        {'month':"October",'value':"10"},
        {'month':"November",'value':"11"},
        {'month':"December",'value':"12"}
      ];

      var monthArr2 = [
        {'month':"January",'value':"01"},
        {'month':"February",'value':"02"},
        {'month':"March",'value':"03"},
        {'month':"April",'value':"04"},
        {'month':"May",'value':"05"},
        {'month':"June",'value':"06"},
        {'month':"July",'value':"07"},
        {'month':"August",'value':"08"},
        {'month':"September",'value':"09"},
        {'month':"October",'value':"10"},
        {'month':"November",'value':"11"},
        {'month':"December",'value':"12"}
      ];

      //currDate=splitDate(currDate); //30-Jan-2018
      vm.getMonth = function() {
        // alert("hi");
      vm.fmonthDisable= false;
      vm.fmonth = monthArr;
        if(vm.billConsumption.fyear==currDate.getFullYear()) {
          vm.fmonth = [];
          for (var i = 0; i <= currDate.getMonth(); i++) {
            vm.fmonth[i] = monthArr[i];
          }
        }
        console.log(vm.fmonth);
      }

      vm.getMonth2 = function() {
      vm.tmonthDisable= false;
      vm.tmonth = monthArr2;
        if(vm.billConsumption.tyear==currDate.getFullYear()) {
          vm.tmonth = [];
          for (var i = 0; i <= currDate.getMonth(); i++) {
            vm.tmonth[i] = monthArr2[i];
          }
        }
        console.log(vm.tmonth);
      }

      //regions
      vm.getRegions = function(item) {
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/"+item
        }).then(function mySuccess(response) {
          console.log(response);
            vm.billingConsumption.regions = response.data;
            console.log(vm.billingConsumption.regions);
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
            vm.billingConsumption.circles = response.data;
            console.log(vm.billingConsumption.circles);
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
            vm.billingConsumption.divisions = response.data;
            console.log(vm.billingConsumption.divisions);
            //vm.billingDemand.divisionid = vm.billingDemand.divisions[0].name;
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
            vm.billingConsumption.subdivisions = response.data;
        }, function myError(response) {
            console.log(response);
        });
      }

      //sections
      vm.getSections = function(item) {
        console.log("SubDivisionID");
        console.log(vm.billingConsumption.subdivisionid);
        vm.modelArray[4] = Number(item);
        for (var i = 5; i < vm.modelArray.length; i++) {
          vm.modelArray[i] = null;
        }
        console.log(vm.modelArray);
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/" + item
        }).then(function mySuccess(response) {
            vm.billingConsumption.sections = response.data;
            console.log(response.data);
            console.log(vm.billingConsumption.sections);
        }, function myError(response) {
            console.log(response);
        });
      }

      //substations
      vm.getSubStations = function(item) {
        console.log("SectionID");
        console.log(item);
        vm.modelArray[5] = Number(item);
        for (var i = 6; i < vm.modelArray.length; i++) {
          vm.modelArray[i] = null;
        }
        console.log(vm.modelArray);
        $http({
            method : "GET",
            url : hierarchy +"mdm/substation/"+item
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.billingConsumption.substations = response.data;
            console.log(vm.billingConsumption.substations);
        }, function myError(response) {
            console.log(response);
        });
      }



      if(userDetails.levelName == "SUB-DIVISION"){
        vm.billingConsumption.region=true;
        vm.billingConsumption.circle=true;
        vm.billingConsumption.division=true;
        vm.billingConsumption.subdivision=true;
        vm.billingConsumption.discom = userDetails.discom;
        vm.billingConsumption.regionName=userDetails.region;
        vm.billingConsumption.circleName=userDetails.circle;
        vm.billingConsumption.divisionName= userDetails.division;
        vm.billingConsumption.subdivisionName=userDetails.hierarchyName;
        vm.billingConsumption.subdivisionid = userDetails.hierarchyId;
        vm.billingConsumption.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.modelArray[3] = userDetails.divisionId;
        vm.getSections(vm.billingConsumption.subdivisionid);
      }

      if(userDetails.levelName == "REGION"){
          vm.billingConsumption.region=true;
          vm.billingConsumption.regionName= userDetails.hierarchyName;
          vm.billingConsumption.regionid=userDetails.hierarchyId;
          vm.billingConsumption.circle1=true;
          vm.billingConsumption.division1=true;
          vm.billingConsumption.subdivision1=true;
          vm.billingConsumption.section1 =true;
          vm.modelArray[1]= userDetails.regionId;
          vm.getCircles(vm.billingConsumption.regionid);
        }

      if(userDetails.levelName == "DIVISION"){
        vm.billingConsumption.region=true;
        vm.billingConsumption.circle=true;
        vm.billingConsumption.division=true;
        vm.billingConsumption.regionName=userDetails.region;
        vm.billingConsumption.circleName=userDetails.circle;
        vm.billingConsumption.divisionName= userDetails.hierarchyName;
        vm.billingConsumption.divisionid=userDetails.hierarchyId;
        vm.billingConsumption.subdivision1=true;
        vm.billingConsumption.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.getSubDivisions(vm.billingConsumption.divisionid);
      }

      if(userDetails.levelName == "CIRCLE"){
        vm.billingConsumption.region=true;
        vm.billingConsumption.circle=true;
        vm.billingConsumption.regionName=userDetails.region;
        vm.billingConsumption.circleName= userDetails.hierarchyName;
        vm.billingConsumption.circleid=userDetails.hierarchyId;
        vm.billingConsumption.division1=true;
        vm.billingConsumption.subdivision1=true;
        vm.billingConsumption.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.getDivision(vm.billingConsumption.circleid);
      }

      if(userDetails.levelName == "DISCOM"){
          vm.billingConsumption.regionName=userDetails.region;
          vm.billingConsumption.discom= userDetails.hierarchyName;
          vm.billingConsumption.discomid=userDetails.hierarchyId;
          vm.billingConsumption.region1=true;
          vm.billingConsumption.circle1=true;
          vm.billingConsumption.division1=true;
          vm.billingConsumption.subdivision1=true;
          vm.billingConsumption.section1 =true;
          vm.modelArray[0]= userDetails.hierarchyId;
          vm.getRegions(vm.billingConsumption.discomid);
     }


     vm.getMeters = function(item) {
       if(item != null){
         vm.modelArray[5]= Number(item);
       }
       data.modelArray = vm.modelArray;
       console.log(data.modelArray);
       $http({
         method : "POST",
         url : hierarchy + "mdm/reports/mtr-number",
         data: data
       }).then(function mySuccess(response) {
         console.log(response);
           vm.billingConsumption.meters = response.data;
           console.log(vm.billingConsumption.meters);
       }, function myError(response) {
           console.log(response);
       });
     }
     vm.getMeters();


     function validatebillingConsumption(){
       console.log(vm.billConsumption.selectedItem);
       if(vm.billConsumption.fmonth === undefined || vm.billConsumption.fyear===undefined || vm.billConsumption.tmonth===undefined || vm.billConsumption.tyear===undefined || vm.billConsumption.selectedItem == undefined){
         //vm.errorToast("Please Select All Fields.");
         MessageInfo.showMessage(1017, 'Dates and Meter', '', '');
          return false;
       }
       if((vm.billConsumption.fyear == vm.billConsumption.tyear) && (vm.billConsumption.fmonth > vm.billConsumption.tmonth) ){
         //vm.errorToast("From Date Cannot be Less Than To Date");
          MessageInfo.showMessage(1008, 'From Month', 'To Month', '');
          return false;
       }
       if( vm.billConsumption.tyear < vm.billConsumption.fyear  ){
         //vm.errorToast("From Date Cannot be Less Than To Date");
          MessageInfo.showMessage(1008, 'From Year', 'To Year', '');
          return false;
       }
       return true;
     }


     vm.billingConsumptionSubmit = function(){
       if (validatebillingConsumption()) {
       vm.billingConsumption.progressShow = true;
       vm.frommonth = JSON.parse(vm.billConsumption.fmonth);
       vm.tomonth = JSON.parse(vm.billConsumption.tmonth);
       data.fromDate = vm.billConsumption.fyear+"-"+vm.frommonth.value;
       data.toDate = vm.billConsumption.tyear+"-"+vm.tomonth.value;
       data.modelArray = vm.modelArray;
       console.log(data.modelArray);
       data.mtrNo = vm.billConsumption.selectedItem.mtrNo;
       console.log(vm.billConsumption.selectedItem.mtrNo);
       console.log(data);
       $http({
         method : "POST",
         url : baseUrl2 + "mdm/reports/billing-consumption",
         data: data
       }).then(function mySuccess(response) {
         console.log(response);
         console.log(response.data.statistics.energyList[0].feeder);
         vm.billingConsumption.energyList = response.data.statistics.energyList;
         console.log(vm.billingConsumption.energyList);
         vm.billingConsumption.progressShow = false;
         vm.billingTable = true;
        //  vm.billingConsumption.feeder=response.data.statistics.energyList[0].feeder;
       }, function myError(response) {
         //vm.errorToast("Something went wrong.. Please try again");
          MessageInfo.showMessage(1010, '', '', '');
         console.log(response);
       });
     }
     }


    }
})();
