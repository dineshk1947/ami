(function ()
{
    'use strict';

    angular
        .module('app.networkwiseConsumer', ['nvd3'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.networkwiseConsumer', {
                url    : '/networkwiseConsumer',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/aggregations/networkwiseConsumer/networkwiseConsumer.html',
                        controller : 'NetworkwiseConsumerController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });


       msNavigationServiceProvider.saveItem('aggregation.networkwiseConsumer', {
           title      : 'Networkwise Consumer Details',
           state      : 'app.networkwiseConsumer',
           //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
           class      : 'navigation-dashboards project-dashboard',
           weight     : 3
       });
    }
})();
