(function ()
{
    'use strict';
    angular
        .module('app.hierarchy3')
        .directive('msHierarchy3', msHierarchy3)
    // /** @ngInject */

    function msHierarchy3($rootScope) {
      return {
        templateUrl: "app/main/pages/hierarchy3/hierarchy3.html",
        controller: HierarchyController,
        controllerAs: 'model',
        bindToController: true
      }
    }
    function HierarchyController($http, $scope, $rootScope, hierarchy,$localStorage) {
      var model = this;
      model.region=false;
      model.region1=false;
      var data = {};
      var userDetails = {};
      var modelArray = [null, null, null, null, null, null,null,null,null];
      model.modelArray = modelArray;
      var currentUser = $localStorage.globals;
      userDetails = currentUser.currentUser;
      console.log(userDetails);
      model.discom = userDetails.discom;
      model.discomid = userDetails.discomId;
      model.modelArray[0]= model.discomid;
      console.log(model.modelArray);
      $rootScope.nag = "nagendra";


      // regions
      // model.getRegions = function() {
      //   $http({
      //       method : "GET",
      //       url : hierarchy + "mdm/hierarchy/"+model.discomid
      //   }).then(function mySuccess(response) {
      //     console.log(response);
      //       model.regions = response.data;
      //       console.log(model.regions);
      //       console.log(model.regions.adminEntityValueId);
      //       model.regionid = model.regions[0].name;
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }
      //
      // // circles
      // model.getCircles = function() {
      //   console.log(model.regionid);
      //   console.log("RegionId");
      //   model.modelArray[1] = Number(model.regionid);
      //   console.log(model.modelArray);
      //   $http({
      //       method : "GET",
      //       url : hierarchy + "mdm/hierarchy/"+model.regionid
      //   }).then(function mySuccess(response) {
      //       model.circles = response.data;
      //       console.log(model.circles);
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }
      //
      // //divisions
      // model.getDivision = function() {
      //   console.log(model.circleid);
      //   console.log("CircleId");
      //   model.modelArray[2] = Number(model.circleid);
      //   console.log(model.modelArray);
      //   $http({
      //       method : "GET",
      //       url : hierarchy + "mdm/hierarchy/"+model.circleid
      //   }).then(function mySuccess(response) {
      //       model.divisions = response.data;
      //       //model.divisionid = model.divisions[0].name;
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }
      //
      // //subdivisions
      // model.getSubDivisions=function(){
      //   console.log(model.divisionid);
      //   console.log("DivisionID");
      //   model.modelArray[3] = Number(model.divisionid);
      //   console.log(model.modelArray);
      //   $http({
      //       method : "GET",
      //       url : hierarchy + "mdm/hierarchy/"+model.divisionid
      //   }).then(function mySuccess(response) {
      //       console.log(response.data);
      //       model.subdivisions = response.data;
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }
      //
      // //sections
      // model.getSections = function() {
      //   console.log("SubDivisionID");
      //   console.log(model.subdivisionid);
      //   model.modelArray[4] = Number(model.subdivisionid);
      //   console.log(model.modelArray);
      //   $http({
      //       method : "GET",
      //       url : hierarchy + "mdm/hierarchy/" + model.subdivisionid
      //   }).then(function mySuccess(response) {
      //       model.sections = response.data;
      //       console.log(response.data);
      //       console.log(model.sections);
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }
      //
      // //substations
      // model.getSubStations = function() {
      //   console.log("SectionID");
      //   console.log(model.sectionid);
      //   model.modelArray[5] = Number(model.sectionid);
      //   console.log(model.modelArray);
      //   $http({
      //       method : "GET",
      //       url : hierarchy +"mdm/substation/"+model.sectionid
      //   }).then(function mySuccess(response) {
      //       console.log(response.data);
      //       model.substations = response.data;
      //       console.log(model.substations);
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }
      //
      // //feders
      // model.getFeeder = function() {
      //   console.log("SubstationID");
      //   console.log(model.substationid);
      //   model.modelArray[6] = Number(model.substationid);
      //   console.log(model.modelArray);
      //   $http({
      //       method : "GET",
      //       url : hierarchy + "mdm/feeder/" + model.substationid
      //   }).then(function mySuccess(response) {
      //       console.log(response.data);
      //       model.feeders = response.data;
      //   }, function myError(response) {
      //       console.log(response);
      //   });
      // }
      //
      //
      // //dtrs
      // model.getDtr = function() {
      //   console.log("FeederID");
      //   console.log(model.feederid);
      //   model.modelArray[7] = Number(model.feederid);
      //   console.log(model.modelArray);
      //   $http({
      //       method : "GET",
      //       url : hierarchy + "mdm/dtr/" + model.feederid
      //   }).then(function mySuccess(response) {
      //       console.log("dtr");
      //       console.log(response.data);
      //       model.dtrs = response.data;
      //   }, function myError(response) {
      //     console.log("dtr");
      //       console.log(response);
      //   });
      // }
      //
      // //mETERS
      // model.getMeter = function() {
      //   console.log("DtrID");
      //   console.log(model.dtrid);
      //   model.modelArray[8] = Number(model.dtrid);
      //   console.log(model.modelArray);
      //   console.log("Dtr id is ", model.dtrid);
      //   $http({
      //       method : "GET",
      //       url : hierarchy + "mdm/mtr/" + model.dtrid
      //   }).then(function mySuccess(response) {
      //       console.log(response.data);
      //       console.log("mtr");
      //       model.meters = response.data;
      //   }, function myError(response) {
      //       console.log("mtr");
      //       console.log(response);
      //   });
      // }
      //
      //
      //
      // //
      // //
      // // //dtrs
      // // model.getDtr = function() {
      // //   console.log("FeederID");
      // //   console.log(model.feederid);
      // //   model.modelArray[7] = Number(model.feederid);
      // //   console.log(model.modelArray);
      // //   $http({
      // //       method : "GET",
      // //       url : hierarchy + "mdm/dtr/" + model.feederid
      // //   }).then(function mySuccess(response) {
      // //     console.log("dtr");
      // //       console.log(response.data);
      // //       model.dtrs = response.data;
      // //   }, function myError(response) {
      // //     console.log("dtr");
      // //       console.log(response);
      // //   });
      // // }
      // //
      // // //mETERS
      // // model.getMeter = function() {
      // //   console.log("DtrID");
      // //   console.log(model.dtrid);
      // //   model.modelArray[8] = Number(model.dtrid);
      // //   console.log(model.modelArray);
      // //   console.log("Dtr id is ", model.dtrid);
      // //   $http({
      // //       method : "GET",
      // //       url : hierarchy + "mdm/mtr/" + model.dtrid
      // //   }).then(function mySuccess(response) {
      // //       console.log(response.data);
      // //       console.log("mtr");
      // //       model.meters = response.data;
      // //   }, function myError(response) {
      // //       console.log("mtr");
      // //       console.log(response);
      // //   });
      // // }
      // //
      //
      //
      //
      //
      // if(userDetails.levelName == "SUB-DIVISION"){
      //   model.region=true;
      //   model.circle=true;
      //   model.division=true;
      //   model.subdivision=true;
      //   model.regionName=userDetails.region;
      //   model.circleName=userDetails.circle;
      //   model.divisionName= userDetails.division;
      //   model.subdivisionName=userDetails.hierarchyName;
      //   model.subdivisionid = userDetails.hierarchyId;
      //   model.section1 =true;
      //   model.substation1=true;
      //   model.feeder1= true;
      //   model.dtr1=true;
      //   model.modelArray[1]= userDetails.regionId;
      //   model.modelArray[2]= userDetails.circleId;
      //   model.modelArray[3] = userDetails.divisionId;
      //   model.getSections();
      // }
      //
      // if(userDetails.levelName == "DIVISION"){
      //   model.region=true;
      //   model.circle=true;
      //   model.division=true;
      //   model.regionName=userDetails.region;
      //   model.circleName=userDetails.circle;
      //   model.divisionName= userDetails.hierarchyName;
      //   model.divisionid=userDetails.hierarchyId;
      //   model.subdivision1=true;
      //   model.section1 =true;
      //   model.substation1=true;
      //   model.feeder1= true;
      //   model.dtr1=true;
      //   model.modelArray[1]= userDetails.regionId;
      //   model.modelArray[2]= userDetails.circleId;
      //   model.getSubDivisions();
      // }

      // get regions
    // regions
          model.getRegions = function() {
            $http({
                method : "GET",
                url : hierarchy + "mdm/hierarchy/"+model.discomid
            }).then(function mySuccess(response) {
              console.log(response);
                model.regions = response.data;
                console.log(model.regions);
            }, function myError(response) {
                console.log(response);
            });
          }

          // circles
          model.getCircles = function() {
            console.log(model.regionid);
            console.log("RegionId");
            model.modelArray[1] = Number(model.regionid);

            for (var i = 2; i < model.modelArray.length; i++) {
              model.modelArray[i] = null;
            }
            console.log(model.modelArray);
            $http({
                method : "GET",
                url : hierarchy + "mdm/hierarchy/"+model.regionid
            }).then(function mySuccess(response) {
                model.circles = response.data;
                console.log(model.circles);
            }, function myError(response) {
                console.log(response);
            });
          }

          //divisions
          model.getDivision = function() {
            console.log(model.circleid);
            console.log("CircleId");
            model.modelArray[2] = Number(model.circleid);
            for (var i = 3; i < model.modelArray.length; i++) {
              model.modelArray[i] = null;
            }
            console.log(model.modelArray);
            $http({
                method : "GET",
                url : hierarchy + "mdm/hierarchy/"+model.circleid
            }).then(function mySuccess(response) {
                model.divisions = response.data;
                console.log(model.divisions);
                //model.divisionid = model.divisions[0].name;
            }, function myError(response) {
                console.log(response);
            });
          }

          //subdivisions
          model.getSubDivisions=function(){
            console.log(model.divisionid);
            console.log("DivisionID");
            model.modelArray[3] = Number(model.divisionid);
            for (var i = 4; i < model.modelArray.length; i++) {
              model.modelArray[i] = null;
            }
            console.log(model.modelArray);
            $http({
                method : "GET",
                url : hierarchy + "mdm/hierarchy/"+model.divisionid
            }).then(function mySuccess(response) {
                console.log(response.data);
                model.subdivisions = response.data;
            }, function myError(response) {
                console.log(response);
            });
          }

          //sections
          model.getSections = function() {
            console.log("SubDivisionID");
            console.log(model.subdivisionid);
            model.modelArray[4] = Number(model.subdivisionid);
            for (var i = 5; i < model.modelArray.length; i++) {
              model.modelArray[i] = null;
            }
            console.log(model.modelArray);
            $http({
                method : "GET",
                url : hierarchy + "mdm/hierarchy/" + model.subdivisionid
            }).then(function mySuccess(response) {
                model.sections = response.data;
                console.log(response.data);
                console.log(model.sections);
            }, function myError(response) {
                console.log(response);
            });
          }

          //substations
          model.getSubStations = function() {
            console.log("SectionID");
            console.log(model.sectionid);
            model.modelArray[5] = Number(model.sectionid);
            for (var i = 6; i < model.modelArray.length; i++) {
              model.modelArray[i] = null;
            }
            console.log(model.modelArray);
            $http({
                method : "GET",
                url : hierarchy +"mdm/substation/"+model.sectionid
            }).then(function mySuccess(response) {
                console.log(response.data);
                model.substations = response.data;
                console.log(model.substations);
            }, function myError(response) {
                console.log(response);
            });
          }

          //feders
          model.getFeeder = function() {
            console.log("SubstationID");
            console.log(model.substationid);
            model.modelArray[6] = Number(model.substationid);
            for (var i = 7; i < model.modelArray.length; i++) {
              model.modelArray[i] = null;
            }
            console.log(model.modelArray);
            $http({
                method : "GET",
                url: hierarchy + "mdm/feeder?id1=" +model.substationid + "&id2=" + model.sectionid

                //url : hierarchy + "mdm/feeder/" + model.substationid
            }).then(function mySuccess(response) {
                console.log(response.data);
                model.feeders = response.data;
            }, function myError(response) {
                console.log(response);
            });
          }

          //dtrs
          model.getDtr = function() {
            console.log("FeederID");
            console.log(model.feederid);
            model.modelArray[7] = Number(model.feederid);
            for (var i = 8; i < model.modelArray.length; i++) {
              model.modelArray[i] = null;
            }
            console.log(model.modelArray);
            $http({
                method : "GET",
                // url : hierarchy + "mdm/dtr/" + model.feederid
                url: hierarchy + "mdm/dtr?id1=" +model.feederid + "&id2=" + model.sectionid
            }).then(function mySuccess(response) {
              console.log("dtr");
                console.log(response.data);
                model.dtrs = response.data;

            }, function myError(response) {
              console.log("dtr");
                console.log(response);
            });
          }

          //mETERS
          model.getMeter = function() {
          console.log("DtrID");
          console.log(model.dtrid);
          model.modelArray[8] = Number(model.dtrid);
          console.log(model.modelArray);
          console.log("Dtr id is ", model.dtrid);
          $http({
              method : "GET",
              url : hierarchy + "mdm/mtr/" + model.dtrid
          }).then(function mySuccess(response) {
              console.log(response.data);
              console.log("mtr");
              model.meters = response.data;
          }, function myError(response) {
              console.log("mtr");
              console.log(response);
          });
        }

          if(userDetails.levelName == "SUB-DIVISION"){
            model.region=true;
            model.circle=true;
            model.division=true;
            model.subdivision=true;
            model.discom = userDetails.discom;
            model.regionName=userDetails.region;
            model.circleName=userDetails.circle;
            model.divisionName= userDetails.division;
            model.subdivisionName=userDetails.hierarchyName;
            model.subdivisionid = userDetails.hierarchyId;
            model.section1 =true;
            model.substation1=true;
            model.feeder1= true;
            model.dtr1=true;
            model.modelArray[1]= userDetails.regionId;
            model.modelArray[2]= userDetails.circleId;
            model.modelArray[3] = userDetails.divisionId;
            model.getSections();
          }

          if(userDetails.levelName == "REGION"){
              model.region=true;
              model.regionName= userDetails.hierarchyName;
              model.regionid=userDetails.hierarchyId;
              model.circle1=true;
              model.division1=true;
              model.subdivision1=true;
              model.section1 =true;
              model.substation1=true;
              model.feeder1= true;
              model.dtr1=true;
              //model.modelArray[0]= userDetails.regionId;
              model.getCircles();
            }

          if(userDetails.levelName == "DIVISION"){
            model.region=true;
            model.circle=true;
            model.division=true;
            model.regionName=userDetails.region;
            model.circleName=userDetails.circle;
            model.divisionName= userDetails.hierarchyName;
            model.divisionid=userDetails.hierarchyId;
            model.subdivision1=true;
            model.section1 =true;
            model.substation1=true;
            model.feeder1= true;
            model.dtr1=true;
            model.modelArray[1]= userDetails.regionId;
            model.modelArray[2]= userDetails.circleId;
            model.getSubDivisions();
          }

          if(userDetails.levelName == "CIRCLE"){
            model.region=true;
            model.circle=true;
            model.regionName=userDetails.region;
            model.circleName= userDetails.hierarchyName;
            model.circleid=userDetails.hierarchyId;
            model.division1=true;
            model.subdivision1=true;
            model.section1 =true;
            model.substation1=true;
            model.feeder1= true;
            model.dtr1=true;
            model.modelArray[1]= userDetails.regionId;
            model.getDivision();
          }

          if(userDetails.levelName == "DISCOM"){
              model.regionName=userDetails.region;
              model.discom= userDetails.hierarchyName;
              model.discomid=userDetails.hierarchyId;
              model.region1=true;
              model.circle1=true;
              model.division1=true;
              model.subdivision1=true;
              model.section1 =true;
              model.substation1=true;
              model.feeder1= true;
              model.dtr1=true;
              model.modelArray[0]= userDetails.hierarchyId;
              model.getRegions();
         }

      $rootScope.modelArray = model.modelArray;
      console.log($rootScope.modelArray);
    }
})();
