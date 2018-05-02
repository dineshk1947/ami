(function ()
{
    'use strict';

    angular
        .module('app.userAdmin')
        .controller('UserAdminController', UserAdminController);

    /** @ngInject */
    function UserAdminController($http, baseUrl2,$mdToast,$location,$localStorage, Clear, MessageInfo) {
        var vm = this;
        var userData = {};
        vm.adduser = {};
        vm.Clear =  Clear;
        vm.userdetails={};
        vm.userDeactive={};
        var currentUser = $localStorage.globals;
        userData= currentUser.currentUser;
        console.log(userData);
        vm.minDate = new Date();

        vm.clearForm = function() {
          vm.userDeactive = {};
          vm.selectedItem1="";
          vm.userdetails ={};
          vm.selectedItem="";
        }

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
            url : baseUrl2 + "mdm/userAdministration/user-status"
        }).then(function mySuccess(response) {
            console.log(response.data);
            vm.status = response.data;
            console.log(vm.status);
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
        vm.userId1 = null;
        // Assignrole Controller method
        vm.selectedItemChange = function(id) {
          console.log("hi");
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


        vm.selectedItemChange1 = function(id1) {
          console.log("hello");
          console.log(id1);
          var data ={};
          vm.userId1 = id1.userId;
          data.userId = id1.userId;
          console.log(" ///////////////// ");
          console.log(id1.userId);
          $http({
              method : "POST",
              url : baseUrl2 + "mdm/user/user-details",
              data: data
          }).then(function mySuccess(response) {
              console.log(response.data);
              vm.userDeactive = response.data.statistics[0];
              console.log(vm.userDeactive);
              console.log(vm.userDeactive.userName);
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


          function validateUserRole() {

            if(vm.selectedItem==undefined || vm.userdetails.newRoleSelected==undefined)
            {
                MessageInfo.showMessage(1017, 'All Fields', '', '');
                return false;
            }
            return true;
          }


          vm.userAssignSubmit = function(){
            if (validateUserRole()) {
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
                      //vm.successToast("submit Sucessfully");
                       MessageInfo.showMessage(1012, '', '', '');
                      $location.path('/userAdmin');
                    }

                }, function myError(response) {
                    console.log(response);
                      //vm.errorToast("Something went wrong.. Please try again");
                       MessageInfo.showMessage(1010, '', '', '');
                });
            }
          }

          function validateUserDeactive() {
            if (vm.userDeactive.userName == undefined || vm.userDeactive.statusSelected == null || vm.userDeactive.date) {
              MessageInfo.showMessage(1017, 'All Fields', '', '');
              return false;
            }
            return true;
          }

          function validateUser(){
            if(vm.adduser.employee==undefined || vm.adduser.designationselected==undefined || vm.adduser.locationselected==undefined || vm.adduser.roleselected==undefined || vm.adduser.userName1==undefined || vm.adduser.password1==undefined || vm.adduser.start==undefined )
            {
              //vm.errorToast("Please Select All Fields.");
              MessageInfo.showMessage(1017, 'All Fields', '', '');
              return false;
            }

            return true;
          }


          vm.userDeactiveSubmit = function(){
            if (validateUserDeactive()) {
            var data ={};
            console.log(vm.userId1);
            vm.userDeactive.userId = vm.userId1;
            data.lastUpdatedBy = userData.userId;
            data.lastUpdatedDate =  splitDate(new Date());
            data.lastUpdatedLogin = userData.userId;
            data.userId = vm.userDeactive.userId;
            data.status = vm.userDeactive.statusSelected;
            data.endDate = splitDate(vm.userDeactive.date);
            console.log(data);
            $http({
                method : "POST",
                url : baseUrl2 + "mdm/userAdministration/user-deActivate",
                data: data
            }).then(function mySuccess(response) {
                console.log(response.data);
                if (response.data == "Success") {
                  //vm.successToast("Submitted Sucessfully");
                    MessageInfo.showMessage(1012, '', '', '');
                }

            }, function myError(response) {
                console.log(response);
                  //vm.errorToast("Something went wrong.. Please try again");
                    MessageInfo.showMessage(1010, '', '', '');
            });
          }

          }
          vm.userAddSubmit = function(){

            if(validateUser())
            {
            var data ={};
            console.log(vm.adduser.employee);
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
                console.log("Response From DB",response);

                if(response.data ==",User name is already existed."){
                  //vm.successToast("User name is already existed");
                  MessageInfo.showMessage(1420, 'User name', '', '');

                }
                if(response.data =="Success"){
                  //vm.successToast("Successfully Submitted");
                    MessageInfo.showMessage(1012, '', '', '');
                }
            }, function myError(response) {
                console.log(response);
                  //vm.errorToast("Something went wrong.. Please try again");
                  MessageInfo.showMessage(1010, '', '', '');
            });
          }
        }



  }
})();
