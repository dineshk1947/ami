(function ()
{
    'use strict';

    angular
        .module('app.billingConsumption', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.billingConsumption', {
                url    : '/billingConsumption',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/reports/billingConsumption/billingConsumption.html',
                        controller : 'BillingConsumptionController as vm'
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
