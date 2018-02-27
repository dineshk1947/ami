(function ()
{
    'use strict';

    angular
        .module('app.toutariff', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.toutariff', {
                url    : '/toutariff',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/billing/touTariff/touTariff.html',
                        controller : 'TouTariffController as vm'
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



      //  msNavigationServiceProvider.saveItem('billing.touTariff', {
      //      title      : 'TOU Tariff Rates',
      //      state      : 'app.toutariff',
      //      //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
      //      class      : 'navigation-dashboards project-dashboard',
      //      weight     : 2
      //  });
    }
})();
