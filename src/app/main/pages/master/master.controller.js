(function ()
{
    'use strict';

    angular
        .module('app.master')
        .controller('MasterController', MasterController);

    /** @ngInject */
    function MasterController(SampleData, $http, $timeout, $q, $log, $mdToast, baseUrl1)
    {
        var vm = this;
        var splitDate =  function(dt) {
          var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
          var newDt = dt.getDate() + "-" +  months[dt.getMonth()] + "-" + dt.getFullYear() + "";
          console.log("splitDate : " + newDt);
          return newDt;
        }


        vm.errorToast = function(mesg) {
        //  var pinTo = vm.getToastPosition();

         $mdToast.show(
           $mdToast.simple()
             .textContent(mesg)
             .position('top right')
             .hideDelay(3000)
             .toastClass('error')

           );
         };
         vm.successToast = function(mesg) {
         //  var pinTo = vm.getToastPosition();

          $mdToast.show(
            $mdToast.simple()
              .textContent(mesg)
              .position('top right')
              .hideDelay(3000)
              .toastClass('success')

          );
        };

        vm.masterSelected = {};
        vm.masterSelected.meterNo = undefined;

        vm.maxDate = new Date();
        vm.isDisabled = false;
        vm.noCache = false;



        // vm.getMatchingText = function(text, Data){
        //
        //   console.log(text);
        //   console.log(vm.cId);
        //
        //   if(text == null || text == undefined){
        //     return array;
        //   }
        //
        //   if( vm.cId == null ||  vm.cId == undefined){
        //       return [];
        //   }
        //
        //   var ary = [];
        //
        //   for(var i = 0; i < vm.cId.length; i++){
        //     var set = vm.cId[i];
        //
        //     if(set[1].includes(text)){
        //       ary.push(set);
        //     }
        //
        //   }
        //
        //   return ary;
        //
        // }


          //cid values
        $http({
            method : "GET",
            url : baseUrl1 + "mdm/meter/get-cid"
        }).then(function mySuccess(response) {
            vm.cId = response.data;
            console.log(vm.cId);
            //vm.timezones = response.data;
        }, function myError(response) {
            console.log(response);
        });

        vm.getConsumer = function(cons) {
          console.log(" / " + cons);
          //var arr = cons.split(',');
          vm.masterSelected.cIdd = cons[0];
          vm.masterSelected.cName = cons[1];
        }

        //Make values
        $http({
            method : "GET",
            url : baseUrl1 + "mdm/meter/get-make"
        }).then(function mySuccess(response) {
            vm.make = response.data;
            //console.log(vm.make);
        }, function myError(response) {
            console.log(response);
        });

        //status values
        $http({
            method : "GET",
            url : baseUrl1 + "mdm/meter/get-status"
        }).then(function mySuccess(response) {
            vm.status = response.data;
            //console.log(vm.status);
        }, function myError(response) {
            console.log(response);
        });

        //mastermetertype values
        $http({
            method : "GET",
            url : baseUrl1 + "mdm/meter/get-metertype"
        }).then(function mySuccess(response) {
            vm.meterType = response.data;
            //console.log(vm.meterType);

        }, function myError(response) {
            console.log(response);
        });

        //protocol values
        $http({
            method : "GET",
            url : baseUrl1 + "mdm/meter/get-protocol"
        }).then(function mySuccess(response) {
            vm.protocol = response.data;
            //console.log(vm.protocol);

        }, function myError(response) {
            console.log(response);
        });

        //masteraccuracy values
        $http({
            method : "GET",
            url : baseUrl1 + "mdm/meter/get-accuracy"
        }).then(function mySuccess(response) {
            vm.accuracy = response.data;
            //console.log(vm.accuracy);

        }, function myError(response) {
            console.log(response);
        });

        //mastermodel values
        $http({
            method : "GET",
            url : baseUrl1 + "mdm/meter/get-model"
        }).then(function mySuccess(response) {
            vm.model = response.data;
            //console.log(vm.masterModel);

        }, function myError(response) {
            console.log(response);
        });

        //masterconnectiontype values
        $http({
            method : "GET",
            url : baseUrl1 + "mdm/meter/get-connectiontype"
        }).then(function mySuccess(response) {
            vm.conType = response.data;
            //console.log(vm.conType);

        }, function myError(response) {
            console.log(response);
        });

        //DIP values
        $http({
            method : "GET",
            url : baseUrl1 + "mdm/meter/get-dip"
        }).then(function mySuccess(response) {
            vm.dip = response.data;
            //console.log(vm.dip);

        }, function myError(response) {
            console.log(response);
        });

        //Lpc values
        $http({
            method : "GET",
            url : baseUrl1 + "mdm/meter/get-lpc"
        }).then(function mySuccess(response) {
            vm.lpc = response.data;
            //console.log("lpxc");
            //console.log(vm.lpc);
        }, function myError(response) {
            console.log(response);
        });

        //Tou values
        // $http({
        //     method : "GET",
        //     url : baseUrl1 + "mdm/master/tou"
        // }).then(function mySuccess(response) {
        //     vm.tou = response.data;
        //     //console.log(vm.tou);
        // }, function myError(response) {
        //     console.log(response);
        // });

        //category values
        $http({
            method : "GET",
            url : baseUrl1 + "mdm/meter/get-category"
        }).then(function mySuccess(response) {
            vm.category = response.data;
            //console.log(vm.category);
            //vm.timezones = response.data;
        }, function myError(response) {
            console.log(response);
        });


        vm.getCateType = function() {
          $http({
              method : "GET",
              url : baseUrl1 + "mdm/meter/get-categorytype/" + vm.masterSelected.categoryId
          }).then(function mySuccess(response) {
              vm.cattype = response.data;
              console.log(vm.cattype);
              //vm.timezones = response.data;
          }, function myError(response) {
              console.log(response);
          });
        }

        vm.getResidential = function() {
          $http({
              method : "GET",
              url : baseUrl1 + "mdm/meter/get-residential"
          }).then(function mySuccess(response) {
              vm.residential = response.data;
              console.log(vm.residential);
          }, function myError(response) {
              console.log(response);
          });
        }

        function validate(master) {
          console.log(master);
          if(master.meterType == undefined || master.conType == undefined ||
             master.accuracy == undefined || master.status == undefined ||
             master.categoryId == undefined || master.catTypeId == undefined ||
             master.make == undefined || master.protocol == undefined || master.model == undefined ||
             master.dip == undefined || master.lpc == undefined) {
            vm.errorToast("please select Field");
            return false;
          }
          if(master.installedDate >= master.commisionedDate) {
            vm.errorToast("Installed Date should be lessthan Commisioned Date");
            return false;
          }
          return true;
        }

        // vm.master = {};
        vm.tou = "Y";
        var data = {};
        vm.masters = function() {
          console.log("Master Form Submitted");
          var dateFormat = splitDate(new Date());
          data.createdDate = dateFormat;
          data.adminEntityValueId = 1000;
          data.createdBy = 1111;
          data.lastUpdatedBy = 1111;
          data.lastUpdatedDate = dateFormat;
          data.lastUpdatedLogin = 1111;
          vm.masterSelected.commisionedDate = splitDate(vm.masterSelected.commisionedDate);
          vm.masterSelected.installedDate = splitDate(vm.masterSelected.installedDate);
          vm.masterSelected.tou = vm.tou;
          if (validate(vm.masterSelected)) {
            data.masterOut = vm.masterSelected;
            console.log(data.masterOut);
            $http({
                method : "POST",
                url : baseUrl1 + "mdm/meter/post",
                data: data
            }).then(function mySuccess(response) {
                console.log(response);

                vm.successToast("submit Sucessfully")
                 //$state.reload();
            }, function myError(response) {master
                console.log(response);
            });
          }
        }


      //===================================================================================
      //change


      // function validate(change) {
      //   if(change.installedDate >= change.commisionedDmasterate) {
      //     alert("Installed Date should be lessthan Commisioned Date");
      //     return false;
      //   }
      //   return true;
      // }
        vm.parameters = "Y";

        vm.change = {};

      vm.changes = function() {
        var data = {};
        console.log("Change Begin");
        var date = new Date() + "";
        var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
        data.createdDate = dateFormat;
        data.adminEntityValueId = 1000;
        data.createdBy = 1111;
        data.lastUpdatedBy = 1111;
        data.lastUpdatedDate = dateFormat;
        data.lastUpdatedLogin = 1111;

        var cDate = new Date(vm.change.commisionedDate) + "";
        var cDateFormat = cDate.split(' ')[2] + "-" + cDate.split(' ')[1] + "-" + cDate.split(' ')[3];
        vm.change.commisionedDate = cDateFormat;

        var iDate = new Date(vm.change.installedDate) + "";
        var iDateFormat = iDate.split(' ')[2] + "-" + iDate.split(' ')[1] + "-" + iDate.split(' ')[3];
        vm.change.installedDate = iDateFormat;
        vm.change.parameters = vm.parameters;
        console.log(vm.change);
        data.changeOut = vm.change;
        //console.log(data.changeOut);
        console.log(data);
        $http({
            method : "POST",
            url : baseUrl1 + "mdm/meter/change",
            data: data
        }).then(function mySuccess(response) {
          console.log("***************************");
            console.log(response);
            alert("submit Sucessfully")
             //$state.reload();
        }, function myError(response) {
            console.log(response);
        });
      }




      //===================================================================================

        //Category Tab
       vm.categories = [{
         'code' : '',
         'name' : ''
       }];

       vm.addCategories = function(i) {
         var category = {
           'code' : '',
           'name' : ''
          };
         vm.categories.push(category);
       }

         //Make Tab
       vm.manufacturers = [{
         'mcode' : '',
         'mname' : ''
       }];

       vm.addManufacturers = function(i) {
         var manufacture = {
           'mcode' : '',
           'mname' : ''
          };
         vm.manufacturers.push(manufacture);
       }

       vm.protocols = [{
         'protocol' : ''
       }];

       vm.addProtocols = function(i) {
         var protocol1 = {
           'protocol' : ''
          };
         vm.protocols.push(protocol1);
       }

       //Type Tab
       vm.types = [{
         'type' : ''
       }];

       vm.addTypes = function(i) {
         var type1 = {
           'type' : ''
          };
         vm.types.push(type1);
       }

       vm.classes = [{
         'class' : ''
       }];

       vm.addClasses = function(i) {
         var class1 = {
           'class' : ''
          };
         vm.classes.push(class1);
       }

       //Status Tab
       vm.statuses = [{
         'status' : ''
       }];

       vm.addStatus = function(i) {
         var status1 = {
           'status' : ''
          };
         vm.statuses.push(status1);
       }


       //category submit

       function validateCats(cats) {
        var j = 0;
        var counter = 0;
        if(cats.length == 0){
            alert("Enter atleast one category name and code");
            return false;
        }
        for (var i = 0; i < cats.length; i++) {
          if((cats[i].code =="" && cats[i].name !="") || (cats[i].code !="" && cats[i].name =="")) {
            counter++;
          }
        }
        if(counter >=1) {
          alert("Enter both code and category name");
          //hols.valid = false;
          return false;
        }
        return true;
      }

       vm.category1 = function () {

          var data = {};
          var a = {};
          var b = [];
          var resCat = [];
          var j =0;

          //Skipping not filled category name and category code rows and taking only filled rows
          for (var i = 0; i < vm.categories.length; i++) {
            if((vm.categories[i].code =="" && vm.categories[i].name =="")) {
              continue;
            }
            resCat[j] = vm.categories[i];
            j++;
          }

          if(validateCats(resCat)) {
            for(var i = 0; i < resCat.length; i++) {
              var k = 0;
              for(var key in resCat[i]) {
                var resString = resCat[i][key] + "";
                if(k == 0) {
                  a.code = resString;
                }
                else {
                  a.name = resString;
                }
                  k++;
                }
                b.push(a);
                a = {};
              }

            }


            var date = new Date() + "";
            var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
            data.createdDate = dateFormat;
            data.adminEntityValueId = 1000;
            data.createdBy = 1111;
            data.lastUpdatedBy = 1111;
            data.lastUpdatedDate = dateFormat;
            data.lastUpdatedLogin = 1111;
            data.categories = b;


            console.log(data.categories);
            $http({
                method : "POST",
                url : baseUrl1 + "mdm/meter/category",
                data: data
            }).then(function mySuccess(response) {
                console.log(response);
                alert("Submitted Sucessfully");

            }, function myError(response) {

                console.log(response);
            });
          }




         //make submit


         function validateMake(makes) {
           var j = 0;
           var counter =0;
           if(makes.length == 0){
               alert("Enter atleast one manufacturer name and code");
               return false;
           }
           for (var i = 0; i < makes.length; i++) {
             if((makes[i].mcode =="" && makes[i].mname !="") || (makes[i].mcode !="" && makes[i].mname =="")) {
               counter++;
             }
           }
           if(counter >=1) {
             alert("Enter both manufacturer code and name");
             return false;
           }
           return true;
         }



         vm.made = function () {

           var data = {};
           var a = {};
           var b = [];
           var resMake = [];
           var j =0;

           //Skipping not filled category name and category code rows and taking only filled rows
           for (var i = 0; i < vm.manufacturers.length; i++) {
             if((vm.manufacturers[i].mcode =="" && vm.manufacturers[i].mname =="")) {
               continue;
             }
             resMake[j] = vm.manufacturers[i];
             j++;
           }
           if(validateMake(resMake)) {
             for(var i = 0; i < resMake.length; i++) {
               var k = 0;
               for(var key in resMake[i]) {
                 var resString = resMake[i][key] + "";
                 if( k == 0 ) {
                   a.code = resString;
                 }
                 else {
                   a.name = resString;
                 }
                 k++;
                 }
                 b.push(a);
                 a = {};
               }
             var date = new Date() + "";
             var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
             data.createdDate = dateFormat;
             data.adminEntityValueId = 1000;
             data.createdBy = 1111;
             data.lastUpdatedBy = 1111;
             data.lastUpdatedDate = dateFormat;
             data.lastUpdatedLogin = 1111;
             data.make = b;




             console.log(data.make);
             $http({
                 method : "POST",
                 url : baseUrl1 + "mdm/meter/make",
                 data: data
             }).then(function mySuccess(response) {
                 console.log(response);
                 alert("Submitted Sucessfully");

             }, function myError(response) {

                 console.log(response);
             });
           }
         }




         //protocol submit


         function validateProto(protos) {
           if(protos.length == 0){
               alert("Enter atleast one protocol name");
               return false;
           }
           return true;
         }



         vm.protocol1 = function () {

           var data = {};
           var a = {};
           var b = [];
           var resProto = [];
           var j =0;

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
               for(var key in resProto[i]) {
                 var resString = resProto[i][key] + "";
                   a.name = resString;
                 }
                 b.push(a);
                 a = {};
               }
             var date = new Date() + "";
             var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
             data.createdDate = dateFormat;
             data.adminEntityValueId = 1000;
             data.createdBy = 1111;
             data.lastUpdatedBy = 1111;
             data.lastUpdatedDate = dateFormat;
             data.lastUpdatedLogin = 1111;
             data.protocols = b;


             console.log(data.protocols);
             $http({
                 method : "POST",
                 url : baseUrl1 + "mdm/meter/protocol",
                 data: data
             }).then(function mySuccess(response) {
                 console.log(response);
                 alert("Submitted Sucessfully");

             }, function myError(response) {

                 console.log(response);
             });
           }
         }



         //type submit


         function validateType(types) {
           if(types.length == 0){
               alert("Enter atleast one type name");
               return false;
           }
           return true;
         }



         vm.type = function () {

           var data = {};
           var a = {};
           var b = [];
           var resType = [];
           var j =0;

           //Skipping not filled category name and category code rows and taking only filled rows
           for (var i = 0; i < vm.types.length; i++) {
             if((vm.types[i].type =="")) {
               continue;
             }
             resType[j] = vm.types[i];
             j++;
           }
           if(validateType(resType)) {
             for(var i = 0; i < resType.length; i++) {
               for(var key in resType[i]) {
                 var resString = resType[i][key] + "";
                   a.type = resString;
                 }
                 b.push(a);
                 a = {};
               }
             var date = new Date() + "";
             var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
             data.createdDate = dateFormat;
             data.adminEntityValueId = 1000;
             data.createdBy = 1111;
             data.lastUpdatedBy = 1111;
             data.lastUpdatedDate = dateFormat;
             data.lastUpdatedLogin = 1111;
             data.types = b;


             console.log(data.types);
             $http({
                 method : "POST",
                 url : baseUrl1 + "mdm/meter/type",
                 data: data
             }).then(function mySuccess(response) {
                 console.log(response);
                 alert("Submitted Sucessfully");

             }, function myError(response) {

                 console.log(response);
             });
           }
         }


         //class of accuracy submit


         function validateClass(classes) {
           if(classes.length == 0){
               alert("Enter atleast one class of accuracy value");
               return false;
           }
           return true;
         }



         vm.classofaccu = function () {

           var data = {};
           var a = {};
           var b = [];
           var resClass = [];
           var j = 0;

           //Skipping not filled category name and category code rows and taking only filled rows
           for (var i = 0; i < vm.classes.length; i++) {
             if((vm.classes[i].class =="")) {
               continue;
             }
             resClass[j] = vm.classes[i];
             j++;
           }
           if(validateClass(resClass)) {
             for(var i = 0; i < resClass.length; i++) {
               for(var key in resClass[i]) {
                 var resString = resClass[i][key] + "";
                   a.class = resString;
                 }
                 b.push(a);
                 a = {};
               }
             var date = new Date() + "";
             var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
             data.createdDate = dateFormat;
             data.adminEntityValueId = 1000;
             data.createdBy = 1111;
             data.lastUpdatedBy = 1111;
             data.lastUpdatedDate = dateFormat;
             data.lastUpdatedLogin = 1111;
             data.classes = b;


             console.log(data.classes);
             $http({
                 method : "POST",
                 url : baseUrl1 + "mdm/meter/accuracy",
                 data: data
             }).then(function mySuccess(response) {
                 console.log(response);
                 alert("Submitted Sucessfully");

             }, function myError(response) {

                 console.log(response);
             });
           }
         }





         //Status submit


         function validateStatus(status) {
           if(status.length == 0){
               alert("Enter atleast one status before submitting");
               return false;
           }
           return true;
         }



         vm.status1 = function () {

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
           if(validateStatus(resStatus)) {
             for(var i = 0; i < resStatus.length; i++) {
               for(var key in resStatus[i]) {
                 var resString = resStatus[i][key] + "";
                   a.status = resString;
                 }
                 b.push(a);
                 a = {};
               }
             var date = new Date() + "";
             var dateFormat = date.split(' ')[2] + "-" + date.split(' ')[1] + "-" + date.split(' ')[3];
             data.createdDate = dateFormat;
             data.adminEntityValueId = 1000;
             data.createdBy = 1111;
             data.lastUpdatedBy = 1111;
             data.lastUpdatedDate = dateFormat;
             data.lastUpdatedLogin = 1111;
             data.status = b;


             console.log(data.status);
             $http({
                 method : "POST",
                 url : baseUrl1 + "mdm/meter/status",
                 data: data
             }).then(function mySuccess(response) {
                 console.log(response);
                 alert("Submitted Sucessfully");

             }, function myError(response) {

                 console.log(response);
             });
           }
         }

    }
})();
