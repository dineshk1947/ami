(function ()
{
    'use strict';

    angular
        .module('app.trConfig', ['datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.trConfig', {
                url    : '/trMaster',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/config/vee/trMaster/trMaster.html',
                        controller : 'TrMasterController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });




        // msNavigationServiceProvider.saveItem('sample.md.trmaster', {
        //     title      : 'Parameter Threshold Master',
        //     state      : 'app.trConfig',
        //     //translate  : 'METER.MASTER',
        //     class      : 'navigation-dashboards project-dashboard',
        //     weight     : 4
        // });

    }
})();
