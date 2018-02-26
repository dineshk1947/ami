// (function ()
// {
//     'use strict';
//
//     angular
//         .module('app.userAdmin')
//         .controller('UserAdminController', UserAdminController);
//
//     /** @ngInject */
//     function UserAdminController($http, baseUrl2,$mdToast,$location,Clear) {
//         var vm = this;
//         vm.Clear = Clear;
//         vm.errorToast = function(mesg) {
//         //  var pinTo = vm.getToastPosition();
//
//            $mdToast.show(
//              $mdToast.simple()
//                .textContent(mesg)
//                .position('top right')
//                .hideDelay(3000)
//                .toastClass('error')
//
//              );
//          };
//          vm.successToast = function(mesg) {
//          //  var pinTo = vm.getToastPosition();
//
//           $mdToast.show(
//             $mdToast.simple()
//               .textContent(mesg)
//               .position('top right')
//               .hideDelay(3000)
//               .toastClass('success')
//
//           );
//         };
//
//         $http({
//             method : "GET",
//             url : baseUrl2 + "mdm/user/get-user"
//         }).then(function mySuccess(response) {
//             console.log(response.data);
//             vm.user = response.data;
//             console.log(vm.user);
//         }, function myError(response1) {
//             console.log(response1);
//         });
//         vm.userId = null;
//
//         vm.selectedItemChange = function(id) {
//           var data ={};
//           vm.userId = id.userId;
//           data.userId = id.userId;
//           console.log(" ///////////////// ");
//           console.log(id.userId);
//           $http({
//               method : "POST",
//               url : baseUrl2 + "mdm/user/user-details",
//               data: data
//           }).then(function mySuccess(response) {
//               console.log(response.data);
//               vm.userdetails = response.data.statistics[0];
//               console.log(vm.userdetails);
//               console.log(vm.userdetails.userName);
//               vm.sendExistingRole(vm.userdetails.roleName);
//
//           }, function myError(response) {
//               console.log(response);
//           });
//         }
//
//
//         vm.sendExistingRole = function(id) {
//             $http({
//                 method : "GET",
//                 url : baseUrl2 + "mdm/user/user-roles?roleName=" +id
//             }).then(function mySuccess(response) {
//                 console.log(response.data);
//                 vm.newRole = response.data;
//                 console.log(vm.newRole);
//             }, function myError(response1) {
//                 console.log(response1);
//             });
//         }
//
//           var splitDate =  function(dt) {
//             console.log(dt);
//             var x=dt+"";
//              var newDt1 = x.split(' ')[2] + "-" + x.split(' ')[1] + "-" + x.split(' ')[3];
//              console.log(newDt1);
//             return  newDt1;
//
//           }
//
//
//
//
//           function validateUserRole(user) {
//             console.log(user);
//             if (user == undefined) {
//               vm.errorToast("Enter All the Details");
//               return false;
//             }
//             if (user.userName == undefined || user.userName == null) {
//               vm.errorToast("Enter user Id");
//               return false;
//             }
//             if (user.newRoleSelected == undefined || user.newRoleSelected == null) {
//               vm.errorToast("Enter NewRole");
//               return false;
//             }
//             return true;
//           }
//
//
//           vm.userAssignSubmit = function(){
//             if (validateUserRole(vm.userdetails)) {
//               var data ={};
//               var dateFormat = splitDate(new Date());
//               //vm.userId  = vm.selectedItem;
//               console.log(vm.userId);
//               console.log(vm.userdetails);
//               vm.userdetails.userId = vm.userId;
//               data.createdDate = dateFormat;
//               data.adminEntityValueId = 1000;
//               data.createdBy = 1111;
//               data.lastUpdatedBy = 1111;
//               data.lastUpdatedDate = dateFormat;
//               data.lastUpdatedLogin = 1111;
//               data.userdetails = vm.userdetails;
//                 console.log(" ///////////////// ");
//                 console.log(data);
//                 $http({
//                     method : "POST",
//                     url : baseUrl2 + "mdm/user/user-update",
//                     data: data
//                 }).then(function mySuccess(response) {
//                     console.log(response.data);
//                     if (response.data.message == "Success") {
//                       vm.successToast("submit Sucessfully");
//                       $location.path('/userAdmin');
//                     }
//
//                 }, function myError(response) {
//                     console.log(response);
//                       vm.errorToast("Something went wrong.. Please try again");
//                 });
//             }
//           }
//   }
// })();
(function ()
{
    'use strict';

    angular
        .module('app.userAdmin')
        .controller('UserAdminController', UserAdminController);

    /** @ngInject */
    function UserAdminController($http, baseUrl2,$mdToast,$location,$localStorage) {
        var vm = this;
        var userData = {};
        vm.adduser = {};
        var currentUser = $localStorage.globals;
        userData= currentUser.currentUser;
        console.log(userData);
        vm.minDate = new Date();

        vm.clear= function () {
          vm.adduser = {};
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

        $http({
            method : "GET",
            url : baseUrl2 + "mdm/user/get-user"
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.user = response.data;
            console.log(vm.user);
        }, function myError(response1) {
            console.log(response1);
        });

        $http({
            method : "GET",
            url : baseUrl2 + "mdm/userAdministration/get-user-role"
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.role = response.data;
            console.log(vm.role);
        }, function myError(response1) {
            console.log(response1);
        });


        $http({
            method : "GET",
            url : baseUrl2 + "mdm/userAdministration/get-user-name"
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.userNames = response.data;
            console.log(vm.userNames);
        }, function myError(response1) {
            console.log(response1);
        });

        $http({
            method : "GET",
            url : baseUrl2 + "mdm/userAdministration/get-user-location"
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.location = response.data;
            console.log(vm.location);
        }, function myError(response1) {
            console.log(response1);
        });

        $http({
            method : "GET",
            url : baseUrl2 + "mdm/userAdministration/get-user-designation"
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.designation = response.data;
            console.log(vm.designation);
        }, function myError(response1) {
            console.log(response1);
        });
        vm.userId = null;

        vm.selectedItemChange = function(id) {
          var data ={};
          vm.userId = id.userId;
          data.userId = id.userId;
          console.log(" ///////////////// ");
          console.log(id.userId);
          $http({
              method : "POST",
              url : baseUrl2 + "mdm/user/user-details",
              data: data
          }).then(function mySuccess(response) {
              console.log(response.data);
              vm.userdetails = response.data.statistics[0];
              console.log(vm.userdetails);
              console.log(vm.userdetails.userName);
              vm.sendExistingRole(vm.userdetails.roleName);

          }, function myError(response) {
              console.log(response);
          });
        }


        vm.sendExistingRole = function(id) {
            $http({
                method : "GET",
                url : baseUrl2 + "mdm/user/user-roles?roleName=" +id
            }).then(function mySuccess(response) {
                console.log(response.data);
                vm.newRole = response.data;
                console.log(vm.newRole);
            }, function myError(response1) {
                console.log(response1);
            });
        }

          var splitDate =  function(dt) {
            console.log(dt);
            var x=dt+"";
             var newDt1 = x.split(' ')[2] + "-" + x.split(' ')[1] + "-" + x.split(' ')[3];
             console.log(newDt1);
            return  newDt1;

          }




          function validateUserRole(user) {
            console.log(user);
            if (user == undefined) {
              vm.errorToast("Enter All the Details");
              return false;
            }
            if (user.userName == undefined || user.userName == null) {
              vm.errorToast("Enter user Id");
              return false;
            }
            if (user.newRoleSelected == undefined || user.newRoleSelected == null) {
              vm.errorToast("Enter NewRole");
              return false;
            }
            return true;
          }


          vm.userAssignSubmit = function(){
            if (validateUserRole(vm.userdetails)) {
              var data ={};
              var dateFormat = splitDate(new Date());
              //vm.userId  = vm.selectedItem;
              console.log(vm.userId);
              console.log(vm.userdetails);
              vm.userdetails.userId = vm.userId;
              data.createdDate = dateFormat;
              data.adminEntityValueId = 1000;
              data.createdBy = 1111;
              data.lastUpdatedBy = 1111;
              data.lastUpdatedDate = dateFormat;
              data.lastUpdatedLogin = 1111;
              data.userdetails = vm.userdetails;
                console.log(" ///////////////// ");
                console.log(data);
                $http({
                    method : "POST",
                    url : baseUrl2 + "mdm/user/user-update",
                    data: data
                }).then(function mySuccess(response) {
                    console.log(response.data);
                    if (response.data.message == "Success") {
                      vm.successToast("submit Sucessfully");
                      $location.path('/userAdmin');
                    }

                }, function myError(response) {
                    console.log(response);
                      vm.errorToast("Something went wrong.. Please try again");
                });
            }
          }
          vm.userAddSubmit = function(){
            var data ={};
            var employee = JSON.parse(vm.adduser.employee);
            data.empId = employee.empId;
            data.designationId = Number(vm.adduser.designationselected);
            var location = JSON.parse(vm.adduser.locationselected);
            data.entityId = location.entityId;
            data.adminEntityValueId = location.adminEntityValueId;
            data.userName= vm.adduser.userName1;
            data.password = vm.adduser.password1;
            data.startDate = splitDate(vm.adduser.start);
            data.createdBy = userData.userId;
            data.creationDate = splitDate(new Date());
            data.lastUpdatedBy = userData.userId;
            data.lastUpdatedDate =  splitDate(new Date());
            data.lastUpdatedLogin = userData.userId;
            data.roleId = Number(vm.adduser.roleselected);
            console.log(data);
            $http({
                method : "POST",
                url : baseUrl2 + "mdm/userAdministration/save-user",
                data: data
            }).then(function mySuccess(response) {
                console.log(response.data);
                  vm.successToast("submitted Sucessfully");
            }, function myError(response) {
                console.log(response);
                  vm.errorToast("Something went wrong.. Please try again");
            });
          }



  }
})();
