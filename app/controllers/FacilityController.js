angular.module("ainapp")
    .controller("FacilityController", ["app.config", "$scope", "LoginService", "AuthenticationService", "$state", "$stateParams", "MainService", "localStorageService",
            function (config, $scope, LoginService, AuthenticationService, $state, $stateParams, MainService, localStorageService) {


            // DropDown Function

            $scope.Buildings = [];
            MainService.BuildingInDropdown().then(function (response) {
                $scope.Buildings = response.data;
            }, function (err) {
                toastr.error("Network Error");
            })


            // Initial Function (Init)

            $scope.Init = function () {


                $scope.Facilities = [];
                MainService.ListOfFacility().then(function (response) {
                    if (response.data) {
                        $scope.Facilities = response.data;
                    } else {
                        toastr.error("Error");
                    }
                    $scope.load = false;
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });


                $scope.Facility = {
                    Name: "",
                    BuildingId: "",
                    Photo: "",
                    IconImage: "",
                    Description: ""
                }

                $scope.load = 0;
            }
            $scope.Init();


            // Handle File Image Function

            $scope.handleFileSelect = function (evt) {
                var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myImage = evt.target.result;
                        $scope.Facility.Photo = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };

            $scope.handleFileSelect1 = function (evt) {
                var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myImage = evt.target.result;
                        $scope.Facility.IconImage = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };




            // Add Data Function

            $scope.AddData = function () {
                if ($scope.Facility.Name == "") {
                    toastr.warning("Enter Name");
                } else if ($scope.Facility.BuildingId == "") {
                    toastr.warning("Select Building");
                } else if ($scope.Facility.Photo == "") {
                    toastr.warning("Upload Photo 1234");
                } else if ($scope.Facility.IconImage == "") {
                    toastr.warning("Upload Icon Image");
                } else if ($scope.Facility.Description == "") {
                    toastr.warning("Enter Description");
                } else {
                    $scope.load = true;
                    MainService.AddFacility($scope.Facility).then(function (response) {
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
                MainService.DeleteFacility($scope.SelectedDataForDelete.Id).then(function (response) {
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

                MainService.GetFacilityById(data.Id).then(function (response) {
                    if (response.data) {
                        $scope.FacilityView = response.data;
                        $('#viewModal').modal('show');
                    } else {
                        toastr.error("Error");
                    }
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });

            }


            // Edit Function

            $scope.Edit = function (data) {
                $scope.Facility = data;
            }





                    }])
