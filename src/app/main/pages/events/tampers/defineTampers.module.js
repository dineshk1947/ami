(function ()
{
    'use strict';

    angular
        .module('app.defineTampers', ['datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.defineTampers', {
                url    : '/defineTampers',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/events/tampers/defineTampers.html',
                        controller : 'defineTampersController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });


          //   msNavigationServiceProvider.saveItem('events.tampers', {
          //      title      : 'Tampers',
          //      state      : 'app.defineTampers',
          //      //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
          //      class      : 'navigation-dashboards project-dashboard',
          //      weight     : 1
          //  });

       //
      //  msNavigationServiceProvider.saveItem('events', {
      //      title : 'Events & Tampers',
      //      icon  : 'icon-tile-four',
      //      class : 'navigation-dashboards',
      //      weight: 1
      //  });
       //
      //  msNavigationServiceProvider.saveItem('events.defineTampers', {
      //      title      : 'Configure Tampers',
      //      state      : 'app.defineTampers',
      //      //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
      //      class      : 'navigation-dashboards project-dashboard',
      //      weight     : 1
      //  });
    }
})();
