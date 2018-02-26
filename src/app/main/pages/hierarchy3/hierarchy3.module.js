(function ()
{
    'use strict';

    angular
        .module('app.hierarchy3', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.hierarchy3', {
                url    : '/hierarchy3',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/hierarchy3/hierarchy3.html',
                        controller : 'HierarchyController as vm'
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
