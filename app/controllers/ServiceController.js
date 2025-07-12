angular.module("ainapp")
    .controller("ServiceController", ["app.config", "$scope", "LoginService", "AuthenticationService", "$state", "$stateParams", "MainService", "localStorageService",
            function (config, $scope, LoginService, AuthenticationService, $state, $stateParams, MainService, localStorageService) {

            // DropDown Function

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


                $scope.Services = [];
                MainService.ListOfServices().then(function (response) {
                    if (response.data) {
                        $scope.Services = response.data;
                    } else {
                        toastr.error("Error");
                    }
                    $scope.load = false;
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });


                $scope.Service = {
                    Name: "",
                    BuildingId: "",
                    ContactNo: "",
                    CategoryId: "",
                    AverageRate: "",
                    Photo: "",
                    Description: "",
                    IconImage: "",
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
                        $scope.Service.Photo = evt.target.result;
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
                        $scope.Service.IconImage = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };



            // Add Data Function

            $scope.AddData = function () {
                if ($scope.Service.Name == "") {
                    toastr.warning("Enter Name");
                } else if ($scope.Service.ContactNo == "") {
                    toastr.warning("Select ContactNo");
                } else if ($scope.Service.CategoryId == "") {
                    toastr.warning("Select Category");
                } else if ($scope.Service.Photo == "") {
                    toastr.warning("Upload Photo");
                } else if ($scope.Service.IconImage == "") {
                    toastr.warning("Upload Icon");
                } else if ($scope.Service.AverageRate == "") {
                    toastr.warning("Enter Average Rate");
                } else if ($scope.Service.Description == "") {
                    toastr.warning("Enter Description");
                } else {
                    $scope.load = true;
                    MainService.AddService($scope.Service).then(function (response) {
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
                MainService.DeleteService($scope.SelectedDataForDelete.Id).then(function (response) {
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

                MainService.GetServiceById(data.Id).then(function (response) {
                    if (response.data) {
                        $scope.ServiceView = response.data;
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
                $scope.Service = data;
            }




                    }])
