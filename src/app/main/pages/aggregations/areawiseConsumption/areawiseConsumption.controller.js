
(function ()
{
    'use strict';

    angular
        .module('app.areawiseConsumption')
        .controller('AreawiseConsumptionController', AreawiseConsumptionController);

    /** @ngInject */
    function AreawiseConsumptionController($http,$mdToast,baseUrl2,$cookies,$rootScope,$localStorage, Clear, MessageInfo)
    {
        var vm = this;
        vm.Clear =  Clear;
        vm.areawiseConsumption ={};
        var data = {};
        vm.areawiseConsumption.statisticsTable= false;
        var userDetails = {};
        var currentUser = $localStorage.globals;
        userDetails = currentUser.currentUser;
        console.log(userDetails);

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
            vm.getMonth = function() {
                vm.fmonthDisable= false;
                vm.fmonth = monthArr;
                if(vm.areawiseConsumption.fyear==currDate.getFullYear()) {
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
                if(vm.areawiseConsumption.tyear==currDate.getFullYear()) {
                  vm.tmonth = [];
                  for (var i = 0; i <= currDate.getMonth(); i++) {
                      vm.tmonth[i] = monthArr2[i];
                    }
                  }
                  console.log(vm.tmonth);
                }
        //get catType list
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/vee/threshold/get-conType"
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.catType = response.data;
        }, function myError(response) {
            console.log(response);
        });

        var dt = new Date();
        vm.currentYear = dt.getFullYear();
        vm.pastYear1 = vm.currentYear - 1;
        vm.pastYear2 = vm.currentYear - 2;



        vm.hierarchyShow = function() {
          if(vm.showHeader) {
            vm.showHeader = false;
          }
          else {
            vm.showHeader = true;
          }
        }

         function validatePage() {
           var d = new Date();
           var currMonth = d.getMonth();
           if(vm.areawiseConsumption.fmonth ===undefined || vm.areawiseConsumption.fyear===undefined || vm.areawiseConsumption.tmonth===undefined || vm.areawiseConsumption.tyear===undefined || vm.areawiseConsumption.catTypeId===undefined){
             //vm.errorToast("Please Select All Fields.");
              MessageInfo.showMessage(1017, 'All Fields', '', '');
             return false;
           }
           if((vm.areawiseConsumption.fyear == vm.areawiseConsumption.tyear) && (vm.areawiseConsumption.fmonth > vm.areawiseConsumption.tmonth) ){
             //vm.errorToast("From Date Cannot be Less Than To Date");
             MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
             return false;
           }
           if( vm.areawiseConsumption.tyear < vm.areawiseConsumption.fyear  ){
             //vm.errorToast("From Date Cannot be Less Than To Date");
             MessageInfo.showMessage(1008, 'From Date', 'To Date', '');
             return false;
           }
           return true;
          }

        vm.areaWiseConsumptionSubmit = function(){
           if(validatePage()){
          vm.areawiseConsumption.statisticsTable= false;
          vm.progressShow=true;
          var modelArray = [];
          modelArray = $rootScope.modelArray;
          console.log(modelArray);
          data.fromDate = vm.areawiseConsumption.fyear+"-"+vm.areawiseConsumption.fmonth;
          data.toDate = vm.areawiseConsumption.tyear+"-"+vm.areawiseConsumption.tmonth;
          var conTyp =  vm.areawiseConsumption.catTypeId;
          console.log(conTyp);
          var conTyp1 = JSON.parse(conTyp);
          console.log(conTyp1.type);
          data.conType= conTyp1.categoryTypeId;
          console.log(data.conType);
          //data.userId=6;
          //data.userId = userDetails.userId;
          data.modelArray = modelArray;
          console.log(data.modelArray);
          console.log(data);

          MessageInfo.showMessage(1005, '', '', '');

          $http({
            method : "POST",
            url : baseUrl2 + "mdm/aggregations/area-consumption",
            data: data
          }).then(function mySuccess(response) {
            console.log(response);
            vm.consumption = response.data.outBinds;
            console.log(response.data.outBinds.consumptionCount);
            //vm.successToast("Submitted Sucessfully");
            vm.areawiseConsumption.statisticsTable= true;
            vm.progressShow=false;
            if(conTyp1.type == "Domestic"){
              vm.consumptionUnit = "kWH";
              vm.demandUnit = "kW";
            }
            else{
              vm.consumptionUnit = "kVAH";
              vm.demandUnit = "kVA";
            }
          }, function myError(response) {
            //vm.errorToast("Something went wrong.. Please try again");
             MessageInfo.showMessage(1010, '', '', '');
            console.log(response);
          });
        }
      }
      }
})();
