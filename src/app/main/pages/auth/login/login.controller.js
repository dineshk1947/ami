(function ()
{
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    /** @ngInject */

    function LoginController($window, $http, baseUrl2, $mdToast, $location, AuthenticationService, $localStorage, fuseTheming, MessageInfo) {
        // Data
        var vm = this;
        vm.themes = fuseTheming.themes;
        vm.spinner = false;

        // vm.errorToast = function(mesg) {
        //   $mdToast.show(
        //     $mdToast.simple()
        //       .textContent(mesg)
        //       .position('top right')
        //       .hideDelay(3000)
        //       .toastClass('error')
        //   );
        // };
        // vm.successToast = function(mesg, callback) {
        //  $mdToast.show(
        //    $mdToast.simple()
        //      .textContent(mesg)
        //      .position('top right')
        //      .hideDelay(3000)
        //      .toastClass('success')
        //  );
        // };


        if($location.search().success){

          if($location.search().success == 1 && $location.search().success == "1"){
            vm.spinner = true;
              console.log("success");
              //vm.successToast("Please wait....!");
               MessageInfo.showMessage(1005, '', '', '');
              $http({
                  method : "GET",
                  url : "http://mdm.vijaiami.com/mdm/auth/login-user?token="+$location.search().token,
              }).then(function mySuccess(data) {
                console.log(data);
                var user = data.data.userDetails[0];
                AuthenticationService.SetCredentials(user, $location.search().token);
                console.log("userDetails", user);
                console.log("Byeyeeeeeeeeeeeeeeeeeeeeeeee");
                $location.path('/dashboard');
                $location.url($location.path());
                console.log("Helolooooooooooooooooooooooo");

              }, function myError(response) {
                  //vm.errorToast("Failed to login");
                   MessageInfo.showMessage(6002, '', '', '');
              });


          }else{
            vm.spinner = false;
              console.log("Not Success");
              //vm.errorToast("Failed to login");
              MessageInfo.showMessage(6002, '', '', '');
          }
        }


        vm.login = function() {
          var data = vm.form;
        }

    }
})();
