angular.module("ainapp")
    .controller("BuildingController", ["app.config", "$scope", "LoginService", "AuthenticationService", "$state", "$stateParams", "MainService", "localStorageService",
            function (config, $scope, LoginService, AuthenticationService, $state, $stateParams, MainService, localStorageService) {

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

            $scope.Districts = [];
            MainService.DistrictInDropdown().then(function (response) {
                $scope.Districts = response.data;
            }, function (err) {
                toastr.error("Network Error");
            })


            // Init Function

            $scope.Init = function () {

                $scope.Buildings = [];
                MainService.BuildingInDropdown().then(function (response) {
                    if (response.data) {
                        $scope.Buildings = response.data;
                        console.log(response.data);
                    } else {
                        toastr.error("Error");
                    }
                    $scope.load = false;
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });


                $scope.Building = {
                    Name: "",
                    BuildingNo: "",
                    MobileNo: "",
                    Email: "",
                    Address: "",
                    Location: "",
                    Pincode: "",
                    Photo: "",
                    CountryId: "",
                    StateId: "",
                    DistrictId: ""
                }

                $scope.load = 0;

            }
            $scope.Init();

            //// Handle File Image Function ////////////////////////

            $scope.handleFileSelect = function (evt) {
                var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myImage = evt.target.result;
                        $scope.Building.Photo = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };


            ////////// Add Data  /////////////


            $scope.AddData = function () {
                if ($scope.Building.Name == "") {
                    toastr.warning("Enter Name");
                } else if ($scope.Building.BuildingNo == "") {
                    toastr.warning("Enter Building No");
                } else if ($scope.Building.MobileNo == "") {
                    toastr.warning("Enter Mobile No");
                } else if ($scope.Building.Email == "") {
                    toastr.warning("Enter Email");
                } else if ($scope.Building.Address == "") {
                    toastr.warning("Enter Address");
                } else if ($scope.Building.Location == "") {
                    toastr.warning("Enter Location");
                } else if ($scope.Building.Pincode == "") {
                    toastr.warning("Enter PinCode");
                } else if ($scope.Building.Photo == "") {
                    toastr.warning("Upload Image");
                } else if ($scope.Building.DistrictId == "") {
                    toastr.warning("Select District");
                } else if ($scope.Building.StateId == "") {
                    toastr.warning("Select State");
                } else if ($scope.Building.CountryId == "") {
                    toastr.warning("Select Country");
                } else {
                    $scope.load = true;
                    MainService.AddBuilding($scope.Building).then(function (response) {
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

            ////// Delete Function

            $scope.SelectedDataForDelete = {};
            $scope.DeleteAccType = function (data) {
                $scope.SelectedDataForDelete = data;
                $("#myModal2").modal("show");
            }

            $scope.deleteWithConfirm = function () {
                MainService.DeleteBuilding($scope.SelectedDataForDelete.Id).then(function (response) {
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


            // View Data

            $scope.View = function (data) {

                MainService.GetBuildingById(data.Id).then(function (response) {
                    if (response.data) {
                        $scope.BuildingView = response.data;
                        $('#viewModal').modal('show');
                    } else {
                        toastr.error("Error");
                    }
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });

            }

            ////.  Edit Function. ////

            $scope.Edit = function (data) {
                $scope.Building = data;
            }



                    }])
