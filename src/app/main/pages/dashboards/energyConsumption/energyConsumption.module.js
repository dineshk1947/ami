(function ()
{
    'use strict';

    angular
        .module('app.energyConsumption', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.energyConsumption', {
                url    : '/energyConsumption',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/dashboards/energyConsumption/energyConsumption.html',
                        controller : 'EnergyConsumptionController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });


        //   msNavigationServiceProvider.saveItem('dashboards', {
        //       title : 'Dashboards',
        //       icon  : 'icon-tile-four',
        //       class : 'navigation-dashboards',
        //       weight: 1
        //   });
         //
        //   msNavigationServiceProvider.saveItem('dashboards.home', {
        //       title      : 'Dashboard Home',
         //
        //       state      : 'app.home',
        //       //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
        //       class      : 'navigation-dashboards project-dashboard',
        //       weight     : 1
        //   });
        //   msNavigationServiceProvider.saveItem('dashboards.meterComm', {
        //       title      : 'Meter Communication',
         //
        //       state      : 'app.meterComm',
        //       //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
        //       class      : 'navigation-dashboards project-dashboard',
        //       weight     : 2
        //   });
        //   msNavigationServiceProvider.saveItem('dashboards.vee', {
        //       title      : 'VEE',
         //
        //       state      : 'app.vee',
        //       //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
        //       class      : 'navigation-dashboards project-dashboard',
        //       weight     : 3
        //   });
        //   msNavigationServiceProvider.saveItem('dashboards.tamperAndEvents', {
        //       title      : 'Tampers and Events',
         //
        //       state      : 'app.tamperAndEvents',
        //       //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
        //       class      : 'navigation-dashboards project-dashboard',
        //       weight     : 4
        //   });
        //   msNavigationServiceProvider.saveItem('dashboards.demand', {
        //       title      : 'Energy Demand',
         //
        //       state      : 'app.energyDemand',
        //       //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
        //       class      : 'navigation-dashboards project-dashboard',
        //       weight     : 5
        //   });
        //  msNavigationServiceProvider.saveItem('dashboards.energyConsumption', {
        //      title      : 'Energy Consumption',
         //
        //      state      : 'app.energyConsumption',
        //      //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
        //      class      : 'navigation-dashboards project-dashboard',
        //      weight     : 6
        //  });
        //  msNavigationServiceProvider.saveItem('dashboards.powerQuality', {
        //      title      : 'Power Quality',
         //
        //      state      : 'app.powerQuality',
        //      //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
        //      class      : 'navigation-dashboards project-dashboard',
        //      weight     : 7
        //  });
         //
        //  msNavigationServiceProvider.saveItem('dashboards.meterStatus', {
        //      title      : 'Meter Installation Status',
         //
        //      state      : 'app.related',
        //      //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
        //      class      : 'navigation-dashboards project-dashboard',
        //      weight     : 8
        //  });






    }
})();
