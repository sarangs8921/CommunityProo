(function () {
    'use strict';
    angular.module('ainapp', ['ui.router', 'ui.bootstrap', 'LocalStorageModule', 'ngLoader'])
        .value('app.config', {

            //basePath: 'http://localhost:50639/'

            basePath: 'https://community.ainsoft.in/'


        })
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

                $urlRouterProvider.otherwise('login');
                $stateProvider

                    .state("login", {
                        url: "/login",
                        templateUrl: "templates/login.tpl.html",
                        controller: "LoginController",
                    })

                    ///////////// *************** home *********** //////////


                    .state("init", {
                        abstract: true,
                        url: "/init",
                        templateUrl: "templates/init.tpl.html",
                        controller: "InitController",
                    })

                    .state("home", {
                        parent: "init",
                        url: "/home",
                        templateUrl: "templates/home.tpl.html",
                        controller: "HomeController",
                    })

                    .state("country", {
                        parent: "init",
                        url: "/country",
                        templateUrl: "templates/country.tpl.html",
                        controller: "CountryController",
                    })

                    .state("state", {
                        parent: "init",
                        url: "/state",
                        templateUrl: "templates/state.tpl.html",
                        controller: "StateController"
                    })

                    .state("district", {
                        parent: "init",
                        url: "/district",
                        templateUrl: "templates/district.tpl.html",
                        controller: "DistrictController"
                    })

                    .state("rules", {
                        parent: "init",
                        url: "/rules",
                        templateUrl: "templates/rules.tpl.html",
                        controller: "RulesController"
                    })

                    .state("building", {
                        parent: "init",
                        url: "/building",
                        templateUrl: "templates/building.tpl.html",
                        controller: "BuildingController"
                    })

                    .state("flat", {
                        parent: "init",
                        url: "/flat",
                        templateUrl: "templates/flat.tpl.html",
                        controller: "FlatController"
                    })

                    .state("tenant", {
                        parent: "init",
                        url: "/tenant",
                        templateUrl: "templates/tenant.tpl.html",
                        controller: "TenantController"
                    })

                    .state("category", {
                        parent: "init",
                        url: "/category",
                        templateUrl: "templates/category.tpl.html",
                        controller: "CategoryController"
                    })

                    .state("directory", {
                        parent: "init",
                        url: "/directory",
                        templateUrl: "templates/directory.tpl.html",
                        controller: "DirectoryController"
                    })

                    .state("noticeboard", {
                        parent: "init",
                        url: "/noticeboard",
                        templateUrl: "templates/noticeboard.tpl.html",
                        controller: "NoticeBoardController"
                    })

                    .state("enquiry", {
                        parent: "init",
                        url: "/enquiry",
                        templateUrl: "templates/enquiry.tpl.html",
                        controller: "EnquiryController"
                    })

                    .state("marketplace", {
                        parent: "init",
                        url: "/marketplace",
                        templateUrl: "templates/marketplace.tpl.html",
                        controller: "MarketPlaceController"
                    })

                    .state("facility", {
                        parent: "init",
                        url: "/facility",
                        templateUrl: "templates/facility.tpl.html",
                        controller: "FacilityController"
                    })

                    .state("facilitybooking", {
                        parent: "init",
                        url: "/facilitybooking",
                        templateUrl: "templates/facilitybooking.tpl.html",
                        controller: "FacilityBookingController"
                    })

                    .state("service", {
                        parent: "init",
                        url: "/service",
                        templateUrl: "templates/service.tpl.html",
                        controller: "ServiceController"
                    })

                    .state("servicebooking", {
                        parent: "init",
                        url: "/servicebooking",
                        templateUrl: "templates/servicebooking.tpl.html",
                        controller: "ServiceBookingController"
                    })

                    .state("event", {
                        parent: "init",
                        url: "/event",
                        templateUrl: "templates/event.tpl.html",
                        controller: "EventController"
                    })

                    .state("employee", {
                        parent: "init",
                        url: "/employee",
                        templateUrl: "templates/employee.tpl.html",
                        controller: "EmployeeController"
                    })

                    .state("parkingzone", {
                        parent: "init",
                        url: "/parkingzone",
                        templateUrl: "templates/parkingzone.tpl.html",
                        controller: "ParkingZoneController"
                    })

                    .state("parkingslot", {
                        parent: "init",
                        url: "/parkingslot",
                        templateUrl: "templates/parkingslot.tpl.html",
                        controller: "ParkingSlotController"
                    })

                    .state("parkingbooking", {
                        parent: "init",
                        url: "/parkingbooking",
                        templateUrl: "templates/parkingbooking.tpl.html",
                        controller: "ParkingBookingController"
                    })

                    .state("visitor", {
                        parent: "init",
                        url: "/visitor",
                        templateUrl: "templates/visitor.tpl.html",
                        controller: "VisitorController"
                    })



        }])

        .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('ainapp')
                .setStorageType('localStorage')
                .setNotify(true, true);
    }])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push("AuthInterceptor")
    }]);

})();
