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

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/master');

        // Api
        msApiProvider.register('sample', ['app/data/sample/sample.json']);

        msNavigationServiceProvider.saveItem('mm', {
            //title : 'Meter Master',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('mm.master', {
            //title : 'Meter Master',
            icon : 'icon-file-image-box',
            class : 'navigation-dashboards',
            state : 'app.master',
            weight: 2
        });

        msNavigationServiceProvider.saveItem('mm.master', {
            title      : 'Meter Master',
            state      : 'app.master',
            //stateParams: {'id': 1},
            // badge      : {
            //     content: '21',
            //     color  : 'red'
            // },
            translate  : 'METER.MASTER',
            class      : 'navigation-dashboards project-dashboard',
            weight     : 1
        });

    }
})();
