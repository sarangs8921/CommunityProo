angular.module("ainapp")
    .controller("CategoryController", ["app.config", "$scope", "LoginService", "AuthenticationService", "$state", "$stateParams", "MainService", "localStorageService",
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



            // Initial Function (Init)

            $scope.Init = function () {
                $scope.Categories = [];
                MainService.ListOfCategories().then(function (response) {
                    if (response.data) {
                        $scope.Categories = response.data;
                        console.log(response.data);
                    } else {
                        toastr.error("Error");
                    }
                    $scope.load = false;
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });


                $scope.Category = {
                    Name: "",
                    Photo: "",
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
                        $scope.Category.Photo = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };


            // Add Data 

            $scope.AddData = function () {
                if ($scope.Category.Name == "") {
                    toastr.warning("Enter Category");
                } else if ($scope.Category.Photo == "") {
                    toastr.warning("Upload Image");
                } else {
                    $scope.load = true;
                    MainService.AddCategory($scope.Category).then(function (response) {
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
                MainService.DeleteCategory($scope.SelectedDataForDelete.Id).then(function (response) {
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
                $scope.Category = data;
            }




                }]);
