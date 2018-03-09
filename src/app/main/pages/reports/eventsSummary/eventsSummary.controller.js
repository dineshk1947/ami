(function ()
{
    'use strict';

    angular
        .module('app.eventsSummary')
        .controller('EventsSummaryController',EventsSummaryController);

    /** @ngInject */
    function EventsSummaryController($http, baseUrl2, $localStorage, hierarchy,MessageInfo,Clear)
    {
      var vm = this;
      vm.eventsSummary={};
      vm.summary = {};
      vm.summary.showtabledata =  false;
      vm.Clear = Clear;
      vm.eventsSummary.progressShow=false;

      var splitDate =  function(dt) {
        console.log(dt);
        var x=dt+"";
         var newDt1 = x.split(' ')[2] + "-" + x.split(' ')[1] + "-" + x.split(' ')[3];
         console.log(newDt1);
        return  newDt1;

      }

      vm.dtOptions = {
                  dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                  pagingType: 'simple',
                  autoWidth : false,
                  responsive: true
                }

      var data = {};
      var userDetails = {};
      var modelArray = [null, null, null, null, null, null,null,null,null];
      vm.modelArray = modelArray;
      var currentUser = $localStorage.globals;
      userDetails = currentUser.currentUser;
      console.log(userDetails);
      vm.eventsSummary.discom = userDetails.discom;
      vm.eventsSummary.discomid = userDetails.discomId;
      vm.modelArray[0]= vm.eventsSummary.discomid;
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
        if(vm.summary.fyear==currDate.getFullYear()) {
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
        if(vm.summary.tyear==currDate.getFullYear()) {
          vm.tmonth = [];
          for (var i = 0; i <= currDate.getMonth(); i++) {
            vm.tmonth[i] = monthArr2[i];
          }
        }
        console.log(vm.tmonth);
      }

      //regions
      // vm.getRegions = function() {
      //   $http({
      //       method : "GET",
      //       url : hierarchy + "mdm/hierarchy/"+vm.eventsSummary.discomid
      //   }).then(function mySuccess(response) {
      //     console.log(response);
      //       vm.eventsSummary.regions = response.data;
      //       console.log(vm.eventsSummary.regions);
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }
      //
      // // circles
      // vm.getCircles = function() {
      //   console.log(vm.eventsSummary.regionid);
      //   console.log("RegionId");
      //   vm.modelArray[1] = Number(vm.eventsSummary.regionid);
      //   console.log(vm.modelArray);
      //   $http({
      //       method : "GET",
      //       url : hierarchy + "mdm/hierarchy/"+vm.eventsSummary.regionid
      //   }).then(function mySuccess(response) {
      //       vm.eventsSummary.circles = response.data;
      //       console.log(vm.eventsSummary.circles);
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }
      //
      // //divisions
      // vm.getDivision = function() {
      //   console.log(vm.eventsSummary.circleid);
      //   console.log("CircleId");
      //   vm.modelArray[2] = Number(vm.eventsSummary.circleid);
      //   for (var i = 3; i < vm.modelArray.length; i++) {
      //     vm.modelArray[i] = null;
      //   }
      //   console.log(vm.modelArray);
      //   $http({
      //       method : "GET",
      //       url : hierarchy + "mdm/hierarchy/"+vm.eventsSummary.circleid
      //   }).then(function mySuccess(response) {
      //       vm.eventsSummary.divisions = response.data;
      //       console.log(vm.eventsSummary.divisions);
      //       //vm.eventsSummary.divisionid = vm.eventsSummary.divisions[0].name;
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }
      //
      // //subdivisions
      // vm.getSubDivisions=function(){
      //   console.log(vm.eventsSummary.divisionid);
      //   console.log("DivisionID");
      //   vm.modelArray[3] = Number(vm.eventsSummary.divisionid);
      //   for (var i = 4; i < vm.modelArray.length; i++) {
      //     vm.modelArray[i] = null;
      //   }
      //   console.log(vm.modelArray);
      //   $http({
      //       method : "GET",
      //       url : hierarchy + "mdm/hierarchy/"+vm.eventsSummary.divisionid
      //   }).then(function mySuccess(response) {
      //       console.log(response.data);
      //       vm.eventsSummary.subdivisions = response.data;
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }
      //
      // //sections
      // vm.getSections = function() {
      //   console.log("SubDivisionID");
      //   console.log(vm.eventsSummary.subdivisionid);
      //   vm.modelArray[4] = Number(vm.eventsSummary.subdivisionid);
      //   for (var i = 5; i < vm.modelArray.length; i++) {
      //     vm.modelArray[i] = null;
      //   }
      //   console.log(vm.modelArray);
      //   $http({
      //       method : "GET",
      //       url : hierarchy + "mdm/hierarchy/" + vm.eventsSummary.subdivisionid
      //   }).then(function mySuccess(response) {
      //       vm.eventsSummary.sections = response.data;
      //       console.log(response.data);
      //       console.log(vm.eventsSummary.sections);
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }
      //
      // //substations
      // vm.getSubStations = function() {
      //   console.log("SectionID");
      //   console.log(vm.eventsSummary.sectionid);
      //   vm.modelArray[5] = Number(vm.eventsSummary.sectionid);
      //   for (var i = 6; i < vm.modelArray.length; i++) {
      //     vm.modelArray[i] = null;
      //   }
      //   console.log(vm.modelArray);
      //   $http({
      //       method : "GET",
      //       url : hierarchy +"mdm/substation/"+vm.eventsSummary.sectionid
      //   }).then(function mySuccess(response) {
      //       console.log(response.data);
      //       vm.eventsSummary.substations = response.data;
      //       console.log(vm.eventsSummary.substations);
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }


      vm.getSubStations = function() {

        data.modelArray = vm.modelArray;
        console.log(data.modelArray);
        $http({
          method : "POST",
          url : hierarchy + "mdm/reports/load-subStation-number",
          data: data
        }).then(function mySuccess(response) {
          console.log(response);
          vm.getMeters();
            vm.eventsSummary.substations = response.data;
            console.log(vm.eventsSummary.substations);
        }, function myError(response) {
            console.log(response);
        });
      }

      //feders
      vm.getFeeder = function() {
        console.log("SubstationID");
        console.log(vm.summary.substationid);
        vm.modelArray[6] = Number(vm.summary.substationid);
        for (var i = 7; i < vm.modelArray.length; i++) {
          vm.modelArray[i] = null;
        }

        console.log(vm.modelArray);
        $http({
            method : "GET",
            url: hierarchy + "mdm/load-feeder/" +vm.summary.substationid

            //url : hierarchy + "mdm/feeder/" + vm.eventsSummary.substationid
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.eventsSummary.feeders = response.data;
            vm.getMeters();
        }, function myError(response) {
            console.log(response);
        });
      }

      //dtrs
      vm.getDtr = function() {
        console.log("FeederID");
        console.log(vm.summary.feederid);
        vm.modelArray[7] = Number(vm.summary.feederid);
        for (var i = 8; i < vm.modelArray.length; i++) {
          vm.modelArray[i] = null;
        }

        console.log(vm.modelArray);
        $http({
            method : "GET",
            // url : hierarchy + "mdm/dtr/" + vm.eventsSummary.feederid
            url: hierarchy + "mdm/load-dtr/" +vm.summary.feederid
        }).then(function mySuccess(response) {
          console.log("dtr");
            console.log(response.data);
            vm.eventsSummary.dtrs = response.data;
            vm.getMeters();

        }, function myError(response) {
          console.log("dtr");
            console.log(response);
        });
      }


      if(userDetails.levelName == "SUB-DIVISION"){

        vm.eventsSummary.discom = userDetails.discom;
        vm.eventsSummary.regionName=userDetails.region;
        vm.eventsSummary.circleName=userDetails.circle;
        vm.eventsSummary.divisionName= userDetails.division;
        vm.eventsSummary.subdivisionName=userDetails.hierarchyName;
        vm.eventsSummary.subdivisionid = userDetails.hierarchyId;

        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.modelArray[3] = userDetails.divisionId;
        vm.getSubStations();
      }

      if(userDetails.levelName == "REGION"){
          vm.eventsSummary.region=true;
          vm.eventsSummary.regionName= userDetails.hierarchyName;
          vm.eventsSummary.regionid=userDetails.hierarchyId;
          // vm.eventsSummary.circle1=true;
          // vm.eventsSummary.division1=true;
          // vm.eventsSummary.subdivision1=true;
          // vm.eventsSummary.section1 =true;
          // vm.eventsSummary.substation1=true;
          // vm.eventsSummary.feeder1= true;
          // vm.eventsSummary.dtr1=true;
          //vm.modelArray[0]= userDetails.regionId;
          vm.getSubStations();
        }

      if(userDetails.levelName == "DIVISION"){
        // vm.eventsSummary.region=true;
        // vm.eventsSummary.circle=true;
        // vm.eventsSummary.division=true;
        vm.eventsSummary.regionName=userDetails.region;
        vm.eventsSummary.circleName=userDetails.circle;
        vm.eventsSummary.divisionName= userDetails.hierarchyName;
        vm.eventsSummary.divisionid=userDetails.hierarchyId;
        // vm.eventsSummary.subdivision1=true;
        // vm.eventsSummary.section1 =true;
        // vm.eventsSummary.substation1=true;
        // vm.eventsSummary.feeder1= true;
        // vm.eventsSummary.dtr1=true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.getSubStations();
      }

      if(userDetails.levelName == "CIRCLE"){
        vm.eventsSummary.regionName=userDetails.region;
        vm.eventsSummary.circleName= userDetails.hierarchyName;
        vm.eventsSummary.circleid=userDetails.hierarchyId;
        vm.modelArray[1]= userDetails.regionId;
        vm.getSubStations();
      }

      if(userDetails.levelName == "DISCOM"){
          vm.eventsSummary.regionName=userDetails.region;
          vm.eventsSummary.discom= userDetails.hierarchyName;
          vm.eventsSummary.discomid=userDetails.hierarchyId;
          // vm.eventsSummary.region1=true;
          // vm.eventsSummary.circle1=true;
          // vm.eventsSummary.division1=true;
          // vm.eventsSummary.subdivision1=true;
          // vm.eventsSummary.section1 =true;
          // vm.eventsSummary.substation1=true;
          // vm.eventsSummary.feeder1= true;
          // vm.eventsSummary.dtr1=true;
          vm.modelArray[0]= userDetails.hierarchyId;
          vm.getSubStations();
      }


     vm.getMeters = function() {
       vm.eventsSummary.meters = {};
       if(vm.summary.dtrid != null){
         vm.modelArray[8] = Number(vm.summary.sectionid);
       }
       data.modelArray = vm.modelArray;
       console.log(data.modelArray);
       $http({
         method : "POST",
         url : hierarchy + "mdm/reports/load-mtr-number",
         data: data
       }).then(function mySuccess(response) {
         console.log(response);
           vm.eventsSummary.meters = response.data;
           console.log(vm.eventsSummary.meters);
       }, function myError(response) {
           console.log(response);
       });
     }
     vm.getMeters();


     //vm.getSections();

     function validateeventsSummary() {
       if(vm.summary.fromdate === undefined || vm.summary.todate===undefined ){
         //vm.errorToast("Please Select All Fields.");
         MessageInfo.showMessage(7002, '', '', '');
          return false;
       }
       if(vm.summary.substationid === undefined){
         vm.summary.substationid = null;
       }
       if(vm.summary.feederid === undefined){
         vm.summary.feederid = null;
       }
       if(vm.summary.dtrid === undefined){
         vm.summary.dtrid = null;
       }

       return true;
     }


     vm.eventsSummarySubmit = function(){
       if (validateeventsSummary()) {
       vm.eventsSummary.progressShow=true;
       data.modelArray = vm.modelArray;
       if (vm.summary.mtrNo != null) {
         var mtrNo = vm.summary.mtrNo.mtrNo;
         console.log(mtrNo);
         data.mtrNumber = mtrNo;
       }
       else {
         data.mtrNumber = null;
       }
       console.log(data.mtrNumber);
       vm.summary.fromdate1 = splitDate(vm.summary.fromdate);
       vm.summary.todate1 = splitDate(vm.summary.todate);
       data.fromDate = splitDate(vm.summary.fromdate);
       data.toDate = splitDate(vm.summary.todate);
       console.log(data);
       $http({
         method : "POST",
         url : hierarchy + "mdm/reports/eventSumReport",
         data: data
       }).then(function mySuccess(response) {
          console.log(response);
          vm.eventsSummary.details = response.data;
          var events = response.data.statistics;
          console.log("Loop");
          console.log(events);
          var eventsArr = [];
          vm.eventsArr = [];
         for (var key in events) {
           console.log(key);
           console.log(events[key]);
           var item = events[key]
           vm.eventsArr.push(item[0]);
        //   console.log(eventsArr);
         }
         console.log("EventsArr");
         console.log(vm.eventsArr);
         vm.eventsSummary.progressShow=false;
         vm.summary.showtabledata = true;
       }, function myError(response) {
           console.log(response);
       });
     }

     }

    }
})();
