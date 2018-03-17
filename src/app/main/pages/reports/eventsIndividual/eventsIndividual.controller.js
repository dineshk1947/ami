(function ()
{
    'use strict';

    angular
        .module('app.eventsIndividual')
        .controller('EventsIndividualController',EventsIndividualController);

    /** @ngInject */
    function EventsIndividualController($http, baseUrl2, $localStorage, hierarchy,MessageInfo,Clear)
    {
      var vm = this;
      vm.eventsIndividual={};
      vm.individual = {};
      vm.eventsIndividual.showReport   = false;
      vm.eventsIndividual.inputShow   = true;
      vm.Clear = Clear;
      vm.eventsIndividual.progressShow=false;

      vm.dynamicShow=function (){
        vm.eventsIndividual.showReport   = false;
        vm.eventsIndividual.inputShow   = true;
      }

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

      var data = {};
      var userDetails = {};
      var modelArray = [null, null, null, null, null, null,null,null,null];
      vm.modelArray = modelArray;
      var currentUser = $localStorage.globals;
      userDetails = currentUser.currentUser;
      console.log(userDetails);
      vm.eventsIndividual.discom = userDetails.discom;
      vm.eventsIndividual.discomid = userDetails.discomId;
      vm.modelArray[0]= vm.eventsIndividual.discomid;
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
        if(vm.individual.fyear==currDate.getFullYear()) {
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
        if(vm.individual.tyear==currDate.getFullYear()) {
          vm.tmonth = [];
          for (var i = 0; i <= currDate.getMonth(); i++) {
            vm.tmonth[i] = monthArr2[i];
          }
        }
        console.log(vm.tmonth);
      }




      vm.getSubStations = function() {

        data.modelArray = vm.modelArray;
        console.log(data.modelArray);
        $http({
          method : "POST",
          url : hierarchy + "mdm/reports/load-subStation-number",
          data: data
        }).then(function mySuccess(response) {
          console.log(response);
            vm.eventsIndividual.substations = response.data;
            console.log(vm.eventsIndividual.substations);
             vm.getMeters();
        }, function myError(response) {
            console.log(response);
        });
      }

      //feders
      vm.getFeeder = function() {
        console.log("SubstationID");
        console.log(vm.individual.substationid);
        vm.modelArray[6] = Number(vm.individual.substationid);
        for (var i = 7; i < vm.modelArray.length; i++) {
          vm.modelArray[i] = null;
        }
        console.log(vm.modelArray);
        $http({
            method : "GET",
            url: hierarchy + "mdm/load-feeder/" +vm.individual.substationid

            //url : hierarchy + "mdm/feeder/" + vm.eventsIndividual.substationid
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.eventsIndividual.feeders = response.data;
             vm.getMeters();
        }, function myError(response) {
            console.log(response);
        });
      }

      //dtrs
      vm.getDtr = function() {
        console.log("FeederID");
        console.log(vm.individual.feederid);
        vm.modelArray[7] = Number(vm.individual.feederid);
        for (var i = 8; i < vm.modelArray.length; i++) {
          vm.modelArray[i] = null;
        }

        console.log(vm.modelArray);
        $http({
            method : "GET",
            // url : hierarchy + "mdm/dtr/" + vm.eventsIndividual.feederid
            url: hierarchy + "mdm/load-dtr/" +vm.individual.feederid
        }).then(function mySuccess(response) {
          console.log("dtr");
            console.log(response.data);
            vm.eventsIndividual.dtrs = response.data;
             vm.getMeters();
        }, function myError(response) {
          console.log("dtr");
            console.log(response);
        });
      }


      if(userDetails.levelName == "SUB-DIVISION"){

        vm.eventsIndividual.discom = userDetails.discom;
        vm.eventsIndividual.regionName=userDetails.region;
        vm.eventsIndividual.circleName=userDetails.circle;
        vm.eventsIndividual.divisionName= userDetails.division;
        vm.eventsIndividual.subdivisionName=userDetails.hierarchyName;
        vm.eventsIndividual.subdivisionid = userDetails.hierarchyId;

        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.modelArray[3] = userDetails.divisionId;
        vm.getSubStations();
      }

      if(userDetails.levelName == "REGION"){
          vm.eventsIndividual.region=true;
          vm.eventsIndividual.regionName= userDetails.hierarchyName;
          vm.eventsIndividual.regionid=userDetails.hierarchyId;
          vm.getSubStations();
        }

      if(userDetails.levelName == "DIVISION"){
        vm.eventsIndividual.regionName=userDetails.region;
        vm.eventsIndividual.circleName=userDetails.circle;
        vm.eventsIndividual.divisionName= userDetails.hierarchyName;
        vm.eventsIndividual.divisionid=userDetails.hierarchyId;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.getSubStations();
      }

      if(userDetails.levelName == "CIRCLE"){
        vm.eventsIndividual.regionName=userDetails.region;
        vm.eventsIndividual.circleName= userDetails.hierarchyName;
        vm.eventsIndividual.circleid=userDetails.hierarchyId;
        vm.modelArray[1]= userDetails.regionId;
        vm.getSubStations();
      }

      if(userDetails.levelName == "DISCOM"){
          vm.eventsIndividual.regionName=userDetails.region;
          vm.eventsIndividual.discom= userDetails.hierarchyName;
          vm.eventsIndividual.discomid=userDetails.hierarchyId;
          vm.modelArray[0]= userDetails.hierarchyId;
          vm.getSubStations();
      }


     vm.getMeters = function() {
       if(vm.individual.dtrid != null){
         vm.modelArray[8] = Number(vm.individual.dtrid);
       }
       data.modelArray = vm.modelArray;
       console.log(data.modelArray);
       $http({
         method : "POST",
         url : hierarchy + "mdm/reports/eventInd-mtr-number",
         data: data
       }).then(function mySuccess(response) {
         console.log(response);
           vm.eventsIndividual.meters = response.data;
           console.log(vm.eventsIndividual.meters);
       }, function myError(response) {
           console.log(response);
       });
     }
     vm.getMeters();


     //vm.getSections();

     function validateeventsIndividual() {
       if (vm.individual.mtrNo == undefined) {
         MessageInfo.showMessage(1017, 'Meter No', '', '');
          return false;
       }
       if(vm.individual.fromdate === undefined || vm.individual.todate===undefined ){
         //vm.errorToast("Please Select All Fields.");
         MessageInfo.showMessage(7002, '', '', '');
          return false;
       }

       if(vm.individual.fromdate > vm.individual.todate){
         //vm.errorToast("Please Select All Fields.");
           MessageInfo.showMessage(1008, 'From Year', 'To Year', '');
          return false;
       }
       if(vm.individual.substationid === undefined){
         vm.individual.substationid = null;
       }
       if(vm.individual.feederid === undefined){
         vm.individual.feederid = null;
       }
       if(vm.individual.dtrid === undefined){
         vm.individual.dtrid = null;
       }

       return true;
     }


     vm.eventsIndividualSubmit = function(){
       if (validateeventsIndividual()) {
       vm.eventsIndividual.progressShow=true;
       data.modelArray = vm.modelArray;
       if (vm.individual.mtrNo != null) {
         var mtrNo = vm.individual.mtrNo.mtrNo;
         console.log(mtrNo);
         data.mtrNumber = mtrNo;
       }
       else {
         data.mtrNumber = null;
       }
       console.log(data.mtrNumber);
       vm.individual.fromdate1 = splitDate(vm.individual.fromdate);
       vm.individual.todate1 = splitDate(vm.individual.todate);
       data.fromDate = splitDate(vm.individual.fromdate);
       data.toDate = splitDate(vm.individual.todate);
       console.log(data);
       $http({
         method : "POST",
         url : hierarchy + "mdm/reports/eventIndividualReport",
         data: data
       }).then(function mySuccess(response) {
          console.log("response fromm DB", response);
          vm.eventsIndividualDetails = response.data.statistics.individualList;
          vm.subSationDisplayName= vm.eventsIndividualDetails[0].substation;
          vm.feederDisplayName=vm.eventsIndividualDetails[0].feeder;
          vm.dtrDisplayName=vm.eventsIndividualDetails[0].dtr;
          //vm.meterDisplayName=vm.eventsIndividualDetails[0].mtrslno;
          console.log("vm.eventsIndividualDetails", vm.eventsIndividualDetails);
           vm.eventsIndividual.progressShow=false;
           vm.eventsIndividual.showReport   = true;
           vm.eventsIndividual.inputShow   = false;
       }, function myError(response) {
           console.log(response);
       });
     }

     }

    }
})();
