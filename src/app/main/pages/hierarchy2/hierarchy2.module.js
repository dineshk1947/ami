(function ()
{
    'use strict';

    angular
        .module('app.hierarchys', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.hierarchys', {
                url    : '/hierarchy',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/hierarchy2/hierarchy2.html',
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
