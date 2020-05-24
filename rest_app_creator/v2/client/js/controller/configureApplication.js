angular.module("ConfigureApplication")
    .controller("TestApplicationController", function TestApplicationController($scope, $http, $location, currentWorkingApp, testAppResult, appResultForLevels) {
        var appId = currentWorkingApp.get();
        appResultForLevels.init();
        $scope.appInputs = {};

        $http.get("/testApp/" + appId)
            .success(function (response) {
                $scope.inputParams = response;
            });

        /*
        This function is used to redirect the developer to home page
         */
        $scope.back = function () {
            $location.path("/devHome");
        };

        /*
        This function is used to send the parameters entered by the user of the application.
        An API call is generated and JSON is received as an output
         */
        $scope.run = function () {
            $http.post("/apiCall", {appId: appId, appInput: $scope.appInputs})
                .success(function (response) {
                    testAppResult.set(response);
                    appResultForLevels.set(response);
                    $location.path("/testAppResultOption");
                });
        };

    })
    .controller("TestApplicationResultOptionController", function TestApplicationResultOptionController($scope, $location) {
        /*
        This function is used to redirect the developer to the view result as a JSON
        page where the entire result is arranged as a list
         */
        $scope.viewJsonResult = function () {
            $location.path("/testAppResult");
        };

        /*
        This function is used to redirect the developer to the result configuration page
         */
        $scope.configureResult = function () {
            $location.path("/configureResult");
        };

        /*
        This function is used to redirect the developer back to the home page
         */
        $scope.back = function () {
            $location.path("/devHome");
        }

    })
    .controller("TestApplicationResultController", function TestApplicationResultController($scope, $http, $location, $route, testAppResult) {
        $scope.result = testAppResult.get();
        $scope.keys = [];

        angular.forEach($scope.result, function (value, key) {
            var k;
            if (typeof value == "object") {
                k = {
                    buttonName: key,
                    makeDisabled: false,
                    buttonValue: null
                }
            }
            else {
                k = {
                    buttonName: key,
                    makeDisabled: true,
                    buttonValue: value
                }
            }
            this.push(k);
        }, $scope.keys);

        /*
        This function is used to load more sub objects of a select JSON object
        from the list shown to the user
         */
        $scope.loadMore = function (id) {
            var temp = testAppResult.get();
            $scope.keys = [];
            angular.forEach(temp[id], function (value, key) {
                this.push(key);
            }, $scope.keys);
            testAppResult.set(temp[id]);
            $route.reload();
        };

        /*
        This function is used to redirect the user back to the developer home page
         */
        $scope.back = function () {
            var length = testAppResult.getLength();
            if (length == 1) {
                testAppResult.removeLast();
                $location.path("/devHome");
            }
            else {
                testAppResult.removeLast();
                $route.reload();
            }
        };

        /*
        This function is used to redirect the developer to the page where
        again the service can be tested with new parameters
         */
        $scope.retest = function () {
            testAppResult.init();
            $location.path("/testApp");
        };

        /*
        This function is used to redirect the developer to the configure
        result page
         */
        $scope.configureResult = function () {
            $location.path("/configureResult");
        }

    })
    .controller("EditResultLevelController", function EditResultLevelController(resultEditLevelId, $scope, $location, $http) {
        /*
        This function is used to get level detail of a particular selected level by
        the developer and we assign them to the respective parameters
         */
        var levelId = resultEditLevelId.get();
        $http.get("/getLevelDetail/" + levelId)
            .success(function (response) {
                $scope.name = response.levelName;
                $scope.number = response.levelNumber;
                $scope.description = response.levelDescription;
            });

        /*
        This function is used to capture the information updated by the developer for a
        result level and generate a web request for saving the information in the database
         */
        $scope.updateResultLevel = function () {
            var levelDetails = {
                levelDescription: $scope.description,
                levelName: $scope.name,
                levelNumber: $scope.number
            };

            $http.post("/updateLevelDetail", {levelId: levelId, levelData: levelDetails})
                .success(function () {
                    $location.path("/configureResult");
                });
        }

    })
    .controller("ConfigureResultController", function ConfigureResultController(resultEditLevelId, $route, appResultForLevels, $scope, $location, $http, currentWorkingApp, currentWorkingResultLevel, currentLevelDataPath) {

        /*
        This function is used to redirect the developer to the home page
         */
        currentLevelDataPath.init();

        $scope.back = function () {
            $location.path("/devHome");
        };

        /*
        This function is used to redirect the developer to the page where a new result level
        can be added
         */
        $scope.addLevel = function () {
            $location.path("/addResultLevel");
        };

        /*
        This function is used to get all the predefined result level for the
        current working application as JSON
         */
        $http.get("/getAppResultLevel/" + currentWorkingApp.get())
            .success(function (response) {
                $scope.resultLevels = response;
            });

        /*
        This function is used to redirect the developer to the result configuration page
        after keeping a track of the select application and the already defined result levels
         */
        $scope.configureResultLevel = function (level) {
            var temp = appResultForLevels.getIndex(0);
            appResultForLevels.init();
            appResultForLevels.set(temp);
            currentWorkingResultLevel.set(level);
            $location.path("/selectResultLevel");
        };

        /*
        This function is used to delete a particular result level
         */
        $scope.deleteResultLevel = function (levelId) {
            $http.delete("/deleteResultLevel/" + levelId)
                .success(function () {
                    $route.reload();
                });
        };

        /*
        This function is used to edit the level number and the level name of the
        already defined result level
         */
        $scope.editLevelName = function (id) {
            resultEditLevelId.set(id);
            $location.path("/editResultLevelDetail");
        };

    })
    .controller("AddResultLevelController", function AddResultLevelController($scope, $location, $http, currentWorkingApp) {

        /*
        This function is used to clear the input fields with any data entered by the developer
         */
        $scope.clearForm = function () {
            $scope.level.number = "";
            $scope.level.name = "";
            $scope.level.description = "";
        };

        /*
        This function is used to redirect the developer back to the developer home page
         */
        $scope.cancelForm = function (url) {
            $location.path(url);
        };

        /*
        This function is used to capture all the data entered in the input fields by the developer
        and send a web request for storing the information in the database
         */
        $scope.addResultLevel = function () {
            $scope.level.appId = currentWorkingApp.get();
            $http.post("/saveAppResultLevel", $scope.level)
                .success(function () {
                    $location.path("/configureResult");
                });
        };
    })
    .controller("SelectResultLevelElementController", function SelectResultLevelElementController($scope, $location, appResultForLevels, $route, currentLevelDataPath, $http, currentWorkingResultLevel) {

        $scope.result = appResultForLevels.get();
        $scope.keys = [];

        angular.forEach($scope.result, function (value, key) {
            var k;
            if (typeof value == "object") {
                k = {
                    buttonName: key,
                    makeMoreOptionsDisabled: false,
                    makeSetDisabled: true
                }
            }
            else {
                k = {
                    buttonName: key,
                    makeMoreOptionsDisabled: true,
                    makeSetDisabled: false
                }
            }
            this.push(k);
        }, $scope.keys);

        $scope.showNextLevelData = function (id) {
            currentLevelDataPath.set(id);

            var temp = appResultForLevels.get();
            $scope.keys = [];
            if (Array.isArray(temp[id])) {
                var first = temp[id];
                if (typeof first[0] == "object") {
                    angular.forEach(first[0], function (value, key) {
                        this.push(key);
                    }, $scope.keys);
                    appResultForLevels.set(first[0]);
                }
                else {
                    $scope.keys = first;
                    var test = [];
                    var jsonElement = {};
                    for (var i = 0; i < first.length; i++) {
                        jsonElement[first[i]] = first[i];
                    }
                    test.push(jsonElement);
                    $scope.keys = first;
                    appResultForLevels.set(test);
                }
            }
            else {
                angular.forEach(temp[id], function (value, key) {
                    this.push(key);
                }, $scope.keys);
                appResultForLevels.set(temp[id]);
            }
            $route.reload();
        };

        $scope.back = function () {
            var length = appResultForLevels.getLength();
            if (length == 1) {
                $location.path("/configureResult");
            }
            else {
                appResultForLevels.removeLast();
                currentLevelDataPath.removeLast();
                $route.reload();
            }
        };

        $scope.confirmLevelData = function (param) {
            currentLevelDataPath.set(param);
            $http.post("/saveResultLevel", {resultDataMap: currentWorkingResultLevel.get(), dataPath: currentLevelDataPath.getFullPath()})
                .success(function () {
                    currentLevelDataPath.removeLast();
                    for (var i = appResultForLevels.length - 1; i > 0; i--) {
                        appResultForLevels.removeLast();
                    }
                    $location.path("/configureResult");
                });
        }

    });