(function ()
{
    'use strict';

    angular
        .module('app.loadProfile')
        .controller('loadProfileReportsController',loadProfileReportsController);

    /** @ngInject */
    function loadProfileReportsController($http, baseUrl2, $localStorage, hierarchy,MessageInfo,Clear)
    {
      var vm = this;
      vm.showtabledata =  false;
      vm.Clear = Clear;

      vm.dtOptions = {
                  dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                  pagingType: 'simple',
                  autoWidth : false,
                  responsive: true
                }
      vm.loadProfileReport={};
      vm.loadProfile={};

      // vm.loadProfileReport.region=false;
      // vm.loadProfileReport.region1=false;
      vm.loadProfile.showReport=false;
      vm.loadProfileReport.progressShow=false;
      vm.loadProfileReport.inputShow=true;
      vm.currDate=new Date();
      var data = {};
      var userDetails = {};
      var modelArray = [null, null, null, null, null, null,null,null,null];
      vm.modelArray = modelArray;
      var currentUser = $localStorage.globals;
      userDetails = currentUser.currentUser;
      console.log(userDetails);
      vm.loadProfileReport.discom = userDetails.discom;
      vm.loadProfileReport.discomid = userDetails.discomId;
      vm.modelArray[0]= vm.loadProfileReport.discomid;
      console.log(vm.modelArray);

      var dt = new Date();
      vm.currentYear = dt.getFullYear();
      vm.pastYear1 = vm.currentYear - 1;
      vm.pastYear2 = vm.currentYear - 2;

      var splitDate =  function(dt) {
        console.log(dt);
        var x=dt+"";
         var newDt1 = x.split(' ')[2] + "-" + x.split(' ')[1] + "-" + x.split(' ')[3];
         console.log(newDt1);
        return  newDt1;

      }

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
        if(vm.loadProfile.fyear==currDate.getFullYear()) {
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
        if(vm.loadProfile.tyear==currDate.getFullYear()) {
          vm.tmonth = [];
          for (var i = 0; i <= currDate.getMonth(); i++) {
            vm.tmonth[i] = monthArr2[i];
          }
        }
        console.log(vm.tmonth);
      }

      // //regions
      // vm.getRegions = function() {
      //   $http({
      //       method : "GET",
      //       url : hierarchy + "mdm/hierarchy/"+vm.loadProfileReport.discomid
      //   }).then(function mySuccess(response) {
      //     console.log(response);
      //       vm.loadProfileReport.regions = response.data;
      //       console.log(vm.loadProfileReport.regions);
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }
      //
      // // circles
      // vm.getCircles = function() {
      //   console.log(vm.loadProfile.regionid);
      //   console.log("RegionId");
      //   vm.modelArray[1] = Number(vm.loadProfile.regionid);
      //   console.log(vm.modelArray);
      //   $http({
      //       method : "GET",
      //       url : hierarchy + "mdm/hierarchy/"+vm.loadProfile.regionid
      //   }).then(function mySuccess(response) {
      //       vm.loadProfileReport.circles = response.data;
      //       console.log(vm.loadProfileReport.circles);
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }
      //
      // //divisions
      // vm.getDivision = function() {
      //   console.log(vm.loadProfile.circleid);
      //   console.log("CircleId");
      //   vm.modelArray[2] = Number(vm.loadProfile.circleid);
      //   for (var i = 3; i < vm.modelArray.length; i++) {
      //     vm.modelArray[i] = null;
      //   }
      //   console.log(vm.modelArray);
      //   $http({
      //       method : "GET",
      //       url : hierarchy + "mdm/hierarchy/"+vm.loadProfile.circleid
      //   }).then(function mySuccess(response) {
      //       vm.loadProfileReport.divisions = response.data;
      //       console.log(vm.loadProfileReport.divisions);
      //       //vm.loadProfileReport.divisionid = vm.loadProfileReport.divisions[0].name;
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }

      //subdivisions
      // vm.getSubDivisions=function(){
      //   console.log(vm.loadProfile.divisionid);
      //   console.log("DivisionID");
      //   vm.modelArray[3] = Number(vm.loadProfile.divisionid);
      //   for (var i = 4; i < vm.modelArray.length; i++) {
      //     vm.modelArray[i] = null;
      //   }
      //   console.log(vm.modelArray);
      //   $http({
      //       method : "GET",
      //       url : hierarchy + "mdm/hierarchy/"+vm.loadProfile.divisionid
      //   }).then(function mySuccess(response) {
      //       console.log(response.data);
      //       vm.loadProfileReport.subdivisions = response.data;
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }
      //
      // //sections
      // vm.getSections = function() {
      //   console.log("SubDivisionID");
      //   console.log(vm.loadProfile.subdivisionid);
      //   vm.modelArray[4] = Number(vm.loadProfile.subdivisionid);
      //   for (var i = 5; i < vm.modelArray.length; i++) {
      //     vm.modelArray[i] = null;
      //   }
      //   console.log(vm.modelArray);
      //   $http({
      //       method : "GET",
      //       url : hierarchy + "mdm/hierarchy/" + vm.loadProfile.subdivisionid
      //   }).then(function mySuccess(response) {
      //       vm.loadProfileReport.sections = response.data;
      //       console.log(response.data);
      //       console.log(vm.loadProfileReport.sections);
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }

      //substations
      // vm.getSubStations = function() {
      //   console.log("SectionID");
      //   console.log(vm.loadProfileReport.sectionid);
      //   vm.modelArray[5] = Number(vm.loadProfileReport.sectionid);
      //   for (var i = 6; i < vm.modelArray.length; i++) {
      //     vm.modelArray[i] = null;
      //   }
      //   console.log(vm.modelArray);
      //   $http({
      //       method : "GET",
      //       url : hierarchy +"mdm/substation/"+vm.loadProfileReport.sectionid
      //   }).then(function mySuccess(response) {
      //       console.log(response.data);
      //       vm.loadProfileReport.substations = response.data;
      //       console.log(vm.loadProfileReport.substations);
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }

      //feders
      vm.getFeeder = function() {
        console.log("SubstationID");
        console.log(vm.loadProfile.substationid);
        vm.modelArray[6] = Number(vm.loadProfile.substationid);
        for (var i = 7; i < vm.modelArray.length; i++) {
          vm.modelArray[i] = null;
        }
        console.log("hi");

        console.log(vm.modelArray);
        $http({
            method : "GET",
            url: hierarchy + "mdm/load-feeder/" + vm.loadProfile.substationid

            //url : hierarchy + "mdm/feeder/" + vm.loadProfileReport.substationid
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.loadProfileReport.meters = {};
            vm.getMeters();
            vm.loadProfileReport.feeders = response.data;
        }, function myError(response) {
            console.log(response);
        });
      }

      //dtrs
      vm.getDtr = function() {
        console.log("FeederID");
        console.log(vm.loadProfile.feederid);
        vm.modelArray[7] = Number(vm.loadProfile.feederid);
        for (var i = 8; i < vm.modelArray.length; i++) {
          vm.modelArray[i] = null;
        }
        console.log(vm.modelArray);
        $http({
            method : "GET",
            // url : hierarchy + "mdm/dtr/" + vm.loadProfileReport.feederid
            url: hierarchy + "mdm/load-dtr/" +vm.loadProfile.feederid
        }).then(function mySuccess(response) {
          console.log("dtr");
            console.log(response.data);
            vm.loadProfileReport.meters = {};
            vm.getMeters();
            vm.loadProfileReport.dtrs = response.data;

        }, function myError(response) {
          console.log("dtr");
            console.log(response);
        });
      }


      if(userDetails.levelName == "SUB-DIVISION"){
        // vm.loadProfileReport.region=true;
        // vm.loadProfileReport.circle=true;
        // vm.loadProfileReport.division=true;
        // vm.loadProfileReport.subdivision=true;
        vm.loadProfileReport.discom = userDetails.discom;
        vm.loadProfileReport.regionName=userDetails.region;
        vm.loadProfileReport.circleName=userDetails.circle;
        vm.loadProfileReport.divisionName= userDetails.division;
        vm.loadProfileReport.subdivisionName=userDetails.hierarchyName;
        vm.loadProfileReport.subdivisionid = userDetails.hierarchyId;
        // vm.loadProfileReport.section1 =true;
        // vm.loadProfileReport.substation1=true;
        // vm.loadProfileReport.feeder1= true;
        // vm.loadProfileReport.dtr1=true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.modelArray[3] = userDetails.divisionId;
        //vm.getSections();
      }

      if(userDetails.levelName == "REGION"){
          //vm.loadProfileReport.region=true;
          vm.loadProfileReport.regionName= userDetails.hierarchyName;
          vm.loadProfileReport.regionid=userDetails.hierarchyId;
          // vm.loadProfileReport.circle1=true;
          // vm.loadProfileReport.division1=true;
          // vm.loadProfileReport.subdivision1=true;
          // vm.loadProfileReport.section1 =true;
          // vm.loadProfileReport.substation1=true;
          // vm.loadProfileReport.feeder1= true;
          // vm.loadProfileReport.dtr1=true;
          //vm.modelArray[0]= userDetails.regionId;
        //  vm.getCircles();
        }

      if(userDetails.levelName == "DIVISION"){
        // vm.loadProfileReport.region=true;
        // vm.loadProfileReport.circle=true;
        // vm.loadProfileReport.division=true;
        vm.loadProfileReport.regionName=userDetails.region;
        vm.loadProfileReport.circleName=userDetails.circle;
        vm.loadProfileReport.divisionName= userDetails.hierarchyName;
        vm.loadProfileReport.divisionid=userDetails.hierarchyId;
        // vm.loadProfileReport.subdivision1=true;
        // vm.loadProfileReport.section1 =true;
        // vm.loadProfileReport.substation1=true;
        // vm.loadProfileReport.feeder1= true;
        // vm.loadProfileReport.dtr1=true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
      //  vm.getSubDivisions();
      }

      if(userDetails.levelName == "CIRCLE"){
        // vm.loadProfileReport.region=true;
        // vm.loadProfileReport.circle=true;
        vm.loadProfileReport.regionName=userDetails.region;
        vm.loadProfileReport.circleName= userDetails.hierarchyName;
        vm.loadProfileReport.circleid=userDetails.hierarchyId;
        // vm.loadProfileReport.division1=true;
        // vm.loadProfileReport.subdivision1=true;
        // vm.loadProfileReport.section1 =true;
        // vm.loadProfileReport.substation1=true;
        // vm.loadProfileReport.feeder1= true;
        // vm.loadProfileReport.dtr1=true;
        vm.modelArray[1]= userDetails.regionId;
      //  vm.getDivision();
      }

      if(userDetails.levelName == "DISCOM"){
          vm.loadProfileReport.regionName=userDetails.region;
          vm.loadProfileReport.discom= userDetails.hierarchyName;
          vm.loadProfileReport.discomid=userDetails.hierarchyId;
          // vm.loadProfileReport.region1=true;
          // vm.loadProfileReport.circle1=true;
          // vm.loadProfileReport.division1=true;
          // vm.loadProfileReport.subdivision1=true;
          // vm.loadProfileReport.section1 =true;
          // vm.loadProfileReport.substation1=true;
          // vm.loadProfileReport.feeder1= true;
          // vm.loadProfileReport.dtr1=true;
          vm.modelArray[0]= userDetails.hierarchyId;
          //vm.getRegions();
      }


     vm.getMeters = function() {
       vm.loadProfileReport.meters = {};

       if(vm.loadProfile.dtrid != null){
         vm.modelArray[8] = Number(vm.loadProfile.dtrid);
       }
       data.modelArray = vm.modelArray;
       console.log(data.modelArray);
       $http({
         method : "POST",
         url : hierarchy + "mdm/reports/load-mtr-number",
         data: data
       }).then(function mySuccess(response) {
         console.log(response);
           vm.loadProfileReport.meters = response.data;
           console.log(vm.loadProfileReport.meters);
       }, function myError(response) {
           console.log(response);
       });
     }
     vm.getMeters();

     vm.getSectiondata = function() {

       data.modelArray = vm.modelArray;
       console.log(data.modelArray);
       $http({
         method : "POST",
         url : hierarchy + "mdm/reports/load-subStation-number",
         data: data
       }).then(function mySuccess(response) {
         console.log(response);
           vm.loadProfileReport.substations = response.data;
           console.log(vm.loadProfileReport.substations);
       }, function myError(response) {
           console.log(response);
       });
     }
     vm.getSectiondata();
     vm.changeMtrObj = function(mtr) {
       vm.loadProfile.mtrNo = mtr.mtrNo;
       console.log("In chnage mtr fn");

       console.log("vm.loadProfile.mtrNo",vm.loadProfile.mtrNo);
     }

     function validateeventsIndividual() {
       if(vm.loadProfile.fdate === undefined || vm.loadProfile.todate===undefined){
         //vm.errorToast("Please Select All Fields.");
         MessageInfo.showMessage(7002, '', '', '');
          return false;
       }
       if(vm.loadProfile.fdate > vm.loadProfile.todate){
         //vm.errorToast("From Date Cannot be Less Than To Date");
          MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
          return false;
       }
       if(vm.loadProfile.selectedItem==undefined){
         MessageInfo.showMessage(1017, 'Meter', '', '');
         return false;
       }
       if(vm.loadProfile.substationid === undefined){
         vm.loadProfile.substationid = null;
       }
       if(vm.loadProfile.feederid === undefined){
         vm.loadProfile.feederid = null;
       }
       if(vm.loadProfile.dtrid === undefined){
         vm.loadProfile.dtrid = null;
       }

       return true;
     }

     vm.dynamicShow=function (){
       vm.loadProfileReport.inputShow=true;
       vm.loadProfile.showReport=false;
     }

     vm.loadProfileReportSubmit = function(){
       if (validateeventsIndividual()) {
       vm.loadProfileReport.progressShow=true;
       data.modelArray = vm.modelArray;
       data.mtrNo = vm.loadProfile.mtrNo;
      //  vm.frommonth = JSON.parse(vm.loadProfileReport.fmonth);
      //  vm.tomonth = JSON.parse(vm.loadProfileReport.tmonth);
       data.fromDate = splitDate(vm.loadProfile.fdate);
       data.toDate = splitDate(vm.loadProfile.todate);
       console.log(data);
      //  MessageInfo.showMessage(1005, '', '', '');
       $http({
         method : "POST",
         url : hierarchy + "/mdm/reports/loadProfile",
         data: data
       }).then(function mySuccess(response) {
         console.log("response from DB",response);
         vm.loadProfile.showReport=true;
         vm.loadProfileReport.progressShow=false;
         vm.loadProfileReport.inputShow=false;
         vm.loadProfileData=response.data.statistics.loadProfileList;
         vm.subSationDisplayName=response.data.statistics.loadProfileList[0].substation;
         vm.feederDisplayName=response.data.statistics.loadProfileList[0].feeder;
         vm.dtrDisplayName=response.data.statistics.loadProfileList[0].dtr;
         vm.meterDisplayName=response.data.statistics.loadProfileList[0].mtrslno;
         //console.log("vm.subSationDisplayName",vm.subSationDisplayName);
        //  console.log(response.data.statistics.demandList);
        //  vm.loadProfileReport.dataList = response.data.statistics.demandList;
        //  vm.showtabledata = true;
       }, function myError(response) {
          vm.loadProfileReport.progressShow=false;
          MessageInfo.showMessage(1010, '', '', '');
           console.log(response);
       });
     }

     }

    }
})();
