(function ()
{
    'use strict';
    angular
        .module('app.sim')
        .controller('SimController', SimController);
    function SimController($http, $window, $mdToast, baseUrl1, Clear, MessageInfo){
        var vm = this;
        //vm.Clear = Clear;
        var ipType;
        vm.iptype = "static";
        vm.ipaddr = "ipv4";


        console.log(vm.ipaddr);

        // vm.simSelected = {
        //   ipaddr : "ipv4";
        // }
        console.log(vm.staticShow);

        vm.Clear = function () {
          //alert("hi");
          vm.simSelected ={};
          vm.iptype = "";
          vm.ipaddr = "";
          vm.ip1 = "";
          vm.ip2 = "";
          vm.ip3 = "";
          vm.ip4 = "";
          vm.ip5 = "";
          vm.ip6 = "";
          vm.ip7 = "";
          vm.ip8 = "";
          vm.ip9 = "";
          vm.ip10 = "";
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
     $('#ip1').keypress(validateNumber);
     $('#ip2').keypress(validateNumber);
     $('#ip3').keypress(validateNumber);
     $('#ip4').keypress(validateNumber);
     $('#ip5').keypress(validateNumber);
     $('#ip6').keypress(validateNumber);
     $('#ip7').keypress(validateNumber);
     $('#ip8').keypress(validateNumber);
     $('#ip9').keypress(validateNumber);
     $('#ip10').keypress(validateNumber);


     function validateNumber(event) {
         var key = window.event ? event.keyCode : event.which;
         if (event.keyCode === 8 || event.keyCode === 46) {
             return true;
         } else if ( key < 48 || key > 57 ) {
             return false;
         } else {
           return true;
         }
     };
     vm.successToast = function(mesg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(mesg)
          .position('top right')
          .hideDelay(3000)
          .toastClass('success')
        );
      };
      vm.typecSelectFun =function(change){
        if(change == "static"){
          vm.staticShow =false;
        }else {
          vm.staticShow =true;
        }
      }

        vm.ipSelect = function(type){
          ipType = type;
        if(ipType === "ipv4"){
          vm.ipv4 =true;
          vm.ipv6 = false;
          vm.ip1keyupevt = function (e) {
            console.log(e);
              if(e.length===3) {
                  var ipfield = $window.document.getElementById('ip2');
                  ipfield.focus();
              }
          }
          vm.ip2keyupevt = function (e) {
              if(e.length===3)
              {
                  var ipfield = $window.document.getElementById('ip3');
                  ipfield.focus();
              }
          }
          vm.ip3keyupevt = function (e) {
              if(e.length===3)
              {
                  var ipfield = $window.document.getElementById('ip4');
                  ipfield.focus();
              }
          }
        }
        if(ipType ==="ipv6"){
          vm.ipv4 =false;
          vm.ipv6 = true;

          vm.ip5keyupevt = function (e) {
              if(e.length===3)
              {
                  var ipfield = $window.document.getElementById('ip6');
                  ipfield.focus();
              }
          }
          vm.ip6keyupevt = function (e) {
              if(e.length===3)
              {
                  var ipfield = $window.document.getElementById('ip7');
                  ipfield.focus();
              }
          }
          vm.ip7keyupevt = function (e) {
              if(e.length===3)
              {
                  var ipfield = $window.document.getElementById('ip8');
                  ipfield.focus();
              }
          }
          vm.ip8keyupevt = function (e) {
              if(e.length===3)
              {
                  var ipfield = $window.document.getElementById('ip9');
                  ipfield.focus();
              }
          }
          vm.ip9keyupevt = function (e) {
              if(e.length===3)
              {
                  var ipfield = $window.document.getElementById('ip10');
                  ipfield.focus();
              }
          }
        }
        }
        vm.ipSelect("ipv4");
            $http({
                  method : "GET",
                  url : baseUrl1 + "mdm/sim/get-sprovider"
              }).then(function mySuccess(response) {
                console.log("checking for service type",response);
                  vm.servicetypes = response.data;
              }, function myError(response) {
              });

        $http({
              method : "GET",
              url : baseUrl1 + "mdm/sim/get-vendor"
          }).then(function mySuccess(response) {
              vm.serviceprovider = response.data;
          }, function myError(response) {
          });

        $http({
            method : "GET",
            url : baseUrl1 + "mdm/sim/get-dcuIDS"
        }).then(function mySuccess(response) {
            vm.dcuServiceNo = response.data;
        }, function myError(response) {
          console.log("checking for the error response",response);
        });

        function validateSim() {
        if(ipType == "ipv4"){
          var ip1nan=isNaN(vm.ip1);
          var ip2nan=isNaN(vm.ip2);
          var ip3nan=isNaN(vm.ip3);
          var ip4nan=isNaN(vm.ip4);
          if(ip1nan === true || ip2nan === true || ip3nan === true || ip4nan === true){
               //alert("Please Enter valid IP adress.");
              return false;
          }
        }else if(ipType == "ipv6"){
            var ip5nan=isNaN(vm.ip5);
            var ip6nan=isNaN(vm.ip6);
            var ip7nan=isNaN(vm.ip7);
            var ip8nan=isNaN(vm.ip8);
            var ip9nan=isNaN(vm.ip9);
            var ip10nan=isNaN(vm.ip10);
            if(ip5nan === true || ip6nan === true || ip7nan === true || ip8nan === true || ip9nan === true ||ip10nan === true){
             //alert("Please Enter valid IP adress.");
             return false;
             }
        }
        if(vm.simSelected.serviceprovider === undefined){
            //vm.errorToast("Please Select serviceprovide");
          MessageInfo.showMessage(1017, 'Service Provider', '', '');
          return false;
        }
        if(vm.simSelected.servicetypes === undefined){
            //vm.errorToast("Please Select serviceTypes");
            MessageInfo.showMessage(1017, 'Service Type', '', '');
          return false;
        }
        if(vm.simSelected.phone.toString().length <10 || vm.simSelected.phone.toString().length >10){
            //vm.errorToast("Please Enter 10 digit sim number");
            MessageInfo.showMessage(1418, '', '', '');
          return false;
        }
         if(vm.simSelected.simno.toString().length <14){
            vm.errorToast("Please Enter atleat 14 digit sim  number");
           return false;
         }

         if(vm.simSelected.dcuServiceNo === undefined){
            //vm.errorToast("Please Select Dcu No.");
            MessageInfo.showMessage(1017, 'Dcu No', '', '');
           return false;
         }

         if(vm.iptype == undefined){
            //vm.errorToast("Please Select Ip Type.");
            MessageInfo.showMessage(1017, 'Ip Type', '', '');
           return false;
         }


         return true;
    }
          vm.simForm = function () {

             if(validateSim()) {
               var data = {};
               var date = new Date() + "";
               var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
               data.createdDate = dateFormat;
               data.adminEntityValueId = 1000;
               data.createdBy = 1111;
               data.lastUpdatedBy = 1111;
               data.lastUpdatedDate = dateFormat;
               data.lastUpdatedLogin = 1111;
               vm.simSelected.ipaddr = vm.ipaddr;
               vm.simSelected.iptype = vm.iptype;
               console.log("STATSEDFSG");
               console.log(vm.simSelected.ipaddr);
               data.simSelected = vm.simSelected;
               if(ipType =="ipv4"){
                  data.ipV4=vm.ip1+"."+vm.ip2+"."+vm.ip3+"."+vm.ip4;
               }else if(ipType == "ipv6"){
                    data.ipV6=vm.ip5+"."+vm.ip6+"."+vm.ip7+"."+vm.ip8+"."+vm.ip9+"."+vm.ip10;
               }
               $http({
                   method : "POST",
                   url : baseUrl1 + "mdm/sim/simsubmit",
                   data: data
               }).then(function mySuccess(response) {
                 console.log("checking for the response",response);
                 if(response.data.message =="Success"){
                   //vm.successToast("Successfully Submitted...");
                    MessageInfo.showMessage(1012, '', '', '');
                 }
                 if(response.data.message == "Mobile Number is Already Existed."){
                   //vm.errorToast("Mobile Number is Already Existed")
                   MessageInfo.showMessage(1420, 'Mobile Number is', '', '');
                 }
                 if(response.data.message =="SIM Number is Already Existed."){
                   //vm.errorToast("SIM Number is Already Existed");
                   MessageInfo.showMessage(1420, 'SIM Number is', '', '');
                 }
                 if(response.data.message == "IP Address is Already Existed."){
                   //vm.errorToast("IP Address is Already Existed");
                    MessageInfo.showMessage(1420, 'IP Address is', '', '');
                 }
                 if(response.data.message == ",IP Address is Already Existed."){
                   //vm.errorToast("IP Address is Already Existed");
                   MessageInfo.showMessage(1420, 'IP Address is', '', '');
                 }
                 if(response.data.message == "DCU is Already Configured."){
                  // vm.errorToast("DCU is Already Configured.");
                  MessageInfo.showMessage(1421, '', '', '');
                 }
                 if(response.data.message == "Mobile Number is Already Existed,IP Address is Already Existed"){
                   vm.errorToast("Mobile Number is Already Existed,IP Address is Already Existed");
                 }
                 if(response.data.message == "Mobile Number is Already Existed,SIM Number is Already Existed"){
                   vm.errorToast("Mobile Number is Already Existed,SIM Number is Already Existed")
                 }
                 if(response.data.message == "Mobile Number is Already Existed,SIM Number is Already Existed"){
                   vm.errorToast("Mobile Number is Already Existed,SIM Number is Already Existed")
                 }
                 if(response.data.message =="Mobile Number is Already Existed,SIM Number is Already Existed,IP Address is Already Existed"){
                   vm.errorToast("Mobile Number is Already Existed,SIM Number is Already Existed,IP Address is Already Existed")
                 }

               }, function myError(response) {
                 console.log("checking for the error after post",response);
                 //vm.errorToast("Someting Went Worng. !!!");
                 MessageInfo.showMessage(1010, '', '', '');
               });
         }
     }
 }
})();
