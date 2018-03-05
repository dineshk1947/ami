(function ()
{
    'use strict';

    angular
        .module('app.networkwiseConsumption', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.networkwiseConsumption', {
                url    : '/networkwiseConsumption',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/aggregations/networkwiseConsumption/networkwiseConsumption.html',
                        controller : 'NetworkwiseConsumptionController as vm'
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

      //  msNavigationServiceProvider.saveItem('aggregation.networkwiseConsumption', {
      //      title      : 'Networkwise Consumption',
      //      state      : 'app.networkwiseConsumption',
      //      //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
      //      class      : 'navigation-dashboards project-dashboard',
      //      weight     : 4
      //  });
    }
})();
