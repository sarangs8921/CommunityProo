angular.module("ainapp")
    .controller("ServiceBookingController", ["app.config", "$scope", "LoginService", "AuthenticationService", "$state", "$stateParams", "MainService", "localStorageService",
            function (config, $scope, LoginService, AuthenticationService, $state, $stateParams, MainService, localStorageService) {


            $scope.init = function () {

                $scope.ServiceBooking = [];
                MainService.ServiceBookingInDropdown().then(function (response) {
                    if (response.data) {
                        console.log(response.data);
                        $scope.ServiceBooking = response.data;
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



                    }])
