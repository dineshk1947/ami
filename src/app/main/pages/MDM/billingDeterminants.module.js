(function ()
{
    'use strict';

    angular
        .module('app.billingDet', [])

        .config(config);

    /** @ngInject */
    // function msHireachey() {
    //   return {
    //     templateUrl: "app/main/pages/hireachy/hireachy.html"
    //   }
    // }
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.billingDet', {
                url    : '/billingDet',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/MDM/billingDeterminants.html',
                        controller : 'BillingDetContoller as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });

        // // Translation
        // $translatePartialLoaderProvider.addPart('app/main/pages/MDM/tou');
        //
        // // Api
        // msApiProvider.register('sample', ['app/data/sample/sample.json']);

        // msNavigationServiceProvider.saveItem('sample', {
        //     //title : 'Master Data Management',
        //     group : true,
        //     weight: 1
        // });
        //
        // // Apps.Dashboards
        // msNavigationServiceProvider.saveItem('sample.md', {
        //     title : 'Master Data Management',
        //     icon  : 'icon-tile-four',
        //     class : 'navigation-dashboards',
        //     weight: 1
        // });
        // msNavigationServiceProvider.saveItem('sample.md.billingDet', {
        //     title      : 'Billing Determinants',
        //     state      : 'app.billingDet',
        //
        //   //  translate  : 'METER.MD.TOU',
        //     class      : 'navigation-dashboards project-dashboard',
        //     weight     : 1
        // });


        // msNavigationServiceProvider.saveItem('sample.md.tou', {
        //     title      : 'Time Zones',
        //     state      : 'app.tou',
        //
        //   //  translate  : 'METER.MD.TOU',
        //     class      : 'navigation-dashboards project-dashboard',
        //     weight     : 1
        // });
        // msNavigationServiceProvider.saveItem('sample.md.seasons', {
        //     title      : 'Seasons',
        //     state      : 'app.season',
        //
        //     //translate  : 'METER.MD.SEASONS',
        //     class      : 'navigation-dashboards project-dashboard',
        //     weight     : 2
        // });
        // msNavigationServiceProvider.saveItem('sample.md.holiday', {
        //     title      : 'Holidays',
        //     state      : 'app.holiday',
        //
        //     //translate  : 'METER.MD.HOLIDAYS',
        //     class      : 'navigation-dashboards project-dashboard',
        //     weight     : 3
        // });
        // msNavigationServiceProvider.saveItem('sample.md.misc', {
        //     title      : 'Misc',
        //     state      : 'app.misc',
        //
        //   //  translate  : 'METER.MD.MISC',
        //     class      : 'navigation-dashboards project-dashboard',
        //     weight     : 4
        // });

    }
})();
