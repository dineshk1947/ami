(function ()
{
    'use strict';

    angular
        .module('app.energyDemand', ['nvd3'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.energyDemand', {
                url    : '/energyDemand',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/dashboards/energyDemand/energyDemand.html',
                        controller : 'EnergyDemandController as vm'
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
