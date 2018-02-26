(function ()
{
    'use strict';
    angular
        .module('app.hierarchy')
        .directive('msHierarchy', msHierarchy)
    // /** @ngInject */
    function msHierarchy($rootScope) {
      return {
        templateUrl: "app/main/pages/hierarchy/hierarchy.html",
        controller: HierarchyController,
        controllerAs: 'model',
        bindToController: true
      }
    }
    function HierarchyController($http, $scope, $rootScope, hierarchy, $mdToast) {
      var model = this;
      model.errorToast = function(mesg) {
      //  var pinTo = vm.getToastPosition();

       $mdToast.show(
         $mdToast.simple()
           .textContent(mesg)
           .position('top right')
           .hideDelay(3000)
           .toastClass('error')

         );
       };
       model.successToast = function(mesg) {
       //  var pinTo = vm.getToastPosition();

        $mdToast.show(
          $mdToast.simple()
            .textContent(mesg)
            .position('top right')
            .hideDelay(3000)
            .toastClass('success')

        );
      };

      var data = {};
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
            console.log(response.data);
            model.circles = response.data;
        }, function myError(response) {
            console.log(response);
        });
      //divisions
      model.getDivisions = function() {
        model.errorToast("Narrow the search.");
        console.log(model.circleid);
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/" + model.circleid
        }).then(function mySuccess(response) {
            console.log(response.data);
            model.divisions = response.data;
        }, function myError(response) {
            console.log(response);
        });
      }
      //subdivisions
      model.getSubDivisions = function() {
        model.errorToast("Narrow the search.");
        console.log(model.divisionid);
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/" + model.divisionid
        }).then(function mySuccess(response) {
            console.log(response.data);
            model.subdivisions = response.data;
        }, function myError(response) {
            console.log(response);
        });
      }
      //sections
      model.getSections = function() {
        model.errorToast("Narrow the search.");
        console.log(model.subdivisionid);
        $http({
            method : "GET",
            url : hierarchy + "mdm/hierarchy/" + model.subdivisionid
        }).then(function mySuccess(response) {
            console.log(response.data);
            model.sections = response.data;
        }, function myError(response) {
            console.log(response);
        });
      }
      //substations
      model.getSubStations = function() {
        model.errorToast("Narrow the search.");
        console.log(model.sectionid);
        $http({
            method : "GET",
            url : hierarchy + "mdm/substation/" + model.sectionid
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
            url : hierarchy + "mdm/feeder/" + model.substationid
        }).then(function mySuccess(response) {
            console.log(response.data);
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
            console.log("mtr");
            model.meters = response.data;
        }, function myError(response) {
            console.log("mtr");
            console.log(response);
        });
      }
     // To Store Meterd ID Selected in $rootScope for accessing the same in future.
      model.selectedItemChangeExi = function(item) {
        $rootScope.meterId = item.mtrNo;
        console.log("checking for meterid ",$rootScope.meterId);
      }
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
