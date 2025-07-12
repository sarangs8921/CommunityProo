angular.module("ainapp")
    .controller("HomeController", ["app.config", "$scope", "LoginService", "AuthenticationService", "$state", "$stateParams", "MainService", "localStorageService",
            function (config, $scope, LoginService, AuthenticationService, $state, $stateParams, MainService, localStorageService) {


            $scope.init = function () {


                $scope.FacilityBooking = [];
                MainService.FacilityBookingInDropdown().then(function (response) {
                    if (response.data) {
                        console.log(response.data);
                        $scope.FacilityBooking = response.data;
                    } else {
                        toastr.error("Error");
                    }
                    $scope.load = false;
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });


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

                $scope.Enquiries = [];
                MainService.EnquiryInDropdown().then(function (response) {
                    if (response.data) {
                        console.log(response.data);
                        $scope.Enquiries = response.data;
                    } else {
                        toastr.error("Error");
                    }
                    $scope.load = false;
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });

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

                $scope.Bookings = [];
                MainService.ParkingBookingInDropdown().then(function (response) {
                    if (response.data) {
                        console.log(response.data);
                        $scope.Bookings = response.data;
                    } else {
                        toastr.error("Error");
                    }
                    $scope.load = false;
                }, function (err) {
                    toastr.error("Network Error");
                    $scope.load = false;
                });



            }
            $scope.init();



                    }])
