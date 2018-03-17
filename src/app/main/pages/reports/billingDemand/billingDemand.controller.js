(function ()
{
    'use strict';

    angular
        .module('app.billingDemand')
        .controller('BillingDemandController',BillingDemandController);

    /** @ngInject */
    function BillingDemandController($http, baseUrl2, $localStorage, hierarchy,MessageInfo,Clear)
    {
      var vm = this;

      vm.Clear = Clear;
      vm.billingDemand={};
      vm.billDemand = {};
      vm.billDemand.showtabledata =  false;
      vm.billingDemand.progressShow = false;
      vm.billingDemand.inputShow = true;
      vm.billDemand.showReport = false;
      vm.dtOptions = {
                  dom       : '<"top"f>rt<"bottom"<"left"<"length"l><"pagination"p>><"right"<"info"i><"pagination"p>>>',
                  pagingType: 'simple',
                  autoWidth : false,
                  responsive: true
                }
      vm.billingDemand.region=false;
      vm.billingDemand.region1=false;

      vm.dynamicShow=function (){
        vm.billingDemand.inputShow=true;
        vm.billingDemand.showReport=false;
      }

      var data = {};
      var userDetails = {};
      console.log("In billingDemandController");
      var modelArray = [null, null, null, null, null, null];
      vm.modelArray = modelArray;
      var currentUser = $localStorage.globals;
      userDetails = currentUser.currentUser;
      console.log(userDetails);
      vm.billingDemand.discom = userDetails.discom;
      vm.billingDemand.discomid = userDetails.discomId;
      vm.modelArray[0]= vm.billingDemand.discomid;
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
        if(vm.billDemand.fyear==currDate.getFullYear()) {
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
        if(vm.billDemand.tyear==currDate.getFullYear()) {
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
            vm.billingDemand.regions = response.data;
            console.log(vm.billingDemand.regions);
             vm.getMeters();
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
            vm.billingDemand.circles = response.data;
            console.log(vm.billingDemand.circles);
             vm.getMeters();
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
            vm.billingDemand.divisions = response.data;
            console.log(vm.billingDemand.divisions);
             vm.getMeters();
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
            vm.billingDemand.subdivisions = response.data;
             vm.getMeters();
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
            vm.billingDemand.sections = response.data;
            console.log(response.data);
            console.log(vm.billingDemand.sections);
            vm.getMeters();
        }, function myError(response) {
            console.log(response);
        });
      }



      if(userDetails.levelName == "SUB-DIVISION"){
        vm.billingDemand.region=true;
        vm.billingDemand.circle=true;
        vm.billingDemand.division=true;
        vm.billingDemand.subdivision=true;
        //vm.billingDemand.discom = userDetails.discom;
        vm.billingDemand.regionName=userDetails.region;
        vm.billingDemand.circleName=userDetails.circle;
        vm.billingDemand.divisionName= userDetails.division;
        vm.billingDemand.subdivisionName=userDetails.hierarchyName;
        vm.billingDemand.subdivisionid = userDetails.hierarchyId;
        vm.billingDemand.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.modelArray[3] = userDetails.divisionId;
        vm.getSections(vm.billingDemand.subdivisionid);
      }

      if(userDetails.levelName == "REGION"){
          vm.billingDemand.region=true;
          vm.billingDemand.regionName= userDetails.hierarchyName;
          vm.billingDemand.regionid=userDetails.hierarchyId;
          vm.billingDemand.circle1=true;
          vm.billingDemand.division1=true;
          vm.billingDemand.subdivision1=true;
          vm.billingDemand.section1 =true;
          vm.modelArray[1]= userDetails.regionId;
          vm.getCircles(vm.billingDemand.regionid);
        }

      if(userDetails.levelName == "DIVISION"){
        vm.billingDemand.region=true;
        vm.billingDemand.circle=true;
        vm.billingDemand.division=true;
        vm.billingDemand.regionName=userDetails.region;
        vm.billingDemand.circleName=userDetails.circle;
        vm.billingDemand.divisionName= userDetails.hierarchyName;
        vm.billingDemand.divisionid=userDetails.hierarchyId;
        vm.billingDemand.subdivision1=true;
        vm.billingDemand.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.getSubDivisions(vm.billingDemand.divisionid);
      }

      if(userDetails.levelName == "CIRCLE"){
        vm.billingDemand.region=true;
        vm.billingDemand.circle=true;
        vm.billingDemand.regionName=userDetails.region;
        vm.billingDemand.circleName= userDetails.hierarchyName;
        vm.billingDemand.circleid=userDetails.hierarchyId;
        vm.billingDemand.division1=true;
        vm.billingDemand.subdivision1=true;
        vm.billingDemand.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.getDivision(vm.billingDemand.circleid);
      }

      if(userDetails.levelName == "DISCOM"){
          vm.billingDemand.regionName=userDetails.region;
          vm.billingDemand.discom= userDetails.hierarchyName;
          vm.billingDemand.discomid=userDetails.hierarchyId;
          vm.billingDemand.region1=true;
          vm.billingDemand.circle1=true;
          vm.billingDemand.division1=true;
          vm.billingDemand.subdivision1=true;
          vm.billingDemand.section1 =true;
          vm.modelArray[0]= userDetails.hierarchyId;
          vm.getRegions(vm.billingDemand.discomid);
     }


     vm.getMeters = function(item) {
       if(item != null){
         vm.modelArray[5] = Number(item);
       }
       data.modelArray = vm.modelArray;
       console.log(data.modelArray);
       $http({
         method : "POST",
         url : hierarchy + "mdm/reports/mtr-number",
         data: data
       }).then(function mySuccess(response) {
         console.log(response);
           vm.billingDemand.meters = response.data;
           console.log(vm.billingDemand.meters);
       }, function myError(response) {
           console.log(response);
       });
     }
     vm.getMeters();






     vm.billingDemandSubmit = function(){
       if (vm.billDemand.fmonth != undefined) {
         vm.fromMonth = JSON.parse(vm.billDemand.fmonth);
       }
       if (vm.billDemand.tmonth != undefined) {
         vm.toMonth  = JSON.parse(vm.billDemand.tmonth);
       }
       if (validatebillingDemand()) {
         vm.billingDemand.progressShow=true;
         data.modelArray = vm.modelArray;
         data.mtrNo = vm.billDemand.mtrNo.mtrNo;
         data.fromDate = vm.billDemand.fyear+"-"+vm.fromMonth.value;
         data.toDate = vm.billDemand.tyear+"-"+vm.toMonth.value;
         console.log(data);
         $http({
           method : "POST",
           url : hierarchy + "mdm/reports/billing-demand",
           data: data
         }).then(function mySuccess(response) {
           vm.billingDemand.progressShow=false;
           console.log(response);
           console.log(response.data.statistics.demandList);
           vm.billingDemand.dataList = response.data.statistics.demandList;
           vm.billingDemand.inputShow = false;
           vm.billDemand.showReport = true;
         }, function myError(response) {
             console.log(response);
         });
       }
     }


     function validatebillingDemand() {
       console.log(vm.billDemand);
       var fromYear;
       var toYear;
       var fromMonth;
       var toMonth;
       console.log(Object.keys(vm.billDemand).length);
       if (vm.billDemand.mtrNo == null || vm.billDemand.mtrNo == undefined) {
         MessageInfo.showMessage(1017, 'Meter No', '', '');
          return false;
       }
       if (Object.keys(vm.billDemand).length > 4) {
         fromYear = Number(vm.billDemand.fyear);
         toYear = Number(vm.billDemand.tyear);
         fromMonth = Number(vm.fromMonth.value);
         toMonth = Number(vm.toMonth.value);
       }

       if(vm.billDemand.fmonth === undefined || vm.billDemand.fyear===undefined || vm.billDemand.tmonth===undefined || vm.billDemand.tyear===undefined){
         MessageInfo.showMessage(7002, '', '', '');
          return false;
       }
       if(toYear < fromYear){
          MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
          return false;
       }
       if((fromYear == toYear) && (fromMonth > toMonth) ){
          MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
          return false;
       }
       return true;
     }


    }
})();
