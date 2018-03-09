(function ()
{
    'use strict';

    angular
        .module('app.eventsIndividual', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.eventsIndividual', {
                url    : '/eventsIndividual',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/reports/eventsIndividual/eventsIndividual.html',
                        controller : 'EventsIndividualController as vm'
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
