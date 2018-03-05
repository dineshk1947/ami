(function ()
{
    'use strict';

    angular
        .module('app.areawiseConsumer')
        .controller('AreawiseConsumerController', AreawiseConsumerController);

    /** @ngInject */
    function AreawiseConsumerController($http,$mdToast,baseUrl3,$rootScope, Clear, MessageInfo)
    {
        var vm = this;
        vm.Clear =  Clear;
        var data = {};
        var arr = [];
        var obj = {};
        vm.areawiseConsumer={};
        vm.progressShow = false;

        var htConsumerCount;
        var ltConsumerCount;
        var wcspConsumerCount;
        var wctpConsumerCount
        var totalCount;
        vm.areawiseConsumer.statisticsTable = false;
        vm.switch = "";
        vm.chart = false;
        vm.donut = true;
        vm.progressShow=false;




        //function to hide or show hierarchy
        // vm.errorToast = function(mesg) {
        //   $mdToast.show(
        //     $mdToast.simple()
        //       .textContent(mesg)
        //       .position('top right')
        //       .hideDelay(3000)
        //       .toastClass('error')
        //   );
        // };
        // vm.successToast = function(mesg, callback) {
        //  $mdToast.show(
        //    $mdToast.simple()
        //      .textContent(mesg)
        //      .position('top right')
        //      .hideDelay(3000)
        //      .toastClass('success')
        //  );
        // };


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
        // alert("hi");
      vm.fmonthDisable= false;
      vm.fmonth = monthArr;
        if(vm.areawiseConsumer.fyear==currDate.getFullYear()) {
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
        if(vm.areawiseConsumer.tyear==currDate.getFullYear()) {
          vm.tmonth = [];
          for (var i = 0; i <= currDate.getMonth(); i++) {
            vm.tmonth[i] = monthArr2[i];
          }
        }
        console.log(vm.tmonth);
      }




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

        var dt = new Date();
        vm.currentYear = dt.getFullYear();
        vm.pastYear1 = vm.currentYear - 1;
        vm.pastYear2 = vm.currentYear - 2;
        //
        // //get catType list
        // $http({
        //     method : "GET",
        //     url : baseUrl3 + "mdm/vee/threshold/get-conType"
        // }).then(function mySuccess(response) {
        //     console.log(response.data);
        //     vm.catType = response.data;
        // }, function myError(response) {
        //     console.log(response);
        // });

        vm.hierarchyShow = function() {
          if(vm.showHeader) {
            vm.showHeader = false;
          }
          else {
            vm.showHeader = true;
          }
        }

        function validatePage() {
          // alert("hi");
       // alert(vm.areawiseConsumer.fmonth);
       // alert(vm.areawiseConsumer.tmonth);
       var d = new Date();
       var currMonth = d.getMonth();

       if(vm.areawiseConsumer.fmonth ===undefined || vm.areawiseConsumer.fyear===undefined || vm.areawiseConsumer.tmonth===undefined || vm.areawiseConsumer.tyear===undefined){
         //vm.errorToast("Please Select All Fields.");
         MessageInfo.showMessage(1017, 'All Fields', '', '');
          return false;
       }
       if((vm.areawiseConsumer.fyear == vm.areawiseConsumer.tyear) && (vm.areawiseConsumer.fmonth > vm.areawiseConsumer.tmonth) ){
         //vm.errorToast("From Date Cannot be Less Than To Date");
          MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
          return false;
       }
       if( vm.areawiseConsumer.tyear < vm.areawiseConsumer.fyear  ){
         //vm.errorToast("From Date Cannot be Less Than To Date");
          MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
          return false;
       }
       return true;
     }

        vm.areawiseConsumerSubmit = function(){
          if(validatePage()){
          vm.progressShow=true;
          vm.areawiseConsumer.statisticsTable = false;
          var modelArray = [];
          modelArray = $rootScope.modelArray;
          console.log($rootScope.modelArray);
          vm.donut = true;
          vm.chart = false;
          var date = new Date() + "";
          var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
          data.createdDate = dateFormat;
          data.adminEntityValueId = 1000;
          data.createdBy = 1111;
          data.lastUpdatedBy = 1111;
          vm.fromDate = vm.areawiseConsumer.fyear + "-" + vm.areawiseConsumer.fmonth;
          vm.toDate = vm.areawiseConsumer.tyear + "-" + vm.areawiseConsumer.tmonth;
          //vm.conType = vm.areawiseConsumer.catTypeId;
          console.log("+++++++++++++++++");
          console.log(vm.fromDate);
          console.log(vm.toDate);
          //console.log(vm.conType);
          data.lastUpdatedDate = dateFormat;
          data.lastUpdatedLogin = 1111;
          data.fromDate = vm.fromDate;
          data.toDate = vm.toDate;
          //data.conType = vm.conType;
        //  data.userId = 1;
          data.modelArray = modelArray;
          MessageInfo.showMessage(1005, '', '', '');
          console.log(data);
          $http({
            method : "POST",
            url : baseUrl3 + "mdm/aggregations/area-consumer-details",
            data: data
          }).then(function mySuccess(response) {

            console.log("}}}}}}}}}}}}}}}}");

            console.log(response);
            vm.progressShow=false;
            var resp = response.data.outBinds;
            vm.counts  = resp;
            htConsumerCount = resp.htConsumerCount;
            ltConsumerCount = resp.ltConsumerCount;
            wctpConsumerCount = resp.wctpConsumerCount;
            wcspConsumerCount = resp.wcspConsumerCount;

            //vm.successToast("Submitted Sucessfully");
            vm.areawiseConsumer.statisticsTable= true;
            vm.donut = true;
            vm.switch = "donutChart";

            arr = [];
            for(var key in resp) {
              console.log(key +  "\n");
              if (key  === 'htConsumerCount') {
                obj.Title = "HT"
                obj.visits = resp[key];
                obj.color = "#a3b786";
                arr.push(obj);
              }
              else if ( key === 'ltConsumerCount' ) {
                obj.Title = "LTCT"
                obj.visits = resp[key];
                obj.color = "#ed7d8c";
                arr.push(obj);
              }
              else if ( key === 'wcspConsumerCount' ) {
                obj.Title = "WC 1-Phase"
                obj.visits = resp[key];
                obj.color = "#ef7d40";
                arr.push(obj);
              }
              else if ( key === 'wctpConsumerCount' ) {
                obj.Title = "WC 3-Phase"
                obj.visits = resp[key];
                obj.color = "#ef7d40";
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
              "colorField": "color",
              "innerRadius": "40%",
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

          }, function myError(response) {
            //vm.errorToast("Something went wrong.. Please try again");
            MessageInfo.showMessage(1010, '', '', '');
            console.log(response);
          });
        }
       }
      }
})();
