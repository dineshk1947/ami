(function ()
{
    'use strict';

    angular
        .module('app.billingDemand', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.billingDemand', {
                url    : '/billingDemand',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/reports/billingDemand/billingDemand.html',
                        controller : 'BillingDemandController as vm'
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
