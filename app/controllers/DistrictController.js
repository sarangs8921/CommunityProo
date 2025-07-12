angular.module("ainapp")
    .controller("DistrictController", ["app.config", "$scope", "LoginService", "AuthenticationService", "$state", "$stateParams", "MainService", "localStorageService",
            function (config, $scope, LoginService, AuthenticationService, $state, $stateParams, MainService, localStorageService) {

//            $scope.PageName = "Country";
//            $scope.UserPageRole = {};
//            $scope.TokenInfo = AuthenticationService.getTokenInfo();
//            if ($scope.TokenInfo == null) {
//                $state.go("login");
//            } else {
//                if ($scope.TokenInfo.Role != 'Admin' && $scope.TokenInfo.Role != 'admin' && $scope.TokenInfo.Role != '0' && $scope.TokenInfo.Role != 'CA' && $scope.TokenInfo.Role != 'SA') {
//                    var data = {
//                        PageName: $scope.PageName,
//                        UserId: $scope.TokenInfo.Id,
//                    }
//                    MainService.CheckUserPageAccess(data).then(function (response) {
//                        if (response.data != null) {
//                            $scope.UserPageRole = response.data;
//                        } else {
//                            $state.go("forbidden");
//                        }
//                    }, function (err) {
//                        toastr.error($scope.NetworkErrorLan);
//                    });
//                }
//            }

// DropDown Function
                
            $scope.Countries = [];
            MainService.CountryInDropdown().then(function (response) {
                $scope.Countries = response.data;
            }, function (err) {
                toastr.error("Network Error");
            })
                
            $scope.States = [];
            MainService.StateInDropdown().then(function (response) {
                $scope.States = response.data;
            }, function (err) {
                toastr.error("Network Error");
            })


// Initial Function (Init)
     
                $scope.Init = function () {
                
                
                  $scope.Districts = [];
                  MainService.DistrictInDropdown().then(function (response) {
                            if (response.data) {
                               $scope.Districts = response.data;
                            } else {
                                toastr.error("Error");
                            }
                            $scope.load = false;
                        }, function (err) {
                            toastr.error("Network Error");
                            $scope.load = false;
                        });
                
                
                $scope.District = {
                    Name: "",
                    CountryId:"",
                    StateId:""
                }

                $scope.load = 0;
            }
            $scope.Init();


// Add Data Function

            $scope.AddData = function () {
                    if ($scope.District.Name == "") {
                        toastr.warning("Enter Name");
                    }
                    else if ($scope.District.StateId == ""){
                        toastr.warning("Select State");
                    }
                    else if ($scope.District.CountryId == ""){
                        toastr.warning("Select Country");
                    } 
                    else {
                        $scope.load = true;
                        MainService.AddDistrict($scope.District).then(function (response) {
                            if (response.data) {
                                toastr.success("Success");
                                $scope.Init();
                            } else {
                                toastr.error("Error");
                            }
                            $scope.load = false;
                        }, function (err) {
                            toastr.error("Network Error");
                            $scope.load = false;
                        });
                    }
                }
            
// Delete Function
            
            $scope.SelectedDataForDelete = {};
            $scope.DeleteAccType = function (data) {
                $scope.SelectedDataForDelete = data;
                $("#myModal2").modal("show");
            }

            $scope.deleteWithConfirm = function () {
                MainService.DeleteDistrict($scope.SelectedDataForDelete.Id).then(function (response) {
                    if (response.data == 1) {
                        $('#myModal2').modal('hide');
                        toastr.success("Deleted");
                        $scope.Init();
                        $scope.SelectedDataForDelete = {};
                    } else {
                        $('#myModal2').modal('hide');
                        toastr.info("Cannot Delete");
                    }
                })
            }
            
// Edit Function

            $scope.Edit = function (data) {
                $scope.District = data;
            }
            
        
            

                }]);