angular.module("Service")
    .controller("NewServiceController", function NewServiceController($scope, $http, $location) {

        /*
         This function extracts all the data entered by the user in the
         input fields and sends a http post requests for storing the data into
         the database and redirects the user to the create application page
         */
        $scope.createNewService = function () {
            $http.post("/registerService", $scope.newService)
                .success(function () {
                    $location.path('/createApp');
                });
        };

        /*
         This function redirects the user to the developer home page
         */
        $scope.back = function (path) {
            $location.path(path);
        }
    })
    .controller("EditServiceController", function EditServiceController($scope, $http, $location, serviceIdHolder) {

        $scope.serviceList = "";

        /*
         This function gets all the api services available
         */
        $http.get("/getAPIServices")
            .success(function (response) {
                console.log(response);
                $scope.serviceList = response;
            });

        /*
         This service obtains the selected service to be modified and redirects
         user to the actual edit service page along with the captured information
         */
        $scope.editSelectedService = function (id) {
            serviceIdHolder.set(id);
            $location.path("/editSelectedService");
        }

        /*
         This function redirects the developer to the create application page
         */
        $scope.back = function () {
            $location.path("/createApp");
        }
    })
    .controller("EditSelectedServiceController", function EditSelectedServiceController($scope, $location, $http, serviceIdHolder) {

        /*
        This function gets the information of the selected service to be modified
        by the developer and displays it
         */
        var serviceId = serviceIdHolder.get();
        $http.get("/getService/" + serviceId)
            .success(function (response) {
                $scope.service = {
                    name: response.name,
                    url: response.url,
                    desc: response.desc,
                    keyLabel: response.keyLabel,
                    keyValue: response.keyValue
                }
            });

        /*
        This function captures the information entered by the developer in the input
        fields and sends a http post request along with the information for
        updating the entry into the database and redirects the developer to
        the edit service page
         */
        $scope.updateService = function () {
            $http.post("/updateService", {service: $scope.service, id: serviceId})
                .success(function () {
                    $location.path("/editService");
                });
        };

        /*
        This function redirects the developer to the edit service page
         */
        $scope.back = function () {
            $location.path("/editService");
        }

    });
