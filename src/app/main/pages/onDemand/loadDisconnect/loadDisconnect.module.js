(function ()
{
    'use strict';

    angular
        .module('app.loaddisconnect', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.loaddisconnect', {
                url    : '/loaddisconnect',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/onDemand/loadDisconnect/loadDisconnect.html',
                        controller : 'LoadDisconnectController as vm'
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


      //  msNavigationServiceProvider.saveItem('ondemand', {
      //      title : 'On Demand Request',
      //      icon  : 'icon-tile-four',
      //      class : 'navigation-dashboards',
      //      weight: 1
      //  });
       //
      //  msNavigationServiceProvider.saveItem('ondemand.loadDisconnect', {
      //      title      : 'Load Disconnect',
      //      state      : 'app.loaddisconnect',
      //      //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
      //      class      : 'navigation-dashboards project-dashboard',
      //      weight     : 1
      //  });
    }
})();
