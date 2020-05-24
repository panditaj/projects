angular.module("Parameter")
    .controller("NewParameterController", function NewParameterController($scope, $http, $location, currentWorkingApp) {

        /*
        This function captures the details entered in the input fields and makes a
        post web request for storing the new parameter details into the database and
        redirects the developer to the edit application page
         */
        $scope.registerParam = function () {
            $scope.newParam.appId = currentWorkingApp.get();
            $http.post("/registerParam", $scope.newParam)
                .success(function () {
                    $location.path("/editApp");
                });
        };

        /*
        This function redirects the developer to the edit application page
         */
        $scope.back = function () {
            $location.path('/editApp');
        };

        /*
        This web request is used the get the parameter types that are available
         */
        $http.get("/getParamTypes")
            .success(function (response) {
                $scope.parameters = [];
                for (var i = 0; i < response.length; i++) {
                    $scope.parameters.push(response[i].name);
                }
            });

        /*
        This web request is used to get all the parameter datatypes that are available
         */
        $http.get("/getParamDataTypes")
            .success(function (response) {
                $scope.dataTypes = [];
                for (var i = 0; i < response.length; i++) {
                    $scope.dataTypes.push(response[i].name);
                }
            });
    })
    .controller("ViewParameterController", function ViewParameterController($scope, $http, $location, currentWorkingParam, currentWorkingApp) {
        $scope.param = currentWorkingParam.get();
        $scope.name = $scope.param.name;
        $scope.label = $scope.param.label;
        $scope.paramType = $scope.param.paramType;
        $scope.dataType = $scope.param.dataType;
        $scope.order = $scope.param.order;
        $scope.defaultValue = $scope.param.defaultValue;
        $scope.format = $scope.param.format;
        $scope.userVisibility = $scope.param.userVisibility;
        var paramId = $scope.param._id;

        $scope.back = function () {
            $location.path("/editApp");
        };

        /*
        This function clears all the information entered by the developer in the
        input fields
         */
        $scope.clear = function () {
            $scope.name = "";
            $scope.label = "";
            $scope.paramType = "";
            $scope.dataType = "";
            $scope.order = "";
            $scope.defaultValue = "";
            $scope.format = "";
            $scope.userVisibility = "";
        };

        /*
        This function captures the new information entered by the developer for the
        parameter and makes a web request for saving the information into the database
         */
        $scope.updateParam = function () {
            var param = {
                name: $scope.name,
                label: $scope.label,
                paramType: $scope.paramType,
                dataType: $scope.dataType,
                order: $scope.order,
                defaultValue: $scope.defaultValue,
                format: $scope.format,
                userVisibility: $scope.userVisibility,
                appId: currentWorkingApp.get()
            };

            $http.post("/updateParam", {id: paramId, param: param})
                .success(function () {
                    $location.path("/editApp");
                });
        };

        /*
        This function is used to get all the parameter types that are available
         */
        $http.get("/getParamTypes")
            .success(function (response) {
                $scope.parameters = [];
                for (var i = 0; i < response.length; i++) {
                    $scope.parameters.push(response[i].name);
                }
            });

        /*
        This function is used to get all the parameter datatypes that are available
         */
        $http.get("/getParamDataTypes")
            .success(function (response) {
                $scope.dataTypes = [];
                for (var i = 0; i < response.length; i++) {
                    $scope.dataTypes.push(response[i].name);
                }
            });
    });