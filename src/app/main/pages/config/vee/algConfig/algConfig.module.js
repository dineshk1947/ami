(function ()
{
    'use strict';

    angular
        .module('app.algconfig', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.algconfig', {
                url    : '/algconfig',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/config/vee/algConfig/algConfig.html',
                        controller : 'AlgconfigController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });


        // msNavigationServiceProvider.saveItem('vee', {
        //     title : 'VEE',
        //     icon : 'icon-file-image-box',
        //     class : 'navigation-dashboards',
        //     weight: 3
        // });
        // // msNavigationServiceProvider.saveItem('config.vee', {
        // //     title : 'VEE',
        // //     class : 'navigation-dashboards',
        // //     weight: 1
        // // });
        //
        // msNavigationServiceProvider.saveItem('vee.algconfig', {
        //     title      : 'Configure VEE Checks',
        //     state      : 'app.algconfig',
        //     //translate  : 'METER.MASTER',
        //     class      : 'navigation-dashboards project-dashboard',
        //     weight     : 2
        // });

    }
})();
