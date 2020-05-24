angular.module("DeveloperHome")
    .controller("DeveloperHomeController", function DeveloperHomeController($scope, $http, $location, $route, currentWorkingApp) {

        /*
        This function is used to publish the application on the appstore. The function
        takes the id of the application and sends a post web request
         */
        $scope.publishStatus = false;
        $scope.publishApp = function (id) {
            $http.post("/publishApp/" + id)
                .success(function (response) {
                    if (response.status) {
                        $scope.publishStatus = true;
                        $scope.message = "App published successfully";
                    }
                    else {
                        $scope.publishStatus = true;
                        $scope.message = "App already published";
                    }
                });
        };

        /*
        This function is used to unpublish the application from the appstore. The function takes
        the id of the application and sends a post web request to unpublish the application
         */
        $scope.unpublishApp = function (id) {
            $http.post("/unpublishApp/" + id)
                .success(function (response) {
                    if (response.status) {
                        $scope.publishStatus = true;
                        $scope.message = "App unpublished successfully";
                    }
                    else {
                        $scope.publishStatus = true;
                        $scope.message = "App already unpublished";
                    }
                });
        };

        /*
        This function redirects the developer to the test application page where the
        developer would be able to configure the result for the users
         */
        $scope.testApplication = function (id) {
            currentWorkingApp.set(id);
            $location.path("/testApp");
        };

        /*
        This function redirects the developer to the sample user view of the
        application where the developer can view in real time how the users would be
        able to view the application once downloaded
         */
        $scope.testApplicationUserView = function (id) {
            currentWorkingApp.set(id);
            $location.path("/testAppUserView");
        };

        /*
        This function is used to redirect the developer to the edit application page
        where the developer would be able to make changes to the application
         */
        $scope.editApplication = function (id) {
            currentWorkingApp.set(id);
            $location.path('/editApp');
        };

        /*
        This function is used to delete the application. It takes the id of the application
        and performs a delete operation
         */
        $scope.deleteApplication = function (id) {
            $http.delete("/deleteApp/" + id)
                .success(function (response) {
                    $route.reload();
                });
        };

        /*
        This function redirects the developer to the create new application form page
         */
        $scope.createApplication = function (path) {
            $location.path(path);
        };

        /*
         This method is called when the user clicks the logout button
         We tell the server to end the user session and redirect the
         user back to the login screen
         */
        $scope.redirectToLogin = function (response) {
            $location.path(response.goTo);
        };
        $scope.logoutUser = function (path) {
            $http.get("/logout")
                .success($scope.redirectToLogin);
        };

        /*
         We are checking the authentication of the user and requesting the
         server for all applications part of the user
         */
        $http.get("/getApplications")
            .success(function (response) {
                $scope.applications = response.applications;
                $location.path(response.goTo);
            });
    });