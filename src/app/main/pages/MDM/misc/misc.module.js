// (function ()
// {
//     'use strict';
//
//     angular
//         .module('app.misc',[
//             // 3rd Party Dependencies
//             'datatables', 'datatables.scroller'
//         ])
//         .config(config);
//
//     /** @ngInject */
//     function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
//     {
//         // State
//         $stateProvider
//             .state('app.misc', {
//                 url    : '/misc',
//                 views  : {
//                     'content@app': {
//                         templateUrl: 'app/main/pages/MDM/misc/misc.html',
//                         controller : 'MiscController as vm'
//                     }
//                 },
//                 resolve: {
//                     Employees: function (msApi)
//                     {
//                         return msApi.resolve('tables.employees100@get');
//                     }
//                 }
//             });
//
//           msApiProvider.register('tables.employees100', ['app/data/tables/employees100.json']);
//
//
//
//     }
// })();
