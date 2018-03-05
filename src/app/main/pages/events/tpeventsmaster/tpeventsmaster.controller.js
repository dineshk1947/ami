(function ()
{
    'use strict';

    angular
        .module('app.eventsmaster')
        .controller('EventsMasterController', EventsMasterController);

    function EventsMasterController($http, $mdToast, baseUrl2, $mdDialog, Clear, MessageInfo) {
        var vm = this;
        vm.Clear = Clear;
        vm.progressShow = false;

        vm.dtOptions = {
          dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
          pagingType: 'simple',
          autoWidth : false,
          responsive: true
        };


        var eachItem = {};
        var eventArray = [];
        var toWhomArray = [];
        var title;
        //var notifyReq = "true";
          // to hom select start

        vm.showModal = function(id) {
          console.log(":::;dialog");
          console.log(id);
          eachItem = id;
          console.log(eachItem);

          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'app/main/pages/events/tpeventsmaster/tpeventspopup.html',
            parent: angular.element(document.body),
            targetEvent: "ev",
            clickOutsideToClose:false,
            //fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
          }).then(function(answer) {

            vm.status = 'You said the information was "' + answer + '".';
          }, function() {
            vm.status = 'You cancelled the dialog.';
          });
        };

        vm.addEvent = function() {
          console.log(":::;dialog");
          // console.log(id);
          // eachItem = id;
          console.log(eachItem);

          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'app/main/pages/events/tpeventsmaster/tpaddeventspopup.html',
            parent: angular.element(document.body),
            targetEvent: "ev",
            clickOutsideToClose:false,
            //fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
          }).then(function(answer) {

            vm.status = 'You said the information was "' + answer + '".';
          }, function() {
            vm.status = 'You cancelled the dialog.';
          });
        };


        var getData = function() {
          vm.progressShow = true;
          $http({
              method : "GET",
              //url : "http://156d11c4.ngrok.io/mdm/events/multi-get"
              url : baseUrl2 + "mdm/events/multi-get"
          }).then(function mySuccess(response) {
              vm.eventDetails = response.data;
              vm.progressShow = false;
             console.log(vm.eventDetails);
          }, function myError(response) {
              console.log(response);
          });
        }

        getData();

        var singleGetData = function() {
          $http({
              method : "GET",
              //url : "http://156d11c4.ngrok.io/mdm/events/tampers/multi-getTamper"
              url : baseUrl2 + "mdm/events/single-get"
          }).then(function mySuccess(response) {
              vm.events = response.data;
              eventArray = vm.events;
              console.log("Event names "+response.data);
          }, function myError(response) {
              console.log(response);
          });
        }
        singleGetData();

        $http({
            method : "GET",
            //url : "http://156d11c4.ngrok.io/mdm/events/toWhome"
            url : baseUrl2 + "mdm/events/toWhome"
        }).then(function mySuccess(response) {
            vm.designationCode = response.data;
            toWhomArray = vm.designationCode;
            console.log("Users List "+toWhomArray);

        }, function myError(response) {
            console.log(response);
        });

        function DialogController($scope, $mdDialog,Clear) {
          $scope.Clear =Clear
          $scope.notifyReq = true;
          $scope.toWhomCheck = true;

          console.log("diaqlogController:::::::::::::::::::::::::::::");

          var splitDate =  function(dt) {
          console.log(dt);
          dt = dt+"";
           var newDt = dt.split(' ')[2] + "-" + dt.split(' ')[1] + "-" + dt.split(' ')[3];
           console.log(newDt);
          return  newDt;


        }

          $scope.validateEvent = function(eve) {


            console.log($scope.eachItem);
            console.log(eve.eventName);
            console.log("not req " + eve.notificationReq);
            console.log("onscreen " + eve.onscreenFlag);
            console.log("sms " + eve.smsFlag);
            console.log("email " + eve.emailFlag);
            console.log("desig " + eve.designationCode);
            console.log("mobile "  + eve.personalMobile);
            console.log("email add" + eve.emailAddress);

            if(eve.eventName == null) {
              //vm.errorToast("Select any event name before submitting");
              MessageInfo.showMessage(1017, 'an Event', '', '');
              return false;
            }

           if(eve.notificationReq == "Y") {
             if((eve.emailFlag == "N" ||  eve.emailFlag == undefined) && (eve.smsFlag == "N" ||  eve.smsFlag == undefined) && (eve.onscreenFlag == "N" || eve.onscreenFlag == undefined)) {
               //vm.errorToast("Enable any notification type");
               MessageInfo.showMessage(8002, '', '', '');
               return false;
             }
           }
           if((eve.notificationReq == "Y" && eve.designationCode == "PERSON") && (eve.personalMobile == null || eve.emailAddress == null)) {
             //vm.errorToast("Enter both mobile number and email");
             MessageInfo.showMessage(1015, 'Mobile number', 'Email', '');
             return false;
           }
           if(eve.notificationReq == "Y" && eve.designationCode == undefined) {
             //vm.errorToast("Select whom do you want to send the notification");
             MessageInfo.showMessage(8003, '', '', '');
             return false;
           }
           return true;
         }

        //  $scope.validateAddEvent = function() {
        //    console.log($scope.eachItem);
        //    if($scope.addEventName == null || $scope.addEventCode == null) {
        //      vm.errorToast("Please provide both event name and event code before submitting");
        //      return false;
        //    }
        //   return true;
        // }

        // $scope.addEventSubmit = function() {
        //   var data={};
        //   if($scope.validateAddEvent()) {
        //     data.addEventName = $scope.addEventName;
        //     data.addEventCode = $scope.addEventCode;
        //     data.tamperFlag =  $scope.tamperFlag;
        //     console.log(data);
        //     var date = new Date();
        //     var dateFormat = splitDate(date);
        //     data.createdDate = dateFormat;
        //     data.adminEntityValueId = 1000;
        //     data.createdBy = 1111;
        //     data.lastUpdatedBy = 1111;
        //     data.lastUpdatedDate = dateFormat;
        //     data.lastUpdatedLogin = 1111;
        //
        //     $http({
        //         method : "POST",
        //         //url : "http://156d11c4.ngrok.io/mdm/events/insert",
        //         url : baseUrl2 + "mdm/events/insertyyyyy",
        //         data: data
        //     }).then(function mySuccess(response) {
        //
        //       if(response.data.status = true) {
        //         console.log(response);
        //         console.log("===== " +response.data.status);
        //           $scope.answer("Submited successfully");
        //           vm.successToast("Submitted succesfully");
        //           singleGetData();
        //       }
        //       else {
        //         vm.errorToast("Not updated in records, Try again");
        //       }
        //
        //         // $scope.eachItem = response.data.eachItem;
        //         // console.log($scope.eachItem);
        //     }, function myError(response) {
        //         console.log(response);
        //     });
        //   }
        // }

          if (eachItem === undefined) {
            $scope.title  = "Configure Event"
            $scope.notifyFunc =function(notif){

              if (notif == "Y" || notif == "N" ){
                if(notif == "Y"){
                   $scope.notifyReq =false;
                   $scope.toWhomCheck = true;

                }else {
                  $scope.notifyReq =true;
                  $scope.toWhomCheck = true;
                  $scope.onscreenFlag="N";
                  $scope.smsFlag="N";
                  $scope.emailFlag="N";
                }
              }
              else {
                if (notif == "PERSON") {
                  $scope.toWhomCheck = false;
                }
                else {
                  $scope.toWhomCheck = true;
                }
              }

             }
            $scope.submit = true;
            $scope.update = false;
                      //$scope.eachItem = {};
            $scope.events = eventArray;
            $scope.designationCode = toWhomArray;
            // $scope.notificationReq = "N";
            // $scope.onscreenFlag = "N";
            // $scope.mobile = "N";
            // $scope.emailFlag = "N";




            $scope.eventSubmit = function() {
              vm.progressShow = true;
              if($scope.validateEvent($scope.eachItem)) {
                console.log("Insert Button");
                console.log($scope.eachItem);
                var data = $scope.eachItem;
                console.log(data);
                var date = new Date();
                var dateFormat = splitDate(date);
                data.createdDate = dateFormat;
                data.adminEntityValueId = 1000;
                data.createdBy = 1111;
                data.lastUpdatedBy = 1111;
                data.lastUpdatedDate = dateFormat;
                data.lastUpdatedLogin = 1111;

                $http({
                    method : "POST",
                    //url : "http://156d11c4.ngrok.io/mdm/events/insert",
                    url : baseUrl2 + "mdm/events/insert",
                    data: data
                }).then(function mySuccess(response) {

                  if(response.data.status = true) {
                    console.log(response);
                    vm.progressShow = false;
                    console.log("===== " +response.data.status);
                      $scope.answer("Submited successfully");
                      //vm.successToast("Submitted succesfully");
                      MessageInfo.showMessage(1012, '', '', '');
                      singleGetData();
                  }
                  else {
                    //vm.errorToast("Not updated in records, Try again");
                    MessageInfo.showMessage(1010, '', '', '');
                  }

                    // $scope.eachItem = response.data.eachItem;
                    // console.log($scope.eachItem);
                }, function myError(response) {
                    console.log(response);
                });
              }
            }

          } else {
            $scope.title  = "Update Event"
            $scope.toWhomCheck = false;
            $scope.notifyReq = false;

            $scope.notifyFunc =function(notif){
              if (notif == "Y" || notif == "N" ){
                if(notif == "Y"){
                   $scope.notifyReq =false;
                   $scope.toWhomCheck = true;

                }else {
                  $scope.notifyReq =true;
                  $scope.toWhomCheck = true;
                  $scope.onscreenFlag="N";
                  $scope.smsFlag="N";
                  $scope.emailFlag="N";
                }
              }
              else {
                if (notif == "PERSON") {
                  $scope.toWhomCheck = false;
                }
                else {
                  $scope.toWhomCheck = true;
                }
              }
             }
            $scope.submit = false;
            $scope.update = true;

            $scope.eachItem = eachItem;

            console.log($scope.eachItem);
            $scope.designationCode = toWhomArray;

            $scope.paramUpdate = function() {
              console.log($scope.eachItem);
              if($scope.validateEvent($scope.eachItem)) {

                console.log("Update Button");
                console.log($scope.eachItem);
                var data = $scope.eachItem;
                console.log(data);
                var date = new Date();
                var dateFormat = splitDate(date);
                data.createdDate = dateFormat;
                data.adminEntityValueId = 1000;
                data.createdBy = 1111;
                data.lastUpdatedBy = 1111;
                data.lastUpdatedDate = dateFormat;
                data.lastUpdatedLogin = 1111;

                $http({
                    method : "POST",
                    //url : "http://156d11c4.ngrok.io/mdm/events/update",
                    url : baseUrl2 + "mdm/events/update",
                    data: data
                }).then(function mySuccess(response) {
                  if(response.data.status = true) {
                      console.log(response);
                      console.log("===== " +response.data.status);
                      $scope.answer("Updated successfully");
                      //vm.successToast("Updated succesfully");
                      MessageInfo.showMessage(1002, 'Event', '', '');
                      getData();
                  }
                  else {
                    //vm.errorToast("Not updated in records, Try again");
                    MessageInfo.showMessage(1010, '', '', '');
                  }



                }, function myError(response) {
                    console.log(response);
                });
              }
            }
          }
            $scope.eachItem = eachItem;

            $scope.hide = function() {
              $mdDialog.hide();
            };

            $scope.cancel = function() {
              $mdDialog.cancel();
              getData();
            };

            $scope.answer = function(answer) {
              $mdDialog.hide(answer);
            };

          }

    }
})();
