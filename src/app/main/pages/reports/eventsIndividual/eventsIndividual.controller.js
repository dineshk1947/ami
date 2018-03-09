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
      vm.showtabledata =  false;
      vm.Clear = Clear;

      vm.dtOptions = {
                  dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                  pagingType: 'simple',
                  autoWidth : false,
                  responsive: true
                }
      vm.eventsIndividual={};
      vm.eventsIndividual.region=false;
      vm.eventsIndividual.region1=false;
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
        if(vm.eventsIndividual.fyear==currDate.getFullYear()) {
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
        if(vm.eventsIndividual.tyear==currDate.getFullYear()) {
          vm.tmonth = [];
          for (var i = 0; i <= currDate.getMonth(); i++) {
            vm.tmonth[i] = monthArr2[i];
          }
        }
        console.log(vm.tmonth);
      }

      //regions
      vm.getRegions = function() {
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/"+vm.eventsIndividual.discomid
        }).then(function mySuccess(response) {
          console.log(response);
            vm.eventsIndividual.regions = response.data;
            console.log(vm.eventsIndividual.regions);
        }, function myError(response) {
            console.log(response);
        });
      }

      // circles
      vm.getCircles = function() {
        console.log(vm.eventsIndividual.regionid);
        console.log("RegionId");
        vm.modelArray[1] = Number(vm.eventsIndividual.regionid);
        console.log(vm.modelArray);
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/"+vm.eventsIndividual.regionid
        }).then(function mySuccess(response) {
            vm.eventsIndividual.circles = response.data;
            console.log(vm.eventsIndividual.circles);
        }, function myError(response) {
            console.log(response);
        });
      }

      //divisions
      vm.getDivision = function() {
        console.log(vm.eventsIndividual.circleid);
        console.log("CircleId");
        vm.modelArray[2] = Number(vm.eventsIndividual.circleid);
        for (var i = 3; i < vm.modelArray.length; i++) {
          vm.modelArray[i] = null;
        }
        console.log(vm.modelArray);
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/"+vm.eventsIndividual.circleid
        }).then(function mySuccess(response) {
            vm.eventsIndividual.divisions = response.data;
            console.log(vm.eventsIndividual.divisions);
            //vm.eventsIndividual.divisionid = vm.eventsIndividual.divisions[0].name;
        }, function myError(response) {
            console.log(response);
        });
      }

      //subdivisions
      vm.getSubDivisions=function(){
        console.log(vm.eventsIndividual.divisionid);
        console.log("DivisionID");
        vm.modelArray[3] = Number(vm.eventsIndividual.divisionid);
        for (var i = 4; i < vm.modelArray.length; i++) {
          vm.modelArray[i] = null;
        }
        console.log(vm.modelArray);
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/"+vm.eventsIndividual.divisionid
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.eventsIndividual.subdivisions = response.data;
        }, function myError(response) {
            console.log(response);
        });
      }

      //sections
      vm.getSections = function() {
        console.log("SubDivisionID");
        console.log(vm.eventsIndividual.subdivisionid);
        vm.modelArray[4] = Number(vm.eventsIndividual.subdivisionid);
        for (var i = 5; i < vm.modelArray.length; i++) {
          vm.modelArray[i] = null;
        }
        console.log(vm.modelArray);
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/" + vm.eventsIndividual.subdivisionid
        }).then(function mySuccess(response) {
            vm.eventsIndividual.sections = response.data;
            console.log(response.data);
            console.log(vm.eventsIndividual.sections);
        }, function myError(response) {
            console.log(response);
        });
      }

      //substations
      vm.getSubStations = function() {
        console.log("SectionID");
        console.log(vm.eventsIndividual.sectionid);
        vm.modelArray[5] = Number(vm.eventsIndividual.sectionid);
        for (var i = 6; i < vm.modelArray.length; i++) {
          vm.modelArray[i] = null;
        }
        console.log(vm.modelArray);
        $http({
            method : "GET",
            url : hierarchy +"mdm/substation/"+vm.eventsIndividual.sectionid
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.eventsIndividual.substations = response.data;
            console.log(vm.eventsIndividual.substations);
        }, function myError(response) {
            console.log(response);
        });
      }

      //feders
      vm.getFeeder = function() {
        console.log("SubstationID");
        console.log(vm.eventsIndividual.substationid);
        vm.modelArray[6] = Number(vm.eventsIndividual.substationid);
        for (var i = 7; i < vm.modelArray.length; i++) {
          vm.modelArray[i] = null;
        }
        console.log("hi");
        vm.getMeters();
        console.log(vm.modelArray);
        $http({
            method : "GET",
            url: hierarchy + "mdm/load-feeder/" + vm.eventsIndividual.substationid

            //url : hierarchy + "mdm/feeder/" + vm.eventsIndividual.substationid
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.eventsIndividual.feeders = response.data;
        }, function myError(response) {
            console.log(response);
        });
      }

      //dtrs
      vm.getDtr = function() {
        console.log("FeederID");
        console.log(vm.eventsIndividual.feederid);
        vm.modelArray[7] = Number(vm.eventsIndividual.feederid);
        for (var i = 8; i < vm.modelArray.length; i++) {
          vm.modelArray[i] = null;
        }
        vm.getMeters();
        console.log(vm.modelArray);
        $http({
            method : "GET",
            // url : hierarchy + "mdm/dtr/" + vm.eventsIndividual.feederid
            url: hierarchy + "mdm/load-dtr/" +vm.eventsIndividual.feederid
        }).then(function mySuccess(response) {
          console.log("dtr");
            console.log(response.data);
            vm.eventsIndividual.dtrs = response.data;

        }, function myError(response) {
          console.log("dtr");
            console.log(response);
        });
      }


      if(userDetails.levelName == "SUB-DIVISION"){
        vm.eventsIndividual.region=true;
        vm.eventsIndividual.circle=true;
        vm.eventsIndividual.division=true;
        vm.eventsIndividual.subdivision=true;
        vm.eventsIndividual.discom = userDetails.discom;
        vm.eventsIndividual.regionName=userDetails.region;
        vm.eventsIndividual.circleName=userDetails.circle;
        vm.eventsIndividual.divisionName= userDetails.division;
        vm.eventsIndividual.subdivisionName=userDetails.hierarchyName;
        vm.eventsIndividual.subdivisionid = userDetails.hierarchyId;
        vm.eventsIndividual.section1 =true;
        vm.eventsIndividual.substation1=true;
        vm.eventsIndividual.feeder1= true;
        vm.eventsIndividual.dtr1=true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.modelArray[3] = userDetails.divisionId;
        vm.getSections();
      }

      if(userDetails.levelName == "REGION"){
          vm.eventsIndividual.region=true;
          vm.eventsIndividual.regionName= userDetails.hierarchyName;
          vm.eventsIndividual.regionid=userDetails.hierarchyId;
          vm.eventsIndividual.circle1=true;
          vm.eventsIndividual.division1=true;
          vm.eventsIndividual.subdivision1=true;
          vm.eventsIndividual.section1 =true;
          vm.eventsIndividual.substation1=true;
          vm.eventsIndividual.feeder1= true;
          vm.eventsIndividual.dtr1=true;
          //vm.modelArray[0]= userDetails.regionId;
          vm.getCircles();
        }

      if(userDetails.levelName == "DIVISION"){
        vm.eventsIndividual.region=true;
        vm.eventsIndividual.circle=true;
        vm.eventsIndividual.division=true;
        vm.eventsIndividual.regionName=userDetails.region;
        vm.eventsIndividual.circleName=userDetails.circle;
        vm.eventsIndividual.divisionName= userDetails.hierarchyName;
        vm.eventsIndividual.divisionid=userDetails.hierarchyId;
        vm.eventsIndividual.subdivision1=true;
        vm.eventsIndividual.section1 =true;
        vm.eventsIndividual.substation1=true;
        vm.eventsIndividual.feeder1= true;
        vm.eventsIndividual.dtr1=true;
        vm.modelArray[1]= userDetails.regionId;
        vm.modelArray[2]= userDetails.circleId;
        vm.getSubDivisions();
      }

      if(userDetails.levelName == "CIRCLE"){
        vm.eventsIndividual.region=true;
        vm.eventsIndividual.circle=true;
        vm.eventsIndividual.regionName=userDetails.region;
        vm.eventsIndividual.circleName= userDetails.hierarchyName;
        vm.eventsIndividual.circleid=userDetails.hierarchyId;
        vm.eventsIndividual.division1=true;
        vm.eventsIndividual.subdivision1=true;
        vm.eventsIndividual.section1 =true;
        vm.eventsIndividual.substation1=true;
        vm.eventsIndividual.feeder1= true;
        vm.eventsIndividual.dtr1=true;
        vm.modelArray[1]= userDetails.regionId;
        vm.getDivision();
      }

      if(userDetails.levelName == "DISCOM"){
          vm.eventsIndividual.regionName=userDetails.region;
          vm.eventsIndividual.discom= userDetails.hierarchyName;
          vm.eventsIndividual.discomid=userDetails.hierarchyId;
          vm.eventsIndividual.region1=true;
          vm.eventsIndividual.circle1=true;
          vm.eventsIndividual.division1=true;
          vm.eventsIndividual.subdivision1=true;
          vm.eventsIndividual.section1 =true;
          vm.eventsIndividual.substation1=true;
          vm.eventsIndividual.feeder1= true;
          vm.eventsIndividual.dtr1=true;
          vm.modelArray[0]= userDetails.hierarchyId;
          vm.getRegions();
      }


     vm.getMeters = function() {
       if(vm.eventsIndividual.dtrid != null){
         vm.modelArray[8] = Number(vm.eventsIndividual.dtrid);
       }
       data.modelArray = vm.modelArray;
       console.log(data.modelArray);
       $http({
         method : "POST",
         url : hierarchy + "mdm/reports/load-mtr-number",
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

     vm.getSectiondata = function() {

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
       }, function myError(response) {
           console.log(response);
       });
     }
     vm.getSectiondata();

     function validateeventsIndividual() {
       if(vm.eventsIndividual.fmonth === undefined || vm.eventsIndividual.fyear===undefined || vm.eventsIndividual.tmonth===undefined || vm.eventsIndividual.tyear===undefined
       || vm.selectedItem === undefined || vm.selectedItem === null){
         //vm.errorToast("Please Select All Fields.");
         MessageInfo.showMessage(1017, 'All Fields', '', '');
          return false;
       }
       if((vm.eventsIndividual.fyear == vm.eventsIndividual.tyear) && (vm.eventsIndividual.fmonth > vm.eventsIndividual.tmonth) ){
         //vm.errorToast("From Date Cannot be Less Than To Date");
          MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
          return false;
       }
       if( vm.eventsIndividual.tyear < vm.eventsIndividual.fyear  ){
         //vm.errorToast("From Date Cannot be Less Than To Date");
          MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
          return false;
       }
       return true;
     }


     vm.eventsIndividualSubmit = function(){
       if (validateeventsIndividual()) {
       data.modelArray = vm.modelArray;
       data.mtrNo = vm.selectedItem.mtrNo;
       vm.frommonth = JSON.parse(vm.eventsIndividual.fmonth);
       vm.tomonth = JSON.parse(vm.eventsIndividual.tmonth);
       data.fromDate = vm.eventsIndividual.fyear+"-"+vm.frommonth.value;
       data.toDate = vm.eventsIndividual.tyear+"-"+vm.frommonth.value;
       console.log(data);
      //  MessageInfo.showMessage(1005, '', '', '');
      //  $http({
      //    method : "POST",
      //    url : hierarchy + "mdm/reports/billing-demand",
      //    data: data
      //  }).then(function mySuccess(response) {
      //    console.log(response);
      //    console.log(response.data.statistics.demandList);
      //    vm.eventsIndividual.dataList = response.data.statistics.demandList;
      //    vm.showtabledata = true;
      //  }, function myError(response) {
      //      console.log(response);
      //  });
     }

     }

    }
})();
