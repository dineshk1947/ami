(function ()
{
    'use strict';

    angular
        .module('app.networkwiseConsumer')
        .controller('NetworkwiseConsumerController', NetworkwiseConsumerController);

    /** @ngInject */
    function NetworkwiseConsumerController($http,$mdToast,baseUrl3, $localStorage, $rootScope, Clear, MessageInfo)
    {
        var vm = this;
        vm.Clear =  Clear;
        vm.networkwiseConsumer ={};
        var data = {};
        var arr = [];
        var obj = {};
        vm.progressShow=false;
        //var modalArray = $rootScope.modalArray;

        var htConsumerCount;
        var ltConsumerCount;
        var wcspConsumerCount;
        var totalCount;
        var wctpConsumerCount;
        vm.networkwiseConsumer.statisticsTable = false;
        vm.switch = "";
        vm.chart = false;
        vm.donut = true;
        var userDetails = {};
        var currentUser = $localStorage.globals;
        userDetails = currentUser.currentUser;
        console.log(userDetails.levelName);
        var hierarchyID;
        if(userDetails.levelName == "SUB-DIVISION") {
          hierarchyID = userDetails.divisionId;
        }


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

        vm.getMonth = function() {
          // alert("hi");
        vm.fmonthDisable= false;
        vm.fmonth = monthArr;
          if(vm.networkwiseConsumer.fyear==currDate.getFullYear()) {
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
          if(vm.networkwiseConsumer.tyear==currDate.getFullYear()) {
            vm.tmonth = [];
            for (var i = 0; i <= currDate.getMonth(); i++) {
              vm.tmonth[i] = monthArr2[i];
            }
          }
          console.log(vm.tmonth);
        }


        function validatePage() {
          // alert("hi");
       // alert(vm.networkwiseConsumer.fmonth);
       // alert(vm.networkwiseConsumer.tmonth);
       var d = new Date();
       var currMonth = d.getMonth();

       if(vm.networkwiseConsumer.fmonth ===undefined || vm.networkwiseConsumer.fyear===undefined || vm.networkwiseConsumer.tmonth===undefined || vm.networkwiseConsumer.tyear===undefined){
         //vm.errorToast("Please Select All Fields.");
         MessageInfo.showMessage(1017, 'All Fields', '', '');
          return false;
       }
       if((vm.networkwiseConsumer.fyear == vm.networkwiseConsumer.tyear) && (vm.networkwiseConsumer.fmonth > vm.networkwiseConsumer.tmonth) ){
         //vm.errorToast("From Date Cannot be Less Than To Date");
           MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
          return false;
       }
       if( vm.networkwiseConsumer.tyear < vm.networkwiseConsumer.fyear  ){
         //vm.errorToast("From Date Cannot be Less Than To Date");
           MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
          return false;
       }
       return true;
     }



        vm.networkwiseConsumerSubmit = function(){
          if(validatePage()) {
          vm.progressShow=true;
          vm.networkwiseConsumer.statisticsTable = false;
          var modelArray = [];
          modelArray = $rootScope.modelArray;
          console.log($rootScope.modelArray);

          console.log("In Submission");
          vm.donut = true;
          vm.chart = false;
          var date = new Date() + "";
          var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
          data.createdDate = dateFormat;
          data.adminEntityValueId = 1000;
          data.createdBy = 1111;
          data.lastUpdatedBy = 1111;
          //vm.networkwiseConsumer = {};
          if(vm.networkwiseConsumer) {
            vm.fromDate = vm.networkwiseConsumer.fyear + "-" + vm.networkwiseConsumer.fmonth;
            vm.toDate = vm.networkwiseConsumer.tyear + "-" + vm.networkwiseConsumer.tmonth;
          } else {
            vm.fromDate = null;
            vm.toDate = null;
          }

          //vm.conType = vm.networkwiseConsumer.catTypeId;
          console.log("+++++++++++++++++");
          console.log(vm.fromDate);
          console.log(vm.toDate);
          //console.log(vm.conType);
          data.lastUpdatedDate = dateFormat;
          data.lastUpdatedLogin = 1111;
          data.fromDate = vm.fromDate;
          data.toDate = vm.toDate;
          //data.conType = vm.conType;
          data.hierarchyID = hierarchyID;
          data.modelArray = modelArray;

          MessageInfo.showMessage(1005, 'From Date', 'To Date', '');

          console.log(data);
          $http({
            method : "POST",
            url : baseUrl3 + "/mdm/aggregations/network-consumer-details",
            data: data
          }).then(function mySuccess(response) {
            vm.progressShow=false;

            console.log("}}}}}}}}}}}}}}}}");

            console.log(response.data.outBinds);
            var resp = response.data.outBinds;
            vm.counts  = resp;
            htConsumerCount = resp.htConsumerCount;
            ltConsumerCount = resp.ltConsumerCount;
            //wctpConsumerCount = resp.wctpConsumerCount;
            wcspConsumerCount = resp.wcspConsumerCount;
            wctpConsumerCount =resp.wctpConsumerCount;

            //vm.successToast("Submitted Sucessfully");
            vm.networkwiseConsumer.statisticsTable= true;
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
                obj.color = "#86b4b7";
                arr.push(obj);
              }
              obj = {};
            }
            console.log(arr);
            var arrTemp = arr;

            var chart = AmCharts.makeChart("networkChartDiv", {
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


            var chart2 = AmCharts.makeChart("networkDonutChartDiv", {
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



          }, function myError(response) {
            //vm.errorToast("Something went wrong.. Please try again");
              MessageInfo.showMessage(1010, '', '', '');
            console.log(response);
          });
        }
      }
      //  vm.networkwiseConsumerSubmit();
      }




})();
