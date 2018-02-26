// (function ()
// {
//     'use strict';
//     angular
//         .module('app.menu', [])
//         .config(config);
//
//     /** @ngInject */
//     function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
//     {
//         msNavigationServiceProvider.saveItem('dashboards', {
//               title : 'Dashboards',
//               icon  : 'icon-tile-four',
//               class : 'navigation-dashboards',
//               weight: 1
//           });
//
//         msNavigationServiceProvider.saveItem('dashboards.home', {
//               title      : 'Dashboard Home',
//               state      : 'app.home',
//               class      : 'navigation-dashboards project-dashboard',
//               weight     : 1
//           });
//         msNavigationServiceProvider.saveItem('dashboards.meterComm', {
//               title      : 'Meter Communication',
//               state      : 'app.meterComm',
//               class      : 'navigation-dashboards project-dashboard',
//               weight     : 2
//           });
//         msNavigationServiceProvider.saveItem('dashboards.vee', {
//               title      : 'VEE',
//               state      : 'app.vee',
//               class      : 'navigation-dashboards project-dashboard',
//               weight     : 3
//           });
//         msNavigationServiceProvider.saveItem('dashboards.tamperAndEvents', {
//               title      : 'Tampers and Events',
//               state      : 'app.tamperAndEvents',
//               class      : 'navigation-dashboards project-dashboard',
//               weight     : 4
//           });
//         msNavigationServiceProvider.saveItem('dashboards.demand', {
//               title      : 'Energy Demand',
//               state      : 'app.energyDemand',
//               class      : 'navigation-dashboards project-dashboard',
//               weight     : 5
//           });
//         msNavigationServiceProvider.saveItem('dashboards.energyConsumption', {
//              title      : 'Energy Consumption',
//              state      : 'app.energyConsumption',
//              class      : 'navigation-dashboards project-dashboard',
//              weight     : 6
//          });
//         msNavigationServiceProvider.saveItem('dashboards.powerQuality', {
//              title      : 'Power Quality',
//              state      : 'app.powerQuality',
//              class      : 'navigation-dashboards project-dashboard',
//              weight     : 7
//          });
//         msNavigationServiceProvider.saveItem('dashboards.meterStatus', {
//              title      : 'Meter Installation Status',
//              state      : 'app.related',
//              class      : 'navigation-dashboards project-dashboard',
//              weight     : 8
//          });
//
//         msNavigationServiceProvider.saveItem('billing', {
//              title : 'Billing',
//              icon  : 'icon-tile-four',
//              class : 'navigation-dashboards',
//              weight: 1
//          });
//
//         msNavigationServiceProvider.saveItem('billing.singleAndMulti', {
//              title      : 'Single And Multi Part Tariff Rates',
//              state      : 'app.singlemulti',
//              //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
//              class      : 'navigation-dashboards project-dashboard',
//              weight     : 1
//          });
//         msNavigationServiceProvider.saveItem('billing.touTariff', {
//              title      : 'TOU Tariff Rates',
//              state      : 'app.toutariff',
//              //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
//              class      : 'navigation-dashboards project-dashboard',
//              weight     : 2
//          });
//
//          msNavigationServiceProvider.saveItem('vee', {
//              title : 'VEE',
//              icon : 'icon-file-image-box',
//              class : 'navigation-dashboards',
//              weight: 3
//          });
//
//          msNavigationServiceProvider.saveItem('vee.algconfig', {
//              title      : 'Configure VEE Checks',
//              state      : 'app.algconfig',
//              //translate  : 'METER.MASTER',
//              class      : 'navigation-dashboards project-dashboard',
//              weight     : 2
//          });
//          msNavigationServiceProvider.saveItem('vee.master', {
//              title      : 'VEE Master',
//              state      : 'app.algorithmMaster',
//              //translate  : 'METER.MASTER',
//              class      : 'navigation-dashboards project-dashboard',
//              weight     : 1
//          });
//
//          msNavigationServiceProvider.saveItem('asset', {
//              //title : 'Meter Master',
//              group : true,
//              weight: 1
//          });
//          msNavigationServiceProvider.saveItem('asset.maintain', {
//              title : 'Asset Management',
//              icon  : 'icon-tile-four',
//              class : 'navigation-dashboards',
//              weight: 1
//          });
//          msNavigationServiceProvider.saveItem('asset.maintain.master', {
//              title      : 'Maintain Meter',
//              //icon       : 'icon-file-image-box',
//              state      : 'app.master',
//              //translate  : 'METER.MASTER',
//              class      : 'navigation-dashboards project-dashboard',
//              weight     : 1
//          });
//          msNavigationServiceProvider.saveItem('asset.maintain.dcu', {
//              title      : 'Maintain DCU',
//              state      : 'app.dcu',
//              class      : 'navigation-dashboards project-dashboard',
//              weight     : 1
//          });
//          msNavigationServiceProvider.saveItem('asset.maintain.sim', {
//              title      : 'Maintain SIM',
//              state      : 'app.sim',
//              class      : 'navigation-dashboards project-dashboard',
//              weight     : 2
//          });
//
//          msNavigationServiceProvider.saveItem('events', {
//              title : 'Events & Tampers',
//              icon  : 'icon-tile-four',
//              class : 'navigation-dashboards',
//              weight: 1
//          });
//          msNavigationServiceProvider.saveItem('events.defineTampers', {
//              title      : 'Configure Tampers',
//              state      : 'app.defineTampers',
//              //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
//              class      : 'navigation-dashboards project-dashboard',
//              weight     : 1
//          });
//          msNavigationServiceProvider.saveItem('events.tpeventsmaster', {
//              title      : 'Events & Tampers Master',
//              state      : 'app.eventsmaster',
//              //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
//              class      : 'navigation-dashboards project-dashboard',
//              weight     : 2
//          });
//
//          msNavigationServiceProvider.saveItem('sample', {
//              //title : 'Master Data Management',
//              group : true,
//              weight: 1
//          });
//
//          msNavigationServiceProvider.saveItem('sample.md', {
//              title : 'Master Data Management',
//              icon  : 'icon-tile-four',
//              class : 'navigation-dashboards',
//              weight: 1
//          });
//          msNavigationServiceProvider.saveItem('sample.md.billingDet', {
//              title      : 'Billing Determinants',
//              state      : 'app.billingDet',
//              class      : 'navigation-dashboards project-dashboard',
//              weight     : 1
//          });
//          msNavigationServiceProvider.saveItem('sample.md.trmaster', {
//              title      : 'Parameter Threshold Master',
//              state      : 'app.trConfig',
//              //translate  : 'METER.MASTER',
//              class      : 'navigation-dashboards project-dashboard',
//              weight     : 4
//          });
//
//          msNavigationServiceProvider.saveItem('ondemand', {
//              title : 'On Demand Request',
//              icon  : 'icon-tile-four',
//              class : 'navigation-dashboards',
//              weight: 1
//          });
//
//          msNavigationServiceProvider.saveItem('ondemand.loadDisconnect', {
//              title      : 'Load Disconnect',
//              state      : 'app.loaddisconnect',
//              class      : 'navigation-dashboards project-dashboard',
//              weight     : 1
//          });
//          msNavigationServiceProvider.saveItem('ondemand.loadReconnect', {
//              title      : 'Load Reconnect',
//              state      : 'app.loadreconnect',
//              class      : 'navigation-dashboards project-dashboard',
//              weight     : 2
//          });
//          msNavigationServiceProvider.saveItem('ondemand.readMeter', {
//              title      : 'Read Meter Parameters',
//              state      : 'app.readParam',
//              class      : 'navigation-dashboards project-dashboard',
//              weight     : 3
//          });
//
//          msNavigationServiceProvider.saveItem('operations', {
//             title      : 'Operations',
//             icon       : 'icon-tile-four',
//             state      : 'app.operations',
//             class      : 'navigation-dashboards project-dashboard',
//             weight     : 1
//          });
//
//          msNavigationServiceProvider.saveItem('reports', {
//               title      : 'Reports',
//               icon       : 'icon-tile-four',
//               state      : 'app.reports',
//               //translate  : 'CONFIGURATIONS.VEE.ALGCONFIG',
//               class      : 'navigation-dashboards project-dashboard',
//               weight     : 1
//           });
//         }
//       })();
