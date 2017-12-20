(function ()
{
    'use strict';

    angular
        .module('app.sim', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.sim', {
                url    : '/sim',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/dcuconfig/sim/sim.html',
                        controller : 'SimController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });

        // Translation
      //  $translatePartialLoaderProvider.addPart('app/main/pages/dcuconfig/sim');

        // Api
        msApiProvider.register('sample', ['app/data/sample/sample.json']);


        msNavigationServiceProvider.saveItem('sample.md.dcu', {
            title : 'DCU Config',
            //icon  : 'icon-tile-four',
            class : 'navigation-dashboards',
            weight: 5
        });

        msNavigationServiceProvider.saveItem('sample.md.dcu.sim', {
            title      : 'SIM Master',
            state      : 'app.sim',

            //translate  : 'METER.MD.DCUCONFIG.SIM',
            class      : 'navigation-dashboards project-dashboard',
            weight     : 2
        });

    }
})();
