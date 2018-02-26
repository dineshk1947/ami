(function ()
{
    'use strict';
    angular
        .module('app.readParam')
        .controller('ReadParamController', ReadParamController);

    /** @ngInject */

    // function LoadProfileController() {
    //   console.log("++++++++++++++++++++++++++");
    //   console.log("LoadProfileController");
    // }
    function ReadParamController($http, $mdToast, baseUrl2, baseUrl1, $rootScope, $mdDialog, Clear) {
      console.log("ReadParamController");
        var vm = this;
        vm.Clear = Clear;
        vm.showHeader=false;
        vm.currDate = new Date();
        vm.showTxn = false;
        vm.viewInstant = false;

        vm.showHeader=false;
        vm.currDate = new Date();
        vm.viewDiasbled=true;
        vm.tableDiasbled=false;

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
       vm.dtOptions = {
                   dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                   pagingType: 'simple',
                   autoWidth : false,
                   responsive: true
     }
        //var dt = new Date()+"";
        var splitDate1 =  function(dt) {
          dt+="";
          console.log(dt);
          var newDt1 = dt.split(' ')[2] + "-" + dt.split(' ')[1] + "-" + dt.split(' ')[3];
          console.log(newDt1);
         return  newDt1;
        }
        // Function to display / hide Hirarchy Header on Button Click
        vm.hierarchyShow = function() {
          if(vm.showHeader==true)
          {
            vm.showHeader=false;
          }
          else if(vm.showHeader==false)
          {
            vm.showHeader=true;
          }
        }

        vm.viewTableFun =function() {
          vm.tableShow = true;
        }
        /////////////////////////////////////////////
        //load Profile code begin
        vm.showTabDialog = function(id) {
           $mdDialog.show({
             controller: DialogController,
             templateUrl: 'app/main/pages/onDemand/readParam/loadProfile/loadPopup.html',
            // parent: angular.element(document.body),
             targetEvent: "ev",
             clickOutsideToClose:false,
              fullscreen: vm.customFullscreen

           })
           // controller for popup of loadProfile
          function DialogController($scope,  $http, $mdToast) {
             var itemx = id;
             $scope.ev = {};
             console.log(itemx);
             $scope.ev = itemx;

              $scope.estimationDisbaled=true;

                 vm.hide = function() {
                   $mdDialog.hide();
                 };

                 $scope.cancel = function() {
                   $mdDialog.cancel();
                 };

                 vm.answer = function(answer) {
                   $mdDialog.hide(answer);
                 };

              }
            };

        function validateLoadProfile(){
          var sDate = new Date(vm.loadProfile.startDate);
          var eDate = new Date(vm.loadProfile.endDate);
          if($rootScope.meterId == undefined)
          {
             vm.errorToast("Please Select Meter.");
              return false;
          }
          if(eDate < sDate){
              vm.errorToast("End Date Can not be Less than Start Date.");
              return false;
          }
          return true;
        }
        vm.viewEnabled = true;
        vm.loadProfileFun = function() {
          if(validateLoadProfile()){
            var data = {};
            var date = new Date()+"";
            data.createdDate = splitDate1(date);
            data.adminEntityValueId = 1000;
            data.createdBy = 1111;
            data.lastUpdatedBy = 1111;
            data.lastUpdatedDate = splitDate1(date);
            data.lastUpdatedLogin = 1111;
            var sDate = new Date(vm.loadProfile.startDate)+"" ;
            var eDate =new Date(vm.loadProfile.endDate)+"" ;
            vm.loadProfile.startDate = splitDate1(sDate);
            vm.loadProfile.endDate = splitDate1(eDate);
            data.meterId  = $rootScope.meterId;
            data.loadProfileData=vm.loadProfile;
            data.userId = 1023;
            console.log(data);
            $http({
                method : "POST",
                url : baseUrl2 + "mdm/on-demand/load-profile",
                data: data
            }).then(function mySuccess(response) {
                  console.log("checing for response after post",response);
                  vm.getStatus = response.data.status.requestStatus;
                  vm.getId = response.data.status.requestId;
                  vm.loadProfileData = response.data.list;
                  for (var i=0;i<vm.loadProfileData.length;i++) {
                     vm.loadProfileData[i].realTimeClockDateTi=splitDate1(new Date(vm.loadProfileData[i].realTimeClockDateTi+""));
                   }

                //  vm.loadProfileData.realTimeClockDateTi = splitDate1(vm.loadProfileData.realTimeClockDateTi);
                  if(vm.getStatus == 'Success'){
                     vm.viewEnabled = false;
                      vm.success = true;
                      vm.falure = false;
                      //vm.tableShow = true;
                  }
                  if (vm.getStatus == 'Failure') {
                    vm.viewEnabled = true;
                    vm.success = false;
                    vm.falure = true;
                    vm.tableShow = false;
                  }

                  vm.successToast("Submitted Sucessfully.");
            }, function myError(response) {
                console.log(response);
                vm.errorToast("Sorry. We Are Having Some Techinical Issues With Regards To The Server. Please Try Later.");
            });
          }
        }
        //load Profile code end

          //Billing Parameters code begin

          vm.billingSubmit = function () {
            vm.showTxn = true;
            console.log(vm.billing.tmonth);
            var data = {};
            var date = new Date()+"";
            data.createdDate = splitDate1(date);
            data.adminEntityValueId = 1000;
            data.createdBy = 1111;
            data.lastUpdatedBy = 1111;
            data.lastUpdatedDate = splitDate1(date);
            data.lastUpdatedLogin = 1111;
            data.billing = vm.billing;
            data.userId = 1023;
            data.meterId = 33001;
            //alert($rootScope.meterID);
            console.log(data);
            $http({
                method : "POST",
                url : baseUrl2 + "mdm/on-demand/billing-para",
                data: data
            }).then(function mySuccess(response) {
                console.log(response);
                vm.successToast("Meter Id has been Submitted for billing");
                vm.billingId = response.data.status.requestId;
                vm.billingStatus = response.data.status.requestStatus;
                console.log(response.data.status.requestStatus);
                vm.billinglist = response.data.list;
                // var incomingDate = new Date(vm.list.realTimeClockDateTime + "");
                // var newDate = splitDate1(incomingDate);
                // /vm.list.newDate = newDate;
                for (var i = 0; i < vm.billinglist.length; i++) {
                  vm.billinglist[i].billingDate =  splitDate1(new Date(vm.billinglist[i].billingDate + ""));
                  vm.billinglist[i].realTimeClockDateTime =  splitDate1(new Date(vm.billinglist[i].realTimeClockDateTime + ""));
                }
                if(vm.billingStatus == "Success") {
                    vm.showBillingTable = true;
                }
                //
                // for(var key in vm.billinglist) {
                //   console.log(key);
                // }
                // vm.list.realTimeClockDateTime = new Date(vm.list.realTimeClockDateTime);
                console.log(response.data.list);
                console.log("Message id is "+vm.billingId);
                console.log("Message is " +vm.billingStatus);
                console.log("List is "+vm.billinglist);
            }, function myError(response) {
                console.log(response);
              });
          }
          //Pop up for billing
          vm.showbillingDialog = function(id) {
           $mdDialog.show({
             controller: DialogController,
             templateUrl: 'app/main/pages/onDemand/readParam/billing/billingPopup.html',
            // parent: angular.element(document.body),
             targetEvent: "ev",
             clickOutsideToClose:false,
             fullscreen: vm.customFullscreen
           })

           // controller for popup
          function DialogController($scope, $mdDialog, $http, $mdToast) {
             var itemx = id;
             console.log("D ",itemx.bPhCurrent);
             $scope.ev={};
             $scope.ev = itemx;
              $scope.estimationDisbaled=true;
                 vm.hide = function() {
                   $mdDialog.hide();
                 };
                 $scope.cancel = function() {
                   $mdDialog.cancel();
                 };
                 vm.answer = function(answer) {
                   $mdDialog.hide(answer);
                 };
              }
            };

          //Billing Parameters code end

          // TP & Events code begin

          vm.eventChange= function(evtId)
          {
            if(evtId==5555)
            {
              vm.errorToast("Narrow the search.");
            }
          }

          vm.viewClick= function(getValue) {
              if(vm.requestStatus=="Success")
              {
                vm.tableDiasbled=true;
              }
              if(vm.requestStatus=="Failure") {
                vm.successToast("Submitted Sucessfully.");
                vm.tableDiasbled=false;
              }
          }
          vm.getData= function () {

            $http({
                method : "GET",
                url : baseUrl2 + "/mdm/on-demand/get-events"
            }).then(function mySuccess(response) {
                vm.events = response.data;
                console.log(vm.events);
            }, function myError(response) {
                console.log(response);
            });
          }
          vm.getData();
          function validateTpEvents() {
              var sDate = new Date(vm.tpEvents.startDate);
              var eDate = new Date(vm.tpEvents.endDate);
              // if($rootScope.meterId == undefined)
              // {
              //    vm.errorToast("Please Select Meter.");
              //     return false;
              // }
              if(vm.tpEvents.eventId == undefined)
              {
                 vm.errorToast("Please Select Event.");
                  return false;
              }
              if(eDate < sDate){
                  vm.errorToast("End Date Can not be Less than Start Date.");
                  return false;
              }
              return true;
            }
            vm.tpEventsSubmit = function () {
              if(validateTpEvents()){
                //validateTpEvents();
                var data = {};
                var datamodel ={};
                var date = new Date()+"";
                data.createdDate = splitDate1(date);
                data.adminEntityValueId = 1000;
                data.createdBy = 1111;
                data.lastUpdatedBy = 1111;
                data.lastUpdatedDate = splitDate1(date);
                data.lastUpdatedLogin = 1111;
                var sDate = new Date(vm.tpEvents.startDate)+"" ;
                var eDate =new Date(vm.tpEvents.endDate)+"" ;
                vm.tpEvents.startDate = splitDate1(sDate);
                vm.tpEvents.endDate = splitDate1(eDate);
                data.tpEvents = vm.tpEvents;
                //data.tpEvents.meterID  = $rootScope.meterID;
                data.tpEvents.meterID  = 33024;
                data.tpEvents.userId=1023;
                console.log(data);
                $http({
                    method : "POST",
                    url : baseUrl2 + "mdm/on-demand/events-tampers",
                    data: data
                }).then(function mySuccess(response) {
                   console.log(response.data);
                   vm.requestId=response.data.status.requestId;
                   vm.requestStatus=response.data.status.requestStatus;
                   vm.eventList=response.data.list;
                   for (var i=0;i<vm.eventList.length;i++)
                   {
                     vm.eventList[i].clock=splitDate1(new Date(vm.eventList[i].clock+""));
                   }
                   console.log("??????????????????????????????");
                   console.log( vm.eventList);
                    console.log("Event List from db",vm.eventList);
                    if(vm.requestStatus=="Success")
                    {
                      vm.viewDiasbled=false;
                    }
                    if(vm.requestStatus=="Failure")
                    {
                      vm.viewDiasbled=true;
                      vm.tableDiasbled=false;
                    }
                    vm.successToast("Request Has Been Sent. Please view the details below!");
                }, function myError(response) {
                    console.log(response);
                    vm.errorToast("Sorry. We Are Having Some Techinical Issues With Regards To The Server. Please Try Later.");
                });
              }
          }
          vm.showTpEventsDialog = function(id) {
             $mdDialog.show({
               controller: DialogController,
               templateUrl: 'app/main/pages/onDemand/readParam/tpEvents/tpEventsPopup.html',
               targetEvent: "ev",
               clickOutsideToClose:false
             })
             // controller for popup
            function DialogController($scope, $mdDialog, $http, $mdToast) {
               var itemx = id;
               console.log("D ",itemx.bPhCurrent);
               $scope.ev={};
               $scope.ev = itemx;
              //  $scope.ev.eventName=itemx.eventName;
              //  $scope.ev.rPhVoltage=itemx.rPhVoltage;
              //  $scope.ev.yPhVoltage=itemx.yPhVoltage;
              //  $scope.ev.bPhVoltage=itemx.bPhVoltage;
              //  $scope.ev.rPhCurrent=itemx.rPhCurrent;
              //  $scope.ev.yPhCurrent=itemx.yPhCurrent;
              //  $scope.ev.bPhCurrent=itemx.bPhCurrent;
              //  $scope.ev.rPhPowerFactor=itemx.rPhPowerFactor;
              //  $scope.ev.yPhPowerFctor=itemx.yPhPowerFctor;
              //  $scope.ev.bPhPowerFactor=itemx.bPhPowerFactor;
              //  $scope.ev.singlePhOrTotPf=itemx.singlePhOrTotPf;
              //  $scope.ev.cumEnergyKwhImp=itemx.cumEnergyKwhImp;
              //  $scope.ev.cumEnergyKwhExp=itemx.cumEnergyKwhExp;
              //  $scope.ev.singlePhOrTotCur=itemx.singlePhOrTotCur;
              //  $scope.ev.singlePhOrTotVol=itemx.singlePhOrTotVol;
              //  $scope.ev.cumTamperCount=itemx.cumTamperCount;
               $scope.estimationDisbaled=true;
               vm.hide = function() {
                 $mdDialog.hide();
               };
               $scope.cancel = function() {
                 $mdDialog.cancel();
               };
               vm.answer = function(answer) {
                 $mdDialog.hide(answer);
               };
                }
              };


          // TP & Events code end


  //Instantaneous Parameters Submit function
            vm.showInstantTxn = false;
            vm.viewInstant = false;
            vm.instantSubmit = function () {
            vm.showInstantTxn = true;
            var data = {};
            var date = new Date()+"";
            data.createdDate = splitDate1(date);
            data.adminEntityValueId = 1000;
            data.createdBy = 1111;
            data.lastUpdatedBy = 1111;
            data.lastUpdatedDate = splitDate1(date);
            data.lastUpdatedLogin = 1111;
            data.userId = 1023;
            data.meterId = 33001;
            //alert($rootScope.meterID);
            console.log(data);
            $http({
                method : "POST",
                url : baseUrl1 + "mdm/on-demand/instantaneous",
                data: data
            }).then(function mySuccess(response) {
                console.log(response);
                vm.successToast("Meter Id has been Submitted for instantaneous Parameters");
                vm.id = response.data.status.requestId;
                vm.status = response.data.status.requestStatus;
                if(vm.status == "Success") {
                    vm.showInstantTable = true;
                }
                vm.list = response.data.list[0];
                var incomingDate = new Date(vm.list.realTimeClockDateTime + "");
                var newDate = splitDate1(incomingDate);
                vm.list.newDate = newDate;
                vm.ar = [];
                vm.ar.push(vm.list);
                console.log(vm.status);
                console.log(vm.ar);
            }, function myError(response) {
                console.log(response);
              });
          }
          vm.showInstantDialog = function(id) {
           $mdDialog.show({
             controller: DialogController,
             templateUrl: 'app/main/pages/onDemand/readParam/instantParam/instantPopup.html',
            // parent: angular.element(document.body),
             targetEvent: "ev",
             clickOutsideToClose:false,
             fullscreen: vm.customFullscreen
           })
           // controller for popup
          function DialogController($scope, $mdDialog, $http, $mdToast) {
             var itemx = id;
             console.log("D ",itemx.bPhCurrent);
             $scope.ev={};
             $scope.ev = itemx;
              $scope.estimationDisbaled=true;
                 vm.hide = function() {
                   $mdDialog.hide();
                 };
                 $scope.cancel = function() {
                   $mdDialog.cancel();
                 };
                 vm.answer = function(answer) {
                   $mdDialog.hide(answer);
                 };
              }
       };

    };


})();
