(function ()
{
    'use strict';

    angular
        .module('app.loadProfile', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.loadProfile', {
                url    : '/reports/loadprofile',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/reports/lp/lp.html',
                        controller : 'ReportsController as vm'
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
