angular.module("ainapp")
    .controller("EventController", ["app.config", "$scope", "LoginService", "AuthenticationService", "$state", "$stateParams", "MainService", "localStorageService",
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

                $scope.Events = [];
                MainService.ListOfEvents().then(function (response) {
                    if (response.data) {
                        $scope.Events = response.data;
                        console.log(response.data);
                    } else {
                        toastr.error("Error");
                    }
                    $scope.load = false;
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });

                $scope.Event = {
                    Title: "",
                    BuildingId: "",
                    Description: "",
                    Photo1: "",
                    Photo2: "",
                    Time: "",
                    Venue: "",
                    Date: new Date()
                }

                $scope.load = 0;
            }
            $scope.Init();


            //// Handle File Image Function ////////////////////////

            $scope.handleFileSelect1 = function (evt) {
                var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myImage = evt.target.result;
                        $scope.Event.Photo1 = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };

            $scope.handleFileSelect2 = function (evt) {
                var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myImage = evt.target.result;
                        $scope.Event.Photo2 = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };



            // Add Data Function

            $scope.AddData = function () {
                if ($scope.Event.Title == "") {
                    toastr.warning("Enter Title");
                } else if ($scope.Event.BuildingId == "") {
                    toastr.warning("Select Building");
                } else if ($scope.Event.Description == "") {
                    toastr.warning("Enter Details");
                } else if ($scope.Event.Time == "") {
                    toastr.warning("Enter Time");
                } else if ($scope.Event.Venue == "") {
                    toastr.warning("Enter Venue");
                } else if ($scope.Event.Photo1 == "") {
                    toastr.warning("Upload Image 1");
                } else if ($scope.Event.Photo2 == "") {
                    toastr.warning("Upload Image 2");
                } else {
                    $scope.load = true;
                    $scope.Event.DateString = $scope.extractDate($scope.Event.Date);
                    MainService.AddEvents($scope.Event).then(function (response) {
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
                MainService.DeleteEvents($scope.SelectedDataForDelete.Id).then(function (response) {
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

                MainService.GetEventById(data.Id).then(function (response) {
                    if (response.data) {
                        $scope.EventView = response.data;
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
                $scope.Event = data;
            }



                    }])
