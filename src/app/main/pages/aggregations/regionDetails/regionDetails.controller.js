(function ()
{
    'use strict';

    angular
        .module('app.regionDetails')
        .controller('RegionDetailsController', RegionDetailsController);

    /** @ngInject */
    function RegionDetailsController($http, $mdToast, baseUrl2, $rootScope, $localStorage, $interval )
    {
        var vm = this;
          var data = {};

          var currentUser = $localStorage.globals.currentUser;
          console.log(currentUser);
          data.entityId = currentUser.userId;

          vm.discom = currentUser.discom;
          vm.showProgress = true;
          vm.content = false;
          vm.activated = true;
          vm.determinateValue = 30;

          $interval(function() {
            vm.determinateValue += 1;
            if (vm.determinateValue > 100) {
              vm.determinateValue = 30;
            }
          }, 100);



        $http({
            method : "POST",
            url : baseUrl2 + "mdm/rd",
            data: data
        }).then(function mySuccess(response) {
            vm.showProgress = false;

            console.log("orgchart");
            console.log(response.data.data);
            var datasource = {};
            datasource = response.data.data;
            datasource.name = currentUser.levelName;
            datasource.title = currentUser.userName;


            $('#region-chart').orgchart({
              'data' : datasource,
              'nodeContent': 'title',
              'draggable' : false,
              'direction': 't2b'
            });

            vm.content = true;
        }, function myError(response) {
            console.log(response);
        });





    }
})();
