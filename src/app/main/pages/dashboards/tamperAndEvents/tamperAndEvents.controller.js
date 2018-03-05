(function ()
{
    'use strict';

    angular
        .module('app.tamperAndEvents')
        .controller('TamperAndEventsController', TamperAndEventsController);

    /** @ngInject */
    function TamperAndEventsController($http, $mdToast, baseUrl2, $rootScope,Clear, MessageInfo)
    {
        var vm = this;
        vm.Clear = Clear;
        var slvList;
        var clvList;
        var drlvList;
        var data = {};
        vm.statisticsTable = false;
        vm.switch = "donutChart";
        vm.showHeader = false;
        vm.dataTable = false;
        vm.chart = false;
        vm.donut = true;
        vm.tampersEvents = {};

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
          if(vm.tampersEvents.fmonth ===undefined || vm.tampersEvents.fyear===undefined || vm.tampersEvents.tmonth===undefined || vm.tampersEvents.tyear===undefined ){
            //vm.errorToast("Please Select All Fields.");
             MessageInfo.showMessage(1017, 'All Fields', '', '');
             return false;
          }
          // if(vm.tampersEvents.fyear > vm.tampersEvents.tyear){
          //   //vm.errorToast("From Date Cannot be Less Than To Date.");
          //   MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
          //    return false;
          // }
          // if((vm.tampersEvents.fyear <= vm.tampersEvents.tyear) && vm.tampersEvents.fmonth > vm.tampersEvents.tmonth ){
          //   //vm.errorToast("From Date Cannot be Less Than To Date.");
          //   MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
          //    return false;
          // }

          if((vm.tampersEvents.fyear == vm.tampersEvents.tyear) && (vm.tampersEvents.fmonth > vm.tampersEvents.tmonth) ){
            //vm.errorToast("From Date Cannot be Less Than To Date");
            MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
             return false;
          }
          if( vm.tampersEvents.tyear < vm.tampersEvents.fyear  ){
            //vm.errorToast("From Date Cannot be Less Than To Date");
            MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
             return false;
          }
          return true;
        }

        //onclick Submit get counts
        vm.energyDemandSubmit = function() {
          if(validatePage()){
          // var location = [];
          // vm.location = location;
          var item;
          // vm.location = $rootScope.modelArray;
          // vm.energyDemand.location = vm.location;
          var date = new Date() + "";
          var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
          data.createdDate = dateFormat;
          data.adminEntityValueId = 1000;
          data.createdBy = 1111;
          data.lastUpdatedBy = 1111;
          data.lastUpdatedDate = dateFormat;
          data.lastUpdatedLogin = 1111;
          data.energyDemand = vm.energyDemand;
          console.log(data.energyDemand);

          MessageInfo.showMessage(1005, '', '', '');

          $http({
              method : "POST",
              url : baseUrl2 + "mdm/dashboard/energy-demand",
              data: data
          }).then(function mySuccess(response) {
              console.log("}}}}}}}}}}}}}}}}");

              vm.statisticsTable = true;
              var resp1 = response.data.statistics;
              var resp = response.data.statistics.counts;
              vm.counts = resp;
              console.log(resp);
              console.log(resp1);
              slvList = resp1.slvList;
              clvList = resp1.clvList;
              drlvList = resp1.drlvList;

              var arr = [];
              var obj = {};
              for(var key in resp) {
                console.log(key +  "\n");
                if(key === 'consumerCount') {
                    obj.name = "Total No Of Consumers";
                    obj.value = resp[key];
                    arr.push(obj);
                } else if (key  === 'slvCount') {
                  obj.name = "Sanctioned Load Violated"
                  obj.value = resp[key];
                  arr.push(obj);
                } else if ( key === 'clvCount' ) {
                  obj.name = "Contracted Load Violated"
                  obj.value = resp[key];
                  arr.push(obj);
                } else {
                  obj.name = "DR Load Violated"
                  obj.value = resp[key];
                  arr.push(obj);
                }
                console.log("..............................");
                console.log(obj);
                console.log(arr);
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
      }

        //onclick each count displayData
        vm.displayData = function(violated) {
          vm.dataTable = true;
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

    }
})();
