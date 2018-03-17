(function ()
{
    'use strict';

    angular
        .module('app.installedCommunicated', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.installedCommunicated', {
                url    : '/summary',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/reports/assetManagement/summary/summary.html',
                        controller : 'SummaryController as vm'
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
