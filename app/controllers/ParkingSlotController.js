angular.module("ainapp")
    .controller("ParkingSlotController", ["app.config", "$scope", "LoginService", "AuthenticationService", "$state", "$stateParams", "MainService", "localStorageService",
            function (config, $scope, LoginService, AuthenticationService, $state, $stateParams, MainService, localStorageService) {


            // DropDown Function

            $scope.ParkingZones = [];
            MainService.ParkingZoneInDropdown().then(function (response) {
                $scope.ParkingZones = response.data;
            }, function (err) {
                toastr.error("Network Error");
            })

            $scope.Flats = [];
            MainService.FlatInDropdown().then(function (response) {
                $scope.Flats = response.data;
            }, function (err) {
                toastr.error("Network Error");
            })


            // Initial Function (Init)

            $scope.Init = function () {


                $scope.ParkingSlots = [];
                MainService.ParkingSlotInDropdown().then(function (response) {
                    if (response.data) {
                        $scope.ParkingSlots = response.data;
                    } else {
                        toastr.error("Error");
                    }
                    $scope.load = false;
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });


                $scope.ParkingSlot = {
                    Name: "",
                    ParkingZoneId: "",
                    FlatId: ""
                }

                $scope.load = 0;
            }

            $scope.Init();


            // Add Data Function

            $scope.AddData = function () {
                if ($scope.ParkingSlot.Name == "") {
                    toastr.warning("Enter Name");
                } else if ($scope.ParkingSlot.ParkingZoneId == "") {
                    toastr.warning("Select Zone");
                } else {
                    $scope.load = true;
                    MainService.AddParkingSlot($scope.ParkingSlot).then(function (response) {
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
                MainService.DeleteParkingSlot($scope.SelectedDataForDelete.Id).then(function (response) {
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
                $scope.ParkingSlot = data;
            }


                    }])
