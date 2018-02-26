(function ()
{
    'use strict';

    angular
        .module('app.eventsmaster', ['datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.eventsmaster', {
                url    : '/eventsmaster',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/events/tpeventsmaster/tpeventsmaster.html',
                        controller : 'EventsMasterController as vm'
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
        $translatePartialLoaderProvider.addPart('app/main/pages/events/tpeventsmaster');

        // Api
        msApiProvider.register('sample', ['app/data/sample/sample.json']);


       // Apps.Dashboards
      //  msNavigationServiceProvider.saveItem('events', {
      //      title : 'Events & Tampers',
      //      icon  : 'icon-tile-four',
      //      class : 'navigation-dashboards',
      //      weight: 1
      //  });
       //
      //  msNavigationServiceProvider.saveItem('events.tpeventsmaster', {
      //      title      : 'Events & Tampers Master',
      //      state      : 'app.eventsmaster',
      //      //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
      //      class      : 'navigation-dashboards project-dashboard',
      //      weight     : 2
      //  });

    }
})();
