(function ()
{
    'use strict';

    angular
        .module('app.dcu')
        .controller('DcuController', DcuController);

    /** @ngInject */
    function DcuController($http, $window, $mdToast, baseUrl1, $timeout, Clear) {
      var vm=this;
      vm.Clear = Clear;
      vm.progressShow =false;
      vm.maxDate = new Date();
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

      $('#ip1').keypress(validateNumber);
      $('#ip2').keypress(validateNumber);
      $('#ip3').keypress(validateNumber);
      $('#ip4').keypress(validateNumber);
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%");
      $("#ip1").keypress(newFunction());
      function newFunction() {
        console.log("Nagulu");
      }
      function validateNumber(event) {
        console.log(event);
        var key = window.event ? event.keyCode : event.which;
        if (event.keyCode === 8 || event.keyCode === 46) {
            return true;
        } else if ( key < 48 || key > 57 ) {
            return false;
        } else {
          return true;
        }
      };

      //var dt = new Date()+"";
      var splitDate1 =  function(dt) {
        console.log(dt);
         var newDt1 = dt.split(' ')[2] + "-" + dt.split(' ')[1] + "-" + dt.split(' ')[3];
         console.log(newDt1);
        return  newDt1;


      }

      //splitDate(dt);

      $http({
            method : "GET",
            url : baseUrl1 + "mdm/dcu/get-id"
        }).then(function mySuccess(response) {
            vm.cId = response.data;
            console.log(vm.cId);
            //vm.timezones = response.data;
        }, function myError(response) {
            console.log(response);
        });

        $http({
              method : "GET",
              url : baseUrl1 + "mdm/dcu/get-id-store"
          }).then(function mySuccess(response) {
              vm.cId1 = response.data;
              console.log(vm.cId1);
              //vm.timezones = response.data;
          }, function myError(response) {
              console.log(response);
          });

          $http({
                method : "GET",
                url : baseUrl1 + "mdm/dcu/get-status"
            }).then(function mySuccess(response) {
                vm.dcuChangeStatus = response.data;

                //vm.timezones = response.data;
            }, function myError(response) {
                console.log(response);
            });


      $http({
              method : "GET",
              url : baseUrl1 + "mdm/dcu/get-make"
          }).then(function mySuccess(response) {
              vm.devicemakes = response.data;
              //console.log(vm.dcu.devicemakes);
              console.log(response);
          }, function myError(response) {
              console.log(response);
          });

      $http({
          method : "GET",
          url : baseUrl1 + "mdm/dcu/get-type"
      }).then(function mySuccess(response) {
          vm.devicetypes = response.data;
          //console.log(vm.dcu.devicemakes);
          console.log(response);
      }, function myError(response) {
          console.log(response);
      });

      $http({
                  method : "GET",
                  url : baseUrl1 + "mdm/dcu/get-protocol"
              }).then(function mySuccess(response) {
                  vm.deviceprotocols = response.data;
                  //console.log(vm.dcu.devicemakes);
                  console.log(response);
              }, function myError(response) {
                  console.log(response);
              });

      $http({
                  method : "GET",
                  url : baseUrl1 + "mdm/dcu/get-status"
              }).then(function mySuccess(response) {
                  vm.devicestatuses = response.data;
                  //vm.dcuSelected.devicestatuses=response.data[3];
                  //console.log(vm.dcu.devicemakes);
                  console.log(response);
              }, function myError(response) {
                  console.log(response);
              });

            // $http({
            //           method : "GET",
            //           url : baseUrl1 + "mdm/deviceconfigurations/1000"
            //       }).then(function mySuccess(response) {
            //           vm.deviceid = response.data;
            //           console.log(response);
            //       }, function myError(response) {
            //           console.log(response);
            //   });

      var vm = this;
      vm.status = "In Active";


      vm.manufacturers = [{
        'mcode' : '',
        'mname' : '',
        'mvalid': false
      }];

      vm.addManufacturers = function(i) {
        var manufacture = {
          'mcode' : '',
          'mname' : '',
          'mvalid': false
         };
        vm.manufacturers.push(manufacture);
      }
      vm.deleteMakes = function(i) {
         console.log(i);
         vm.manufacturers.splice(i,1);
      }

      vm.protocols = [{
        'protocol' : '',
        'pvalid' : false
      }];

      vm.addProtocols = function(i) {
        var protocol1 = {
          'protocol' : ''
         };
        vm.protocols.push(protocol1);
      }
      vm.deleteProtocols = function(i) {
         console.log(i);
         vm.protocols.splice(i,1);
      }


      vm.types = [{
        'type' : ''
      }];

      vm.addTypes = function(i) {
        var type = {
          'type' : ''
         };
        vm.types.push(type);
      }

      vm.deleteTypes = function(i) {
         console.log(i);
         vm.types.splice(i,1);
      }

      vm.statuses = [{
        'status' : ''
      }];

      vm.addStatuses = function(i) {
        var status= {
          'status' : ''
         };
        vm.statuses.push(status);
      }

      vm.deleteStatus = function(i) {
        console.log(i);
        vm.statuses.splice(i,1);
     }

       // Protocol submit function
      function validateProto(protos) {
          var t=0;
          if(protos.length == 0){
              vm.errorToast("Please Enter Atleast One DCU Prototocol Value.");
              return false;
          }

          var count = 0;

          for(var i = 0; i < protos.length; i++) {
            var pro = protos[i];
            pro.pvalid = false;
          }
          for (var i=0; i<protos.length; i++) {
            var arrA = protos[i];
            for (var j=0; j<protos.length; j++) {
              if (i == j){
               // continue;
             } else {
                 var arrB = protos[j];
               if (arrA.protocol == arrB.protocol) {
                 arrA.pvalid = true;
                 arrB.pvalid = true;
                 count++;
                 //console.log(count);
               }
             }
             //console.log(arrB);
            }
          }
          if(count >=1) {
            //hols.valid = false;
            vm.errorToast("Please do not enter Duplicate Protocol Names");
            console.log(count);
            return false;
          }

            return true;
          }

          vm.protocolsub = function () {

            var data = {};
            var a = {};
            var b = [];
            var resProto = [];
            var j = 0;

            //Skipping not filled category name and category code rows and taking only filled rows
            for (var i = 0; i < vm.protocols.length; i++) {
              if((vm.protocols[i].protocol =="")) {
                continue;
              }
              resProto[j] = vm.protocols[i];
              j++;
            }
            if(validateProto(resProto)) {
              for(var i = 0; i < resProto.length; i++) {
                var k=0;
                for(var key in resProto[i]) {
                  var resString = resProto[i][key] + "";

                  if(k == 0) {
                    a.protocol = resString;
                  }
                    k++;
                  }
                  b.push(a);
                  a = {};
                }
              var date = new Date()+"";
              //var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
              data.createdDate = splitDate1(date);
              data.adminEntityValueId = 1000;
              data.createdBy = 1111;
              data.lastUpdatedBy = 1111;
              data.lastUpdatedDate = splitDate1(date);
              data.lastUpdatedLogin = 1111;
              data.protocol = b;


              console.log(data.protocol);
              $http({
                  method : "POST",
                  url : baseUrl1 + "mdm/dcu/protocol",
                  data: data
              }).then(function mySuccess(response) {
                  console.log(response);
                  vm.successToast("DCU Protocol Deatails Have Been Submitted Sucessfully.");

              }, function myError(response) {

                  console.log(response);
                  vm.errorToast("Sorry. We Are Having Some Techinical Issues With Regards To The Server. Please Try Later.");
              });


            }
          }

      // Make Sbumit
      function validateMake(makes) {
         // temporory varaible for duplicate validation
        var count =0;
        if(makes.length == 0){
            vm.errorToast("Please Enter Atleast One Manufacturer Name and Code.");
            return false;
        }

        for (var i = 0; i < makes.length; i++) {
          if((makes[i].mcode =="" && makes[i].mname !="") || (makes[i].mcode !="" && makes[i].mname =="")) {
              vm.errorToast("Please Enter Both Manufacturer Code And Name.");
              return false;
          }
        }
       for(var i = 0; i < makes.length; i++) {
         var make = makes[i];
         make.mvalid = false;
       }
       for (var i=0; i<makes.length; i++) {
         var arrA = makes[i];
         for (var j=0; j<makes.length; j++) {
           if (i == j){
            // continue;
          } else {
              var arrB = makes[j];
            if (arrA.mcode == arrB.mcode) {
              arrA.mvalid = true;
              arrB.mvalid = true;
              count++;
              //console.log(count);
            }
            else if (arrA.mname == arrB.mname) {
              arrA.mvalid = true;
              arrB.mvalid = true;
              count++;
            }
          }
         }
       }
       if(count >=1) {
         console.log(count);
         vm.errorToast("Please do not enter duplicate manufacturer values");
         return false;
       }
        return true;
      }

      vm.made = function () {

        var data = {};
        var a = {};
        var b = [];
        var resManufacturer = [];
        var j = 0;

        //Skipping not filled category name and category code rows and taking only filled rows
        for (var i = 0; i < vm.manufacturers.length; i++) {
          if((vm.manufacturers[i].mcode =="" && vm.manufacturers[i].mname =="")) {
            continue;
          }
          resManufacturer[j] = vm.manufacturers[i];
          console.log(resManufacturer);
          j++;
        }
        if(validateMake(resManufacturer)) {
          console.log(resManufacturer);
          for(var i = 0; i < resManufacturer.length; i++) {
            var  k = 0;
            for(var key in resManufacturer[i]) {
              var resString = resManufacturer[i][key] + "";
              if(k == 0) {
                a.code = resString;
              }
              else if(k == 1){
                a.name = resString;
              }
              k++;
              }
              b.push(a);
              a = {};
            }
          var date = new Date()+"";
          //var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
          data.createdDate = splitDate1(date);
          data.adminEntityValueId = 1000;
          data.createdBy = 1111;
          data.lastUpdatedBy = 1111;
          data.lastUpdatedDate = splitDate1(date);
          data.lastUpdatedLogin = 1111;
          data.make = b;
          console.log(data.make);

          $http({
             method : "POST",
             url : baseUrl1 + "mdm/dcu/make",
             data: data
         }).then(function mySuccess(response) {
             console.log(response);
             vm.successToast("DCU Manufcaturer Details Have Been Submitted Succesfully.");

         }, function myError(response) {

             console.log(response);
             vm.errorToast("Sorry. We Are Having Some Techinical Issues With Regards To The Server. Please Try Later.");
         });


        }
      }

      //Type Form Submit

      function validateClass(types) {
        var t=0;
        if(types.length == 0){
            vm.errorToast("Please Enter Atleast One Device Type.");
            return false;
        }
        var count = 0;

        for(var i = 0; i < types.length; i++) {
          var typ = types[i];
          typ.tvalid = false;
        }
        for (var i=0; i<types.length; i++) {
          var arrA = types[i];
          for (var j=0; j<types.length; j++) {
            if (i == j){
             // continue;
           }
           else {
               var arrB = types[j];
               if (arrA.type == arrB.type) {
                 arrA.tvalid = true;
                 arrB.tvalid = true;
                 count++;
               }
             }
           }
         }
        if(count >=1) {
          console.log(count);
          vm.errorToast("Please do not enter duplicate protocol names");
          return false;
        }
        return true;
      }

      vm.TypeSubmit = function () {

        var data = {};
        var a = {};
        var b = [];
        var resType = [];
        var j = 0;

        //Skipping not filled category name and category code rows and taking only filled rows
        for (var i = 0; i < vm.types.length; i++) {
          if((vm.types[i].type =="")) {
            continue;
          }
          resType[j] = vm.types[i];
          j++;
        }
        if(validateClass(resType)) {
          for(var i = 0; i < resType.length; i++) {
            var k=0;
            for(var key in resType[i]) {
              var resString = resType[i][key] + "";
              if(k == 0) {
                a.type = resString;
              }
              k++;
              }
              b.push(a);
              a = {};
            }
          var date = new Date()+"";
          //var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
          data.createdDate = splitDate1(date);
          data.adminEntityValueId = 1000;
          data.createdBy = 1111;
          data.lastUpdatedBy = 1111;
          data.lastUpdatedDate = splitDate1(date);
          data.lastUpdatedLogin = 1111;
          data.type = b;


          console.log(data.type);
          $http({
              method : "POST",
              url : baseUrl1 + "mdm/dcu/type",
              data: data
          }).then(function mySuccess(response) {
              console.log(response);
              vm.successToast("DCU Type Deatails Have Been Submitted Sucessfully");

          }, function myError(response) {

              console.log(response);
              vm.errorToast("Sorry. We Are Having Some Techinical Issues With Regards To The Server. Please Try Later.");
          });
        }
      }

      //Status submit

      function validateState(statuses) {
        var t=0;
        if(statuses.length == 0){
            vm.errorToast("Please Enter Atleast One Status Value.");
            return false;
        }
        var count = 0;

        for(var i = 0; i < statuses.length; i++) {
          var cla = statuses[i];
          cla.svalid = false;
        }
        for (var i=0; i<statuses.length; i++) {
          var arrA = statuses[i];
          for (var j=0; j<statuses.length; j++) {
            if (i == j){
             // continue;
           } else {
               var arrB = statuses[j];
             if (arrA.status == arrB.status) {
               arrA.svalid = true;
               arrB.svalid = true;
               count++;
             }
           }
          }
        }
        if(count >=1) {
          console.log(count);
          vm.errorToast("Please do not enter duplicate Type names");
          return false;
        }
        return true;
      }

      vm.StatusSubmit = function () {

        var data = {};
        var a = {};
        var b = [];
        var resStatus = [];
        var j = 0;

        //Skipping not filled category name and category code rows and taking only filled rows
        for (var i = 0; i < vm.statuses.length; i++) {
          if((vm.statuses[i].status =="")) {
            continue;
          }
          resStatus[j] = vm.statuses[i];
          j++;
        }
        if(validateState(resStatus)) {
          for(var i = 0; i < resStatus.length; i++) {
            var k=0;
            for(var key in resStatus[i]) {
              var resString = resStatus[i][key] + "";

                if(k == 0) {
                  a.status = resString;
                }
                k++;
              }
              b.push(a);
              a = {};
            }
          var date = new Date()+"";
          //var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
          data.createdDate = splitDate1(date);
          data.adminEntityValueId = 1000;
          data.createdBy = 1111;
          data.lastUpdatedBy = 1111;
          data.lastUpdatedDate = splitDate1(date);
          data.lastUpdatedLogin = 1111;
          data.status = b;


          console.log(data.status);
          $http({
              method : "POST",
              url : baseUrl1 + "mdm/dcu/status",
              data: data
          }).then(function mySuccess(response) {
              console.log(response);
              vm.successToast("DCU Status Deatails Have Been Submitted Sucessfully");

          }, function myError(response) {

              console.log(response);
              vm.errorToast("Sorry. We Are Having Some Techinical Issues With Regards To The Server. Please Try Later.");
          });
        }
      }

      // DCU Submit()

      vm.ip1keyupevt = function (e) {
        console.log(e);
        if(e.length===3)
        {
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

      vm.validateDcu = function() {

        var c1=false;
        var pnan=isNaN(vm.dcuSelected.portnumber);
        var hesnan=isNaN(vm.dcuSelected.hesid)
        var latnan=isNaN(vm.dcuSelected.latitude);
        var lannan=isNaN(vm.dcuSelected.longitude);
        var ip1nan=isNaN(vm.ip1);
        var ip2nan=isNaN(vm.ip2);
        var ip3nan=isNaN(vm.ip3);
        var ip4nan=isNaN(vm.ip4);
        vm.ip=vm.ip1+vm.ip2+vm.ip3+vm.ip4;
        var installeddate = new Date(vm.dcuSelected.installed);
        var commisioneddate = new Date(vm.dcuSelected.commisoned);
        var currdate = new Date();
        //alert(installeddate);
        //alert(commisioneddate);
        //alert(currdate);
        if(vm.dcuSelected.devicemakes == undefined)
        {
          vm.errorToast("Please Select DCU MAKE.");
          return false;
        }
        if(vm.dcuSelected.devicetypes == undefined)
        {
          vm.errorToast("Please Select DCU Type.");
          return false;
        }
        // if(vm.dcuSelected.deviceprotocols == undefined)
        // {
        //    vm.errorToast("Please Select DCU Protocol.");
        //     return false;
        // }
        if(installeddate > currdate){
            vm.errorToast("Installed date can't be a future date.");
            return false;
        }
        if(commisioneddate > currdate){
            vm.errorToast("Commisoned date can't be a future date.");
            return false;
        }
        if(commisioneddate < installeddate){
            vm.errorToast("Commisoned date can't be a lesser than Installed date .");
            return false;
        }
        if(vm.dcuSelected.devicestatuses == undefined)
        {
            vm.errorToast("Please Select DCU Staus.");
            return false;
        }
        if(latnan == true){
            vm.errorToast("Please Enter valid latitude.");
            return false;
        }
        if(lannan == true){
            vm.errorToast("Please Enter valid longitude.");
            return false;
        }
        if(hesnan == true){
            vm.errorToast("Please Enter valid HES ID.");
            return false;
        }
        if(pnan == true){
            vm.errorToast("Please Enter valid port number.");
            return false;
        }
        if(ip1nan == true || ip2nan == true || ip3nan == true || ip4nan == true){
            vm.errorToast("Please Enter valid IP adress.");var data = {};
            return false;
        }

        return true;
      }

      vm.dcuConfigureSubmit = function () {
        vm.progressShow = true;
        console.log("Make is "+vm.dcuSelected.devicemakes);
        if(vm.validateDcu()) {
          var data = {};
          //vm.dcuSelected ={};
          var SerNo=vm.dcuSelected.dcuSRno;
          var date = new Date()+"";
          // var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
          data.createdDate =splitDate1(date);
          //dateFormat
          data.adminEntityValueId = 1000;
          data.createdBy = 1111;
          data.lastUpdatedBy = 1111;
          data.lastUpdatedDate = splitDate1(date);
          data.lastUpdatedLogin = 1111;
          var installedDate = new Date(vm.dcuSelected.installed) + "";
          console.log(installedDate);
          var commisioneDdate =new Date(vm.dcuSelected.commisoned) + "";
          console.log(commisioneDdate);
          vm.dcuSelected.installed = splitDate1(installedDate) ;
          vm.dcuSelected.commisoned = splitDate1(commisioneDdate) ;
          vm.dcuSelected.ip = vm.ip1+"."+vm.ip2+"."+vm.ip3+"."+vm.ip4;
          data.dcuSelected = vm.dcuSelected;
          //data.ip=vm.ip;
          console.log(vm.dcuSelected.installed);
          console.log(vm.dcuSelected.commisoned);
          console.log(data);

          $http({
              method : "POST",
              url : baseUrl1 + "mdm/dcu/insert",
              data: data
          }).then(function mySuccess(response) {
              console.log(response);
              vm.progressShow = false;
              vm.successToast("DCU Details Submitted Sucessfully with DCU S.No "+SerNo);


          }, function myError(response) {

              console.log(response);
              vm.errorToast("Sorry. We Are Having Some Techinical Issues With Regards To The Server. Please Try Later.");
          });

        }

      }

      // DCU Change Submit()

      function validateDcuChange() {

        //  alert(SerNo);
        var dcufailuredddate = new Date(vm.dcuChange.failuredate);
        var changeinstalleddate = new Date(vm.dcuChange.installedate);
        var currdate = new Date();

        console.log("-------------------------------------------------------");
        console.log(vm.dcuChange.newdevsrno);


        //alert(installeddate);
        //alert(commisioneddate);
        //alert(currdate);

        if(changeinstalleddate > currdate){
            vm.errorToast("Installed date can't be a future date.");
            return false;
        }
        if(dcufailuredddate > currdate){
            vm.errorToast("Failure date can't be a future date.");
            return false;
        }
        if(changeinstalleddate < dcufailuredddate){
            vm.errorToast("Installed date can't be a lesser than Failure date .");
            return false;
        }

        if(vm.dcuChange.deviceChangeStatus == undefined)
        {
            vm.errorToast("Please Select DCU Staus.");
            return false;
        }
        // if(esr == nsr)
        // {
        //    vm.errorToast("Please note, 'Existing Deive Serial Number' and 'New Serial Deive Number' should not be same.");
        //     return false;
        // }
        return true;
      }

      vm.DcuChangeSubmit = function () {
          //alert("Submitted");
        vm.master = {};
        var data = {};
        if(validateDcuChange()){

            console.log("DSR is "+vm.selectedItem);

            var date = new Date()+"";
            //var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
            data.createdDate = splitDate1(date);
            data.adminEntityValueId = 1000;
            data.createdBy = 1111;
            data.lastUpdatedBy = 1111;
            data.lastUpdatedDate = splitDate1(date);
            data.lastUpdatedLogin = 1111;
            var chnageInstalledDate = new Date(vm.dcuChange.installedate)+"" ;
            var changeFailureDate =new Date(vm.dcuChange.failuredate)+"" ;
            // console.log(commisioneDdate);
             vm.dcuChange.installedate = splitDate1(chnageInstalledDate);
             vm.dcuChange.failuredate = splitDate1(changeFailureDate);
             vm.dcuChange.Existing_Device_SerialNumber = vm.selectedItem.dcuSlno;
             vm.dcuChange.New_Device_SerialNumber = vm.selectedItem1.dcuSlno;
            // vm.dcuSelected.ip = vm.ip;
             data.dcuChange = vm.dcuChange;
            //data.ip=vm.ip;
            console.log(data);

            $http({
                method : "POST",
                url : baseUrl1 + "mdm/dcu/change",
                data: data
            }).then(function mySuccess(response) {
                console.log(data);
                vm.successToast("New DCU Details Have been Submitted Sucessfully.");
                vm.dcuChange = {};
                vm.selectedItem1 = "";
                vm.selectedItem = "";
                vm.chnageForm.$setPristine();
            }, function myError(response) {

                console.log(response);
                vm.errorToast("Sorry. We Are Having Some Techinical Issues With Regards To The Server. Please Try Later.");
            });
          }

      }

    }
})();
