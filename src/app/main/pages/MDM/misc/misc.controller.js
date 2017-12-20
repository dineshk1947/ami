(function ()
{
    'use strict';

    angular
        .module('app.misc')
        .controller('MiscController', MiscController);

    /** @ngInject */
    function MiscController(SampleData)
    {
        var vm = this;

        // Data
        vm.helloText = SampleData.data.helloText;

        // Methods

        //////////
    }
})();
