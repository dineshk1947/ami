//changes on 26feb controller

(function() {
  'use strict';

  angular
    .module('app.meterSearch')
    .controller('MeterSearchController', MeterSearchController);

  /** @ngInject */
  function MeterSearchController($mdDialog, $state, $http, $mdToast, baseUrl2, $location, $localStorage, $interval,$rootScope) {
    var model = this;
    var data = {};
    var meterSearch = {};
    var userDetails = {};
    var location = [];
    var currentUser = $localStorage.globals;
    userDetails = currentUser.currentUser;
    model.region=false;
    model.region1=false;
    model.circle=false;
    model.circle1=false;
    model.division=false;
    model.division1=false;
    model.substation=false;
    model.substation1=false;
    model.determinateValue = 30;
    var modelArray = [null, null, null, null, null, null,null,null,null];
    model.modelArray = modelArray;
    model.discom = userDetails.discom;
    model.discomid = userDetails.discomId;
    console.log(model.discom);
    model.modelArray[0]= model.discomid;
    model.meterSearch = {};
    model.showTable = false;
    var level = 0;

    $interval(function() {
      model.determinateValue += 1;
      if (model.determinateValue > 100) {
        model.determinateValue = 30;
      }
    }, 100);
    var valid = true;


    model.clearFun = function() {
      model.showProgress = false;
      model.meterSearch.meterNo = '';
      model.meterSearch.consumerNo = '';
      model.meterSearch.consumerName = '';
      model.showTable = false;
      console.log("checkng for the login user --------------------",userDetails.levelName);
      if (userDetails.levelName == "CIRCLE") {
        model.divisionid = undefined;
        model.subdivisionid = undefined;
      }
      else if (userDetails.levelName == "DIVISION") {
        model.subdivisionid = undefined;
      }
      else if (userDetails.levelName == "REGION") {
        model.circleid = undefined;
        model.divisionid = undefined;
        model.subdivisionid = undefined;
      }
      model.regionid = undefined;
      model.circleid = undefined;
      model.divisionid = undefined;
      model.subdivisionid = undefined;
      model.sectionid = undefined;
      model.substationid = undefined;
      model.feederid = undefined;
      model.selectedItem = '';
      modelArray = [null, null, null, null, null, null,null,null,null];
    }
    model.newMetr = function() {
      $location.path('/master');
    }
    model.showTabDialog = function(id) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/main/pages/meterSearch/meterSearchPopup.html',
        // parent: angular.element(document.body),
        targetEvent: "ev",
        clickOutsideToClose: false,
        fullscreen: model.customFullscreen
      })

      function DialogController($scope, $mdDialog, $http, $mdToast) {
        var itemx = id;
        $scope.ev = {};
        $scope.ev = itemx;
        itemx.mtrInstalledDate = splitDate1(new Date(itemx.installedDate) + "");
        itemx.commissionedDate = splitDate1(new Date(itemx.commissionedDate) + "");
        $scope.estimationDisbaled = true;
        model.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        model.answer = function(answer) {
          $mdDialog.hide(answer);
        };
      }
    }
    model.errorToast = function(mesg) {
      $mdToast.show(
        $mdToast.simple()
        .textContent(mesg)
        .position('top right')
        .hideDelay(3000)
        .toastClass('error')
      );
    };
    model.successToast = function(mesg, callback) {
      $mdToast.show(
        $mdToast.simple()
        .textContent(mesg)
        .position('top right')
        .hideDelay(3000)
        .toastClass('success')
      );
    };
    var splitDate1 = function(dt) {
      dt += "";
      console.log(dt);
      var newDt1 = dt.split(' ')[2] + "-" + dt.split(' ')[1] + "-" + dt.split(' ')[3];
      console.log(newDt1);
      return newDt1;
    }
    model.dtOptions = {
      dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
      pagingType: 'simple',
      autoWidth: false,
      responsive: true
    }

    // function validMeter() {
    //   if ((model.meterSearch.subdivisionid || model.meterSearch.sectionid || model.meterSearch.substationid || model.meterSearch.feederid || model.meterSearch.dtrId || model.meterSearch.meterId || model.meterSearch.serviceId || model.meterSearch.consumerName) === undefined) {
    //     model.errorToast("Please Select at least one field for Search...");
    //     return false
    //   } else {
    //     return true
    //   }
    // }



    // get regions
    // regions
          model.getRegions = function() {
            $http({
                method : "GET",
                url : baseUrl2 + "mdm/hierarchy/"+model.discomid
            }).then(function mySuccess(response) {
              console.log(response);
                model.regions = response.data;
                console.log(model.regions);
                // console.log(model.regions.adminEntityValueId);
                // model.regionid = model.regions[0].name;
            }, function myError(response) {
                console.log(response);
            });
          }

          // circles
          model.getCircles = function() {
            console.log(model.regionid);
            console.log("RegionId");
            model.modelArray[1] = Number(model.regionid);

            for (var i = 2; i < model.modelArray.length; i++) {
              model.modelArray[i] = null;
            }
            console.log(model.modelArray);
            $http({
                method : "GET",
                url : baseUrl2 + "mdm/hierarchy/"+model.regionid
            }).then(function mySuccess(response) {
                model.circles = response.data;
                console.log(model.circles);
            }, function myError(response) {
                console.log(response);
            });
          }

          //divisions
          model.getDivision = function() {
            console.log(model.circleid);
            console.log("CircleId");
            model.modelArray[2] = Number(model.circleid);
            for (var i = 3; i < model.modelArray.length; i++) {
              model.modelArray[i] = null;
            }
            console.log(model.modelArray);
            $http({
                method : "GET",
                url : baseUrl2 + "mdm/hierarchy/"+model.circleid
            }).then(function mySuccess(response) {
                model.divisions = response.data;
                console.log(model.divisions);
                //model.divisionid = model.divisions[0].name;
            }, function myError(response) {
                console.log(response);
            });
          }
