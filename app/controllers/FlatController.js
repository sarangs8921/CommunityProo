angular.module("ainapp")
    .controller("FlatController", ["app.config", "$scope", "LoginService", "AuthenticationService", "$state", "$stateParams", "MainService", "localStorageService",
            function (config, $scope, LoginService, AuthenticationService, $state, $stateParams, MainService, localStorageService) {


            //// DropDown Function /////

            $scope.Buildings = [];
            MainService.BuildingInDropdown().then(function (response) {
                $scope.Buildings = response.data;
            }, function (err) {
                toastr.error("Network Error");
            })


            //// Init Function    


            $scope.Init = function () {

                $scope.Flats = [];
                MainService.FlatInDropdown().then(function (response) {
                    if (response.data) {
                        $scope.Flats = response.data;
                        console.log(response.data);
                    } else {
                        toastr.error("Error");
                    }
                    $scope.load = false;
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });


                $scope.Flat = {
                    FlatNo: "",
                    OwnerName: "",
                    BuildingId: "",
                    OwnerMobileNo: "",
                    OwnerEmail: "",
                    OwnerAddress: "",
                    Area: "",
                    Photo: "",
                    Description: "",
                    BathRooms: "",
                    BedRooms: "",
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
                        $scope.Flat.Photo = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };


            //// Add Data

            $scope.AddData = function () {
                if ($scope.Flat.FlatNo == "") {
                    toastr.warning("Enter FlatNo");
                } else if ($scope.Flat.BuildingId == "") {
                    toastr.warning("Select Building");
                } else if ($scope.Flat.OwnerName == "") {
                    toastr.warning("Enter Owner Name");
                } else if ($scope.Flat.OwnerMobileNo == "") {
                    toastr.warning("Enter OwnerMobile No");
                } else if ($scope.Flat.OwnerEmail == "") {
                    toastr.warning("Enter Owner Email");
                } else if ($scope.Flat.OwnerAddress == "") {
                    toastr.warning("Enter Owner Address");
                } else if ($scope.Flat.Area == "") {
                    toastr.warning("Enter Area");
                } else if ($scope.Flat.BathRooms == "") {
                    toastr.warning("Enter No of Bathrooms");
                } else if ($scope.Flat.BedRooms == "") {
                    toastr.warning("Enter No of Bedrooms");
                } else if ($scope.Flat.Photo == "") {
                    toastr.warning("Upload Photo");
                } else if ($scope.Flat.Description == "") {
                    toastr.warning("Enter Description");
                }
                $scope.load = true;
                MainService.AddFlat($scope.Flat).then(function (response) {
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



            //// Delete Function

            $scope.SelectedDataForDelete = {};
            $scope.DeleteAccType = function (data) {
                $scope.SelectedDataForDelete = data;
                $("#myModal2").modal("show");
            }

            $scope.deleteWithConfirm = function () {
                MainService.DeleteFlat($scope.SelectedDataForDelete.Id).then(function (response) {
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

                MainService.GetFlatById(data.Id).then(function (response) {
                    if (response.data) {
                        $scope.FlatView = response.data;
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
                $scope.Flat = data;
            }

    }])
