(function ()
{
    'use strict';

    angular
        .module('app.readParam', ['datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.readParam', {
                url    : '/readParam',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/onDemand/readParam/readParam.html',
                        controller : 'ReadParamController as vm'
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


      //  msNavigationServiceProvider.saveItem('ondemand.readMeter', {
      //      title      : 'Read Meter Parameters',
      //      state      : 'app.readParam',
      //      //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
      //      class      : 'navigation-dashboards project-dashboard',
      //      weight     : 3
      //  });
    }
})();
