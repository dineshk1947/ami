(function ()
{
    'use strict';

    angular
        .module('app.meterSearch',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.meterSearch', {
                url    : '/meterSearch',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/meterSearch/meterSearch.html',
                        controller : 'MeterSearchController as model'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });


      //       msNavigationServiceProvider.saveItem('asset', {
      //           //title : 'Meter Master',
      //           group : true,
      //           weight: 1
      //       });
      //       msNavigationServiceProvider.saveItem('asset.maintain', {
      //           title : 'Asset Management',
      //           icon  : 'icon-tile-four',
      //           class : 'navigation-dashboards',
      //           weight: 1
      //       });
       //
      //  msNavigationServiceProvider.saveItem('asset.maintain.master', {
      //      title      : 'Meter Search',
      //      state      : 'app.meterSearch',
      //      class      : 'navigation-dashboards project-dashboard',
      //      weight     : 1
      //  });
    }
})();
