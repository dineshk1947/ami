(function ()
{
    'use strict';

    angular
        .module('app.vee', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.vee', {
                url    : '/vee',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/dashboards/VEE/vee.html',
                        controller : 'VeeController as vm'
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
