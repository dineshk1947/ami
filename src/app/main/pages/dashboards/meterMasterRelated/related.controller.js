
(function(){
  'use strict';
  angular
  .module('app.related')
  .controller('RelatedController',RelatedController);
  function RelatedController($http, $mdToast, baseUrl2, $rootScope, Clear, MessageInfo) {
    var vm = this;
    vm.Clear = Clear;
    //hierarchyControl.HierarchyController();

    var data = {};
    vm.meterStatus ={};
    vm.showHeader=false;
    vm.switch = "donutChart";
    vm.dataTable = false;
    vm.chart = false;
    vm.donut = true;
    vm.currDate = new Date();
    vm.meterStatus.chartShow=false;
    var arr = [];
    var obj = {};
    vm.progressShow=false;
    vm.hierarchyObj=$rootScope.hierarchyObj;

    var splitDate =  function(dt) {
      dt = dt + '';
      console.log(dt);
      return dt.split(' ')[2] + "-" + dt.split(' ')[1] + "-" + dt.split(' ')[3];
    }

    vm.hierarchyShow = function() {
      if(vm.showHeader==true){
        vm.showHeader=false;
      }
      else if(vm.showHeader==false)
      {
        vm.showHeader=true;
      }
    }

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
    //Validation fun

    function validMeter() {
      if(vm.meterStatus.fromDate ===undefined || vm.meterStatus.toDate===undefined){
         //vm.errorToast("Please Select Both From Date And To Date");
         MessageInfo.showMessage(7002, '', '', '');
         return false;
      }
      if(vm.meterStatus.fromDate >= vm.meterStatus.toDate){
        //vm.errorToast("To Date Must Be Greater Than From Date. ");
        MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
         return false;
      }
      return true;
    }

    //onclick Submit get counts
    vm.meterStatus.statisticsTable = false;
    vm.meterStatusSubmit = function() {
      if(validMeter()){
        vm.progressShow=true;
        vm.dataTable = false;
        vm.meterStatus.statisticsTable = false;
        vm.donut = true;
        vm.chart = false;
        //vm.energyConsumptionObject = [];
        vm.switch = "";
        var arr = [];
        var obj = {};
        var location = [];
        //vm.location = location;
        var item;

        var modelArray = $rootScope.modelArray;
        console.log("$rootScope.modelArray",$rootScope.modelArray);

        vm.meterStatus.fromDate = splitDate(vm.meterStatus.fromDate);
        vm.meterStatus.toDate = splitDate(vm.meterStatus.toDate);

        var date = new Date() + "";
        var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
        data.createdDate = dateFormat;
        data.adminEntityValueId = 1000;
        data.createdBy = 1111;
        data.lastUpdatedBy = 1111;
        data.lastUpdatedDate = dateFormat;
        data.lastUpdatedLogin = 1111;
        data.meterStatus = vm.meterStatus;
        data.modelArray=modelArray;
        console.log("data sent to DB",data);
        MessageInfo.showMessage(1005, '', '', '');

        $http({
            method : "POST",
            url : baseUrl2 + "mdm/dashboard/meter-status",
            data: data
        }).then(function mySuccess(response) {
            vm.meterStatus.statisticsTable = true;
            vm.progressShow=false;
            var resp = response.data.statistics;
            vm.counts = resp;
            console.log(resp);
            if(resp.consumerCount>0){
              vm.meterStatus.chartShow=true;
            }
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
                obj.color = "#ed7d8c";
                arr.push(obj);
              } else if( key === 'meterInStore') {
                obj.Title = "Meter In Store"
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
  

  }

})();
