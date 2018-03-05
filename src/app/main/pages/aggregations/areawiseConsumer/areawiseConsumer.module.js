(function ()
{
    'use strict';

    angular
        .module('app.areawiseConsumer', ['nvd3'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.areawiseConsumer', {
                url    : '/areawiseConsumer',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/aggregations/areawiseConsumer/areawiseConsumer.html',
                        controller : 'AreawiseConsumerController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });


       msNavigationServiceProvider.saveItem('aggregation.areawiseConsumer', {
           title      : 'Areawise Consumer Details',
           state      : 'app.areawiseConsumer',
           //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
           class      : 'navigation-dashboards project-dashboard',
           weight     : 2
       });
    }
})();
