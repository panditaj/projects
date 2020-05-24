angular.module("Register").
    controller("RegistrationController", function RegistrationController($scope, $http, $location) {

        /*
         This method is called when the user clicks the Cancel button on the
         registration page. The user gets redirected to the homepage
         */
        $scope.openMainPage = function (path) {
            $location.path(path);
        };

        /*
         This method is called when the user has submitted the registration form
         We send the details to the server to be stored in the database and
         redirect the user to the login page
         */
        $scope.registerUser = function (path) {
            $http.post("/registerPerson", $scope.register)
                .success(function () {
                    $location.path("/login");
                });
        };

        /*
         This method is called when the user wants to clear all the fields
         that have been entered on the registration page
         */
        $scope.clearRegistrationPage = function () {
            $scope.register.userType = "";
            $scope.register.name = "";
            $scope.register.email = "";
            $scope.register.username = "";
            $scope.register.password = "";
            $scope.register.gender = "";
        };

    });
