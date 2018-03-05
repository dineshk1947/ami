(function ()
{
    'use strict';

    angular
        .module('app.powerFactor', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.powerFactor', {
                url    : '/reports/powerFactor',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/reports/pf/pf.html',
                        controller : 'PowerFactorController as vm'
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
