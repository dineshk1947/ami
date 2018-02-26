(function ()
{
    'use strict';

    angular
        .module('app.energyConsumption')
        .controller('EnergyConsumptionController', EnergyConsumptionController);

    /** @ngInject */
    function EnergyConsumptionController($http, baseUrl2, $rootScope, $mdToast, Clear)
    {
        var vm = this;
        vm.Clear = Clear;
        vm.progressShow=false;
        vm.monthDisable= true;
        vm.statisticsTable = false;
        vm.showHeader = false;
        vm.dataTable = false;
        vm.switch = "";
        vm.chart = false;
        vm.donut = true;
        vm.energyConsumption={};
        var arr = [];
        var obj = {};
        vm.tab1=false;
        //vm.chart = true;
        vm.energyConsumptionObject = [];
        vm.chartShow=false;

        var abnormallyHighCursor;
        var abnormallyLowCusor;
        var highCursor;
        var lowCursor;



        //function to hide or show hierarchy
        vm.hierarchyShow = function() {
          if(vm.showHeader) {
            vm.showHeader = false;
          }
          else {
            vm.showHeader = true;
          }
        }

        var splitDate =  function(dt) {
          dt = dt + '';
          console.log(dt);
          return dt.split(' ')[2] + "-" + dt.split(' ')[1] + "-" + dt.split(' ')[3];
        }

        vm.errorToast = function(mesg) {
          $mdToast.show(
            $mdToast.simple()
              .textContent(mesg)
              .position('top right')
              .hideDelay(3000)
              .toastClass('error')
          );
        };

        vm.successToast = function(mesg, callback) {
         $mdToast.show(
           $mdToast.simple()
             .textContent(mesg)
             .position('top right')
             .hideDelay(3000)
             .toastClass('success')
         );
      };

      vm.displayFun = function(change) {
        console.log(change);
        if(change == "donutChart") {
          vm.donut = true;
          vm.chart = false;
        }else if(change == "barchart") {
          vm.chart = true;
          vm.donut = false;
        }
      }

      vm.displayData = function(violated) {
        vm.dataTable = true;
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        console.log(violated);

        if (violated === 'hc') {
          vm.tbl1=true;
          vm.tbl2=false;
          vm.tbl3=false;
          vm.tbl4=false;
          vm.energyConsumptionHeading = 'High Consumption';
          vm.energyConsumptionObject = [];
          vm.energyConsumptionObject = highCursor;
          for (var i = 0; i < highCursor.length; i++) {
            vm.energyConsumptionObject[i].avegConsumption = vm.energyConsumptionObject[i].avegConsumption.toFixed(2);;
          }
            console.log("High Consumption click");
            console.log("vm.energyConsumptionObject",vm.energyConsumptionObject);
        } else if(violated === 'ah') {
          vm.tbl1=false;
          vm.tbl2=true;
          vm.tbl3=false;
          vm.tbl4=false;
          vm.energyConsumptionHeading = 'Abnormally High';
          vm.energyConsumptionObject = [];
          vm.energyConsumptionObject = abnormallyHighCursor;
          for (var i = 0; i < highCursor.length; i++) {
            vm.energyConsumptionObject[i].avegConsumption = vm.energyConsumptionObject[i].avegConsumption.toFixed(2);;
          }
          console.log("Abnormally High click");
          console.log("vm.energyConsumptionObject",vm.energyConsumptionObject);
        }
        else if(violated === 'l') {
          vm.tbl1=false;
          vm.tbl2=false;
          vm.tbl3=true;
          vm.tbl4=false;
          vm.energyConsumptionHeading = 'Low';
          vm.energyConsumptionObject = [];
          vm.energyConsumptionObject = lowCursor;
          for (var i = 0; i < highCursor.length; i++) {
            //vm.energyConsumptionObject[i].avegConsumption = vm.energyConsumptionObject[i].avegConsumption.toFixed(2);;
          }
            console.log("Low click");
          console.log("vm.energyConsumptionObject",vm.energyConsumptionObject);
        } else {
          vm.tbl1=false;
          vm.tbl2=false;
          vm.tbl3=false;
          vm.tbl4=true;
          vm.energyConsumptionHeading = 'Abnormally Low';
          vm.energyConsumptionObject = [];
          vm.energyConsumptionObject = abnormallyLowCusor;
          for (var i = 0; i < highCursor.length; i++) {
            vm.energyConsumptionObject[i].avegConsumption = vm.energyConsumptionObject[i].avegConsumption.toFixed(2);;
          }
          console.log("Abnormally Low click");
          console.log("vm.energyConsumptionObject",vm.energyConsumptionObject);
        }

      }

      $http({
          method : "GET",
          url : baseUrl2 + "mdm/vee/threshold/get-conType",
          data: data
      }).then(function mySuccess(response) {
          console.log(response.data);
          vm.catType = response.data;
      }, function myError(response) {
          console.log(response);
      });

        var data = {};
        var dt = new Date();
        vm.currentYear = dt.getFullYear();
        vm.pastYear1 = vm.currentYear - 1;
        vm.pastYear2 = vm.currentYear - 2;
        vm.chart = true;
        var currDate= new Date();
        var monthArr = [
          {'month':"January",'value':"01"},
          {'month':"February",'value':"02"},
          {'month':"March",'value':"03"},
          {'month':"April",'value':"04"},
          {'month':"May",'value':"05"},
          {'month':"June",'value':"06"},
          {'month':"July",'value':"07"},
          {'month':"August",'value':"08"},
          {'month':"September",'value':"09"},
          {'month':"October",'value':"10"},
          {'month':"November",'value':"11"},
          {'month':"December",'value':"12"}
        ];

        //currDate=splitDate(currDate); //30-Jan-2018
        vm.getMonth = function() {
        vm.monthDisable= false;
        vm.month = monthArr;
        console.log(vm.energyConsumption.year);
        console.log(currDate.getFullYear());
          if(vm.energyConsumption.year==currDate.getFullYear()) {
            console.log(currDate.getMonth());
            vm.month = [];
            for (var i = 0; i <= currDate.getMonth(); i++) {
              vm.month[i] = monthArr[i];
            }
          }
          console.log(vm.month);
        }

        function validateEnergyConsumption(){
           var currDate= new Date()+"";
           currDate=splitDate(currDate);
           //alert(currDate);
           var frMonth = vm.energyConsumption.month;
           var frYear =  vm.energyConsumption.year;
           var cat = vm.energyConsumption.catTypeId;
          if(frMonth == undefined ||  frYear  == undefined || cat == undefined )
          {
            vm.errorToast("Please Select All Fields.");
            return false;
          }
          return true;
        }

        vm.selection =function() {
          console.log(vm.tab1);

          if(vm.energyConsumption.catTypeId == 10000 || vm.energyConsumption.catTypeId==10002){
            console.log(vm.tab1);
           vm.tab1=true;
           console.log(vm.tab1);

          }
          else {
            vm.tab1=false;
          }
        }

          // Function to submit the form
        vm.energyConsumptionSubmit = function() {
          vm.dataTable = false;
          vm.statisticsTable = false;
          vm.donut = true;
          vm.chart = false;
          vm.energyConsumptionObject = [];
          vm.switch = "";
          var arr = [];
          var obj = {};

          if(validateEnergyConsumption()){
           vm.progressShow=true;
           var location = [];
             vm.location = [1008, null, null, null, null, null];
           var item;
           //m.location = $rootScope.modelArray;
           vm.energyConsumption.location = vm.location;
          var date = new Date() + "";
          var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
          var selectDate;
          data.createdDate = splitDate(date);
          data.adminEntityValueId = 1000;
          data.createdBy = 1111;
          data.lastUpdatedBy = 1111;
          data.lastUpdatedDate = splitDate(date);
          data.lastUpdatedLogin = 1111;
          console.log("ppppppppppppppppppppp");
          data.energyConsumption = vm.energyConsumption;
          console.log(data);

          $http({
              method : "POST",
              url : baseUrl2 + "mdm/dashboard/energy-consumption",
              data: data
          }).then(function mySuccess(response) {
              console.log("}}}}}}}}}}}}}}}}", response);
              vm.statisticsTable = true;
              vm.progressShow=false;
              var resp1 = response.data.statistics;
              var resp = response.data.statistics.counts;
              vm.counts = resp;
              console.log(resp);
              console.log(resp1);
              if(resp.consumerCount>0){
                vm.chartShow=true;
              }
              vm.abHighCapCount = vm.counts.abnormallyHighCount;
              vm.abLowCapCount = vm.counts.abnormallyLowCount;
              vm.hCapCount = vm.counts.highCount;
              vm.lowCapCount = vm.counts.lowCount;
              vm.totalCount = vm.counts.consumerCount;
              vm.statisticsTable = true;
              vm.donut = true;
              vm.switch = "donutChart";

              abnormallyHighCursor = resp1.abnormallyHighCursor;
              abnormallyLowCusor = resp1.abnormallyLowCusor;
              highCursor = resp1.highCursor;
              lowCursor = resp1.lowCursor;
              console.log("abnormallyHighCursor",abnormallyHighCursor);
              console.log("abnormallyLowCusor",abnormallyLowCusor);
              console.log("highCursor",highCursor);
              console.log("lowCursor",lowCursor);

           for(var key in resp) {
             console.log(key +  "\n");
            //  if(key === 'consumerCount') {
            //      obj.Title = "Total number Of<br> Consumption";
            //      obj.visits = resp[key];
            //      obj.color = "#ef7d40";
            //      arr.push(obj);
            //  } else
            if (key  === 'highCount') {
               obj.Title = "High Consumption"
               obj.visits = resp[key];
               obj.color = "#a3b786";
               arr.push(obj);
             } else if ( key === 'abnormallyHighCount' ) {
             obj.Title = "Abnormally High"
               obj.visits = resp[key];
               obj.color = "#ed7d8c";
               arr.push(obj);
             } else if ( key === 'lowCount' ) {
               obj.Title = "Low"
               obj.visits = resp[key];
               obj.color = "#86b4b7";
               arr.push(obj);
             } else if( key === 'abnormallyLowCount') {
               obj.Title = "Abnormally Low"
               obj.visits = resp[key];
               obj.color = "#a886b7";
               arr.push(obj);
             }
             obj = {};
           }
             console.log(arr);

              var arrTemp = arr;

              var chart = AmCharts.makeChart("chartdiv", {
                  "theme": "light",
                  "type": "serial",
                  "startDuration": 2,
                  "dataProvider": arr,
                  "valueAxes": [{
                      "position": "left",
                      "title": "Total Number Of Consumption"
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
                  },
                  "export": {
                    "enabled": true
                   }

              });

              var chart2 = AmCharts.makeChart("donutchartdiv", {
                "type": "pie",
                "theme": "light",
                "innerRadius": "40%",
                "colorField": "color",
                "gradientRatio": [-0.4, -0.4, -0.4, -0.4, -0.4, -0.4, 0, 0.1, 0.2, 0.1, 0, -0.2, -0.5],
                "dataProvider": arr,
                "balloonText": "[[value]]",
                "valueField": "visits",
                "titleField": "Title",
                "balloon": {
                    "drop": true,
                    "adjustBorderColor": false,
                    "color": "#FFFFFF",
                    "fontSize": 16
                },
                "export": {
                    "enabled": true
                }
            });

              vm.successToast("Submitted Sucessfully");
          }, function myError(response) {
              vm.errorToast("Something went wrong.. Please try again");
              console.log(response);
          });
        }
      }

    }
})();
