(function ()
{
    'use strict';

    angular
        .module('app.assetMgmtCommissioned', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.assetMgmtCommissioned', {
                url    : '/commissioned',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/reports/assetManagement/commissioned/commissioned.html',
                        controller : 'CommissionedController as vm'
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
