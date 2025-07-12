angular.module("ainapp")
    .controller("DirectoryController", ["app.config", "$scope", "LoginService", "AuthenticationService", "$state", "$stateParams", "MainService", "localStorageService",
            function (config, $scope, LoginService, AuthenticationService, $state, $stateParams, MainService, localStorageService) {

            // Drop Down 


            $scope.Buildings = [];
            MainService.BuildingInDropdown().then(function (response) {
                $scope.Buildings = response.data;
            }, function (err) {
                toastr.error("Network Error");
            })



            $scope.Categories = [];
            MainService.ListOfCategories().then(function (response) {
                $scope.Categories = response.data;
            }, function (err) {
                toastr.error("Network Error");
            })



            // Initial Function (Init)

            $scope.Init = function () {


                $scope.Directories = [];
                MainService.DirectoryInDropdown().then(function (response) {
                    if (response.data) {
                        $scope.Directories = response.data;
                    } else {
                        toastr.error("Error");
                    }
                    $scope.load = false;
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });


                $scope.Directory = {
                    Name: "",
                    MobileNo: "",
                    Description: "",
                    CategoryId: "",
                    BuildingId: ""

                }

                $scope.load = 0;
            }
            $scope.Init();


            // Add Data Function

            $scope.AddData = function () {
                if ($scope.Directory.Name == "") {
                    toastr.warning("Enter Name");
                } else if ($scope.Directory.MobileNo == "") {
                    toastr.warning("Enter Mobile No");
                } else if ($scope.Directory.Description == "") {
                    toastr.warning("Enter Description");
                } else if ($scope.Directory.CategoryId == "") {
                    toastr.warning("Select Category");
                } else if ($scope.Directory.BuildingId == "") {
                    toastr.warning("Select Building");
                } else {
                    $scope.load = true;
                    MainService.AddDirectory($scope.Directory).then(function (response) {
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
                MainService.DeleteDirectory($scope.SelectedDataForDelete.Id).then(function (response) {
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
                $scope.Directory = data;
            }



                    }])
