(function ()
{
    'use strict';

    angular
        .module('app.meterComm', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.meterComm', {
                url    : '/meterComm',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/dashboards/meterComm/meterComm.html',
                        controller : 'MeterCommController as vm'
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
