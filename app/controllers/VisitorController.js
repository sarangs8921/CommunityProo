angular.module("ainapp")
    .controller("VisitorController", ["app.config", "$scope", "LoginService", "AuthenticationService", "$state", "$stateParams", "MainService", "localStorageService",
            function (config, $scope, LoginService, AuthenticationService, $state, $stateParams, MainService, localStorageService) {


            $scope.init = function () {

                $scope.Visitors = [];
                MainService.VisitorsInDropdown().then(function (response) {
                    if (response.data) {
                        $scope.Visitors = response.data;
                    } else {
                        toastr.error("Error");
                    }
                    $scope.load = false;
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });


                $scope.load = 0;

            }
            $scope.init();


            // View Data

            $scope.View = function (data) {

                MainService.GetVisitorById(data.Id).then(function (response) {
                    if (response.data) {
                        $scope.VisitorView = response.data;
                        $('#viewModal').modal('show');
                    } else {
                        toastr.error("Error");
                    }
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });

            }


                    }])
