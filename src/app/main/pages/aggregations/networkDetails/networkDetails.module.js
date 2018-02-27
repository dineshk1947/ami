(function ()
{
    'use strict';

    angular
        .module('app.networkDetails', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.networkDetails', {
                url    : '/networkDetails',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/aggregations/networkDetails/networkDetails.html',
                        controller : 'NetworkDetailsController as vm'
                    }
                }
            });



    }
})();
