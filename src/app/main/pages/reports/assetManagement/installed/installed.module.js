(function ()
{
    'use strict';

    angular
        .module('app.installed', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.installed', {
                url    : '/installed',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/reports/assetManagement/installed/installed.html',
                        controller : 'InstalledController as vm'
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
