angular.module("ainapp")
    .controller("NoticeBoardController", ["app.config", "$scope", "LoginService", "AuthenticationService", "$state", "$stateParams", "MainService", "localStorageService",
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

                $scope.Notices = [];
                MainService.ListOfNotices().then(function (response) {
                    if (response.data) {
                        $scope.Notices = response.data;
                        console.log(response.data);
                    } else {
                        toastr.error("Error");
                    }
                    $scope.load = false;
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });

                $scope.NoticeBoard = {
                    Name: "",
                    BuildingId: "",
                    Description: "",
                    Date: new Date()
                }

                $scope.load = 0;
            }
            $scope.Init();


            // Add Data Function

            $scope.AddData = function () {
                if ($scope.NoticeBoard.Name == "") {
                    toastr.warning("Enter Title");
                } else if ($scope.NoticeBoard.BuildingId == "") {
                    toastr.warning("Select Building");
                } else if ($scope.NoticeBoard.Description == "") {
                    toastr.warning("Enter Detatils");
                } else {
                    $scope.load = true;
                    $scope.NoticeBoard.DateString = $scope.extractDate($scope.NoticeBoard.Date);
                    MainService.AddNoticeBoard($scope.NoticeBoard).then(function (response) {
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
                MainService.DeleteNoticeBoard($scope.SelectedDataForDelete.Id).then(function (response) {
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
                $scope.NoticeBoard = data;
            }








                    }])
