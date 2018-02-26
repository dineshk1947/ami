(function ()
{
    'use strict';

    angular
        .module('app.algorithmMaster', ['ngMaterial'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.algorithmMaster', {
                url    : '/algorithmMaster',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/config/vee/algMaster/algMaster.html',
                        controller : 'algorithmMasterController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });

            // msNavigationServiceProvider.saveItem('vee.master', {
            //     title      : 'VEE Master',
            //     state      : 'app.algorithmMaster',
            //     //translate  : 'METER.MASTER',
            //     class      : 'navigation-dashboards project-dashboard',
            //     weight     : 1
            // });


    }
})();
