angular.module("Application")
    .controller("NewApplicationController", function NewApplicationController($scope, $http, $location) {

        /*
         This function redirects the developer back to the developer home page
         */
        $scope.back = function (path) {
            $location.path(path);
        };

        /*
         This function redirects the developer to a new service creation page
         */
        $scope.createService = function () {
            $location.path('/newService');
        };

        /*
         This function redirects the developer to a page where all the services are
         shown which can be edited by the developer
         */
        $scope.editService = function () {
            $location.path("/editService");
        };

        /*
         This function extracts all the data entered by the user in the input fields and
         sends a POST web request along with the information for storing into the database
         */
        $scope.createApplication = function () {
            $http.post("/registerApp", $scope.newApp)
                .success(function () {
                    $location.path("/devHome");
                });
        };

        /*
         This function automatically populates the URL in the url input field when the
         developer selects the API Service to be used in the application
         */
        $scope.updateUrl = function () {
            $scope.newApp.url = $scope.newApp.api.url;
        };

        /*
         This http web request gets all the web services which are available which the developer
         can use for creating the application
         */
        $http.get("/getAPIServices")
            .success(function (response) {
                $scope.apiServices = response;
            });
    })
    .controller("EditApplicationController", function EditApplicationController($scope, $http, $location, currentWorkingApp, $route, currentWorkingParam) {

        /*
        This function is used to get all the parameters related to the
        selected application for edit
         */
        $scope.currentApp = currentWorkingApp.get();
        $http.post("/getParams", {appId: $scope.currentApp})
            .success(function (response) {
                $scope.parameters = response;
            });

        /*
        This function is used to redirect the developer back to the home page
         */
        $scope.back = function () {
            $location.path("/devHome");
        };

        /*
        This function is used to redirect the developer to a add new
        parameter page
         */
        $scope.addParameter = function () {
            $location.path('/addParameter');
        };

        /*
        This function is used to delete the selected parameter
         */
        $scope.deleteParam = function (paramId) {
            $http.delete("/deleteParam/" + paramId)
                .success(function () {
                    $route.reload();
                });
        };

        /*
        This function gets the details of the parameter selected to be viewed and
        redirects the user to the actual view parameter page where the parameter can
        be edited
         */
        $scope.viewParam = function (paramId) {
            $http.get("/getParam/" + paramId)
                .success(function (response) {
                    currentWorkingParam.set(response);
                    $location.path("/viewParameter");
                });
        }
    });