(function ()
{
    'use strict';

    angular
        .module('app.dcu', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.dcu', {
                url    : '/dcu',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/dcuConfig/dcu/dcu.html',
                        controller : 'DcuController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });


        // msNavigationServiceProvider.saveItem('config', {
        //     //title : 'Meter Master',
        //     group : true,
        //     weight: 1
        // });
        //
        // msNavigationServiceProvider.saveItem('config.dcu', {
        //     //title : 'Meter Master',
        //     icon : 'icon-file-image-box',
        //     class : 'navigation-dashboards',
        //     state : 'app.dcu',
        //     weight: 2
        // });
        //
        // msNavigationServiceProvider.saveItem('config.dcu', {
        //     title      : 'Dcu Master',
        //     state      : 'app.dcu',
        //     //stateParams: {'id': 1},
        //     // badge      : {
        //     //     content: '21',
        //     //     color  : 'red'
        //     // },
        //     translate  : 'DCU.MASTER',
        //     class      : 'navigation-dashboards project-dashboard',
        //     weight     : 1
        // });

        // msNavigationServiceProvider.saveItem('sample.md.dcu', {
        //     title : 'DCU Config',
        //     //icon  : 'icon-tile-four',
        //     class : 'navigation-dashboards',
        //     weight: 5
        // });


        // msNavigationServiceProvider.saveItem('asset.maintain.dcu', {
        //     title      : 'Maintain DCU',
        //     state      : 'app.dcu',
        //
        //   //  translate  : 'METER.MD.DCUCONFIG.DCU',
        //     class      : 'navigation-dashboards project-dashboard',
        //     weight     : 1
        // });

    }
})();
