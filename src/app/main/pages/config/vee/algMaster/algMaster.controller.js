(function ()
{
    'use strict';
    angular
        .module('app.algorithmMaster')
        .controller('algorithmMasterController', algorithmMasterController);
    /** @ngInject */
    function algorithmMasterController(SampleData,$http,$mdDialog,baseUrl2,Clear)
    {
        var vm = this;
        vm.Clear = Clear;
        vm.progressShow=true;
        //alert(vm.progressShow);
        //vm.listItems = ['Onscreen','SMS','Email'];
        //vm.staticShow =true; // To Disbale Notofocation CheckBoxes While Page Loading;
        var itemx = {};

        var splitDate1 =  function(dt) {
          console.log(dt);
           var newDt1 = dt.split(' ')[2] + "-" + dt.split(' ')[1] + "-" + dt.split(' ')[3];
           console.log(newDt1);
          return  newDt1;

        }

        var getData = function() {
            $http({
                method : "GET",
                url : baseUrl2 + "mdm/vee/algorithm/multi-get"
            }).then(function mySuccess(response) {
                vm.progressShow=false;
                //alert(vm.progressShow);
                vm.algorithmsNew = response.data;
            }, function myError(response) {
                console.log(response);
            });
          }
        getData();

     //  Function for showing popup
     vm.showTabDialog = function(id) {
       console.log("++++++++++++++++++++==");
        console.log("id is "+id);
        itemx = id;
           $mdDialog.show({
             controller: DialogController,
             templateUrl: 'app/main/pages/config/vee/algMaster/dialogForm.html',
            // parent: angular.element(document.body),
             targetEvent: "ev",
             clickOutsideToClose:false

           })
           // controller for popup
          function DialogController($scope, $mdDialog, $http, $mdToast, Clear) {

              $scope.Clear = Clear;
              $scope.estimationDisbaled=true;
              $scope.editDisbaled=true;
              $scope.towhomDisbaled=true;
              $scope.mobileDisbaled=true;
              $scope.emailDisbaled=true;
              $scope.algValues = {};
              $scope.algValues.notificOnScreen ="N";
              $scope.algValues.notificSMS ="N";
              $scope.algValues.notificEmail ="N";
              $scope.algValues.notificRequired="N";
              console.log("::::::::uuuu:::::::");
              console.log($scope.algValues);

              $scope.algoSelectFun =function(change){
                $scope.tmpAlgId=$scope.algValues.algName1;
                if($scope.tmpAlgId==10003 || $scope.tmpAlgId==10004 ||$scope.tmpAlgId==10005 || $scope.tmpAlgId==10007 || $scope.tmpAlgId==10008)
                {
                  $scope.estimationDisbaled=false;
                  $scope.editDisbaled=false;
                }
                else
                {
                  $scope.estimationDisbaled=true;
                  $scope.editDisbaled=true;
                   $scope.algValues.estimationRequired="N";
                   $scope.algValues.editRequired="N"
                }
            }

            $scope.errorToast = function(mesg) {
             $mdToast.show(
              $mdToast.simple()
                 .textContent(mesg)
                 .position('top right')
                 .hideDelay(3000)
                 .toastClass('error')
             );
           };

            $scope.successToast = function(mesg) {
            $mdToast.show(
              $mdToast.simple()
                .textContent(mesg)
                .position('top right')
                .hideDelay(3000)
                .toastClass('success')
            );
        };

        console.log("item is ",itemx);
          $scope.algValues = {};
          console.log("item number is ",$scope.algValues)
          console.log("selected ",$scope.algValues.algNameeselected);
          if(itemx.algCode==undefined)
           {
             $scope.autoCompleteDisbale=false;
             $scope.staticShow =true;
             $scope.submit = true;
             $scope.update = false;
             //$scope.algDisabled=false;
             $scope.title= "Create New Algorithm";
           }
           else {
             //$scope.algDisabled=true;
             $scope.estimationDisbaled=true;
             $scope.editDisbaled=true;
             $scope.submit = false;
             $scope.update = true;
             $scope.itemx=itemx;
             $scope.title= "Update Algorithm";
             console.log(itemx.algId);

             $scope.algValues.algName1 = itemx.algId;
             $scope.algValues.algName2 = itemx.algCode;

             if($scope.algValues.algName1==10003 || $scope.algValues.algName1==10004 ||$scope.algValues.algName1==10005 || $scope.algValues.algName1==10007 || $scope.algValues.algName1==10008)
             {
               $scope.estimationDisbaled=false;
               $scope.editDisbaled=false;
             }
             else
             {
               $scope.estimationDisbaled=true;
               $scope.editDisbaled=true;
                $scope.algValues.estimationRequired="N";
                $scope.algValues.editRequired="N"
             }

             $scope.algValues.mobile = itemx.personalMobile;
             $scope.algValues.email = itemx.emailId;
             $scope.algValues.estimationRequired=itemx.requiredEdit;
             $scope.algValues.editRequired=itemx.requiredEst;
             $scope.algValues.notificRequired=itemx.notificationReq;

             if($scope.algValues.notificRequired === "N"){
               $scope.staticShow =true;

             }
             if($scope.algValues.notificRequired === "Y"){
               $scope.towhomDisbaled=false;

             }

             //alert(itemx.notificationReq);
             $scope.algValues.failurType1=itemx.failureType;
             $scope.algValues.notifyUser1=itemx.notifyUser;
             if($scope.algValues.notifyUser1 == "PERSON"){
               $scope.mobileDisbaled=false;
               $scope.emailDisbaled=false;

             }
             $scope.algValues.notificOnScreen=itemx.onscreen;
             $scope.algValues.notificSMS=itemx.sms;
             $scope.algValues.notificEmail=itemx.email;
             $scope.algValues.algNamee=itemx.algName;


           }

           $scope.listItems = ['Onscreen','SMS','Email'];

            $http({
                  method : "GET",
                  url : baseUrl2 + "mdm/vee/algorithm/get-algorithms"

              }).then(function mySuccess(response) {
                  $scope.algName = response.data;
                  //vmd.alogoName = response.data;
                  //console.log("alg names",$scope.algName);
                  //$scope.one = $scope.algName[0][0];
                  console.log("::::::::::::::::::::::");
                  console.log($scope.one);
              }, function myError(response) {
                  console.log(response);
              });

              $http({
                    method : "GET",
                    url :baseUrl2 + "mdm/vee/algorithm/get-fail"
                }).then(function mySuccess(response) {
                    $scope.failurType = response.data;
                    console.log("////////////+++++yyyyyyyyyy");
                    console.log($scope.failurType);
                }, function myError(response) {
                    console.log(response);
                });

                $http({
                      method : "GET",
                      url :baseUrl2 + "mdm/vee/algorithm/get-whom"
                  }).then(function mySuccess(response) {
                      $scope.toWhom = response.data;
                      console.log($scope.toWhom);
                  }, function myError(response) {
                      console.log(response);
                  });

                 vm.hide = function() {
                   $mdDialog.hide();
                 };

                 $scope.cancel = function() {
                   $mdDialog.cancel();
                 };

                 vm.answer = function(answer) {
                   $mdDialog.hide(answer);
                 };

                // Function for disbaling the SMS/Email/Onscreen Fields
                 $scope.typecSelectFun =function(change){
                   //alert("Hi");
                 if($scope.algValues.notificRequired === "Y"){
                    $scope.staticShow =false;
                    $scope.towhomDisbaled=false;
                    // $scope.mobileDisbaled=false;
                    // $scope.emailDisbaled=false;
                 }else {
                   $scope.mobileDisbaled=true;
                   $scope.emailDisbaled=true;
                   $scope.towhomDisbaled=true;
                   $scope.staticShow =true;
                   $scope.algValues.notificOnScreen="N";
                   $scope.algValues.notificSMS="N";
                   $scope.algValues.notificEmail="N";
                   $scope.algValues.notifyUser1=""
                   $scope.algValues.email="";
                   $scope.algValues.mobile="";

                 }
               }

               $scope.toWhomSelectFun =function(change){
                 //alert($scope.algValues.notifyUser1);
                 if($scope.algValues.notifyUser1 === "PERSON"){
                    $scope.mobileDisbaled =false;
                    $scope.emailDisbaled  =false;

                    //$scope.mobileDisbaled=false;
                    //$scope.emailDisbaled=false;

                 }else {
                    $scope.mobileDisbaled=true;
                    $scope.emailDisbaled=true;
                    $scope.algValues.email="";
                    $scope.algValues.mobile="";
                  }
               }

               function validateAlg() {
                console.log("KKKKKKKKKKKKKKKKKKKK");
                console.log($scope.algValues);
                   if($scope.algValues.algName1 == undefined){
                        $scope.errorToast("Please Select Algorithm Name.");
                        return false;
                    }
                    if($scope.algValues.failurType1 == undefined){
                         $scope.errorToast("Please Select Failure Type.");
                         return false;
                     }
                     if($scope.algValues.notificRequired == "Y" && ( $scope.algValues.notificOnScreen ==undefined ||  $scope.algValues.notificOnScreen =="N"  ) &&  ($scope.algValues.notificSMS  ==undefined ||  $scope.algValues.notificSMS  =="N"  ) && ($scope.algValues.notificEmail   ==undefined ||  $scope.algValues.notificEmail   =="N"  )){
                          $scope.errorToast("Please Select Atleast one among Onscreen / SMS / Email.");
                          return false;
                      }
                      if($scope.algValues.notificRequired == "Y" && ($scope.algValues.notifyUser1 == undefined || $scope.algValues.notifyUser1 ==null)){
                           $scope.errorToast("Please Select To Whom Notification should be sent.");
                           return false;
                       }
                       if($scope.algValues.notificRequired == "Y" && $scope.algValues.notifyUser1 == "PERSON" && $scope.algValues.mobile ==undefined ){
                            $scope.errorToast("Please Enter Valid Mobile Number.");
                            return false;
                        }
                        if($scope.algValues.notificRequired == "Y" && $scope.algValues.notifyUser1 == "PERSON" && ($scope.algValues.email  == undefined || $scope.algValues.email  == "")){
                             $scope.errorToast("Please Enter Valid Email Id.");
                             return false;
                         }

                     return true;
                   }

               $scope.formSubmit = function () {

                 if(validateAlg()){

                         var data = {};
                         var date = new Date()+"";
                         //data.createdDate =splitDate1(date);
                         data.adminEntityValueId = 1000;
                         data.createdDate = splitDate1(date);
                         data.lastUpdatedDate = splitDate1(date);
                         data.createdBy = 1111;
                         data.lastUpdatedBy = 1111;
                         //data.lastUpdatedDate = splitDate1(date);
                         data.lastUpdatedLogin = 1111;
                         data.algValues = $scope.algValues;

                         //console.log(data.algValues.failureType);

                         $http({
                             method : "POST",
                             url : baseUrl2 + "mdm/vee/algorithm/ins-algorithm",
                             data: data
                         }).then(function mySuccess(response) {
                             console.log();
                             if(response.data.message=="This Algorithm is Already Existed")
                             {
                               $scope.errorToast(response.data.message)
                               console.log(data);
                             }
                             if(response.data.message=="Success")
                             {

                               $scope.successToast("Algorithm Details have been submitted Sucessfully.");
                               console.log(response.data.message);
                               getData();
                             }

                               console.log(response.data.message);

                             //vm.successToast("DCU Details Submitted Sucessfully with DCU S.No "+SerNo);

                         }, function myError(response) {

                             console.log(response.data.message);
                             //console.log(response.message);
                             //vm.errorToast("Sorry. We Are Having Some Techinical Issues With Regards To The Server. Please Try Later.");
                         });
                         console.log(response.data.message);
                   }
                 }

                 $scope.formUpdate = function () {

                    if(validateAlg()){
                           var data = {};
                           var date = new Date()+"";
                           //data.createdDate =splitDate1(date);
                           data.adminEntityValueId = 1000;
                           data.createdDate = splitDate1(date);
                           data.lastUpdatedDate = splitDate1(date);
                           data.createdBy = 1111;
                           data.lastUpdatedBy = 1111;
                           //data.lastUpdatedDate = splitDate1(date);
                           data.lastUpdatedLogin = 1111;
                           data.algValues = $scope.algValues;

                           //console.log(data.algValues.failureType);

                           $http({
                               method : "POST",
                               url : baseUrl2 + "mdm/vee/algorithm/update-algorithm",
                               data: data
                           }).then(function mySuccess(response) {
                               console.log(data);
                               $scope.successToast("Algorithm Details have been Updated Sucessfully.");
                               getData();

                           }, function myError(response) {

                               console.log(response);
                               //vm.errorToast("Sorry. We Are Having Some Techinical Issues With Regards To The Server. Please Try Later.");
                           });


                     }

                }


              }
       };
    }
})();
