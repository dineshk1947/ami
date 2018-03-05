(function ()
{
    'use strict';

    angular
        .module('app.meterComm')
        .controller('MeterCommController', MeterCommController);

    /** @ngInject */
    function MeterCommController($http, $mdToast, baseUrl2, $rootScope, Clear, MessageInfo)
    {
        var vm = this;
        vm.Clear = Clear
        // alert($rootScope.modelArray);
        vm.meterComm ={};
        vm.currDate = new Date();
        vm.switch = "donutChart";
        vm.dataTable = false;
        vm.chart = false;
        vm.donut = true;
        var splitDate =  function(dt) {
          dt = dt + '';
          console.log(dt);
          return dt.split(' ')[2] + "-" + dt.split(' ')[1] + "-" + dt.split(' ')[3];
        }




        //hierarchy
        vm.showHeader=false;
        vm.hierarchyShow = function() {
          if(vm.showHeader==true){
            vm.showHeader=false;
          }
          else if(vm.showHeader==false)
          {
            vm.showHeader=true;
          }
        }
        //errorToast
        // vm.errorToast = function(mesg) {
        //   $mdToast.show(
        //     $mdToast.simple()
        //       .textContent(mesg)
        //       .position('top right')
        //       .hideDelay(3000)
        //       .toastClass('error')
        //   );
        // };
        // //successToast
        // vm.successToast = function(mesg, callback) {
        //  $mdToast.show(
        //    $mdToast.simple()
        //      .textContent(mesg)
        //      .position('top right')
        //      .hideDelay(3000)
        //      .toastClass('success')
        //  );
        // };
        //Hide and show donutChart and bar chart
        vm.displayFun = function(change) {
          console.log("change",change);
          if(change == "donutChart") {
            vm.donut = true;
            vm.chart = false;
          }else {
            vm.chart = true;
            vm.donut = false;
          }
        }

        //onclick Submit get counts
        //vm.statisticsTable = false;
        var data = {};
        vm.metercommSubmit = function() {

          vm.location = $rootScope.modelArray;
          vm.meterComm.fromDate = splitDate(vm.meterComm.fromDate);
          vm.meterComm.toDate = splitDate(vm.meterComm.toDate);

          var date = new Date() + "";
          var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
          data.createdDate = dateFormat;
          data.adminEntityValueId = 1000;
          data.createdBy = 1111;
          data.lastUpdatedBy = 1111;
          data.lastUpdatedDate = dateFormat;
          data.lastUpdatedLogin = 1111;
          data.meterComm = vm.meterComm;
          MessageInfo.showMessage(1005, '', '', '');

          $http({
              method : "POST",
              url : baseUrl2 + "mdm/dashboard/meter-status",
              data: data
          }).then(function mySuccess(response) {
              //vm.statisticsTable = true;
              var resp = response.data.statistics;
              //vm.counts = resp;
              console.log("checking for the response......",resp);


              var arr = [];
              var obj = {};
              for(var key in resp) {
                console.log(key +  "\n");
                if(key === "consumerCount") {
                    obj.name = "Total No Of Consumers";
                    obj.value = resp[key];
                    arr.push(obj);
                } else if (key  === 'commissioned') {
                  obj.name = "Commissioned"
                  obj.value = resp[key];
                  arr.push(obj);
                } else if ( key === 'installed' ) {
                  obj.name = "Installed"
                  obj.value = resp[key];
                  arr.push(obj);
                } else {
                  obj.name = "Meter In Store"
                  obj.value = resp[key];
                  arr.push(obj);
                }
                obj = {};
              }
              var arrTemp = arr;
              vm.discreteBarChart.data = [];
              var objTemp = {};
              objTemp.key = "Cumulative Return";
              objTemp.values = arrTemp;
              vm.discreteBarChart.data.push(objTemp);
              console.log(vm.discreteBarChart.data);
              //arrTemp.shift();
              vm.donutChart.data = arrTemp;

              //vm.successToast("Submitted Sucessfully");
          }, function myError(response) {
              //vm.errorToast("Something went wrong.. Please try again");
              MessageInfo.showMessage(1010, '', '', '');
              console.log(response);
          });
        }

        vm.donutChart = {
            options: {
                chart: {
                    type      : 'pieChart',
                    color       : ['#f44336', '#9c27b0', '#03a9f4', '#e91e63'],
                    height    : 350,
                    donut     : true,
                    x         : function (d)
                    {
                        return d.name;
                    },
                    y         : function (d)
                    {
                        return d.value;
                    },
                    showLabels: true,
                    labelType : 'percent',
                    transitionDuration: 500,
                    legend            : {
                        margin: {
                            top   : 5,
                            right : 70,
                            bottom: 5,
                            left  : 0
                        }
                    }
                }
            }
        };

        vm.discreteBarChart = {
          options : {
              chart: {
                type: 'discreteBarChart',
                color       : ['#f44336', '#9c27b0', '#03a9f4', '#e91e63'],
                height: 400,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function(d){return d.name;},
                y: function(d){return d.value;},
                showValues: true,
                wrapLabels : true,
                valueFormat: function(d){
                    return d3.format(',.f')(d);
                },
                duration: 500,
                xAxis: {
                    axisLabel: 'X Axis',
                    axisLabelDistance: 5
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: -10
                }
            }
          }
        };

        //am chart

        var chart = AmCharts.makeChart("chartdiv", {
            "theme": "light",
            "type": "serial",
        	"startDuration": 2,
            "dataProvider": [{
                "country": "USA",
                "visits": 4025,
                "color": "#FF0F00"
            }, {
                "country": "China",
                "visits": 1882,
                "color": "#FF6600"
            }, {
                "country": "Japan",
                "visits": 1809,
                "color": "#FF9E01"
            }, {
                "country": "Germany",
                "visits": 1322,
                "color": "#FCD202"
            }],
            "valueAxes": [{
                "position": "left",
                "title": "Visitors"
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
            "categoryField": "country",
            "categoryAxis": {
                "gridPosition": "start",
                "labelRotation": 90
            },
            "export": {
            	"enabled": true
             }

        });


    }
})();
