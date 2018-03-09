(function ()
{
    'use strict';

    angular
        .module('app.billingEnergy', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.billingEnergy', {
                url    : '/reports/billingEnergy',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/reports/billingEnergy/billingEnergy.html',
                        controller : 'BillingEnergyController as vm'
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
