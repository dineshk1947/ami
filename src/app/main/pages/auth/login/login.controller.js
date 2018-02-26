(function ()
{
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    /** @ngInject */

    function LoginController($window, $http, baseUrl2, $mdToast, $location, AuthenticationService, $localStorage) {
        // Data
        var vm = this;



        vm.errorToast = function(mesg) {
          $mdToast.show(
            $mdToast.simple()
              .textContent(mesg)
              .position('top right')
              .hideDelay(3000)
              .toastClass('error')
          );
        };
        vm.successToast = function(mesg, callback) {
         $mdToast.show(
           $mdToast.simple()
             .textContent(mesg)
             .position('top right')
             .hideDelay(3000)
             .toastClass('success')
         );
        };


        vm.login = function() {
          var data = vm.form;

          AuthenticationService.Login(data, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(response.userDetails, response.navDetails);
                    vm.successToast("Sucessfully loggedin");
                    console.log("\\\\\\\\\\\\\\\\\\\\\\");
                    console.log("response.userDetails", response.userDetails);
                      // if(response.userDetails.roleName === "Administrator")
                      // {
                      //     $location.path('/readParam');
                      // }
                      // else if(response.userDetails.roleName === "Super User")
                      // {
                      //     $location.path('/userAdmin');
                      // }
                      // else
                      // {
                      //     $location.path('/dashboard');
                      // }
                 $location.path('/dashboard');

                } else {
                    vm.errorToast("Failed to login");
                }
            });
          // console.log(data);
          // $http({
          //     method : "POST",
          //     url : baseUrl2 + "mdm/auth/login",
          //     data: data
          // }).then(function mySuccess(response) {
          //   var resp = response.data;
          //   console.log(resp.statistics);
          //
          //   if(resp.status) {
          //     vm.successToast("Submitted Sucessfully");
          //
          //     console.log(resp.statistics[0]);
          //     $window.sessionStorage.setItem('userDetails', angular.toJson(resp.statistics[0]));
          //     console.log($window.sessionStorage.getItem('userDetails'));
          //     $location.path('/dashboard');
          //     //$window.sessionStorage.setItem('userDetails', 'userrrrrrrrrr');
          //   } else {
          //     vm.errorToast(resp.dbMessage);
          //   }
          // }, function myError(response) {
          //     vm.errorToast("Something went wrong.. Please try again");
          //     console.log(response);
          // });
        }

    }
})();
