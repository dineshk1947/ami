(function ()
{
    'use strict';

    angular
        .module('app.areawiseConsumption', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.areawiseConsumption', {
                url    : '/areawiseConsumption',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/aggregations/areawiseConsumption/areawiseConsumption.html',
                        controller : 'AreawiseConsumptionController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });

      //  msNavigationServiceProvider.saveItem('aggregation', {
      //      title : 'Aggregations',
      //      icon  : 'icon-tile-four',
      //      class : 'navigation-dashboards',
      //      weight: 5
      //  });
       //
      //  msNavigationServiceProvider.saveItem('aggregation.areawiseConsumption', {
      //      title      : 'Areawise Consumption',
      //      state      : 'app.areawiseConsumption',
      //      //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
      //      class      : 'navigation-dashboards project-dashboard',
      //      weight     : 1
      //  });
    }
})();
