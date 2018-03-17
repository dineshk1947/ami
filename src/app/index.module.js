(function ()
{
    'use strict';

    /**
     * Main module of the AMI
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

             'app.login',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick Panel
            'app.quick-panel',

            'app.hierarchy',

            'app.hierarchy3',

            // Billing Determinants
           'app.billingDet',

            //Master
            'app.master',

            //Dcu
            'app.dcu',

            //SIM
            'app.sim',

            //Alg Config
            'app.algconfig',

            //Threshold Master
            'app.trConfig',

            //vee master
            'app.algorithmMaster',

            //tp & Events tampers
            'app.defineTampers',

            //tp & Events Master
            'app.eventsmaster',

            //Load Disconnect
            'app.loaddisconnect',

            //Load Reconnect
            'app.loadreconnect',

            //Read Meter
            'app.readParam',

            //Operations
            'app.operations',

            //Reports Load Profile
            'app.loadProfile',

            // Reports Power Factor
            'app.powerFactor',

            //Single And Multi Part Tariff Rates
            'app.singlemulti',

            // Tou Tariff Rates
            'app.toutariff',

            //Dashboards energy consumption
            'app.energyConsumption',

            //Dashboards Home
            'app.home',

            //Dashboards energy Demand
            'app.energyDemand',

            //Dashboards meter communication
            'app.meterComm',

            //Dashboards power quality
            'app.powerQuality',

            //Dashboards tamperAndEvents
            'app.tamperAndEvents',

            //Dashboards VEE
            'app.vee',

            'app.meterSearch',

      	    //Dashboards Meter Related
      	    'app.related',

            // modlue for  user adminnistartion
            'app.userAdmin',

            //  module Arewiase cosumer in Aggrigations
            'app.areawiseConsumer',

            //  module Arewiase cosumer in Aggrigations
            'app.networkwiseConsumer',


            //  module Arewiase Consumption in Aggrigations
            'app.areawiseConsumption',

            //Aggrigations - networkDetails
            'app.networkDetails',

            //Aggregations - regionDetails
            'app.regionDetails',

            // module for dinamic menu
             'app.menu',

             'ngStorage',

             //Aggregations Network Consumption
             'app.networkwiseConsumption',

             //Reports Billing Consumtion
             'app.billingConsumption',

             //Reports Billing Demand
             'app.billingDemand',

             //Reports Events Summay
             'app.eventsSummary',

             //Reports Billing Energy
             'app.billingEnergy',

             //Reports Events Individual
             'app.eventsIndividual',

             //assetManagement summary
             'app.installedCommunicated',

             //assetManagement commissioned
             'app.assetMgmtCommissioned',

             //assetManagement installed
             'app.installed',

             //asset Management communication

             'app.communicated'




        ]);
})();
