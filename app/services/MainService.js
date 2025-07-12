angular.module("ainapp")
    .service('MainService', ['$q', '$window', "$http", "app.config",
        function ($q, $window, $http, config) {


            this.ChangePassword = function (data) {
                return $http.post(config.basePath + "ChangePassword", data);
            };

            //////////////////.Country .//////////////////

            this.AddCountry = function (data) {
                return $http.post(config.basePath + "AddCountry", data);
            };

            this.DeleteCountry = function (id) {
                return $http.get(config.basePath + "DeleteCountry/" + id);
            };

            this.CountryInDropdown = function (data) {
                return $http.get(config.basePath + "CountryInDropdown");
            }

            //////////////////.State .//////////////////

            this.AddState = function (data) {
                return $http.post(config.basePath + "AddState", data);
            };

            this.DeleteState = function (id) {
                return $http.get(config.basePath + "DeleteState/" + id);
            };

            this.StateInDropdown = function (data) {
                return $http.get(config.basePath + "StateInDropdown");
            }

            //////////////////. Category .//////////////////

            this.AddCategory = function (data) {
                return $http.post(config.basePath + "AddCategory", data);
            };

            this.DeleteCategory = function (id) {
                return $http.get(config.basePath + "DeleteCategory/" + id);
            };

            this.ListOfCategories = function (data) {
                return $http.get(config.basePath + "ListOfCategories");
            }

            //////////////////.District .//////////////////

            this.AddDistrict = function (data) {
                return $http.post(config.basePath + "AddDistrict", data);
            };

            this.DeleteDistrict = function (id) {
                return $http.get(config.basePath + "DeleteDistrict/" + id);
            };

            this.DistrictInDropdown = function (data) {
                return $http.get(config.basePath + "DistrictInDropdown");
            }

            //////////////////. Rules .//////////////////

            this.AddRule = function (data) {
                return $http.post(config.basePath + "AddRule", data);
            };

            this.DeleteRule = function (id) {
                return $http.get(config.basePath + "DeleteRule/" + id);
            };

            this.ListOfRules = function (data) {
                return $http.get(config.basePath + "ListOfRules");
            }

            //////////////////. Building .//////////////////

            this.AddBuilding = function (data) {
                return $http.post(config.basePath + "AddBuilding", data);
            };

            this.DeleteBuilding = function (id) {
                return $http.get(config.basePath + "DeleteBuilding/" + id);
            };

            this.BuildingInDropdown = function (data) {
                return $http.get(config.basePath + "BuildingInDropdown");
            }

            this.GetBuildingById = function (id) {
                return $http.get(config.basePath + "GetBuildingById/" + id);
            }

            //////////////////. Flats .//////////////////

            this.AddFlat = function (data) {
                return $http.post(config.basePath + "AddFlat", data);
            };

            this.DeleteFlat = function (id) {
                return $http.get(config.basePath + "DeleteFlat/" + id);
            };

            this.FlatInDropdown = function (data) {
                return $http.get(config.basePath + "FlatInDropdown");
            }

            this.EmptyFlatInDropdown = function (data) {
                return $http.get(config.basePath + "EmptyFlatInDropdown");
            }

            this.GetFlatById = function (id) {
                return $http.get(config.basePath + "GetFlatById/" + id);
            }


            //////////////////. Tenants .//////////////////

            this.AddTenant = function (data) {
                return $http.post(config.basePath + "AddTenant", data);
            };

            this.DeleteTenant = function (id) {
                return $http.get(config.basePath + "DeleteTenant/" + id);
            };

            this.TenantInDropdown = function (data) {
                return $http.get(config.basePath + "TenantInDropdown");
            };

            this.GetTenantById = function (id) {
                return $http.get(config.basePath + "GetTenantById/" + id);
            };

            //////////////////. Employees .//////////////////

            this.AddEmployee = function (data) {
                return $http.post(config.basePath + "AddEmployee", data);
            };

            this.DeleteEmployee = function (id) {
                return $http.get(config.basePath + "DeleteEmployee/" + id);
            };

            this.EmployeeInDropdown = function (data) {
                return $http.get(config.basePath + "EmployeeInDropdown");
            }

            this.GetEmployeeById = function (id) {
                return $http.get(config.basePath + "GetEmployeeById/" + id);
            }



            //////////////////. Directory .//////////////////

            this.AddDirectory = function (data) {
                return $http.post(config.basePath + "AddDirectory", data);
            };

            this.DeleteDirectory = function (id) {
                return $http.get(config.basePath + "DeleteDirectory/" + id);
            };

            this.DirectoryInDropdown = function (data) {
                return $http.get(config.basePath + "DirectoryInDropdown");
            }

            //////////////////. Notice Board .//////////////////

            this.AddNoticeBoard = function (data) {
                return $http.post(config.basePath + "AddNoticeBoard", data);
            };

            this.DeleteNoticeBoard = function (id) {
                return $http.get(config.basePath + "DeleteNoticeBoard/" + id);
            };

            this.ListOfNotices = function (data) {
                return $http.get(config.basePath + "ListOfNotices");
            }

            //////////////////. Events .//////////////////

            this.AddEvents = function (data) {
                return $http.post(config.basePath + "AddEvents", data);
            };

            this.DeleteEvents = function (id) {
                return $http.get(config.basePath + "DeleteEvents/" + id);
            };

            this.ListOfEvents = function (data) {
                return $http.get(config.basePath + "ListOfEvents");
            }

            this.GetEventById = function (id) {
                return $http.get(config.basePath + "GetEventById/" + id);
            }


            //////////////////. Facility .//////////////////

            this.AddFacility = function (data) {
                return $http.post(config.basePath + "AddFacility", data);
            };

            this.DeleteFacility = function (id) {
                return $http.get(config.basePath + "DeleteFacility/" + id);
            };

            this.ListOfFacility = function (data) {
                return $http.get(config.basePath + "ListOfFacility");
            }

            this.GetFacilityById = function (id) {
                return $http.get(config.basePath + "GetFacilityById/" + id);
            };

            this.FacilityBookingInDropdown = function (data) {
                return $http.get(config.basePath + "FacilityBookingInDropdown");
            };


            //////////////////. Services .//////////////////

            this.AddService = function (data) {
                return $http.post(config.basePath + "AddService", data);
            };

            this.DeleteService = function (id) {
                return $http.get(config.basePath + "DeleteService/" + id);
            };

            this.ListOfServices = function (data) {
                return $http.get(config.basePath + "ListOfServices");
            };

            this.GetServiceById = function (id) {
                return $http.get(config.basePath + "GetServiceById/" + id);
            };

            this.ServiceBookingInDropdown = function (data) {
                return $http.get(config.basePath + "ServiceBookingInDropdown");
            };


            //////////////////. Parking Zone .//////////////////

            this.AddParkingZone = function (data) {
                return $http.post(config.basePath + "AddParkingZone", data);
            };

            this.DeleteParkingZone = function (id) {
                return $http.get(config.basePath + "DeleteParkingZone/" + id);
            };

            this.ParkingZoneInDropdown = function (data) {
                return $http.get(config.basePath + "ParkingZoneInDropdown");
            }

            //////////////////. Parking Slot .//////////////////

            this.AddParkingSlot = function (data) {
                return $http.post(config.basePath + "AddParkingSlot", data);
            };

            this.DeleteParkingSlot = function (id) {
                return $http.get(config.basePath + "DeleteParkingSlot/" + id);
            };

            this.ParkingSlotInDropdown = function (data) {
                return $http.get(config.basePath + "ParkingSlotInDropdown");
            }

            //////////////////. Parking Booking .//////////////////


            this.ParkingBookingInDropdown = function (data) {
                return $http.get(config.basePath + "ParkingBookingInDropdown");
            }


            //////////////////. Enquiry .//////////////////


            this.EnquiryInDropdown = function (data) {
                return $http.get(config.basePath + "EnquiryInDropdown");
            }

            //////////////////. Market Place .//////////////////

            this.AddMarketPlace = function (data) {
                return $http.post(config.basePath + "AddMarketPlace", data);
            };

            this.ProductsInMarket = function (data) {
                return $http.get(config.basePath + "ProductsInMarket");
            };

            this.GetProductById = function (id) {
                return $http.get(config.basePath + "GetProductById/" + id);
            };

            //////////////////. Visitors .//////////////////

            this.AddVisitors = function (data) {
                return $http.post(config.basePath + "AddVisitors", data);
            };

            this.VisitorsInDropdown = function (data) {
                return $http.get(config.basePath + "VisitorsInDropdown");
            };

            this.GetVisitorById = function (id) {
                return $http.get(config.basePath + "GetVisitorById/" + id);
            };









        }]);
