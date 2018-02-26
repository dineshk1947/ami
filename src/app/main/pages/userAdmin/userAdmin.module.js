(function ()
{
    'use strict';

    angular
        .module('app.userAdmin', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.userAdmin', {
                url    : '/userAdmin',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/userAdmin/userAdmin.html',
                        controller : 'UserAdminController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });



          //   msNavigationServiceProvider.saveItem('userAdmin', {
          //      title      : 'User Administration',
          //      icon       : 'icon-tile-four',
          //      state      : 'app.userAdmin',
          //      //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
          //      class      : 'navigation-dashboards project-dashboard',
          //      weight     : 6
          //  });

    }
})();