//  $rootScope.showProgress = true
          //subdivisions
          model.getSubDivisions=function(){
            console.log(model.divisionid);
            console.log("DivisionID");
            model.modelArray[3] = Number(model.divisionid);
            for (var i = 4; i < model.modelArray.length; i++) {
              model.modelArray[i] = null;
            }
            console.log(model.modelArray);
            $http({
                method : "GET",
                url : baseUrl2 + "mdm/hierarchy/"+model.divisionid
            }).then(function mySuccess(response) {
                console.log(response.data);
                model.subdivisions = response.data;
            }, function myError(response) {
                console.log(response);
            });
          }

          //sections
          model.getSections = function() {
            console.log("SubDivisionID");
            console.log(model.subdivisionid);
            model.modelArray[4] = Number(model.subdivisionid);
            for (var i = 5; i < model.modelArray.length; i++) {
              model.modelArray[i] = null;
            }
            console.log(model.modelArray);
            $http({
                method : "GET",
                url : baseUrl2 + "mdm/hierarchy/" + model.subdivisionid
            }).then(function mySuccess(response) {
                model.sections = response.data;
                console.log(response.data);
                console.log(model.sections);
            }, function myError(response) {
                console.log(response);
            });
          }

          //substations
          model.getSubStations = function() {
            console.log("SectionID");
            console.log(model.sectionid);
            model.modelArray[5] = Number(model.sectionid);
            for (var i = 6; i < model.modelArray.length; i++) {
              model.modelArray[i] = null;
            }
            console.log(model.modelArray);
            $http({
                method : "GET",
                url : baseUrl2 +"mdm/substation/"+model.sectionid
            }).then(function mySuccess(response) {
                console.log(response.data);
                model.substations = response.data;
                console.log(model.substations);
            }, function myError(response) {
                console.log(response);
            });
          }

          //feders
          model.getFeeder = function() {
            console.log("SubstationID");
            console.log(model.substationid);
            model.modelArray[6] = Number(model.substationid);
            for (var i = 7; i < model.modelArray.length; i++) {
              model.modelArray[i] = null;
            }
            console.log(model.modelArray);
            $http({
                method : "GET",
                url: baseUrl2 + "mdm/feeder?id1=" +model.substationid + "&id2=" + model.sectionid
            }).then(function mySuccess(response) {
                console.log(response.data);
                model.feeders = response.data;
            }, function myError(response) {
                console.log(response);
            });
          }

          //dtrs
          model.getDtr = function() {
            console.log("FeederID");
            console.log(model.feederid);
            model.modelArray[7] = Number(model.feederid);
            for (var i = 8; i < model.modelArray.length; i++) {
              model.modelArray[i] = null;
            }
            console.log("dtr check data",model.modelArray);
            $http({
                method : "GET",
                url: baseUrl2 + "mdm/dtr?id1=" +model.feederid + "&id2=" + model.sectionid
            }).then(function mySuccess(response) {
              console.log("dtr");
                model.dtrs = response.data;
                console.log("--------------------",model.dtrs );
            }, function myError(response) {
              console.log("dtr");
                console.log(response);
            });
          }

          //mETERS
          model.getMeter = function() {
            console.log("DtrID");
            console.log(model.selectedItem.dtrId);
            model.modelArray[8] = Number(model.selectedItem.dtrId);
            console.log(model.modelArray);
            console.log("Dtr id is ", model.selectedItem);
          }

          if(userDetails.levelName == "SUB-DIVISION"){
            model.region=true;
            model.circle=true;
            model.division=true;
            model.subdivision=true;
            model.discom = userDetails.discom;
            model.regionName=userDetails.region;
            model.circleName=userDetails.circle;
            model.divisionName= userDetails.division;
            model.subdivisionName=userDetails.hierarchyName;
            model.subdivisionid = userDetails.hierarchyId;
            model.section1 =true;
            model.substation1=true;
            model.feeder1= true;
            model.dtr1=true;
            model.modelArray[1]= userDetails.regionId;
            model.modelArray[2]= userDetails.circleId;
            model.modelArray[3] = userDetails.divisionId;
            level = 4;
            model.getSections();
          }

          if(userDetails.levelName == "DIVISION"){
            model.region=true;
            model.circle=true;
            model.division=true;
            model.regionName=userDetails.region;
            model.circleName=userDetails.circle;
            model.divisionName= userDetails.hierarchyName;
            model.divisionid=userDetails.hierarchyId;
            model.subdivision1=true;
            model.section1 =true;
            model.substation1=true;
            model.feeder1= true;
            model.dtr1=true;
            model.modelArray[1]= userDetails.regionId;
            model.modelArray[2]= userDetails.circleId;
            level = 3;
            model.getSubDivisions();
          }

          if(userDetails.levelName == "CIRCLE"){
            console.log("++++++++++++++++++++++++++");
            console.log("Circle User");
            console.log(userDetails);
            model.region=true;
            model.circle=true;
            model.regionName=userDetails.region;
            model.circleName= userDetails.hierarchyName;
            model.circleid=userDetails.hierarchyId;
            model.division1=true;
            model.subdivision1=true;
            model.section1 =true;
            model.substation1=true;
            model.feeder1= true;
            model.dtr1=true;
            model.modelArray[1]= userDetails.regionId;
            level = 2;
            model.getDivision();
          }

          if(userDetails.levelName == "REGION"){
          model.region=true;
          model.regionName= userDetails.hierarchyName;
          model.regionid=userDetails.hierarchyId;
          model.circle1=true;
          model.division1=true;
          model.subdivision1=true;
          model.section1 =true;
          model.substation1=true;
          model.feeder1= true;
          model.dtr1=true;
          //model.modelArray[0]= userDetails.regionId;
          model.getCircles();
        }
          if(userDetails.levelName == "DISCOM"){
              console.log("++++++++++++++++++++++++++");
              console.log("Discom User");
              console.log(userDetails);
              model.regionName=userDetails.region;
              model.discom= userDetails.hierarchyName;
              model.discomid=userDetails.hierarchyId;
              model.region1=true;
              model.circle1=true;
              model.division1=true;
              model.subdivision1=true;
              model.section1 =true;
              model.substation1=true;
              model.feeder1= true;
              model.dtr1=true;
              model.modelArray[0]= userDetails.hierarchyId;
              model.getRegions();
         }


          model.searchMeterFun = function() {
              model.showProgress = true;
             model.showTable = false;
          //loc = model.modelArray;
              var date = new Date() + "";
              if (!(model.meterSearch.consumerNo  === undefined && model.meterSearch.consumerName === undefined && model.meterSearch.meterNo  === undefined)) {
                for (var i = level+1; i <  model.modelArray.length; i++) {
                  model.modelArray[i] = null;
                }
              }
              model.meterSearch.location = model.modelArray;
              console.log(model.meterSearch.location);
              //data.meterSearch = model.meterSearch;
              console.log(model.meterSearch.meterNo);
              console.log(model.meterSearch.consumerName);
              if (model.meterSearch.consumerNo  === undefined) {
                model.meterSearch.consumerNo  = null;
              }
              if (model.meterSearch.consumerName === undefined) {
                model.meterSearch.consumerName = null;
                console.log("hi"+model.meterSearch.consumerName);
              }
              if (model.meterSearch.meterNo  === undefined) {
                model.meterSearch.meterNo  = null;
              }
              data.meterSearch = model.meterSearch;
              console.log(data);
              $http({
                method: "POST",
                url: baseUrl2 + "mdm/meter/meter-search",
                data: data
              }).then(function mySuccess(response) {
                  model.meterTableShow = true;
                console.log("??????????",response.data);
                model.searchData = response.data.statistics;

                if (response.data.message === "Success") {
                  //alert("hiii")
                  //model.meterTableShow = true;
                   model.showProgress = false;
                   model.showTable = true;

                }


                // if ((model.meterSearch.meterId != "" && model.meterSearch.meterId != undefined) && model.meterSearch.meterId != 33320 && valid) {
                //   model.errorToast('Please Enter Correct meter  no');
                //   valid = false;
                // }
                // if ((model.meterSearch.serviceId != "" && model.meterSearch.serviceId != undefined) && model.meterSearch.serviceId != 10002 && valid) {
                //   model.errorToast('Please Enter Correct consumerService No');
                //   valid = false;
                // }
                // if ((model.meterSearch.consumerName != "" && model.meterSearch.consumerName != undefined) && model.meterSearch.consumerName != "KASI" && valid) {
                //   model.errorToast('Please Enter Correct consumer name');
                //   valid = false;
                // } else {
                //   valid = true;
                // }

                //DATE FORMAT AFTER POST
                // for (var i = 0; i < model.searchData.length; i++) {
                //   // model.searchData[i].installedDate = splitDate1(new Date(model.searchData[i].installedDate) + "");
                //   // model.searchData[i].commissionedDate = splitDate1(new Date(model.searchData[i].commissionedDate) + "");
                // }


                //model.successToast("Submitted Sucessfully.");
              }, function myError(response) {
                console.log(response);
                model.errorToast("Sorry. We Are Having Some Techinical Issues With Regards To The Server. Please Try Later.");
              });
            // }
          }
  }
})();
