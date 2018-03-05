(function ()
{
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController($http, baseUrl2, $location, $rootScope, Clear)
    {
        var vm = this;
        vm.Clear = Clear;

        //var modelArray = $rootScope.modelArray;
        var modelArray=[33001, 33002, 33003, null, null, null, null, null, null];
        console.log("$rootScope.modelArray",modelArray);

        //var modelArray = [null, null, null, null, null, null];
        //modelArray[0] = 1008;
        var data = {};
        vm.progressShow=true;

        var splitDate =  function(dt) {
          dt = dt + '';
          console.log(dt);
          return dt.split(' ')[2] + "-" + dt.split(' ')[1] + "-" + dt.split(' ')[3];
        }


        vm.redirect = function(rd) {
          if(rd === "ed")
          {
            $location.path('/energyDemand');
          }
          if(rd === "ec")
          {
            $location.path('/energyConsumption');
          }
          if(rd === "mis")
          {
            $location.path('/meterMasterRelated');
          }
          if(rd == "mc")
          {
            $location.path('/meterComm');
          }
          if(rd === "pf")
          {
            $location.path('/powerQuality');
          }
          if(rd === "vee")
          {
            $location.path('/vee');
          }
          if(rd === "te")
          {
            $location.path('/tampersAndEvents');
          }

        }

        //Meter Installation Status Past 3 months Data
        var d = new Date();
        var meterStatus ={};
        var arr = [];
        var obj = {};
        //meterStatus.location = modelArray;
        var newMonth = d.getMonth() - 1;
        if(newMonth < 0){
            newMonth += 12;
            d.setYear(d.getFullYear() - 1);
        }
        d.setMonth(newMonth);
        meterStatus.fromDate=splitDate(d);
        meterStatus.toDate=splitDate(new Date());
        data.meterStatus=meterStatus;



        $http({
            method : "POST",
            url : baseUrl2 + "mdm/dashboard/meter-status",
            data: data
        }).then(function mySuccess(response) {
            console.log("}}}}}}}}}}}}}}}}");
            console.log(response);
            vm.statisticsTable = true;
            vm.progressShow=false;
            var resp = response.data.statistics;
            vm.counts = resp;
            console.log(resp);
            vm.donut = true;
            vm.switch = "donutChart";
            for(var key in resp) {
              console.log(key +  "\n");
              // if(key === 'consumerCount') {
              //     obj.Title = "Total No Of <br>Consumers";
              //     obj.visits = resp[key];
              //     obj.color = "#ef7d40";
              //     arr.push(obj);
              // } else
              if (key  === 'commissioned') {
                obj.Title = "Commissioned"
                obj.visits = resp[key];
                obj.color = "#a3b786";
                arr.push(obj);
              } else if ( key === 'installed' ) {
              obj.Title = "Installed"
                obj.visits = resp[key];
                obj.color = "#86b4b7";
                arr.push(obj);
              } else if( key === 'meterInStore') {
                obj.Title = "Meter In Store"
                obj.visits = resp[key];
                obj.color = "#a886b7";
                arr.push(obj);
              }
              obj = {};
            }

            var arrTemp = arr;
            console.log("Arr for Chart is", arr);
            var chart2 = AmCharts.makeChart("meterStatusDonut", {
              "type": "pie",
              "theme": "light",
              "innerRadius": "40%",
              "labelRadius": -20,
              "colorField": "color",
              "labelText": "[[value]]",
              //"labelsEnabled": false,
              "gradientRatio": [-0.4, -0.4, -0.4, -0.4, -0.4, -0.4, 0, 0.1, 0.2, 0.1, 0, -0.2, -0.5],
              "dataProvider": arr,
              // "balloonText": "[[value]]",
              "valueField": "visits",
              "titleField": "Title",
              "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
              "export": {
                  "enabled": true
              },
          });
        }, function myError(response) {
            console.log(response);
        });

        //Power Factor , Energy Demand & Energy Consumption Past Month Data
        var powerFactor = {};
        var energyDemand = {};
        var energyConsumption ={};
        var PFarr = [];
        var PFobj = {};
        var ECarr = [];
        var ECobj = {};
        var EDarr = [];
        var EDobj = {};
        var dpf = new Date();
        var powerQuality ={};
        var TMonth = dpf.getMonth();
        var TYear= dpf.getFullYear();
        var FMonth=TMonth-1;
        var FYear = TYear;
        if(FMonth < 0){
            FMonth += 12;
            FYear=TYear-1;
        }
         if(TMonth==0){
           TMonth="01";
         } else if (TMonth==1){
           TMonth="02"
         }
         else if (TMonth==2){
           TMonth="03"
         }
         else if (TMonth==3){
           TMonth="04"
         }
         else if (TMonth==4){
           TMonth="05"
         }
         else if (TMonth==5){
           TMonth="06"
         }
         else if (TMonth==6){
           TMonth="07"
         }
         else if (TMonth==7){
           TMonth="08"
         }
         else if (TMonth==8){
           TMonth="09"
         }
         else if (TMonth==9){
           TMonth="10"
         }
         else if (TMonth==10){
           TMonth="11"
         }
         else if (TMonth==11){
           TMonth="12"
         }

          if(FMonth==0){
            FMonth="01";
          } else if (FMonth==1){
            FMonth="02"
          }
          else if (FMonth==2){
            FMonth="03"
          }
          else if (FMonth==3){
            FMonth="04"
          }
          else if (FMonth==4){
            FMonth="05"
          }
          else if (FMonth==5){
            FMonth="06"
          }
          else if (FMonth==6){
            FMonth="07"
          }
          else if (FMonth==7){
            FMonth="08"
          }
          else if (FMonth==8){
            FMonth="09"
          }
          else if (FMonth==9){
            FMonth="10"
          }
          else if (FMonth==10){
            FMonth="11"
          }
          else if (FMonth==11){
            FMonth="12"
          }

           powerFactor.fmonth=FMonth;
           powerFactor.fyear=FYear+"";
           powerFactor.tmonth=TMonth;
           powerFactor.tyear=TYear+"";
           //powerFactor.location = modelArray;

           energyDemand.fmonth=FMonth;
           energyDemand.fyear=FYear+"";
           energyDemand.tmonth=TMonth;
           energyDemand.tyear=TYear+"";
           energyDemand.catTypeId="2324";
           //energyDemand.location= modelArray;

           energyConsumption.catTypeId="2324";
           energyConsumption.month=FMonth;
           energyConsumption.year=FYear;
           //energyConsumption.location= modelArray;

           data.powerFactor=powerFactor;
           data.energyDemand=energyDemand;
           data.energyConsumption=energyConsumption;
           data.modelArray = modelArray;
           console.log("Data is", data);



           $http({
               method : "POST",
               url : baseUrl2 + "mdm/dashboard/power-factor",
               data: data
           }).then(function mySuccess(response) {
             vm.progressShow=false;
               console.log("}}}}}}}}}}}}}}}}//////PF DB response",response);
               var PFresp1 = response.data.statistics;
               var PFresp = response.data.statistics.counts;
               var counts = PFresp;
               console.log(PFresp);
               console.log(PFresp1);
               var pfRange1List = PFresp1.pfRange1List;
               var pfRange2List = PFresp1.pfRange2List;
               var pfRange3List = PFresp1.pfRange3List;
               var pfRange4List = PFresp1.pfRange4List;

               for(var key in PFresp) {
                 console.log(key +  "\n");
                //  if(key === 'consumerCount') {
                //      PFobj.Title = "Total No Of<br> Consumers";
                //      PFobj.visits = PFresp[key];
                //      PFobj.color = "#4286f4";
                //      PFarr.push(PFobj);
                //  } else
                 if (key  === 'pfRange1Count') {
                   PFobj.Title = "PF > 0.98"
                   PFobj.visits = PFresp[key];
                   PFobj.color = "#a3b786";
                   PFarr.push(PFobj);
                 } else if ( key === 'pfRange2Count' ) {
                   PFobj.Title = "PF < 0.98 & PF > 0.95"
                   PFobj.visits = PFresp[key];
                   PFobj.color = "#ed7d8c";
                   PFarr.push(PFobj);
                 } else if ( key === 'pfRange3Count' ) {
                   PFobj.Title = "PF < 0.95 & PF > 0.8"
                   PFobj.visits = PFresp[key];
                   PFobj.color = "#86b4b7";
                   PFarr.push(PFobj);
                 } else if( key === 'pfRange4Count') {
                   PFobj.Title = "PF < 0.8"
                   PFobj.visits = PFresp[key];
                   PFarr.push(PFobj);
                   PFobj.color = "#a886b7";
                 }
                 PFobj = {};
               }
               console.log("PFarr", PFarr);

               var PFPieChart = AmCharts.makeChart("PFPieChart", {
                 "type": "pie",
                 "theme": "light",
                 "dataProvider": PFarr,
                 "colorField": "color",
                 "labelRadius": -35,
                 "labelText": "[[value]]",
                 //"labelsEnabled": false,
                 "valueField": "visits",
                 "titleField": "Title",
                 //"outlineAlpha": 0.4,
                //  "labelRadius": "-1",
                 "depth3D": 15,
                 "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                 "angle": 30,
                 "export": {
                   "enabled": true
                 }
                 } );
           }, function myError(response) {
               console.log(response);
           });

           $http({
               method : "POST",
               url : baseUrl2 + "mdm/dashboard/energy-demand",
               data: data
           }).then(function mySuccess(response) {
               console.log("}}}}}}}}}}}}}}}}ED DB response", response);
               var EDresp1 = response.data.statistics;
               var EDresp = response.data.statistics.counts;
               var counts = EDresp;
               console.log(EDresp);
               console.log(EDresp1);
               var slvList = EDresp1.slvList;
               var clvList = EDresp1.clvList;
               var drlvList = EDresp1.drlvList;

               for(var key in EDresp) {
                 console.log(key +  "\n");
                //  if(key === 'consumerCount') {
                //      EDobj.Title = "Total Number Of<br> Consumers";
                //      EDobj.visits = EDresp[key];
                //      EDobj.color = "#ef7d40";
                //      EDarr.push(EDobj);
                //  } else
                    if (key  === 'slvCount') {
                     EDobj.Title = "Sanctioned Load<br> Violated"
                     EDobj.visits = EDresp[key];
                     EDobj.color = "#a3b786";
                     EDarr.push(EDobj);
                 } else if ( key === 'clvCount' ) {
                     EDobj.Title = "Contracted Load Violated"
                     EDobj.visits = EDresp[key];
                     EDobj.color = "#ed7d8c";
                     EDarr.push(EDobj);
                 } else if ( key === 'drlvCount' ) {
                     EDobj.Title = "DR Load Violated"
                     EDobj.visits = EDresp[key];
                     EDobj.color = "#86b4b7";
                     EDarr.push(EDobj);
                 }
                 EDobj = {};
               }
               console.log("EDarr",EDarr);


               var energyDemandBar = AmCharts.makeChart("energyDemandBar", {
                   "theme": "light",
                   "type": "serial",
                   "startDuration": 2,
                   "dataProvider": EDarr,
                   "labelsEnabled": false,
                   "valueAxes": [{
                       "font-style": "Arial",
                       "position": "left",
                       "title": "Consumers"
                   }],
                   "graphs": [{
                       "balloonText": "[[category]]: <b>[[value]]</b>",
                       "fillColorsField": "color",
                       "fillAlphas": 1,
                       "lineAlpha": 0.1,
                       "type": "column",
                       "valueField": "visits"
                   }],
                 "depth3D": 20,
                 "angle": 30,
                   "chartCursor": {
                       "categoryBalloonEnabled": false,
                       "cursorAlpha": 0,
                       "zoomable": false
                   },
                   "categoryField": "Title",
                   "categoryAxis": {
                       "gridPosition": "start",
                       "labelRotation": 60,
                       "labelsEnabled": false
                   },
                   "export": {
                     "enabled": true
                   },
               });

           }, function myError(response) {
               vm.errorToast("Something went wrong.. Please try again");
           });

           $http({
               method : "POST",
               url : baseUrl2 + "mdm/dashboard/energy-consumption",
               data: data
           }).then(function mySuccess(response) {
               console.log("}}}}}}}}}}}}}}}}EC DB response", response);

               var ECresp1 = response.data.statistics;
               var ECresp = response.data.statistics.counts;
               var counts = ECresp;
               console.log(ECresp);
               console.log(ECresp1);
               var abHighCapCount = counts.abnormallyHighCount;
               var abLowCapCount = counts.abnormallyLowCount;
               var hCapCount = counts.highCount;
               var lowCapCount = counts.lowCount;
               var totalCount = counts.consumerCount;

            for(var key in ECresp) {
              console.log(key +  "\n");
              // if(key === 'consumerCount') {
              //     ECobj.Title = "Total number Of<br> Consumption";
              //     ECobj.visits = ECresp[key];
              //     ECobj.color = "#ef7d40";
              //     ECarr.push(ECobj);
              // } else
              if (key  === 'highCount') {
                  ECobj.Title = "High Consumption"
                  ECobj.visits = ECresp[key];
                  ECobj.color = "#a3b786";
                  ECarr.push(ECobj);
              } else if ( key === 'abnormallyHighCount' ) {
                  ECobj.Title = "Abnormally High"
                  ECobj.visits = ECresp[key];
                  ECobj.color = "#ed7d8c";
                  ECarr.push(ECobj);
              } else if ( key === 'lowCount' ) {
                  ECobj.Title = "Low"
                  ECobj.visits = ECresp[key];
                  ECobj.color = "#86b4b7";
                  ECarr.push(ECobj);
              } else if(key === 'abnormallyLowCount'){
                  ECobj.Title = "Abnormally Low"
                  ECobj.visits = ECresp[key];
                  ECobj.color = "#a886b7";
                  ECarr.push(ECobj);
              }
              ECobj = {};
            }
               console.log("ECarr", ECarr);
               var energyConsumptionBar = AmCharts.makeChart("energyConsumptionBar", {
                 "theme": "light",
                 "type": "serial",
                 "startDuration": 2,
                 "dataProvider": ECarr,
                 "labelsEnabled": false,
                 "valueAxes": [{
                     "position": "left",
                     "title": "Consumers"
                 }],
                 "graphs": [{
                     "balloonText": "[[category]]: <b>[[value]]</b>",
                     "fillColorsField": "color",
                     "fillAlphas": 1,
                     "lineAlpha": 0.1,
                     "type": "column",
                     "valueField": "visits"
                 }],
               "depth3D": 20,
               "angle": 30,
                 "chartCursor": {
                     "categoryBalloonEnabled": false,
                     "cursorAlpha": 0,
                     "zoomable": false
                 },
                 "categoryField": "Title",
                 "categoryAxis": {
                     "gridPosition": "start",
                     "labelRotation": 60,
                     "labelsEnabled": false
                 },
                 "export": {
                   "enabled": true
                  }

             });
           }, function myError(response) {
               console.log(response);
           });
     }
})();
