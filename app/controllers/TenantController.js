angular.module("ainapp")
    .controller("TenantController", ["app.config", "$scope", "LoginService", "AuthenticationService", "$state", "$stateParams", "MainService", "localStorageService",
            function (config, $scope, LoginService, AuthenticationService, $state, $stateParams, MainService, localStorageService) {



            //// DropDown Function /////

            $scope.Buildings = [];
            MainService.BuildingInDropdown().then(function (response) {
                $scope.Buildings = response.data;
            }, function (err) {
                toastr.error("Network Error");
            })

            $scope.Flats = [];
            MainService.EmptyFlatInDropdown().then(function (response) {
                $scope.Flats = response.data;
                console.log(response.data);
            }, function (err) {
                toastr.error("Network Error");
            })

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



            //// Init Function    


            $scope.Init = function () {

                $scope.Tenants = [];
                MainService.TenantInDropdown().then(function (response) {
                    if (response.data) {
                        $scope.Tenants = response.data;
                        console.log(response.data);
                    } else {
                        toastr.error("Error");
                    }
                    $scope.load = false;
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });


                $scope.Tenant = {
                    Name: "",
                    FlatId: "",
                    BuildingId: "",
                    MobileNo: "",
                    EmailId: "",
                    Address: "",
                    Location: "",
                    Photo: "",
                    CountryId: "",
                    StateId: "",
                    DistrictId: "",
                    Password: ""
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
                        $scope.Tenant.Photo = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };


            //// Add Data

            $scope.AddData = function () {
                if ($scope.Tenant.Name == "") {
                    toastr.warning("Enter Name");
                } else if ($scope.Tenant.BuildingId == "") {
                    toastr.warning("Select Building");
                } else if ($scope.Tenant.FlatId == "") {
                    toastr.warning("Select Flat");
                } else if ($scope.Tenant.MobileNo == "") {
                    toastr.warning("Enter Mobile No");
                } else if ($scope.Tenant.EmailId == "") {
                    toastr.warning("Enter Email");
                } else if ($scope.Tenant.Address == "") {
                    toastr.warning("Enter  Address");
                } else if ($scope.Tenant.Location == "") {
                    toastr.warning("Enter Location");
                } else if ($scope.Tenant.Photo == "") {
                    toastr.warning("Upload Photo");
                } else if ($scope.Tenant.CountryId == "") {
                    toastr.warning("Select Country");
                } else if ($scope.Tenant.StateId == "") {
                    toastr.warning("Select State");
                } else if ($scope.Tenant.DistrictId == "") {
                    toastr.warning("Select District");
                } else if ($scope.Tenant.Password == "") {
                    toastr.warning("Enter Password");
                } else {
                    $scope.load = true;
                    MainService.AddTenant($scope.Tenant).then(function (response) {
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
                MainService.DeleteTenant($scope.SelectedDataForDelete.Id).then(function (response) {
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

                MainService.GetTenantById(data.Id).then(function (response) {
                    if (response.data) {
                        $scope.TenantView = response.data;
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
                $scope.Tenant = data;
            }



                    }])
