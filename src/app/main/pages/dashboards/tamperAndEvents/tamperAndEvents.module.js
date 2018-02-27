(function ()
{
    'use strict';

    angular
        .module('app.tamperAndEvents', ['nvd3'])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.tamperAndEvents', {
                url    : '/tampersAndEvents',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/dashboards/tamperAndEvents/tamperAndEvents.html',
                        controller : 'TamperAndEventsController as vm'
                    }
                }
            });



    }
})();
