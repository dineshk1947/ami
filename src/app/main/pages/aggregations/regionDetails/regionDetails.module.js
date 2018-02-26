(function ()
{
    'use strict';

    angular
        .module('app.regionDetails', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.regionDetails', {
                url    : '/regionDetails',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/pages/aggregations/regionDetails/regionDetails.html',
                        controller : 'RegionDetailsController as vm'
                    }
                }
            });



    }
})();
