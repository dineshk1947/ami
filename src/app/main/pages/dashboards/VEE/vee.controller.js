(function ()
{
    'use strict';

    angular
        .module('app.vee')
        .controller('VeeController', VeeController);

    /** @ngInject */
    function VeeController($http, baseUrl2, $mdToast, $rootScope, $mdDialog,Clear)
    {
        var vm = this;
        vm.Clear = Clear;
        vm.Vee={};
        vm.showHeader = false;
        vm.statisticsTable = false;
        vm.currDate=new Date();
        var data = {};

        // Function to show / hide heirarchy
        vm.hierarchyShow = function() {
          if(vm.showHeader) {
            vm.showHeader = false;
          }
          else {
            vm.showHeader = true;
          }
        }

          // Function to split the date format
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

          // Function to display donut / bar chart based on screen selection
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

        vm.options = {
           chart: {
               type: 'pieChart',
               height: 300,
               donut: true,
               x: function(d){return d.key;},
               y: function(d){return d.y;},
               showLabels: true,
               duration: 500,
               legend: {
                   margin: {
                       top: 5,
                       right: 140,
                       bottom: 5,
                       left: 0
                   }
               }
           }
       };

       vm.data = [
           {
               key: "20%",
               y: 5
           },
           {
               key: "30%",
               y: 2
           },
           {
               key: "25%",
               y: 9
           },
           {
               key: "5%",
               y: 7
           },
           {
               key: "20%",
               y: 4
           }
       ];


       vm.options1 = {
                  chart: {
                      type: 'discreteBarChart',
                      height: 300,
                      margin : {
                          top: 20,
                          right: 20,
                          bottom: 50,
                          left: 55
                      },
                      x: function(d){return d.label;},
                      y: function(d){return d.value;},
                      showValues: true,
                      valueFormat: function(d){
                          return d3.format(',.4f')(d);
                      },
                      duration: 500,
                      xAxis: {
                          axisLabel: 'X Axis'
                      },
                      yAxis: {
                          axisLabel: 'Y Axis',
                          axisLabelDistance: -10
                      }
                  }
              };

              vm.data1 = [
                  {
                      key: "Cumulative Return",
                      values: [
                          {
                              "label" : "A" ,
                              "value" : -29.765957771107
                          } ,
                          {
                              "label" : "B" ,
                              "value" : 0
                          } ,
                          {
                              "label" : "C" ,
                              "value" : 32.807804682612
                          } ,
                          {
                              "label" : "D" ,
                              "value" : 196.45946739256
                          } ,
                          {
                              "label" : "E" ,
                              "value" : 0.19434030906893
                          } ,
                          {
                              "label" : "F" ,
                              "value" : -98.079782601442
                          } ,
                          {
                              "label" : "G" ,
                              "value" : -13.925743130903
                          } ,
                          {
                              "label" : "H" ,
                              "value" : -5.1387322875705
                          }
                      ]
                  }
              ]

          // Function to display the headings / text dynamicaly
        vm.displayData = function(violated) {
          vm.dataTable = true;
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
          console.log(violated);

          if (violated === 'vr') {
            vm.tbl1=true;
            vm.tbl2=false;
            vm.tbl3=false;
            vm.tbl4=false;
            vm.
            console.log('slv');
            vm.veeHeading = 'Number of valid records';
            vm.energyDemandObject = [];
            vm.energyDemandObject = slvList;
            for (var i = 0; i < drlvList.length; i++) {
              vm.energyDemandObject[i].billDate = splitDate(new Date(vm.energyDemandObject[i].billDate + ''));
            }
          } else if(violated === 'fr') {
            vm.tbl1=false;
            vm.tbl2=true;
            vm.tbl3=false;
            vm.tbl4=false;
            console.log('clv');
            vm.veeHeading = 'Number of failed Records';
            vm.energyDemandObject = [];
            vm.energyDemandObject = clvList;
            for (var i = 0; i < drlvList.length; i++) {
              vm.energyDemandObject[i].billDate = splitDate(new Date(vm.energyDemandObject[i].billDate + ''));
            }
          }
          else if(violated === 'edtr') {
            vm.tbl1=false;
            vm.tbl2=false;
            vm.tbl3=true;
            vm.tbl4=false;
            console.log('clv');
            vm.veeHeading = 'Number of edited records';
            vm.energyDemandObject = [];
            vm.energyDemandObject = clvList;
            for (var i = 0; i < drlvList.length; i++) {
              vm.energyDemandObject[i].billDate = splitDate(new Date(vm.energyDemandObject[i].billDate + ''));
            }
          } else {
            vm.tbl1=false;
            vm.tbl2=false;
            vm.tbl3=false;
            vm.tbl4=true;
            console.log('estr');
            vm.veeHeading = 'Number of estimated records';
            vm.energyDemandObject = [];
            vm.energyDemandObject = drlvList;
            for (var i = 0; i < drlvList.length; i++) {
              vm.energyDemandObject[i].billDate = splitDate(new Date(vm.energyDemandObject[i].billDate + ''));
            }
          }

        }

          // Function to validate the form
        function validateVee(){
          var sDate = new Date(vm.Vee.fromDate);
          var eDate = new Date(vm.Vee.toDate);
          if(sDate == "Invalid Date" || eDate  == "Invalid Date")
          {
             vm.errorToast("Please Select both From Date and To Date.");
              return false;
          }
          if(eDate < sDate){
              vm.errorToast("To Date Can not be Less than Start Date.");
              return false;
          }
          return true;
        }

          // Function to submit the form
        vm.veeSubmit = function() {
          if(validateVee()){
           vm.statisticsTable = true;
           var location = [];
           vm.location = location;
           var item;
           vm.location = $rootScope.modelArray;
           vm.Vee.location = vm.location;
          var date = new Date() + "";
          var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
          data.createdDate = dateFormat;
          data.adminEntityValueId = 1000;
          data.createdBy = 1111;
          data.lastUpdatedBy = 1111;
          data.lastUpdatedDate = splitDate(dateFormat);
          vm.Vee.fromDate=splitDate(vm.Vee.fromDate)
          vm.Vee.toDate=splitDate(vm.Vee.toDate)
          data.lastUpdatedLogin = 1111;
          data.Vee = vm.Vee;
          //console.log(data.energyDemand);

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

              vm.successToast("Submitted Sucessfully");
          }, function myError(response) {
              vm.errorToast("Something went wrong.. Please try again");
              console.log(response);
          });
        }
      }
    }
})();
