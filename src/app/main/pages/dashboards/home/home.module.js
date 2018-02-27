(function ()
{
    'use strict';

    angular
        .module('app.home', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.home', {
                url    : '/dashboard',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/dashboards/home/home.html',
                        controller : 'HomeController as vm'
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
