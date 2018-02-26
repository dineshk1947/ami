(function ()
{
    'use strict';

    angular
        .module('app.powerQuality', ['datatables','nvd3'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.powerQuality', {
                url    : '/powerQuality',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/dashboards/powerQuality/powerQuality.html',
                        controller : 'PowerQualityController as vm'
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
