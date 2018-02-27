(function ()
{
    'use strict';

    angular
        .module('app.hierarchy', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.hierarchy', {
                url    : '/hierarchy',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/hierarchy/hierarchy.html',
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
