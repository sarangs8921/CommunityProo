angular.module("ainapp")
    .controller("ParkingZoneController", ["app.config", "$scope", "LoginService", "AuthenticationService", "$state", "$stateParams", "MainService", "localStorageService",
            function (config, $scope, LoginService, AuthenticationService, $state, $stateParams, MainService, localStorageService) {


           // Initial Function (Init)

            $scope.Init = function () {
                
                
                  $scope.ParkingZones = [];
                  MainService.ParkingZoneInDropdown().then(function (response) {
                            if (response.data) {
                               $scope.ParkingZones = response.data;
                            } else {
                                toastr.error("Error");
                            }
                            $scope.load = false;
                        }, function (err) {
                            toastr.error("Network Error");
                            $scope.load = false;
                        });
                
                
                $scope.ParkingZone = {
                    Name: "",
                }

                $scope.load = 0;
            }
            $scope.Init();


// Add Data Function

            $scope.AddData = function () {
                    if ($scope.ParkingZone.Name == "") {
                        toastr.warning("Enter Name");
                    } else {
                        $scope.load = true;
                        MainService.AddParkingZone($scope.ParkingZone).then(function (response) {
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
                MainService.DeleteParkingZone($scope.SelectedDataForDelete.Id).then(function (response) {
                    if (response.data == 1) {
                        $('#myModal2').modal('hide');
                        toastr.success("Deleted");
                        $scope. Init();
                        $scope.SelectedDataForDelete = {};
                    } else {
                        $('#myModal2').modal('hide');
                        toastr.info("Cannot Delete");
                    }
                })
            }
            
// Edit Function

            $scope.Edit = function (data) {
                $scope.ParkingZone = data;
            }

                    }])
