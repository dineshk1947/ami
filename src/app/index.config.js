(function ()
{
    'use strict';

    angular
        .module('fuse')
        .config(config)
        .factory('baseUrl1', baseUrl1)
        .factory('baseUrl2', baseUrl2)
        .factory('hierarchy',hierarchy)
        .factory('baseUrl3', baseUrl3)
        .factory('toastFun', toastFun)
        .factory('AuthenticationService', AuthenticationService)
        .factory('MessageInfo', MessageInfo)
        .factory('Clear',Clear);


    // This function is to generate error message that is coming from JSON
    MessageInfo.$inject = ['$http', '$mdToast'];
    function MessageInfo($http, $mdToast) {
      var service = {};
      service.showMessage = showMessage;

      return service;

      function showMessage(code, param1, param2, param3) {
        console.log("Error Message");
        console.log(param1);
        $http({
            method : "GET",
            url : baseUrl2() + "get-ecode-message?code="+code+"&p1="+param1+"&p2="+param2+"&p3="+param3
        }).then(function mySuccess(response) {
            console.log(response);
            console.log(response.data.description);
            var message = response.data.description;
            var type = response.data.type;
            toastFun($mdToast).msg(message, type);
            //callback(message, type);
        }, function myError(response) {
            console.log(response);
            //callback(null, null);
        });
      }
    }

    // This function is to show error message

    toastFun.$inject = ['$mdToast'];
    function toastFun($mdToast) {
      //console.log(messageType);
      var service = {};

      service.msg = msg;
      return service;

      function msg(mesg, messageType) {
        console.log(messageType);
         $mdToast.show(
           $mdToast.simple()
             .textContent(mesg)
             .position('top right')
             .hideDelay(3000)
             .toastClass(messageType)
           );
         }
       }

      // This function is to clear all fields in the form
      function Clear() {
        var service = {};
        service.clearObj = clearObj;
        return service;

        function clearObj(obj) {
          for (var key in obj ) {
            console.log(obj[key]);
            obj[key] = undefined;
          }
          return obj;
        }
      }


    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', '$localStorage'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout, $localStorage) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(data, callback) {

            var resp1 = {};

            $http({
                method : "POST",
                url : baseUrl2() + "mdm/auth/login",
                data: data
            }).then(function mySuccess(response) {
              var resp = response.data;
              console.log("????????????????????????????????????????????");
              console.log(resp);

              if(resp.status) {
                resp1.success = true;
                resp1.userDetails = resp.userDetails[0];
                resp1.navDetails = resp.navDetails;
                callback(resp1);

              } else {
                resp1.success = false;
                resp1.userDetails = null;
                resp1.navDetails = null;
                callback(resp1);
              }
            }, function myError(response) {
                resp1.success = false;
                resp1.userDetails = null;
                resp1.navDetails = null;
                callback(resp1);
            });
        }

        function SetCredentials(userDetails) {

          // HEAD
              $rootScope.globals = {
                  currentUser: userDetails
              };
              var now = new Date(),
              // this will set the expiration to 12 months
              exp = new Date(now.getFullYear(), now.getMonth(), now.getDate());
              console.log(exp);
              var cookieExp = new Date();
              cookieExp.setTime(cookieExp.getTime() + 3000000);
              $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });

            $rootScope.globals = {
                currentUser: userDetails
            };
            var now = new Date(),
            // this will set the expiration to 12 months
            exp = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            console.log(exp);
            //var cookieExp = new Date();
            //cookieExp.setTime(cookieExp.getTime() + 3000000000);
            //$cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
            $localStorage.globals = $rootScope.globals;

            //console.log($cookies.getObject('globals'));
            console.log("::::::::::::::::::::::::::::::::::::::::::: $localStorage");
            console.log($localStorage.globals);
            console.log("inside SetCredentials");


        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $localStorage.globals = undefined;
            $cookies.remove('globals');
            console.log("inside ClearCredentials");

        }
      }

    /** @ngInject */
    function config($translateProvider) {
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');
        //
        // $localStorageProvider.get('MyKey');
        //
        // $localStorageProvider.set('MyKey', { k: 'value' });

    }


    function baseUrl1(){
      return 'http://mdm.vijaiami.com/';
    }

    function baseUrl2(){
      return 'http://mdm.vijaiami.com/';
    }
    function baseUrl3(){
      return 'http://mdm.vijaiami.com/';
    }
    function hierarchy(){
      return 'http://mdm.vijaiami.com/';
    }

})();
