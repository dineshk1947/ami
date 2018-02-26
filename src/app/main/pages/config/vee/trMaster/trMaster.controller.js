(function ()
{
    'use strict';

    angular
        .module('app.trConfig')
        .controller('TrMasterController', TrMasterController);

    function TrMasterController($http, $mdToast, baseUrl2, $mdDialog, MessageInfo,Clear) {

        var vm = this;
        vm.Clear = Clear;
        vm.dtOptions = {
            dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            pagingType: 'simple',
            autoWidth : false,
            responsive: true
        };
        var eachItem = {};

        var paramArray = [];

        var catArr =[];

        var phaseArr = [];

        var userArray = [];

        var title = "";

        var curr = new Date();

        var catHome = {};

        var lookupHome = {};

        //Toaster to display error message
        vm.errorToast = function(mesg) {
         $mdToast.show(
           $mdToast.simple()
             .textContent(mesg)
             .position('top right')
             .hideDelay(3000)
             .toastClass('error')

           );
        };

        //Toaster to display success message
        vm.successToast = function(mesg) {
            $mdToast.show(
              $mdToast.simple()
                .textContent(mesg)
                .position('top right')
                .hideDelay(3000)
                .toastClass('success')
            );
          };


          vm.getPhaseHome = function() {
            console.log("In phase Func");

            console.log(vm.catType);
            catHome = JSON.parse(vm.catType);
            console.log("//////////////////////////////");
            console.log(catHome);
            $http({
                method : "GET",
                url : baseUrl2 + "mdm/vee/threshold/get-mtrPhase/"+ catHome.type
            }).then(function mySuccess(response) {
                vm.phaseHome = response.data;
            }, function myError(response) {
                console.log(response);
            });

          }

          vm.getPhase1Home = function() {
            console.log("In phase Func 1");
            console.log(vm.catPhase.lookupId);
            lookupHome = JSON.parse(vm.catPhase);
            if(catHome.categoryTypeId != undefined && lookupHome.lookupId != undefined) {

                getData(catHome.categoryTypeId, lookupHome.lookupId);
                vm.catTypeDisp = catHome.type;
                vm.catPhaseDisp = lookupHome.lookupCode;
                console.log(catHome.type + " :::::?????::::: " + lookupHome.lookupCode);
              // $http({
              //     method : "GET",
              //     url : baseUrl2 + "mdm/vee/threshold/multi-get?catTypeId="+cat.categoryTypeId+"&phaseId="+lookup.lookupId
              // }).then(function mySuccess(response) {
              //     vm.paramName = response.data;
              //     paramArray = vm.paramName;
              //     console.log(paramArray);
              //     $scope.paramName = paramArray;
              //     //return paramArray;
              // }, function myError(response) {
              //     console.log(response);
              //     //return response;
              // });
            }

          }

        // Modal popup
        vm.showModal = function(id) {
          console.log(":::;dialog");
          console.log(id);
          eachItem = id;
          console.log(eachItem);

          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'app/main/pages/config/vee/trMaster/trModal.html',
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

        // Get all parameterDetails
        var getData = function(p1, p2) {
          $http({
              method : "GET",
              //url : baseUrl2 + "mdm/vee/threshold/multi-get"
              url : baseUrl2 + "mdm/vee/threshold/multi-get?catTypeId="+p1+"&phaseId="+p2
          }).then(function mySuccess(response) {
            //var obj = response.data[0];
              vm.parameterDetails = response.data;

          }, function myError(response) {
              console.log(response);
          });
        }

        // calling getData() when page loads
        getData(10001,107);




        //get list of parammeter names
        // var singleGetData = function () {
        //   $http({
        //       method : "GET",
        //       url : baseUrl2 + "mdm/vee/threshold/get-param"
        //   }).then(function mySuccess(response) {
        //       vm.paramName = response.data;
        //       paramArray = vm.paramName;
        //   }, function myError(response) {
        //       console.log(response);
        //   });
        // }

      // function singleGetData1(param1, param2) {
      //     console.log(param1 + " :::::::::::::::::::  " + param2);
      //     $http({
      //         method : "GET",
      //         url : baseUrl2 + "mdm/vee/threshold/get-param?catTypeId="+param1+"&phaseId="+param2
      //     }).then(function mySuccess(response) {
      //         vm.paramName = response.data;
      //         paramArray = vm.paramName;
      //         console.log(paramArray);
      //         return paramArray;
      //     }, function myError(response) {
      //         console.log(response);
      //         return response;
      //     });
      //
      //   }

        //calling singleGetData() when page loads
        //singleGetData();

        //get list of user
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/vee/threshold/get-user"
        }).then(function mySuccess(response) {
            vm.paramUser = response.data;
            userArray = vm.paramUser;
        }, function myError(response) {
            console.log(response);
        });

        $http({
            method : "GET",
            url : baseUrl2 + "mdm/vee/threshold/get-conType"
        }).then(function mySuccess(response) {
          var obj = response.data[1];
            vm.meterSubCat = response.data;
            vm.catTypeDisp = "Residential";
            vm.catPhaseDisp = "1 Ph";
            catArr = vm.meterSubCat;
            console.log("++++++++++++++++++" +catArr);
        }, function myError(response) {
            console.log(response);
        });



        //DialogController function

        function DialogController($scope, $mdDialog, Clear) {
          console.log("diaqlogController:::::::::::::::::::::::::::::");

          console.log($scope.paramName);
          var cat = {};
          var lookup = {};
          var phaseId;
          $scope.Clear = Clear;


          $scope.getPhase = function() {
            console.log("In phase Func");

            console.log($scope.eachItem.type);
            cat = JSON.parse($scope.eachItem.type);

            console.log(cat.type);
            $http({
                method : "GET",
                url : baseUrl2 + "mdm/vee/threshold/get-mtrPhase/"+ cat.type
            }).then(function mySuccess(response) {
                $scope.phase = response.data;
                console.log($scope.phase);
                phaseArr = $scope.phase;
                console.log("+++++++++++++" +phaseArr);
            }, function myError(response) {
                console.log(response);
            });

          }

          $scope.getPhase1 = function() {
            console.log("In phase Func 1");
            console.log(lookup.lookupId);
            lookup = JSON.parse($scope.eachItem.phase);
            if(cat.categoryTypeId != undefined && lookup.lookupId != undefined) {
              // $scope.paramName = singleGetData1(cat.categoryTypeId, lookup.lookupId);
              // console.log("-------------inside getPhase1---------------");
              // console.log($scope.paramName);

              $http({
                  method : "GET",
                  url : baseUrl2 + "mdm/vee/threshold/get-param?catTypeId="+cat.categoryTypeId+"&phaseId="+lookup.lookupId
              }).then(function mySuccess(response) {
                  vm.paramName = response.data;
                  paramArray = vm.paramName;
                  console.log(paramArray);
                  $scope.paramName = paramArray;
                  //return paramArray;
              }, function myError(response) {
                  console.log(response);
                  //return response;
              });
            }

          }

          var splitDate =  function(dt) {
            dt = dt + "";
            var newDt = dt.split(' ')[2] + "-" + dt.split(' ')[1] + "-" + dt.split(' ')[3];
            return  newDt;
          }
          $scope.eachItem = {};
          $scope.minDate = new Date();

          $scope.validateThreshold = function(threshold) {

            if(threshold.veeParaCode == null || threshold.userName == null) {
              console.log("+++++++++++++++++++++++");
              vm.errorToast("Select both parameter name and username");
              return false;
            }
            if((threshold.minValue == undefined || threshold.minValue == null) && (threshold.maxValue == undefined || threshold.maxValue == null) && (threshold.minPercentage == undefined || threshold.minPercentage == null) && (threshold.maxPercentage == undefined || threshold.maxPercentage == null)) {
              console.log(threshold.minValue);
              vm.errorToast("Enter atleast one value among min and max");
              return false;
            }
            if (threshold.minValue < 0 || threshold.maxValue < 0 || threshold.minPercentage < 0 || threshold.maxPercentage < 0) {
              console.log(threshold.minValue);
              vm.errorToast("value must be >= 0");
              return false;
            }
            if ((threshold.minValue >= threshold.maxValue && (threshold.minValue != null &&  threshold.maxValue != null)) ||  (threshold.minPercentage >= threshold.maxPercentage && (threshold.minPercentage != null && threshold.maxPercentage != null))) {
              console.log("max values:");
              console.log(threshold.maxValue);
              vm.errorToast("Min Value & Max value sholud be less than Min Percentage, Max Percentage");
              return false;
            }
            if(threshold.effectiveDate == undefined) {
              vm.errorToast("Enter effective date");
              return false;
            }
            if ($scope.update) {
              var effectiveDate = new Date(threshold.effectiveDate);
              var currentDate = new Date();
              console.log(threshold.effectiveDate);
              console.log(currentDate);
              if (effectiveDate <= currentDate) {
                vm.errorToast("Effective Date should not be past date");
                return false;
              }
            }
            console.log(threshold.effectiveDate);
            return true;
          }

          if (eachItem === undefined) {

            $scope.title  = "Add New Parameter"
            $scope.submit = true;
            $scope.update = false;
            $scope.paramName = paramArray;
            $scope.paramUser = userArray;
            $scope.eachItem = {};
            $scope.eachItem.maxValue = 30;
            $scope.meterSubCat = catArr;
            $scope.phase = phaseArr;


            //when click submit validate insert data and post the form
            $scope.paramSubmit = function() {
              if($scope.validateThreshold($scope.eachItem)) {
                console.log("Insert Button");
                $scope.eachItem.effectiveDate= splitDate($scope.eachItem.effectiveDate);
                $scope.eachItem.userId = $scope.eachItem.userName.userId;
                $scope.eachItem.veeParaId = $scope.eachItem.veeParaCode.veeParaId;
                $scope.eachItem.catTypeId = cat.categoryTypeId;
                phaseId = JSON.parse($scope.eachItem.phase);
                $scope.eachItem.mtrPhaseId  =  phaseId.lookupId;
                var data = $scope.eachItem;
                console.log(data);
                var date = new Date()+"";
                var dateFormat = splitDate(date);
                data.createdDate = dateFormat;
                data.adminEntityValueId = 1000;
                data.createdBy = 1111;
                data.lastUpdatedBy = 1111;
                data.changeDate = dateFormat;
                data.lastUpdatedDate = dateFormat;
                data.lastUpdatedLogin = 1111;

                $http({
                    method : "POST",
                    url : baseUrl2 + "mdm/vee/threshold/insert",
                    data: data
                }).then(function mySuccess(response) {
                    if(response.data.status = true) {
                        console.log(response);
                        console.log("===== " +response.data.message);
                        $scope.answer("Submited Successfully");
                        vm.successToast("Submitted Successful");
                        //singleGetData1();
                        getData(10001,107);
                    }
                    else {
                      vm.errorToast("Not updated in records, Try again");
                    }
                }, function myError(response) {
                    console.log(response);
                });
              }
            }
          } else {

            $scope.title  = "Update Parameter"

            $scope.submit = false;
            $scope.update = true;

            $scope.eachItem = eachItem;
            console.log($scope.eachItem);
            $scope.paramUser = userArray;
            $scope.meterSubCat = catArr;
            $scope.phase = phaseArr;
            $scope.paramUpdate = function() {
              if($scope.validateThreshold($scope.eachItem)){
                var changeDt = new Date(eachItem.changeDate);
                var effectiveDt = new Date(eachItem.effectiveDate);

                $scope.eachItem.changeDate = splitDate(changeDt);
                $scope.eachItem.effectiveDate= splitDate(effectiveDt);console.log("?????????????");
                console.log($scope.eachItem.userName);
                $scope.eachItem.userName = $scope.eachItem.userName;
                $scope.eachItem.veeParaCode = $scope.eachItem.veeParaCode;
                var data = $scope.eachItem;
                console.log(data);
                var date = new Date()+"";
                var dateFormat = splitDate(date);
                data.createdDate = dateFormat;
                data.adminEntityValueId = 1000;
                data.createdBy = 1111;
                data.lastUpdatedBy = 1111;
                data.lastUpdatedDate = dateFormat;
                data.lastUpdatedLogin = 1111;

                $http({
                    method : "POST",
                    url : baseUrl2 + "mdm/vee/threshold/update",
                    data: data
                }).then(function mySuccess(response) {
                  if(response.data.status = true) {
                      console.log(response);
                      console.log("===== " +response.data.message);
                      $scope.answer("Updated Successfully");
                      vm.successToast("Updated Successful");
                      getData();
                  }
                  else {
                    vm.errorToast("Not updated in records, Try again");
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
            };

            $scope.answer = function(answer) {
              $mdDialog.hide(answer);
            };

          }
    }
})();
