(function ()
{
    'use strict';

    angular
        .module('app.master', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.master', {
                url    : '/master',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/master/master.html',
                        controller : 'MasterController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });

        //
        // msNavigationServiceProvider.saveItem('asset', {
        //     //title : 'Meter Master',
        //     group : true,
        //     weight: 1
        // });
        // msNavigationServiceProvider.saveItem('asset.maintain', {
        //     title : 'Asset Management',
        //     icon  : 'icon-tile-four',
        //     class : 'navigation-dashboards',
        //     weight: 1
        // });

        // msNavigationServiceProvider.saveItem('mm.master', {
        //     title : 'Meter Master',
        //     icon : 'icon-file-image-box',
        //     class : 'navigation-dashboards',
        //     state : 'app.master',
        //     weight: 2
        // });

        // msNavigationServiceProvider.saveItem('asset.maintain.master', {
        //     title      : 'Maintain Meter',
        //     //icon       : 'icon-file-image-box',
        //     state      : 'app.master',
        //     //translate  : 'METER.MASTER',
        //     class      : 'navigation-dashboards project-dashboard',
        //     weight     : 1
        // });

    }
})();
