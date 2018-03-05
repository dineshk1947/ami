(function ()
{
    'use strict';

    angular
        .module('app.loadreconnect', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.loadreconnect', {
                url    : '/loadreconnect',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/onDemand/loadReconnect/loadReconnect.html',
                        controller : 'LoadReconnectController as vm'
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


      //  msNavigationServiceProvider.saveItem('ondemand.loadReconnect', {
      //      title      : 'Load Reconnect',
      //      state      : 'app.loadreconnect',
      //      //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
      //      class      : 'navigation-dashboards project-dashboard',
      //      weight     : 2
      //  });
    }
})();
