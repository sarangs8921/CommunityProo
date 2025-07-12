angular.module("ainapp")
    .controller("EmployeeController", ["app.config", "$scope", "LoginService", "AuthenticationService", "$state", "$stateParams", "MainService", "localStorageService",
            function (config, $scope, LoginService, AuthenticationService, $state, $stateParams, MainService, localStorageService) {


            // DropDown Function

            $scope.Buildings = [];
            MainService.BuildingInDropdown().then(function (response) {
                $scope.Buildings = response.data;
            }, function (err) {
                toastr.error("Network Error");
            })


            // Init Function

            $scope.Init = function () {

                $scope.Employees = [];
                MainService.EmployeeInDropdown().then(function (response) {
                    if (response.data) {
                        $scope.Employees = response.data;
                        console.log(response.data);
                    } else {
                        toastr.error("Error");
                    }
                    $scope.load = false;
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });


                $scope.Employee = {
                    Name: "",
                    BuildingId: "",
                    MobileNo: "",
                    Email: "",
                    Designation: "",
                    Photo: "",
                    Address: "",
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
                        $scope.Employee.Photo = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };


            // Add Data

            $scope.AddData = function () {
                if ($scope.Employee.Name == "") {
                    toastr.warning("Enter Name");
                } else if ($scope.Employee.BuildingId == "") {
                    toastr.warning("Select Building");
                } else if ($scope.Employee.MobileNo == "") {
                    toastr.warning("Enter Mobile No");
                } else if ($scope.Employee.Email == "") {
                    toastr.warning("Enter Email");
                } else if ($scope.Employee.Address == "") {
                    toastr.warning("Enter Address");
                } else if ($scope.Employee.Designation == "") {
                    toastr.warning("Enter Location");
                } else if ($scope.Employee.Photo == "") {
                    toastr.warning("Upload Image");
                } else {
                    $scope.load = true;
                    MainService.AddEmployee($scope.Employee).then(function (response) {
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

            //// Delete

            $scope.SelectedDataForDelete = {};
            $scope.DeleteAccType = function (data) {
                $scope.SelectedDataForDelete = data;
                $("#myModal2").modal("show");
            }

            $scope.deleteWithConfirm = function () {
                MainService.DeleteEmployee($scope.SelectedDataForDelete.Id).then(function (response) {
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

                MainService.GetEmployeeById(data.Id).then(function (response) {
                    if (response.data) {
                        $scope.EmployeeView = response.data;
                        $('#viewModal').modal('show');
                    } else {
                        toastr.error("Error");
                    }
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });

            }

            //Edit Data

            $scope.Edit = function (data) {
                $scope.Employee = data;
            }


                    }])
