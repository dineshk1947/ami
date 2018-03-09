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
        vm.tampersEvents = {};
        vm.Clear = Clear;
        vm.tampersEvents.progressShow=false;
        var curList;
        var generalList;
        var nrlList;
        var otrList;
        var pwrList;
        var trnsList;
        var volList;
        var data = {};
        vm.tampersEvents.statisticsTable = false;
        vm.switch = "donutChart";
        vm.showHeader = false;
        vm.tampersEvents.dataTable = false;
        vm.chart = false;
        vm.donut = false;

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
          if(vm.tampersEvents.fyear==currDate.getFullYear()) {
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
          if(vm.tampersEvents.tyear==currDate.getFullYear()) {
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
        vm.tampersEventsSubmit = function() {
          if(validatePage()){
          vm.tampersEvents.dataTable = false;
          vm.tampersEvents.statisticsTable = false;
          vm.tampersEvents.progressShow=true;
        if(validatePage()){
          var modelArray = $rootScope.modelArray;
          console.log("$rootScope.modelArray After",$rootScope.modelArray);
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
          data.tampersEvents = vm.tampersEvents;
          data.modelArray=modelArray;
          console.log("data,",data);

          MessageInfo.showMessage(1005, '', '', '');

          $http({
              method : "POST",
              url : baseUrl2 + "mdm/dashboard/event-tampers",
              data: data
          }).then(function mySuccess(response) {
              console.log("}}}}}}}}}}}}}}}}",response);
              vm.tampersEvents.progressShow=false;
              vm.tampersEvents.statisticsTable = true;
              vm.donut = true;
              var resp1 = response.data.statistics;
              var resp = response.data.statistics.counts;
              vm.counts = resp;
              // console.log(resp);
              // console.log(resp1);

              curList=resp1.curList;
              generalList=resp1.generalList;
              nrlList=resp1.nrlList;
              otrList=resp1.otrList;
              pwrList=resp1.pwrList;
              trnsList=resp1.trnsList;
              volList=resp1.volList;


              var arr = [];
              var obj = {};
              for(var key in resp) {
                //console.log(key +  "\n");
                // if(key === 'totalCount') {
                //     obj.Title = "Total number of records";
                //     obj.visits = resp[key];
                //     arr.push(obj);
                // } else
                if (key  == 'volCount') {
                  obj.Title = "Voltage Violated"
                  obj.visits = resp[key];
                  obj.color = "#a3b786";
                  arr.push(obj);
                } else if ( key == 'curCount' ) {
                  obj.Title = "Current Violated"
                  obj.visits = resp[key];
                  obj.color = "#ed7d8c";
                  arr.push(obj);
                }
                else if ( key == 'pwrCount' ) {
                  obj.Title = "Power Violated"
                  obj.visits = resp[key];
                  obj.color = "#86b4b7";
                  arr.push(obj);
                }
                else if ( key == 'generalCount' ) {
                  obj.Title = "General Violated"
                  obj.visits = resp[key];
                  obj.color="#c6abc4";
                  arr.push(obj);
                }
                else if ( key == 'otrCount' ) {
                  obj.Title = "Others"
                  obj.visits = resp[key];
                  obj.color="#c6c2ab";
                  arr.push(obj);
                }
                else if ( key == 'nrlCount' ) {
                  obj.Title = "Non Roll Over"
                  obj.visits = resp[key];
                  obj.color= "#d1ab8a";
                  arr.push(obj);
                }
                 else  if ( key == 'trnsCount' ) {
                  obj.Title = "Tansaction Violated"
                  obj.visits = resp[key];
                  obj.color="#c6b7ab";
                  arr.push(obj);
                }
                // console.log("..............................");
                // console.log(arr);
                obj = {};
              }
              console.log("arr",arr);
              var arrTemp = arr;
              // vm.discreteBarChart.data = [];
              // var objTemp = {};
              // objTemp.key = "Cumulative Return";
              // objTemp.values = arrTemp;
              // vm.discreteBarChart.data.push(objTemp);
              // console.log(vm.discreteBarChart.data);
              // //arrTemp.shift();
              // vm.donutChart.data = arrTemp;

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
              //console.log(response);
          });
        }
      }
    }

        //onclick each count displayData
        vm.displayData = function(violated) {
          vm.tampersEvents.dataTable = true;
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
          console.log(violated);
          if (violated == 1) {
            console.log('slv');
            vm.tampersEventsHeading = 'Voltage Violated';
            vm.tampersEventsObject = [];
            vm.tampersEventsObject = volList;
            // for (var i = 0; i < drlvList.length; i++) {
            //   vm.tampersEventsObject[i].billDate = splitDate(new Date(vm.tampersEventsObject[i].billDate + ''));
            // }
          } else if(violated == 2) {
            console.log('clv');
            vm.tampersEventsHeading = 'Current Violated';
            vm.tampersEventsObject = [];
            vm.tampersEventsObject = curList;
            console.log(vm.tampersEventsObject);
            // for (var i = 0; i < drlvList.length; i++) {
            //   vm.tampersEventsObject[i].billDate = splitDate(new Date(vm.tampersEventsObject[i].billDate + ''));
            // }
          }
          else if(violated == 3) {
            console.log('clv');
            vm.tampersEventsHeading = 'Power Violated';
            vm.tampersEventsObject = [];
            vm.tampersEventsObject = pwrList;
            // for (var i = 0; i < drlvList.length; i++) {
            //   vm.tampersEventsObject[i].billDate = splitDate(new Date(vm.tampersEventsObject[i].billDate + ''));
            // }
          }
          else if(violated == 4) {
            console.log('clv');
            vm.tampersEventsHeading = 'General Violated';
            vm.tampersEventsObject = [];
            vm.tampersEventsObject = generalList;
            // for (var i = 0; i < drlvList.length; i++) {
            //   vm.tampersEventsObject[i].billDate = splitDate(new Date(vm.tampersEventsObject[i].billDate + ''));
            // }
          }
          else if(violated == 5) {
            console.log('clv');
            vm.tampersEventsHeading = 'Others';
            vm.tampersEventsObject = [];
            vm.tampersEventsObject = otrList;
            // for (var i = 0; i < drlvList.length; i++) {
            //   vm.tampersEventsObject[i].billDate = splitDate(new Date(vm.tampersEventsObject[i].billDate + ''));
            // }
          }
          else if(violated ==6) {
            console.log('clv');
            vm.tampersEventsHeading = 'Non Roll Over';
            vm.tampersEventsObject = [];
            vm.tampersEventsObject = nrlList;
            // for (var i = 0; i < drlvList.length; i++) {
            //   vm.tampersEventsObject[i].billDate = splitDate(new Date(vm.tampersEventsObject[i].billDate + ''));
            // }
          }
          else if(violated == 7) {
            console.log('clv');
            vm.tampersEventsHeading = 'Tansaction Violated';
            vm.tampersEventsObject = [];
            vm.tampersEventsObject = trnsList;
            // for (var i = 0; i < drlvList.length; i++) {
            //   vm.tampersEventsObject[i].billDate = splitDate(new Date(vm.tampersEventsObject[i].billDate + ''));
            // }
          }
          // else {
          //   console.log('drlv');
          //   vm.tampersEventsHeading = 'DR Load Violated';
          //   vm.tampersEventsObject = [];
          //   vm.tampersEventsObject = drlvList;
          //   for (var i = 0; i < drlvList.length; i++) {
          //     vm.tampersEventsObject[i].billDate = splitDate(new Date(vm.tampersEventsObject[i].billDate + ''));
          //   }
          // }

        }

        // vm.donutChart = {
        //     options: {
        //         chart: {
        //             type      : 'pieChart',
        //             color       : ['#f44336', '#9c27b0', '#03a9f4', '#e91e63'],
        //             height    : 350,
        //             donut     : true,
        //             x         : function (d)
        //             {
        //                 return d.name;
        //             },
        //             y         : function (d)
        //             {
        //                 return d.value;
        //             },
        //             showLabels: true,
        //             labelType : 'percent',
        //             transitionDuration: 500,
        //             legend            : {
        //                 margin: {
        //                     top   : 5,
        //                     right : 70,
        //                     bottom: 5,
        //                     left  : 0
        //                 }
        //             }
        //         }
        //     }
        // };
        //
        // vm.discreteBarChart = {
        //   options : {
        //       chart: {
        //         type: 'discreteBarChart',
        //         color       : ['#f44336', '#9c27b0', '#03a9f4', '#e91e63'],
        //         height: 400,
        //         margin : {
        //             top: 20,
        //             right: 20,
        //             bottom: 50,
        //             left: 55
        //         },
        //         x: function(d){return d.name;},
        //         y: function(d){return d.value;},
        //         showValues: true,
        //         wrapLabels : true,
        //         valueFormat: function(d){
        //             return d3.format(',.f')(d);
        //         },
        //         duration: 500,
        //         xAxis: {
        //             axisLabel: 'X Axis',
        //             axisLabelDistance: 5
        //         },
        //         yAxis: {
        //             axisLabel: 'Y Axis',
        //             axisLabelDistance: -10
        //         }
        //     }
        //   }
        // };

    }
})();
