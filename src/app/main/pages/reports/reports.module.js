(function ()
{
    'use strict';

    angular
        .module('app.reports', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.reports', {
                url    : '/reports',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/reports/reports.html',
                        controller : 'ReportsController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });


          //   msNavigationServiceProvider.saveItem('events.tampers', {
          //      title      : 'Tampers',
          //      state      : 'app.defineTampers',
          //      //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
          //      class      : 'navigation-dashboards project-dashboard',
          //      weight     : 1
          //  });


      //  msNavigationServiceProvider.saveItem('reports', {
      //      title      : 'Reports',
      //      icon       : 'icon-tile-four',
      //      state      : 'app.reports',
      //      //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
      //      class      : 'navigation-dashboards project-dashboard',
      //      weight     : 1
      //  });
    }
})();
