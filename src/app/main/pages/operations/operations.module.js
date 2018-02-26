(function ()
{
    'use strict';

    angular
        .module('app.operations', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.operations', {
                url    : '/operations',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/operations/operations.html',
                        controller : 'OperationsController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });

            // msNavigationServiceProvider.saveItem('operations', {
            //     //title : 'Meter Master',
            //     group : true,
            //     weight: 1
            // });
            // // msNavigationServiceProvider.saveItem('asset.maintain', {
            // //     title : 'Asset Management',
            // //     icon  : 'icon-tile-four',
            // //     class : 'navigation-dashboards',
            // //     weight: 1
            // // });
       //
      //   msNavigationServiceProvider.saveItem('operations', {
      //      title      : 'Operations',
      //      icon       : 'icon-tile-four',
      //      state      : 'app.operations',
      //      //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
      //      class      : 'navigation-dashboards project-dashboard',
      //      weight     : 1
      //  });






    }
})();
