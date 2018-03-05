(function ()
{
    'use strict';
    angular
        .module('app.hierarchy3')
        .directive('msHierarchy3', msHierarchy3)
        //.factory('hierarchyControl', hierarchyControl)
    // /** @ngInject */

    function msHierarchy3($rootScope) {
      return {
        templateUrl: "app/main/pages/hierarchy3/hierarchy3.html",
        controller: HierarchyController,
        controllerAs: 'model',
        bindToController: true
      }
    }
    // hierarchyControl.$inject = ['$http', '$rootScope', 'hierarchy', '$localStorage'];
    // function hierarchyControl($http, $rootScope, hierarchy, $localStorage) {
    //   var service = {};
    //   service.HierarchyController = HierarchyController;
    //   return service;

          function HierarchyController($http, $rootScope, hierarchy, $localStorage) {
            var model = this;
            model.hierarchyObj={};

            model.hierarchyObj.region=false;
            model.hierarchyObj.region1=false;
            var data = {};
            var userDetails = {};
            console.log("In HierarchyController");
            var modelArray = [null, null, null, null, null, null,null,null,null];
            model.modelArray = modelArray;
            var currentUser = $localStorage.globals;
            userDetails = currentUser.currentUser;
            console.log(userDetails);
            model.hierarchyObj.discom = userDetails.discom;
            model.hierarchyObj.discomid = userDetails.discomId;
            model.modelArray[0]= model.hierarchyObj.discomid;
            console.log(model.modelArray);
            $rootScope.nag = "nagendra";


             //regions
                model.getRegions = function() {
                  $http({
                      method : "GET",
                      url : hierarchy + "mdm/hierarchy/"+model.hierarchyObj.discomid
                  }).then(function mySuccess(response) {
                    console.log(response);
                      model.hierarchyObj.regions = response.data;
                      console.log(model.hierarchyObj.regions);
                  }, function myError(response) {
                      console.log(response);
                  });
                }

                // circles
                model.getCircles = function() {
                  console.log(model.hierarchyObj.regionid);
                  console.log("RegionId");
                  model.modelArray[1] = Number(model.hierarchyObj.regionid);

                  for (var i = 2; i < model.modelArray.length; i++) {
                    model.modelArray[i] = null;
                  }
                  console.log(model.modelArray);
                  $http({
                      method : "GET",
                      url : hierarchy + "mdm/hierarchy/"+model.hierarchyObj.regionid
                  }).then(function mySuccess(response) {
                      model.hierarchyObj.circles = response.data;
                      console.log(model.hierarchyObj.circles);
                  }, function myError(response) {
                      console.log(response);
                  });
                }

                //divisions
                model.getDivision = function() {
                  console.log(model.hierarchyObj.circleid);
                  console.log("CircleId");
                  model.modelArray[2] = Number(model.hierarchyObj.circleid);
                  for (var i = 3; i < model.modelArray.length; i++) {
                    model.modelArray[i] = null;
                  }
                  console.log(model.modelArray);
                  $http({
                      method : "GET",
                      url : hierarchy + "mdm/hierarchy/"+model.hierarchyObj.circleid
                  }).then(function mySuccess(response) {
                      model.hierarchyObj.divisions = response.data;
                      console.log(model.hierarchyObj.divisions);
                      //model.hierarchyObj.divisionid = model.hierarchyObj.divisions[0].name;
                  }, function myError(response) {
                      console.log(response);
                  });
                }

                //subdivisions
                model.getSubDivisions=function(){
                  console.log(model.hierarchyObj.divisionid);
                  console.log("DivisionID");
                  model.modelArray[3] = Number(model.hierarchyObj.divisionid);
                  for (var i = 4; i < model.modelArray.length; i++) {
                    model.modelArray[i] = null;
                  }
                  console.log(model.modelArray);
                  $http({
                      method : "GET",
                      url : hierarchy + "mdm/hierarchy/"+model.hierarchyObj.divisionid
                  }).then(function mySuccess(response) {
                      console.log(response.data);
                      model.hierarchyObj.subdivisions = response.data;
                  }, function myError(response) {
                      console.log(response);
                  });
                }

                //sections
                model.getSections = function() {
                  console.log("SubDivisionID");
                  console.log(model.hierarchyObj.subdivisionid);
                  model.modelArray[4] = Number(model.hierarchyObj.subdivisionid);
                  for (var i = 5; i < model.modelArray.length; i++) {
                    model.modelArray[i] = null;
                  }
                  console.log(model.modelArray);
                  $http({
                      method : "GET",
                      url : hierarchy + "mdm/hierarchy/" + model.hierarchyObj.subdivisionid
                  }).then(function mySuccess(response) {
                      model.hierarchyObj.sections = response.data;
                      console.log(response.data);
                      console.log(model.hierarchyObj.sections);
                  }, function myError(response) {
                      console.log(response);
                  });
                }

                //substations
                model.getSubStations = function() {
                  console.log("SectionID");
                  console.log(model.hierarchyObj.sectionid);
                  model.modelArray[5] = Number(model.hierarchyObj.sectionid);
                  for (var i = 6; i < model.modelArray.length; i++) {
                    model.modelArray[i] = null;
                  }
                  console.log(model.modelArray);
                  $http({
                      method : "GET",
                      url : hierarchy +"mdm/substation/"+model.hierarchyObj.sectionid
                  }).then(function mySuccess(response) {
                      console.log(response.data);
                      model.hierarchyObj.substations = response.data;
                      console.log(model.hierarchyObj.substations);
                  }, function myError(response) {
                      console.log(response);
                  });
                }

                //feders
                model.getFeeder = function() {
                  console.log("SubstationID");
                  console.log(model.hierarchyObj.substationid);
                  model.modelArray[6] = Number(model.hierarchyObj.substationid);
                  for (var i = 7; i < model.modelArray.length; i++) {
                    model.modelArray[i] = null;
                  }
                  console.log(model.modelArray);
                  $http({
                      method : "GET",
                      url: hierarchy + "mdm/feeder?id1=" +model.hierarchyObj.substationid + "&id2=" + model.hierarchyObj.sectionid

                      //url : hierarchy + "mdm/feeder/" + model.hierarchyObj.substationid
                  }).then(function mySuccess(response) {
                      console.log(response.data);
                      model.hierarchyObj.feeders = response.data;
                  }, function myError(response) {
                      console.log(response);
                  });
                }

                //dtrs
                model.getDtr = function() {
                  console.log("FeederID");
                  console.log(model.hierarchyObj.feederid);
                  model.modelArray[7] = Number(model.hierarchyObj.feederid);
                  for (var i = 8; i < model.modelArray.length; i++) {
                    model.modelArray[i] = null;
                  }
                  console.log(model.modelArray);
                  $http({
                      method : "GET",
                      // url : hierarchy + "mdm/dtr/" + model.hierarchyObj.feederid
                      url: hierarchy + "mdm/dtr?id1=" +model.hierarchyObj.feederid + "&id2=" + model.hierarchyObj.sectionid
                  }).then(function mySuccess(response) {
                    console.log("dtr");
                      console.log(response.data);
                      model.hierarchyObj.dtrs = response.data;

                  }, function myError(response) {
                    console.log("dtr");
                      console.log(response);
                  });
                }

                //mETERS
                model.getMeter = function() {
                console.log("DtrID");
                console.log(model.hierarchyObj.dtrid);
                model.modelArray[8] = Number(model.hierarchyObj.dtrid);
                console.log(model.modelArray);
                console.log("Dtr id is ", model.hierarchyObj.dtrid);
                $http({
                    method : "GET",
                    url : hierarchy + "mdm/mtr/" + model.hierarchyObj.dtrid
                }).then(function mySuccess(response) {
                    console.log(response.data);
                    console.log("mtr");
                    model.hierarchyObj.meters = response.data;
                }, function myError(response) {
                    console.log("mtr");
                    console.log(response);
                });
              }

                if(userDetails.levelName == "SUB-DIVISION"){
                  model.hierarchyObj.region=true;
                  model.hierarchyObj.circle=true;
                  model.hierarchyObj.division=true;
                  model.hierarchyObj.subdivision=true;
                  model.hierarchyObj.discom = userDetails.discom;
                  model.hierarchyObj.regionName=userDetails.region;
                  model.hierarchyObj.circleName=userDetails.circle;
                  model.hierarchyObj.divisionName= userDetails.division;
                  model.hierarchyObj.subdivisionName=userDetails.hierarchyName;
                  model.hierarchyObj.subdivisionid = userDetails.hierarchyId;
                  model.hierarchyObj.section1 =true;
                  model.hierarchyObj.substation1=true;
                  model.hierarchyObj.feeder1= true;
                  model.hierarchyObj.dtr1=true;
                  model.modelArray[1]= userDetails.regionId;
                  model.modelArray[2]= userDetails.circleId;
                  model.modelArray[3] = userDetails.divisionId;
                  model.getSections();
                }

                if(userDetails.levelName == "REGION"){
                    model.hierarchyObj.region=true;
                    model.hierarchyObj.regionName= userDetails.hierarchyName;
                    model.hierarchyObj.regionid=userDetails.hierarchyId;
                    model.hierarchyObj.circle1=true;
                    model.hierarchyObj.division1=true;
                    model.hierarchyObj.subdivision1=true;
                    model.hierarchyObj.section1 =true;
                    model.hierarchyObj.substation1=true;
                    model.hierarchyObj.feeder1= true;
                    model.hierarchyObj.dtr1=true;
                    //model.modelArray[0]= userDetails.regionId;
                    model.getCircles();
                  }

                if(userDetails.levelName == "DIVISION"){
                  model.hierarchyObj.region=true;
                  model.hierarchyObj.circle=true;
                  model.hierarchyObj.division=true;
                  model.hierarchyObj.regionName=userDetails.region;
                  model.hierarchyObj.circleName=userDetails.circle;
                  model.hierarchyObj.divisionName= userDetails.hierarchyName;
                  model.hierarchyObj.divisionid=userDetails.hierarchyId;
                  model.hierarchyObj.subdivision1=true;
                  model.hierarchyObj.section1 =true;
                  model.hierarchyObj.substation1=true;
                  model.hierarchyObj.feeder1= true;
                  model.hierarchyObj.dtr1=true;
                  model.modelArray[1]= userDetails.regionId;
                  model.modelArray[2]= userDetails.circleId;
                  model.getSubDivisions();
                }

                if(userDetails.levelName == "CIRCLE"){
                  model.hierarchyObj.region=true;
                  model.hierarchyObj.circle=true;
                  model.hierarchyObj.regionName=userDetails.region;
                  model.hierarchyObj.circleName= userDetails.hierarchyName;
                  model.hierarchyObj.circleid=userDetails.hierarchyId;
                  model.hierarchyObj.division1=true;
                  model.hierarchyObj.subdivision1=true;
                  model.hierarchyObj.section1 =true;
                  model.hierarchyObj.substation1=true;
                  model.hierarchyObj.feeder1= true;
                  model.hierarchyObj.dtr1=true;
                  model.modelArray[1]= userDetails.regionId;
                  model.getDivision();
                }

                if(userDetails.levelName == "DISCOM"){
                    model.hierarchyObj.regionName=userDetails.region;
                    model.hierarchyObj.discom= userDetails.hierarchyName;
                    model.hierarchyObj.discomid=userDetails.hierarchyId;
                    model.hierarchyObj.region1=true;
                    model.hierarchyObj.circle1=true;
                    model.hierarchyObj.division1=true;
                    model.hierarchyObj.subdivision1=true;
                    model.hierarchyObj.section1 =true;
                    model.hierarchyObj.substation1=true;
                    model.hierarchyObj.feeder1= true;
                    model.hierarchyObj.dtr1=true;
                    model.modelArray[0]= userDetails.hierarchyId;
                    model.getRegions();
               }

            $rootScope.modelArray = model.modelArray;
            $rootScope.hierarchyObj = model.hierarchyObj;

            console.log($rootScope.modelArray);
          }
    //}
})();
