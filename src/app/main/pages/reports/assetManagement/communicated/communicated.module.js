(function ()
{
    'use strict';

    angular
        .module('app.communicated', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.communicated', {
                url    : '/communicated',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/reports/assetManagement/communicated/communicated.html',
                        controller : 'CommunicatedController as vm'
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
