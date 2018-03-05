(function ()
{
    'use strict';

    angular
        .module('app.networkDetails')
        .controller('NetworkDetailsController', NetworkDetailsController);

    /** @ngInject */
    function NetworkDetailsController($http, $mdToast, baseUrl2, $rootScope, $localStorage, $interval, MessageInfo)
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

            MessageInfo.showMessage(1005, '', '', '');

        $http({
            method : "POST",
            url : baseUrl2 + "mdm/aggregations/network-details",
            data: data
        }).then(function mySuccess(response) {
            vm.showProgress = false;

            console.log("orgchart");
            console.log(response.data);
            vm.discom = response.data.discom;
            var datasource = {};
            datasource = response.data.data;
            datasource.name = currentUser.levelName;
            datasource.title = currentUser.userName;


            $('#network-chart').orgchart({
              'data' : datasource,
              'nodeContent': 'title',
              'draggable' : false,
              'direction': 'l2r'
            });
            vm.content = true;
        }, function myError(response) {
            console.log(response);
        });





    }
})();
