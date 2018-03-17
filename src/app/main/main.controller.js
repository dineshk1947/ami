(function ()
{
    'use strict';

    angular
        .module('fuse')
        // .config(function($mdDateLocaleProvider) {
        //     $mdDateLocaleProvider.formatDate = function(date) {
        //       return moment(date).format('DD-MM-YYYY');
        //     };
        //   })
        .config(function ($mdDateLocaleProvider) {
            $mdDateLocaleProvider.formatDate = formatDate;

            function formatDate(date) {
              return date ? moment(date).format('DD-MM-YYYY') : 'Enter date';
        }
      }) 
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, $rootScope)
    {

        // Remove the splash screen
        $scope.$on('$viewContentAnimationEnded', function (event)
        {
            if ( event.targetScope.$id === $scope.$id )
            {
                $rootScope.$broadcast('msSplashScreen::remove');
            }
        });
    }
})();

//ssh://git-codecommit.us-west-2.amazonaws.com/v1/repos/ANG-MDM
