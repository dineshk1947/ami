(function ()
{
    'use strict';

    angular
        .module('fuse')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $timeout, $state, $location, $cookies, $localStorage)
    {
        // Activate loading indicator
        var vm = this;
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function ()
        {
          var restrictedPage = $.inArray($location.path(), ['/auth/login']) === -1;
          //var loggedIn = $cookies.getObject('globals');
          var loggedIn = $localStorage.globals;
          console.log("inside runnnnnnnnnnnnnnnn");
          console.log(loggedIn);
          console.log(!loggedIn);
          if (restrictedPage && !loggedIn) {
            console.log("inside runnnnnnnnnnnnnnnn and redericting to /auth/login");
              $location.path('/auth/login');
          }
            $rootScope.loadingProgress = true;
        });



        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function ()
        {
            $timeout(function ()
            {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });

        // $rootScope.$on('$locationChangeStart', function (event, next, current) {
        //     // redirect to login page if not logged in and trying to access a restricted page
        //     var restrictedPage = $.inArray($location.path(), ['/auth/login']) === -1;
        //     var loggedIn = $rootScope.globals;
        //     console.log("inside runnnnnnnnnnnnnnnn");
        //     console.log(loggedIn);
        //     console.log(!loggedIn);
        //     if (restrictedPage && !loggedIn) {
        //       console.log("inside runnnnnnnnnnnnnnnn and redericting to /auth/login");
        //         $location.path('/auth/login');
        //     }
        // });

    }
})();


// run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
//     function run($rootScope, $location, $cookies, $http) {
//         // keep user logged in after page refresh
//         $rootScope.globals = $cookies.getObject('globals') || {};
//         if ($rootScope.globals.currentUser) {
//             $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
//         }
//
//         $rootScope.$on('$locationChangeStart', function (event, next, current) {
//             // redirect to login page if not logged in and trying to access a restricted page
//             var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
//             var loggedIn = $rootScope.globals.currentUser;
//             if (restrictedPage && !loggedIn) {
//                 $location.path('/login');
//             }
//         });
//     }
