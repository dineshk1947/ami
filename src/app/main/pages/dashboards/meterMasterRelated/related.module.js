(function ()
{
    'use strict';

    angular
        .module('app.related', ['nvd3'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.related', {
                url    : '/meterMasterRelated',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/dashboards/meterMasterRelated/related.html',
                        controller : 'RelatedController as vm'
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
