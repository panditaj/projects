angular.module("Login").
    controller("LoginController", function LoginController($scope, $http, $location) {

        $scope.loginFailed = false;
        /*
         This method is called when the user submits the login information
         The user is authenticated with the database and if the user is valid
         we redirect them to the Developer homepage else they are asked to
         enter their login credentials again
         */
        $scope.validateLogin = function () {
            $http.post("/login", $scope.login)
                .success(function (path) {
                    if (path.goTo == "/devHome") {
                        $location.path(path.goTo);
                    }
                    else if (path.goTo == "/userHome") {
                        $location.path(path.goTo);
                    }
                    else {
                        $scope.login.inputUsername = "";
                        $scope.login.inputPassword = "";
                        $scope.loginFailed = true;
                        $location.path(path.goTo);
                    }
                });
        };

        /*
         This method is called when the user clicks the Cancel button
         User is redirected to the application homepage
         */
        $scope.openMainPage = function (path) {
            $location.path(path);
        }

    });