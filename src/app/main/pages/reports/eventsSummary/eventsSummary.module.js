(function ()
{
    'use strict';

    angular
        .module('app.eventsSummary', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.eventsSummary', {
                url    : '/eventsSummary',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/reports/eventsSummary/eventsSummary.html',
                        controller : 'EventsSummaryController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });




    }
})();
