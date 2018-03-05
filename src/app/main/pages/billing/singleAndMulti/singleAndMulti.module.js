(function ()
{
    'use strict';

    angular
        .module('app.singlemulti', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.singlemulti', {
                url    : '/singlemulti',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/billing/singleAndMulti/singleAndMulti.html',
                        controller : 'SingleMultiController as vm'
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


      //  msNavigationServiceProvider.saveItem('billing', {
      //      title : 'Billing',
      //      icon  : 'icon-tile-four',
      //      class : 'navigation-dashboards',
      //      weight: 1
      //  });
       //
      //  msNavigationServiceProvider.saveItem('billing.singleAndMulti', {
      //      title      : 'Single And Multi Part Tariff Rates',
      //      state      : 'app.singlemulti',
      //      //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
      //      class      : 'navigation-dashboards project-dashboard',
      //      weight     : 1
      //  });
    }
})();
