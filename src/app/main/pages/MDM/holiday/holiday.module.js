// (function ()
// {
//     'use strict';
//
//     angular
//         .module('app.holiday', [])
//         .config(config);
//
//     /** @ngInject */
//     function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
//     {
//         // State
//         $stateProvider
//             .state('app.holiday', {
//                 url    : '/holiday',
//                 views  : {
//                     'content@app': {
//                         templateUrl: 'app/main/pages/MDM/holiday/holiday.html',
//                         controller : 'HolidayController as vm'
//                     }
//                 },
//                 resolve: {
//                     SampleData: function (msApi)
//                     {
//                         return msApi.resolve('sample@get');
//                     }
//                 }
//             });
//
//
//
//
//
//     }
// })();
