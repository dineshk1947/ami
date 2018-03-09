(function ()
{
    'use strict';

    angular
        .module('app.billingEnergy')
        .controller('BillingEnergyController',BillingEnergyController);

    /** @ngInject */
    function BillingEnergyController($http,$localStorage,hierarchy,MessageInfo, Clear)
    {
      var vm = this;
      vm.Clear = Clear;
      vm.progressShow = false;

      vm.dtOptions = {
                  dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                  pagingType: 'simple',
                  autoWidth : false,
                  responsive: true
                }
      vm.billingEnergy={};
      vm.billEnergy = {};
      vm.billEnergy.showReport = false;
      vm.progressShow = false;
      vm.billingEnergy.region=false;
      vm.billingEnergy.region1=false;
      var data = {};
      var userDetails = {};
      console.log("In BillingEnergyController");
      var modelArray = [null, null, null, null, null, null];
      vm.modelArray = modelArray;
      var currentUser = $localStorage.globals;
      userDetails = currentUser.currentUser;
      console.log(userDetails);
      vm.billingEnergy.discom = userDetails.discom;
      vm.billingEnergy.discomid = userDetails.discomId;
      vm.modelArray[0]= vm.billingEnergy.discomid;
      console.log(vm.modelArray);
      console.log(vm.billingEnergy.discom);


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
        if(vm.billEnergy.fyear==currDate.getFullYear()) {
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
        if(vm.billEnergy.tyear==currDate.getFullYear()) {
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
            vm.billingEnergy.regions = response.data;
            console.log(vm.billingEnergy.regions);
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
            vm.billingEnergy.circles = response.data;
            console.log(vm.billingEnergy.circles);
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
            vm.billingEnergy.divisions = response.data;
            console.log(vm.billingEnergy.divisions);
            //vm.billingEnergy.divisionid = vm.billingEnergy.divisions[0].name;
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
            vm.billingEnergy.subdivisions = response.data;
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
            vm.billingEnergy.sections = response.data;
            console.log(response.data);
            console.log(vm.billingEnergy.sections);
        }, function myError(response) {
            console.log(response);
        });
      }


      if(userDetails.levelName == "SUB-DIVISION"){
        console.log("In SubDivision");

        vm.billingEnergy.region=true;
        vm.billingEnergy.circle=true;
        vm.billingEnergy.division=true;
        vm.billingEnergy.subdivision=true;
        vm.billingEnergy.discom = userDetails.discom;
        vm.billingEnergy.regionName=userDetails.region;
        vm.billingEnergy.circleName=userDetails.circle;
        vm.billingEnergy.divisionName= userDetails.division;
        vm.billingEnergy.subdivisionName=userDetails.hierarchyName;
        vm.billingEnergy.subdivisionid = userDetails.hierarchyId;
        vm.billingEnergy.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.modelArray[3] = userDetails.divisionId;
        console.log(vm.billingEnergy.discom);
        console.log(vm.billingEnergy.regionName);
        vm.getSections(vm.billingEnergy.subdivisionid);

      }

      if(userDetails.levelName == "REGION"){
          vm.billingEnergy.region=true;
          vm.billingEnergy.regionName= userDetails.hierarchyName;
          vm.billingEnergy.regionid=userDetails.hierarchyId;
          vm.billingEnergy.circle1=true;
          vm.billingEnergy.division1=true;
          vm.billingEnergy.subdivision1=true;
          vm.billingEnergy.section1 =true;
          vm.modelArray[1]= userDetails.regionId;
          vm.getCircles(vm.billingEnergy.regionid);
        }

      if(userDetails.levelName == "DIVISION"){
        vm.billingEnergy.region=true;
        vm.billingEnergy.circle=true;
        vm.billingEnergy.division=true;
        vm.billingEnergy.regionName=userDetails.region;
        vm.billingEnergy.circleName=userDetails.circle;
        vm.billingEnergy.divisionName= userDetails.hierarchyName;
        vm.billingEnergy.divisionid=userDetails.hierarchyId;
        vm.billingEnergy.subdivision1=true;
        vm.billingEnergy.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.getSubDivisions(vm.billingEnergy.divisionid);
      }

      if(userDetails.levelName == "CIRCLE"){
        vm.billingEnergy.region=true;
        vm.billingEnergy.circle=true;
        vm.billingEnergy.regionName=userDetails.region;
        vm.billingEnergy.circleName= userDetails.hierarchyName;
        vm.billingEnergy.circleid=userDetails.hierarchyId;
        vm.billingEnergy.division1=true;
        vm.billingEnergy.subdivision1=true;
        vm.billingEnergy.section1 =true;
        vm.modelArray[1]= userDetails.regionId;
        vm.getDivision(vm.billingEnergy.circleid);
      }

      if(userDetails.levelName == "DISCOM"){
          vm.billingEnergy.regionName=userDetails.region;
          vm.billingEnergy.discom= userDetails.hierarchyName;
          vm.billingEnergy.discomid=userDetails.hierarchyId;
          vm.billingEnergy.region1=true;
          vm.billingEnergy.circle1=true;
          vm.billingEnergy.division1=true;
          vm.billingEnergy.subdivision1=true;
          vm.billingEnergy.section1 =true;
          vm.modelArray[0]= userDetails.hierarchyId;
          vm.getRegions(vm.billingEnergy.discomid);
     }

     vm.setMeter = function (item) {
       console.log(item.mtrNo);
       vm.mtrNo = item.mtrNo;
     }

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
           vm.billingEnergy.meters = response.data;
           console.log(vm.billingEnergy.meters);
       }, function myError(response) {
           console.log(response);
       });

     }



     function validatebillingEnergy() {
       if(vm.billEnergy.fmonth === undefined || vm.billEnergy.fyear===undefined || vm.billEnergy.tmonth===undefined || vm.billEnergy.tyear===undefined || vm.mtrNo == undefined){
         MessageInfo.showMessage(1017, 'Dates and Meter', '', '');
          return false;
       }
       if((vm.billEnergy.fyear == vm.billEnergy.tyear) && (vm.billEnergy.fmonth > vm.billEnergy.tmonth) ){
         //vm.errorToast("From Date Cannot be Less Than To Date");
          MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
          return false;
       }
       if( vm.billEnergy.tyear < vm.billingEnergy.fyear  ){
         //vm.errorToast("From Date Cannot be Less Than To Date");
          MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
          return false;
       }
       return true;
     }


     vm.billingEnergySubmit = function() {
       if (validatebillingEnergy()) {
       vm.progressShow = true;
       if (vm.billEnergy.sectionid != null) {
         vm.modelArray[5] = Number(vm.billEnergy.sectionid);
         console.log(vm.modelArray[5]);
       }
       console.log(vm.billEnergy.fmonth);
       var fromMonth = JSON.parse(vm.billEnergy.fmonth);
       vm.fromMonth = fromMonth;
       console.log(vm.billEnergy.tmonth);

       var toMonth = JSON.parse(vm.billEnergy.tmonth);
       vm.toMonth = toMonth;
       console.log(vm.toMonth);

       //vm.modelArray[6] = 33053;
       vm.fromDate = vm.billEnergy.fyear + "-" + vm.fromMonth.value;
       vm.toDate = vm.billEnergy.tyear + "-" + vm.toMonth.value;
       console.log(vm.fromDate);
       data.fromDate = vm.fromDate;
       data.toDate = vm.toDate;
       data.modelArray = vm.modelArray;
       data.mtrNumber = vm.mtrNo;
       console.log(vm.mtrNo);
       console.log(data.modelArray);
       $http({
         method : "POST",
         url : hierarchy + "/mdm/reports/billing-energy",
         data: data
       }).then(function mySuccess(response) {
         console.log(response);
         vm.progressShow = false;
           vm.billingEnergy.meters = response.data.statistics.energyList;
           vm.dtr = vm.billingEnergy.meters[0].dtr;
           vm.feeder = vm.billingEnergy.meters[0].feeder;
           vm.substation = vm.billingEnergy.meters[0].substation;
           vm.mtrslno = vm.billingEnergy.meters[0].mtrslno;
           vm.progressShow = false;
           vm.billEnergy.showReport = true;
           console.log(vm.billingEnergy.meters);
           console.log(vm.billingEnergy.meters[0].cumEngKvah);
       }, function myError(response) {
           console.log(response);
       });
     }
     }
     vm.getMeters();








    }
})();
