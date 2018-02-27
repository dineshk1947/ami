(function ()
{
    'use strict';

    angular
        .module('app.powerQuality')
        .controller('PowerQualityController', PowerQualityController);

    /** @ngInject */
    function PowerQualityController($http, $mdToast, baseUrl2, $rootScope, Clear)
    {
      var vm = this;
      vm.Clear = Clear;

      vm.progressShow=false;
      var pfRange1List;
      var pfRange2List;
      var pfRange3List;
      var pfRange4List;
      var data = {};
      vm.powerQuality ={};
      vm.statisticsTable = false;
      vm.switch = "donutChart";
      vm.showHeader = false;
      vm.dataTable = false;
      vm.chart = false;
      vm.donut = true;
      vm.chartShow=false;
      var arr = [];
      var obj = {};


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
        if(vm.powerQuality.fyear==currDate.getFullYear()) {
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
        if(vm.powerQuality.tyear==currDate.getFullYear()) {
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

      function validatePage() {
        // alert(vm.powerQuality.fmonth);
        // alert(vm.powerQuality.tmonth);
        var d = new Date();
        var currMonth = d.getMonth();


        if(vm.powerQuality.fmonth ===undefined || vm.powerQuality.fyear===undefined || vm.powerQuality.tmonth===undefined || vm.powerQuality.tyear===undefined){
          vm.errorToast("Please Select All Fields.");
           return false;
        }
        if((vm.powerQuality.fyear == vm.powerQuality.tyear) && (vm.powerQuality.fmonth > vm.powerQuality.tmonth) ){
          vm.errorToast("From Date Cannot be Less Than To Date");
           return false;
        }
        if( vm.powerQuality.tyear < vm.powerQuality.fyear  ){
          vm.errorToast("From Date Cannot be Less Than To Date");
           return false;
        }
        return true;
      }

      //onclick Submit get counts
      vm.powerQualitySubmit = function() {
        if(validatePage()){
        vm.progressShow=true;
        vm.powerQualityObject = [];
        vm.dataTable = false;
        vm.statisticsTable = false;
        vm.switch = "donutChart";
        var arr = [];
        var obj = {};

        var location = [];
        vm.location = [1008, null, null, null, null, null];
        var item;
      //  vm.location = $rootScope.modelArray;
        vm.powerQuality.location = vm.location;
        var date = new Date() + "";
        var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
        data.createdDate = dateFormat;
        data.adminEntityValueId = 1000;
        data.createdBy = 1111;
        data.lastUpdatedBy = 1111;
        data.lastUpdatedDate = dateFormat;
        data.lastUpdatedLogin = 1111;
        data.powerFactor = vm.powerQuality;
        console.log(data.powerFactor);

        $http({
            method : "POST",
            url : baseUrl2 + "mdm/dashboard/power-factor",
            data: data
        }).then(function mySuccess(response) {
            console.log("}}}}}}}}}}}}}}}}", data);

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
            pfRange1List = resp1.pfRange1List;
            pfRange2List = resp1.pfRange2List;
            pfRange3List = resp1.pfRange3List;
            pfRange4List = resp1.pfRange4List;

            for(var key in resp) {
              console.log(key +  "\n");
              // if(key === 'consumerCount') {
              //     obj.Title = "Total No Of<br> Consumers";
              //     obj.visits = resp[key];
              //     obj.color = "#ef7d40";
              //     arr.push(obj);
              // } else
               if (key  === 'pfRange1Count') {
                obj.Title = "PF > 0.98"
                obj.visits = resp[key];
                obj.color = "#a3b786";
                arr.push(obj);
              } else if ( key === 'pfRange2Count' ) {
              obj.Title = "PF < 0.98 & PF > 0.95"
                obj.visits = resp[key];
                obj.color = "#ed7d8c";
                arr.push(obj);
              } else if ( key === 'pfRange3Count' ) {
                obj.Title = "PF < 0.95 & PF > 0.8"
                obj.visits = resp[key];
                obj.color = "#86b4b7";
                arr.push(obj);
              } else if( key === 'pfRange4Count') {
                obj.Title = "PF < 0.8"
                obj.visits = resp[key];
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
              "dataProvider": arr,
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
          });


            vm.successToast("Submitted Sucessfully");
        }, function myError(response) {
            vm.errorToast("Something went wrong.. Please try again");
            console.log(response);
        });
      }
    }

      //onclick each count displayData
      vm.displayData = function(violated) {
        vm.dataTable = true;
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        console.log(violated);

        if (violated === 1) {
          console.log('pfRange1Count');
          vm.powerQualityHeading = 'PF > 0.98';
          vm.powerQualityObject = [];
          vm.powerQualityObject = pfRange1List;
          for (var i = 0; i < pfRange1List.length; i++) {
            vm.powerQualityObject[i].billingDate = splitDate(new Date(vm.powerQualityObject[i].billingDate + ''));
          }
        } else if(violated === 2) {
          console.log('pfRange2Count');
          vm.powerQualityHeading = 'PF < 0.98 & PF > 0.95';
          vm.powerQualityObject = [];
          vm.powerQualityObject = pfRange2List;
          for (var i = 0; i < pfRange2List.length; i++) {
            vm.powerQualityObject[i].billingDate = splitDate(new Date(vm.powerQualityObject[i].billingDate + ''));
          }
        } else if(violated === 3) {
          console.log('pfRange3Count');
          vm.powerQualityHeading = 'PF < 0.95 & PF > 0.8';
          vm.powerQualityObject = [];
          vm.powerQualityObject = pfRange3List;
          for (var i = 0; i < pfRange3List.length; i++) {
            vm.powerQualityObject[i].billingDate = splitDate(new Date(vm.powerQualityObject[i].billingDate + ''));
          }
        }  else {
          console.log('pfRange4Count');
          vm.powerQualityHeading = 'PF < 0.8';
          vm.powerQualityObject = [];
          vm.powerQualityObject = pfRange4List;
          for (var i = 0; i < pfRange4List.length; i++) {
            vm.powerQualityObject[i].billingDate = splitDate(new Date(vm.powerQualityObject[i].billingDate + ''));
          }
        }

      }

    }
})();
