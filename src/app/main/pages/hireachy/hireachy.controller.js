(function ()
{
    'use strict';

    angular
        .module('app.sample')

        .directive('msHireachey', msHireachey);

    // /** @ngInject */

    function msHireachey() {
      return {
        templateUrl: "app/main/pages/hireachy/hireachy.html",
        controller: HireachyController,
        controllerAs: 'model',
        bindToController: true
      }
    }

    function HireachyController($http,  baseUrl2) {
      var model = this;
      console.log("HireachyController");


      var data = {};


      //discoms
      $http({
          method : "GET",
          url : baseUrl2 + "mdm/discom",
          data: data
      }).then(function mySuccess(response) {
          console.log(response.data);
          model.discoms = response.data;
      }, function myError(response) {

          console.log(response);
      });

      // circles
      model.getCircles = function() {
        console.log(model.discomid);
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/hierarchy/" + model.discomid
        }).then(function mySuccess(response) {
            console.log(response.data);
            model.circles = response.data;
        }, function myError(response) {

            console.log(response);
        });
      }

      //divisions
      model.getDivisions = function() {
        console.log(model.circleid);
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/hierarchy/" + model.circleid
        }).then(function mySuccess(response) {
            console.log(response.data);
            model.divisions = response.data;
        }, function myError(response) {
            console.log(response);
        });
      }

      //subdivisions
      model.getSubDivisions = function() {
        console.log(model.divisionid);
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/hierarchy/" + model.divisionid
        }).then(function mySuccess(response) {
            console.log(response.data);
            model.subdivisions = response.data;
        }, function myError(response) {

            console.log(response);

        });
      }

      //sections
      model.getSections = function() {
        console.log(model.subdivisionid);
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/hierarchy/" + model.subdivisionid
        }).then(function mySuccess(response) {
            console.log(response.data);
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
            url : baseUrl2 + "mdm/substation/" + model.sectionid
        }).then(function mySuccess(response) {
            console.log(response.data);
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
            url : baseUrl2 + "mdm/feeder/" + model.substationid
        }).then(function mySuccess(response) {
            console.log(response.data);
            model.feeders = response.data;
        }, function myError(response) {

            console.log(response);

        });
      }

      //dtrs
      model.getDtr = function() {
        //console.log(model.discomid);
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/dtr/" + model.feederid
        }).then(function mySuccess(response) {
            console.log(response.data);
            model.dtrs = response.data;
        }, function myError(response) {

            console.log(response);

        });
      }


    }


    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.hireachy', {
                url    : '/hireachy',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/hireachy/hireachy.html',
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
