(function ()
{
    'use strict';

    angular
        .module('app.login', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.login', {
            url      : '/auth/login',
            views    : {
                'main@' : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.login': {
                    templateUrl: 'app/main/pages/auth/login/login.html',
                    controller : 'LoginController as vm'
                }
            },
            bodyClass: 'login'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/auth/login');

        // Navigation
        // msNavigationServiceProvider.saveItem('pages.auth', {
        //   //  title : 'Authentication',
        //     icon  : 'icon-lock',
        //     weight: 1
        // });
        //
        // msNavigationServiceProvider.saveItem('pages.auth.login', {
        //   //  title : 'Login',
        //     state : 'app.login',
        //     weight: 1
        // });
    }

})();
