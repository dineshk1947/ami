(function ()
{
    'use strict';

    angular
        .module('fuse')
        .config(config)
        .factory('baseUrl1', baseUrl1)
        .factory('baseUrl2', baseUrl2);

    /** @ngInject */
    function config($translateProvider)
    {
        // Put your common app configurations here

        // angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('en');

        $translateProvider.useSanitizeValueStrategy('sanitize');
        // Change the URL where to access the LoopBack REST API server
        // $translateProvider.setUrlBase('http://89b19341.ngrok.io/');
    }


    function baseUrl1(){
      return 'http://c8b98e52.ngrok.io/';
    }

    function baseUrl2(){
      return 'https://f1ed241d.ngrok.io/';
    }


})();
