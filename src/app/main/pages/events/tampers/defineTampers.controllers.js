(function ()
{
    'use strict';

    angular
        .module('app.defineTampers')
        .controller('defineTampersController', defineTampersController);

    /** @ngInject */
    function defineTampersController(SampleData, $http, baseUrl2, $mdToast, $mdDialog, Clear)
    {

        var vm = this;
        vm.Clear = Clear;
        vm.progressShow = false;

        vm.dtOptions = {
          dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
          pagingType: 'simple',
          autoWidth : false,
          responsive: true
        }

        var data = {};
        //var Itemx ={};
        var tamperData=[];
        var editDisbaled=true;
        var estimationDisbaled=true;

        var splitDate1 =  function(dt) {
          console.log(dt);
           var newDt1 = dt.split(' ')[2] + "-" + dt.split(' ')[1] + "-" + dt.split(' ')[3];
           console.log(newDt1);
          return  newDt1;

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
      //  var pinTo = vm.getToastPosition();

       $mdToast.show(
         $mdToast.simple()
           .textContent(mesg)
           .position('top right')
           .hideDelay(3000)
           .toastClass('success')

       );
     };

     vm.getData = function() {
       vm.progressShow = true;
       $http({
             method : "GET",
             url :baseUrl2 +"mdm/events/tampers/multi-getTamper"
         }).then(function mySuccess(response) {

             vm.eventNames = response.data;
             console.log(response);
            // vm.Itemx=vm.eventNames;
            vm.progressShow = false;

         }, function myError(response) {
             console.log(response);
         });
     }

     vm.getData();

     vm.addEvent = function() {
       console.log(":::;dialog");


       $mdDialog.show({
         controller: DialogController,
         templateUrl: 'app/main/pages/events/tampers/tpaddeventspopup.html',
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


function DialogController($scope, $mdDialog, Clear) {
         //$scope.tamperFlag="N";
         $scope.Clear =Clear;
          console.log("diaqlogController:::::::::::::::::::::::::::::");

          var splitDate =  function(dt) {
          console.log(dt);
          dt = dt+"";
           var newDt = dt.split(' ')[2] + "-" + dt.split(' ')[1] + "-" + dt.split(' ')[3];
           console.log(newDt);
          return  newDt;

        }

         $scope.validateAddEvent = function() {
           console.log($scope.eachItem);
           if($scope.addEventName == null || $scope.addEventCode == null) {
             vm.errorToast("Please provide both event name and event code before submitting");
             return false;
           }
          return true;
        }

        $scope.Clear = function () {
          //alert("hi");
          $scope.addEventCode = "";
          $scope.addEventName = "";
          $scope.tamperFlag ="";
        }

        $scope.addEventSubmit = function() {
          vm.progressShow = true;
          var data={};
          if($scope.validateAddEvent()) {
            data.addEventName = $scope.addEventName;
            data.addEventCode = $scope.addEventCode;
            data.tamperFlag =  $scope.tamperFlag;
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
                url : baseUrl2 + "mdm/events/single-insert",
                data: data
            }).then(function mySuccess(response) {
                vm.progressShow = false;

              if(response.data.status = true) {
                 if(response.data.message == "ORA-00001: unique constraint (MMD.SYS_C006000) violated")
                 {
                   vm.errorToast("Event Already exists. PLease check.");
                 }
                 else {
                   vm.successToast("Submitted succesfully");
                 }

                console.log(response);
                console.log("===== " +response.data.status);


                  vm.getData();
              }
              else {
                vm.errorToast("Not updated in records, Try again");
              }

                // $scope.eachItem = response.data.eachItem;
                // console.log($scope.eachItem);
            }, function myError(response) {
                console.log(response);
            });
          }
        }

            $scope.hide = function() {
              $mdDialog.hide();
            };

            $scope.cancel = function() {
              $mdDialog.cancel();
              //getData();
            };

            $scope.answer = function(answer) {
              $mdDialog.hide(answer);
            };

          }




      //console.log("All Records ",vm.Itemx);

      vm.tamperSubmit = function() {
        var data = {};
        var date = new Date()+"";
        data.adminEntityValueId = 1000;
        data.createdDate = splitDate1(date);
        data.lastUpdatedDate = splitDate1(date);
        data.createdBy = 1111;
        data.lastUpdatedBy = 1111;
        data.lastUpdatedLogin = 1111;
        data.eventNames = vm.eventNames;

        $http({
            method : "POST",
            url : baseUrl2 +"mdm/events/multi-update",
            data: data
        }).then(function mySuccess(response) {
            console.log(response);
            vm.successToast("Tamper Detailes have been Updated Successfully.")
            //vm.successToast("DCU Protocol Deatails Have Been Submitted Sucessfully.");

        }, function myError(response) {

            console.log(response);
            //vm.errorToast("Sorry. We Are Having Some Techinical Issues With Regards To The Server. Please Try Later.");
        });

      }

       vm.getData();

    }
})();
