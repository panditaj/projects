/*
MainPage Controller handling the New User Registration and Login Pages
 */
angular.module("Home").
    controller("HomeController", function HomeController($scope, $http, $location) {

        /*
         This method is called when the user clicks on to register with the application
         User gets redirected to the registration page
         */
        $scope.openRegistrationPage = function (path) {
            $location.path(path);
        };

        /*
         This method is called when the user requests for the login screen
         The user gets redirected to the login page
         */
        $scope.openLoginPage = function (path) {
            $location.path(path);
        };

        /*
        This web request is used to load the database with the parameter
        data-types and parameter types which are used while adding new parameters
        when configuring an application
         */
        $http.post("/loadParameterOptions")
            .success(function (response) {
            });
    });
