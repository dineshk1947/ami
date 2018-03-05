(function ()
{
    'use strict';

    angular
        .module('app.energyDemand')
        .controller('EnergyDemandController', EnergyDemandController);

    /** @ngInject */
    function EnergyDemandController($http, $mdToast, baseUrl2, $rootScope, Clear, MessageInfo)
    {
        var vm = this;
        vm.Clear = Clear;
        vm.energyDemand = {};
        var slvList;
        var clvList;
        var drlvList;
        var data = {};
        var arr = [];
        var obj = {};
        vm.energyDemand.statisticsTable = false;
        vm.switch = "";
        vm.showHeader = false;
        vm.energyDemand.dataTable = false;
        vm.chart = false;
        vm.donut = true;
        vm.energyDemand.chartShow=false;
        vm.progressShow=false;

        vm.fmonthDisable= true;
        vm.tmonthDisable= true;
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

        var monthArr2 = [
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
        vm.fmonthDisable= false;
        vm.fmonth = monthArr;
          if(vm.energyDemand.fyear==currDate.getFullYear()) {
            vm.fmonth = [];
            for (var i = 0; i <= currDate.getMonth(); i++) {
              vm.fmonth[i] = monthArr[i];
            }
          }
          console.log(vm.fmonth);
        }

        vm.getMonth2 = function() {
        vm.tmonthDisable= false;
        vm.tmonth = monthArr2;
          if(vm.energyDemand.tyear==currDate.getFullYear()) {
            vm.tmonth = [];
            for (var i = 0; i <= currDate.getMonth(); i++) {
              vm.tmonth[i] = monthArr2[i];
            }
          }
          console.log(vm.tmonth);
        }

        var splitDate =  function(dt) {
          dt = dt + '';
          console.log(dt);
          return dt.split(' ')[2] + "-" + dt.split(' ')[1] + "-" + dt.split(' ')[3];
        }

      
        //function to hide or show hierarchy
        vm.hierarchyShow = function() {
          if(vm.showHeader) {
            vm.showHeader = false;
          }
          else {
            vm.showHeader = true;
          }
        }

        var dt = new Date();
        vm.currentYear = dt.getFullYear();
        vm.pastYear1 = vm.currentYear - 1;
        vm.pastYear2 = vm.currentYear - 2;

        //Hide and show donutChart and bar chart
        vm.displayFun = function(change) {
          console.log(change);
          if(change == "donutChart") {
            vm.donut = true;
            vm.chart = false;
          }else {
            vm.chart = true;
            vm.donut = false;
          }
        }

        vm.dtOptions = {
                    dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                    pagingType: 'simple',
                    autoWidth : false,
                    responsive: true
                  }

        //get catType list
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

        function validatePage() {
          if(vm.energyDemand.fmonth ===undefined || vm.energyDemand.fyear===undefined || vm.energyDemand.tmonth===undefined || vm.energyDemand.tyear===undefined || vm.energyDemand.catTypeId===undefined){
            //vm.errorToast("Please Select All Fields.");
            MessageInfo.showMessage(1017, 'All Fields', '', '');
             return false;
          }
          if((vm.energyDemand.fyear == vm.energyDemand.tyear) && (vm.energyDemand.fmonth > vm.energyDemand.tmonth) ){
            //vm.errorToast("From Date Cannot be Less Than To Date");
            MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
             return false;
          }
          if( vm.energyDemand.tyear < vm.energyDemand.fyear  ){
            //vm.errorToast("From Date Cannot be Less Than To Date");
            MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
             return false;
          }

          return true;
        }

        //onclick Submit get counts
        vm.energyDemandSubmit = function() {
         if(validatePage()){
          vm.energyDemand.dataTable = false;
          vm.energyDemand.statisticsTable = false;
          vm.donut = true;
          vm.chart = false;
          vm.energyConsumptionObject = [];
          vm.switch = "";
          var arr = [];
          var obj = {};
          vm.progressShow=true;
          var modelArray = $rootScope.modelArray;
          console.log("$rootScope.modelArray",$rootScope.modelArray);
          // var location = [];
          //   vm.location = [1008, null, null, null, null, null];
          var item;
          //vm.location = $rootScope.modelArray;
          //vm.energyDemand.location = vm.location;
          var date = new Date() + "";
          var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
          data.createdDate = dateFormat;
          data.adminEntityValueId = 1000;
          data.createdBy = 1111;
          data.lastUpdatedBy = 1111;
          data.lastUpdatedDate = dateFormat;
          data.lastUpdatedLogin = 1111;
          data.energyDemand = vm.energyDemand;
          data.modelArray = modelArray;
          console.log(data.energyDemand);

          MessageInfo.showMessage(1005, '', '', '');

          $http({
              method : "POST",
              url : baseUrl2 + "mdm/dashboard/energy-demand",
              data: data
          }).then(function mySuccess(response) {
              console.log("}}}}}}}}}}}}}}}}");

              vm.energyDemand.statisticsTable = true;
              vm.progressShow=false;
              var resp1 = response.data.statistics;
              var resp = response.data.statistics.counts;
              vm.counts = resp;
              console.log(resp);
              console.log(resp1);
              if(resp.consumerCount>0){
                vm.energyDemand.chartShow=true;
              }
              slvList = resp1.slvList;
              clvList = resp1.clvList;
              drlvList = resp1.drlvList;

              vm.energyDemand.statisticsTable = true;
              vm.donut = true;
              vm.switch = "donutChart";


              for(var key in resp) {
                // console.log(key +  "\n");
                // if(key === 'consumerCount') {
                //     obj.Title = "Total Number Of<br> Consumers";
                //     obj.visits = resp[key];
                //     obj.color = "#ef7d40";
                //     arr.push(obj);
                // } else
                 if (key  === 'slvCount') {
                  obj.Title = "Sanctioned Load<br> Violated"
                  obj.visits = resp[key];
                  obj.color = "#a3b786";
                  arr.push(obj);
                } else if ( key === 'clvCount' ) {
                obj.Title = "Contracted Load Violated"
                  obj.visits = resp[key];
                  obj.color = "#ed7d8c";
                  arr.push(obj);
                } else if ( key === 'drlvCount' ) {
                  obj.Title = "DR Load Violated"
                  obj.visits = resp[key];
                  obj.color = "#86b4b7";
                  arr.push(obj);
                }
                obj = {};
              }

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

              //vm.successToast("Submitted Sucessfully");
          }, function myError(response) {
              //vm.errorToast("Something went wrong.. Please try again");
                MessageInfo.showMessage(1010, '', '', '');
              console.log(response);
          });
        }
      }

        //onclick each count displayData
        vm.displayData = function(violated) {
          vm.energyDemand.dataTable = true;
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
          console.log(violated);

          if (violated === 'slv') {
            console.log('slv');
            vm.energyDemandHeading = 'Sanctioned Load Violated';
            vm.energyDemandObject = [];
            vm.energyDemandObject = slvList;
            for (var i = 0; i < drlvList.length; i++) {
              vm.energyDemandObject[i].billDate = splitDate(new Date(vm.energyDemandObject[i].billDate + ''));
            }
          } else if(violated === 'clv') {
            console.log('clv');
            vm.energyDemandHeading = 'Contracted Load Violated';
            vm.energyDemandObject = [];
            vm.energyDemandObject = clvList;
            for (var i = 0; i < drlvList.length; i++) {
              vm.energyDemandObject[i].billDate = splitDate(new Date(vm.energyDemandObject[i].billDate + ''));
            }
          } else {
            console.log('drlv');
            vm.energyDemandHeading = 'DR Load Violated';
            vm.energyDemandObject = [];
            vm.energyDemandObject = drlvList;
            for (var i = 0; i < drlvList.length; i++) {
              vm.energyDemandObject[i].billDate = splitDate(new Date(vm.energyDemandObject[i].billDate + ''));
            }
          }

        }

    }
})();
