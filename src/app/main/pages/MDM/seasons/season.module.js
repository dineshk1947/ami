(function ()
{
    'use strict';

    angular
        .module('app.season', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.season', {
                url    : '/season',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/MDM/seasons/season.html',
                        controller : 'SeasonController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });

            // Translation
            $translatePartialLoaderProvider.addPart('app/main/pages/MDM/sample');

            // Api
            msApiProvider.register('sample', ['app/data/sample/sample.json']);

    }
})();
