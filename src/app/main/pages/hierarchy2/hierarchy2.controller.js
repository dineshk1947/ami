(function ()
{
    'use strict';
    angular
        .module('app.hierarchys')
        .directive('msHierarchys', msHierarchys)
    // /** @ngInject */

    function msHierarchys($rootScope) {
      return {
        templateUrl: "app/main/pages/hierarchy2/hierarchy2.html",
        controller: HierarchyController,
        controllerAs: 'model',
        bindToController: true
      }
    }
    function HierarchyController($http, $scope, $rootScope, hierarchy) {
      var model = this;
      var data = {};
      var modelArray = [null, null, null, null, null, null];
      model.modelArray = modelArray;
      //discoms
      $http({
          method : "GET",
          url : hierarchy + "mdm/discom",
          data: data
      }).then(function mySuccess(response) {
          console.log(response.data);
          model.discoms = response.data;
          console.log("Discoms are ",model.discoms[0].adminEntityValueId);
          model.discomid=model.discoms[0].name;
      }, function myError(response) {
          console.log(response);
      });
      // circles
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/1000"
        }).then(function mySuccess(response) {
            model.circles = response.data;
            model.circleid = model.circles[0].name;
        }, function myError(response) {
            console.log(response);
        });
      //divisions
      $http({
          method : "GET",
          url : hierarchy + "mdm/hierarchy/1002"
      }).then(function mySuccess(response) {
          model.divisions = response.data;
          model.divisionid = model.divisions[0].name;
      }, function myError(response) {
          console.log(response);
      });

      //subdivisions
      $http({
          method : "GET",
          url : hierarchy + "mdm/hierarchy/1008"
      }).then(function mySuccess(response) {
          console.log(response.data);
          model.modelArray[0] = 1008;
          model.subdivisions = response.data;
      }, function myError(response) {
          console.log(response);
      });

      //sections
      model.getSections = function() {
        console.log(model.subdivisionid);
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/" + model.subdivisionid
        }).then(function mySuccess(response) {
            console.log(response.data);
            model.modelArray[1] = model.subdivisionid;
            model.sections = response.data;
        }, function myError(response) {
            console.log(response);
        });
      }
      //substations
      model.getSubStations = function() {
        console.log(model.sectionid);
        $http({
            method : "GET",
            url : hierarchy + "mdm/substation/" + model.sectionid
        }).then(function mySuccess(response) {
            console.log(response.data);
            model.modelArray[2] = model.sectionid;
            model.substations = response.data;
        }, function myError(response) {
            console.log(response);
        });
      }
      //feders
      model.getFeeder = function() {
        console.log(model.substationid);
        $http({
            method : "GET",
            url : hierarchy + "mdm/feeder/" + model.substationid
        }).then(function mySuccess(response) {
            console.log(response.data);
            model.modelArray[3] = model.substationid;
            model.feeders = response.data;
        }, function myError(response) {
            console.log(response);
        });
      }
      //dtrs
      model.getDtr = function() {
        console.log("Feeder id is ", model.feederid);
        //console.log(model.discomid);
        $http({
            method : "GET",
            url : hierarchy + "mdm/dtr/" + model.feederid
        }).then(function mySuccess(response) {
          console.log("dtr");
            console.log(response.data);
            model.modelArray[4] = model.feederid;
            model.dtrs = response.data;
        }, function myError(response) {
          console.log("dtr");
            console.log(response);
        });
      }
      //mETERS
      model.getMeter = function() {
        console.log("Dtr id is ", model.dtrId);
        $http({
            method : "GET",
            url : hierarchy + "mdm/mtr/" + model.dtrId
            //url : hierarchy + "mdm/mtr/10001"
        }).then(function mySuccess(response) {
            console.log(response.data);
            model.modelArray[5] = model.dtrId;
            console.log("mtr");
            model.meters = response.data;
        }, function myError(response) {
            console.log("mtr");
            console.log(response);
        });
      }

      $rootScope.modelArray = model.modelArray;
      // console.log("||||||||||||||||||");
      // console.log($rootScope.newModel);

    }
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.hierarchy', {
                url    : '/hierarchy',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/hierarchy/hierarchy.html',
                        controller : 'HireachyController as model'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/seasons');
        // Api
        msApiProvider.register('sample', ['app/data/sample/sample.json']);
    }
})();
