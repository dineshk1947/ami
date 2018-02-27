(function ()
{
    'use strict';

    angular
        .module('app.master')
        .controller('MasterController', MasterController);

    /** @ngInject */
    function MasterController($http, $timeout, $q, $log, $mdToast, baseUrl2, $window, Clear)
    {
        var vm = this;
        vm.Clear = Clear;
        // var splitDate =  function(dt) {
        //   var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        //   var newDt = dt.getDate() + "-" +  months[dt.getMonth()] + "-" + dt.getFullYear() + "";
        //   console.log("splitDate : " + newDt);
        //   return newDt;
        // }

        var splitDate =  function(dt) {
          console.log(dt);
          var x=dt+"";
           var newDt1 = x.split(' ')[2] + "-" + x.split(' ')[1] + "-" + x.split(' ')[3];
           console.log(newDt1);
          return  newDt1;

        }

        vm.clearForm = function() {

          console.log("vm.manufacturers",vm.manufacturers);

          for (var i = 0; i < vm.categories.length; i++) {
            console.log("vm.manufacturers",vm.manufacturers);
            vm.categories[i].code="";
            vm.categories[i].name="";
          }
          for (var i = 0; i < vm.manufacturers.length; i++) {
            console.log("vm.manufacturers",vm.manufacturers);
            vm.manufacturers[i].mcode="";
            vm.manufacturers[i].mname="";
          }
          for (var i = 0; i <vm.types.length; i++) {
            console.log("vm.manufacturers",vm.manufacturers);
            vm.types[i].type="";
          }
          for (var i = 0; i < vm.classes.length; i++) {
            vm.classes[i].class="";
          }
          for (var i = 0; i < vm.statuses.length; i++) {
            vm.statuses[i].status="";
          }
          vm.selectedItem2="";
          vm.selectedItem3="";
          vm.change = {};
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


          //cid values
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/meter/get-cid-mtr"
        }).then(function mySuccess(response) {
            vm.cId = response.data;
            console.log(vm.cId);
            //dtrId
            //sectionId
            //console.log(vm.cId);
            //vm.timezones = response.data;
        }, function myError(response) {
            console.log(response);
        });

        vm.getConsumer = function(cons) {
          console.log(" / " + cons);
          //var arr = cons.split(',');
          vm.masterSelected.cIdd = cons.consumerId;
          vm.cName = cons.consumerName;
          vm.sectionName = cons.sectionName;
          vm.masterSelected.sectionId = cons.sectionId;
          vm.dtrName = cons.dtrName;
          vm.masterSelected.dtrId = cons.dtrId;

          console.log(vm.cName);
          console.log(vm.masterSelected.cIdd);
          console.log(vm.sectionName);
          console.log(vm.dtrName);
        }

        // vm.dummy = function(idd) {
        //   var d=vm.masterSelected.meterNo;
        //   alert(idd);
        //   if(idd===407)
        //   {
        //
        //     d=d+"VE";
        //     alert(d);
        //   }
        //
        // }

        //Make values
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/meter/get-make"
        }).then(function mySuccess(response) {
            vm.make = response.data;
            //console.log(vm.make);
        }, function myError(response) {
            console.log(response);
        });

        //status values
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/meter/get-status"
        }).then(function mySuccess(response) {
            vm.status = response.data;
            console.log(vm.status);
            vm.masterSelected.status=vm.status[11].statusId;
        }, function myError(response) {
            console.log(response);
        });

        //mastermetertype values
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/meter/get-metertype"
        }).then(function mySuccess(response) {
            vm.meterType = response.data;
            console.log(vm.meterType);

        }, function myError(response) {
            console.log(response);
        });

        //protocol values
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/meter/get-protocol"
        }).then(function mySuccess(response) {
            vm.protocol = response.data;
            //console.log(vm.protocol);

        }, function myError(response) {
            console.log(response);
        });

        //masteraccuracy values
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/meter/get-accuracy"
        }).then(function mySuccess(response) {
            vm.accuracy = response.data;
            //resole.log(vm.accuracy);

        }, function myError(response) {
            console.log(response);
        });

        //mastermodel values
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/meter/get-model"
        }).then(function mySuccess(response) {
            vm.model = response.data;
            //console.log(vm.masterModel);

        }, function myError(response) {
            console.log(response);
        });

        //masterconnectiontype values
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/meter/get-connectiontype"
        }).then(function mySuccess(response) {
            vm.conType = response.data;
            //console.log(vm.conType);

        }, function myError(response) {
            console.log(response);
        });

        //DIP values
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/meter/get-dip"
        }).then(function mySuccess(response) {
            vm.dip = response.data;
            //console.log(vm.dip);

        }, function myError(response) {
            console.log(response);
        });

        //Lpc values
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/meter/get-lpc"
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
        //     url : baseUrl2 + "mdm/master/tou"
        // }).then(function mySuccess(response) {
        //     vm.tou = response.data;
        //     //console.log(vm.tou);
        // }, function myError(response) {
        //     console.log(response);
        // });

        //category values
        $http({
            method : "GET",
            url : baseUrl2 + "mdm/meter/get-category"
        }).then(function mySuccess(response) {
            vm.category = response.data;
            //console.log(vm.category);
            //vm.timezones = response.data;http://882abc32.ngrok.io/
        }, function myError(response) {
            console.log(response);
        });


        vm.getCateType = function() {
          $http({
              method : "GET",
              url : baseUrl2 + "mdm/meter/get-categorytype/" + vm.masterSelected.categoryId
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
              url : baseUrl2 + "mdm/meter/get-residential"
          }).then(function mySuccess(response) {
              vm.residential = response.data;
              console.log(vm.residential);
          }, function myError(response) {
              console.log(response);
          });
        }

        function validate(master) {
console.log("000000000000000000000000000000000000000");          if(master.meterType == undefined || master.conType == undefined ||
             master.accuracy == undefined || master.status == undefined ||
             master.categoryId == undefined || master.catTypeId == undefined ||
             master.make == undefined || master.model == undefined ||
             master.dip == undefined || master.lpc == undefined) {
               console.log(master.meterType);
               console.log(master.conType)
               console.log(master.accuracy);
               console.log(master.status);
               console.log(master.categoryId);
               console.log(master.catTypeId);
               console.log(master.make);
               console.log(master.protocol);
               console.log( master.model);
               console.log(master.dip);
               console.log(master.lpc);

            vm.errorToast("please select Field");
            return false;
          }
          if(master.installedDate > master.commisionedDate) {
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
          vm.masterSelected.consumerId = vm.selectedItem;

          vm.masterSelected.commisionedDate = splitDate(vm.masterSelected.commisionedDate);
          vm.masterSelected.installedDate = splitDate(vm.masterSelected.installedDate);
          vm.masterSelected.tou = vm.tou;
          if (validate(vm.masterSelected)) {

            data.masterOut = vm.masterSelected;
            console.log(data.masterOut);
            $http({
                method : "POST",
                url : baseUrl2 + "mdm/meter/post",
                data: data
            }).then(function mySuccess(response) {
                console.log(response);
                vm.successToast("submit Sucessfully");
                //$window.location.reload();
                // Reset the form model.
                vm.masterSelected = {};
                //Set back to pristine.
                vm.masterform.$setPristine();
               //Since Angular 1.3, set back to untouched state.
              //  vm.masterform.$setUntouched();
            }, function myError(response) {
                vm.errorToast("Something went wrong.. Please try again");
                console.log(response);
            });
          }
        }


      //===================================================================================
      //change

      //To Get Meter change Status value
      $http({
          method : "GET",
          url : baseUrl2 + "mdm/meter/get-meterStatus"
      }).then(function mySuccess(response) {
          vm.changeStatus = response.data;
          console.log(vm.changeStatus);
          //vm.timezones = response.data;
      }, function myError(response) {
          console.log(response);
      });

      //To Get Meter change Consumer Id
      $http({
          method : "GET",
          url : baseUrl2 + "mdm/meter/get-cid"
      }).then(function mySuccess(response) {
          vm.changeCId = response.data;
          console.log("++++++++++++++++++++++++++");
          console.log(vm.changeCId);
          //vm.timezones = response.data;
      }, function myError(response) {
          console.log(response);
      });

      vm.getMeterSNo = function(cons) {
        console.log(" / " + cons);
        //var arr = cons.split(',');
        //vm.change.cIdd = cons;
        vm.change.mSNo = cons.mtrNo;
      }
      //To Get Meter change Serial Number
      $http({
          method : "GET",
          url : baseUrl2 + "mdm/meter/get-sMeterId"
      }).then(function mySuccess(response) {
          vm.changeMsNo = response.data;
          //vm.change.newMeterSNo = vm.changeMsNo[0];
          console.log(vm.changeMsNo);

          //vm.timezones = response.data;
      }, function myError(response) {
          console.log(response);
      });

      vm.parameters = "Y";

      vm.change = {};

      vm.selectedItemChange = function(id) {
        console.log(":::::::::::::::::");
        console.log(id[0]);
        vm.change.newMeterSNo = id[0];
      }

      function validateForChange(change) {
        console.log(change);
        if(change.kwh == null || change.kvah == null ||
           change.kvarh == null || change.demand == null ||
           change.reason == null || change.status == undefined) {
          vm.errorToast("please select Field");
          return false;
        }
        if(change.failDate > change.installedDate) {
          vm.errorToast("Failure Date should be lessthan installed Date");
          return false;
        }
        if(change.installedDate > change.commisionedDate) {
          vm.errorToast("Installed Date should be less than Commisioned Date");
          return false;
        }
        return true;
      }



      vm.changes = function() {
        if(validateForChange(vm.change)) {
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
          console.log(vm.change.consumerId);
          var cDate = new Date(vm.change.commisionedDate) + "";
          var cDateFormat = cDate.split(' ')[2] + "-" + cDate.split(' ')[1] + "-" + cDate.split(' ')[3];
          vm.change.commisionedDate = cDateFormat;

          var iDate = new Date(vm.change.installedDate) + "";
          var iDateFormat = iDate.split(' ')[2] + "-" + iDate.split(' ')[1] + "-" + iDate.split(' ')[3];
          vm.change.installedDate = iDateFormat;

          var fDate = new Date(vm.change.failDate) + "";
          var fDateFormat = fDate.split(' ')[2] + "-" + fDate.split(' ')[1] + "-" + fDate.split(' ')[3];
          vm.change.failDate = fDateFormat;
          console.log(vm.change.failedDate);
          vm.change.parameters = vm.parameters;
          console.log(vm.change);
          data.changeOut = vm.change;
          console.log(data.changeOut);
          console.log(data);
          $http({
              method : "POST",
              url : baseUrl2 + "mdm/meter/change",
              data: data
          }).then(function mySuccess(response) {
            console.log("***************************");
              console.log(response);
              vm.successToast("Submitted Sucessfully");
          }, function myError(response) {
              vm.errorToast("Something went wrong.. Please try again");
              console.log(response);
          });
        }

      }




      //===================================================================================

        //Category Tab
       vm.categories = [{
         'code' : '',
         'name' : '',
         'valid': false
       }];

       vm.addCategories = function(i) {
         var category = {
           'code' : '',
           'name' : '',
           'valid': false
          };
         vm.categories.push(category);
       }

       vm.deleteCats = function(i) {
          console.log(i);
          vm.categories.splice(i,1);
       }

         //Make Tab
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
       //Protocol Tab
       vm.protocols = [{
         'protocol' : '',
         'pvalid': false

       }];

       vm.addProtocols = function(i) {
         var protocol1 = {
           'protocol' : '',
           'pvalid': false
          };
         vm.protocols.push(protocol1);
       }
       vm.deleteProtocols = function(i) {
          console.log(i);
          vm.protocols.splice(i,1);
       }


       //Type Tab
       vm.types = [{
         'type' : '',
         'tvalid': false

       }];

       vm.addTypes = function(i) {
         var type1 = {
           'type' : '',
           'tvalid': false

          };
         vm.types.push(type1);
       }
       vm.deleteTypes = function(i) {
          console.log(i);
          vm.types.splice(i,1);
       }

       vm.classes = [{
         'class' : '',
         'cvalid': false
       }];

       vm.addClasses = function(i) {
         var class1 = {
           'class' : '',
           'cvalid': false
          };
         vm.classes.push(class1);
       }
       vm.deleteClasses = function(i) {
          console.log(i);
          vm.classes.splice(i,1);
       }

       //Status Tab
       vm.statuses = [{
         'status' : '',
         'svalid': false

       }];

       vm.addStatus = function(i) {
         var status1 = {
           'status' : '',
           'svalid': false
          };
         vm.statuses.push(status1);
       }
       vm.deleteStatus = function(i) {
          console.log(i);
          vm.statuses.splice(i,1);
       }



         //category submit

       function validateCats(cats) {
        var j = 0;
        var count = 0;
        if(cats.length == 0){
            vm.errorToast("Enter atleast one category name and code");
            return false;
        }
        for (var i = 0; i < cats.length; i++) {
          if((cats[i].code =="" && cats[i].name !="") || (cats[i].code !="" && cats[i].name =="")) {
            vm.errorToast("Enter both code and category name");
          }
        }
        for(var i = 0; i < cats.length; i++) {
          var cate = cats[i];
          cate.valid = false;
        }
        for (var i=0; i<cats.length; i++) {
          var arrA = cats[i];
          for (var j=0; j<cats.length; j++) {
            if (i == j){
             // continue;
           } else {
               var arrB = cats[j];
             if (arrA.code == arrB.code) {
               arrA.valid = true;
               arrB.valid = true;
               count++;
               //console.log(count);
             }
             else if (arrA.name == arrB.name) {
               arrA.valid = true;
               arrB.valid = true;
               count++;
             }

           }
           //console.log(arrB);


          }
        }
        if(count >=1) {
          //hols.valid = false;
          console.log(count);
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
                else if (k == 1) {
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
            data.categories = b;


            console.log(data.categories);
            $http({
                method : "POST",
                url : baseUrl2 + "mdm/meter/category",
                data: data
            }).then(function mySuccess(response) {
                console.log(response);
                vm.successToast("Submitted Sucessfully");
                //$window.location.reload();
            }, function myError(response) {
                console.log(response);
                vm.errorToast("Something went wrong.. Please try again");
            });
          }
        }




         //make submit


         function validateMake(makes) {
           var j = 0;
           var counter =0;
           var count =0;
           if(makes.length == 0){
               vm.errorToast("Enter atleast one manufacturer name and code");
               return false;
           }
           for (var i = 0; i < makes.length; i++) {
             if((makes[i].mcode =="" && makes[i].mname !="") || (makes[i].mcode !="" && makes[i].mname =="")) {
               counter++;
             }
           }
           if(counter >=1) {
             vm.errorToast("Enter both manufacturer code and name");
             return false;
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
              //console.log(arrB);


             }
           }
           if(count >=1) {
             //hols.valid = false;
             console.log(count);
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
                 else if(k==1) {
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
                 url : baseUrl2 + "mdm/meter/make",
                 data: data
             }).then(function mySuccess(response) {
                 console.log(response);
                 vm.successToast("Submitted Sucessfully");

             }, function myError(response) {
                vm.errorToast("Something went wrong.. Please try again");
                 console.log(response);
             });
           }
         }




         //protocol submit


         function validateProto(protos) {
           if(protos.length == 0){
               vm.errorToast("Enter atleast one protocol name");
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
             console.log(count);
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
             console.log("VALID PROT :::::::::::::::::::::::::");
             for(var i = 0; i < resProto.length; i++) {
               var k=0;
               for(var key in resProto[i]) {
                 var resString = resProto[i][key] + "";
                 if(k == 0) {
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
             data.protocols = b;

             console.log("POT SUBMIT :::::::::::::::::::::::::::::::::");
             console.log(data.protocols);
            //  $http({
            //      method : "POST",
            //      url : baseUrl2 + "mdm/meter/protocol",
            //      data: data
            //  }).then(function mySuccess(response) {
            //      console.log(response);
            //      vm.successToast("Submitted Sucessfully");
             //
            //  }, function myError(response) {
            //     vm.errorToast("Something went wrong.. Please try again");
            //      console.log(response);
            //  });

            $http({
                method : "POST",
                url : baseUrl2 + "mdm/meter/protocol",
                data: data
            }).then(function mySuccess(response) {
                console.log(response);
                vm.successToast("Submitted Sucessfully");

            }, function myError(response) {
               vm.errorToast("Something went wrong.. Please try again");
                console.log(response);
            });
           }
         }



         //type submit


         function validateType(types) {
           if(types.length == 0){
               vm.errorToast("Enter atleast one type name");
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
              } else {
                  var arrB = types[j];
                if (arrA.type == arrB.type) {
                  arrA.tvalid = true;
                  arrB.tvalid = true;
                  count++;
                  //console.log(count);
                }
              }
              //console.log(arrB);


             }
           }
           if(count >=1) {
             //hols.valid = false;
             console.log(count);
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
                 if(key == 'type')
                 {
                   var resString = resType[i][key] + "";
                     a.type = resString;
                   }
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
                 url : baseUrl2 + "mdm/meter/type",
                 data: data
             }).then(function mySuccess(response) {
                 console.log(response);
                 vm.successToast("Submitted Sucessfully");

             }, function myError(response) {
                 vm.errorToast("Something went wrong.. Please try again");
                 console.log(response);
             });
           }
         }


         //class of accuracy submit


         function validateClass(classes) {
           if(classes.length == 0){
               vm.errorToast("Enter atleast one class of accuracy value");
               return false;
           }

           var count = 0;

           for(var i = 0; i < classes.length; i++) {
             var cla = classes[i];
             cla.cvalid = false;
           }
           for (var i=0; i<classes.length; i++) {
             var arrA = classes[i];
             for (var j=0; j<classes.length; j++) {
               if (i == j){
                // continue;
              } else {
                  var arrB = classes[j];
                if (arrA.class == arrB.class) {
                  arrA.cvalid = true;
                  arrB.cvalid = true;
                  count++;
                  //console.log(count);
                }
              }
              //console.log(arrB);


             }
           }
           if(count >=1) {
             //hols.valid = false;
             console.log(count);
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
                 if(key=='class')
                 {
                   var resString = resClass[i][key] + "";
                   a.class = resString;
                 }
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
                 url : baseUrl2 + "mdm/meter/accuracy",
                 data: data
             }).then(function mySuccess(response) {
                 console.log(response);
                 vm.successToast("Submitted Sucessfully");

             }, function myError(response) {
                vm.errorToast("Something went wrong.. Please try again");
                 console.log(response);
             });
           }
         }





         //Status submit


         function validateStatus(statuses) {
           if(statuses.length == 0){
               vm.errorToast("Enter atleast one status before submitting");
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
                  //console.log(count);
                }
              }
              //console.log(arrB);
             }
           }
           if(count >=1) {
             //hols.valid = false;
             console.log(count);
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
                 if(key = 'status') {
                   var resString = resStatus[i][key] + "";
                     a.status = resString;
                   }
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
                 url : baseUrl2 + "mdm/meter/status",
                 data: data
             }).then(function mySuccess(response) {
                 console.log(response);
                 vm.successToast("Submitted Sucessfully");

             }, function myError(response) {
                  vm.errorToast("Something went wrong.. Please try again");
                 console.log(response);
             });
           }
         }

    }
})();
