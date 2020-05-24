angular.module("TestUserView")
    .controller("ApplicationUserViewController", function ApplicationUserViewController($scope, $http, $location, currentWorkingApp, userViewResultJson) {

        var appId = currentWorkingApp.get();
        $scope.appInputs = {};

        $scope.back = function () {
            $location.path("/devHome");
        };

        /*
         This function is used to clear all the information entered in the input fields
         */
        $scope.clear = function () {
            for (var i = 0; i < $scope.inputParams.length; i++) {
                $scope.appInputs[$scope.inputParams[i].name] = "";
            }
        };

        /*
        This function is used to execute the application after entering all the
        required parameters
         */
        $scope.execute = function () {
            $http.post("/apiCall", {appId: appId, appInput: $scope.appInputs})
                .success(function (response) {
                    userViewResultJson.set(response);
                    $location.path("/testUserViewResult");
                });
        };

        /*
        This web request is used to get all the parameters that the developer wants the
        user to input while executing the web application
         */
        $http.get("/testApp/" + appId)
            .success(function (response) {
                $scope.inputParams = response;
            });
    })
    .controller("ApplicationUserViewResultController", function ApplicationUserViewResultController($location, $route, $scope, $http, currentWorkingApp, userViewResultJson, showClickedResultLevel, trackResultLevel) {

        /*
        This function is used to load the first level of the JSON object
         */
        var appId = currentWorkingApp.get();
        var jsonResult = userViewResultJson.get();
        trackResultLevel.init();

        var resultLevelInfo = "";
        var firstLevelData = [];

        $scope.loadFirstLevelData = function (response) {
            resultLevelInfo = response;
            var dataPath = [];
            for (var i = 0; i < resultLevelInfo.length; i++) {
                if (resultLevelInfo[i].levelNumber == 1) {
                    var temp = resultLevelInfo[i].dataPath;
                    dataPath = temp.split(".");
                }
            }

//        var trackData = jsonResult;
            var trackData = jsonResult;
            for (var i = 0; i < dataPath.length; i++) {
                if (Array.isArray(trackData)) {
                    if (i == dataPath.length - 1) {
                        var jsonValues = {};
                        for (var j = 0; j < trackData.length; j++) {
                            var json = {};
                            var reference = "";
                            angular.forEach(trackData[j], function (value, key) {
                                json[key] = value;
                                if (key == dataPath[i]) {
                                    reference = value;
                                    this.push(value);
                                }
                            }, firstLevelData);
                            jsonValues[reference] = json;
                        }
                        showClickedResultLevel.set(jsonValues);
                        trackResultLevel.set("1");
                        console.log(resultLevelInfo[0]);
                        var levelKVPair = {};
                        for (var z = 0; z < firstLevelData.length; z++) {
                            if (!levelKVPair.hasOwnProperty(firstLevelData[z])) {
                                levelKVPair[firstLevelData[z]] = resultLevelInfo[0].levelName + ": " + firstLevelData[z];
                            }
                        }
//                    $scope.levelData = firstLevelData;
                        $scope.levelData1 = levelKVPair;
                    }
                }
                else {
//                trackData = jsonResult[dataPath[i]];
                    if (trackData[dataPath[i]]) {
                        trackData = trackData[dataPath[i]];
                    }
                    else {
                        trackData = trackData[dataPath[i]];
                        i--;
                    }
                }
            }
        };

        /*
        This function is used to load the next JSON level
         */
        $scope.loadNextLevel = function (id) {
            var jsonResult = showClickedResultLevel.get();
            var nextLevel = trackResultLevel.getLength() + 1;
            var lastLevelClickedKey = trackResultLevel.get();

            var dataPath = [];
            var tempDataPath = [];
            for (var i = 0; i < resultLevelInfo.length; i++) {
                if (resultLevelInfo[i].levelNumber == lastLevelClickedKey) {
                    tempDataPath = resultLevelInfo[i].dataPath.split(".");
                }
                if (resultLevelInfo[i].levelNumber == nextLevel) {
                    dataPath = resultLevelInfo[i].dataPath.split(".");
                }
            }
            var relativeDataPath = [];
            for (var j = 0; j < dataPath.length; j++) {
                if (dataPath[j] != tempDataPath[j]) {
                    relativeDataPath.push(dataPath[j]);
                }
            }
            var tempJsonResult = jsonResult[id];
            var levelData = [];
            for (var k = 0; k < relativeDataPath.length; k++) {
                if (Array.isArray(tempJsonResult)) {
                    if (k == relativeDataPath.length - 1) {
                        var jsonValues = {};
                        for (var l = 0; l < tempJsonResult.length; l++) {
                            var json = {};
                            var reference = "";
                            angular.forEach(tempJsonResult[l], function (value, key) {
                                json[key] = value;
                                if (key == relativeDataPath[k]) {
                                    reference = value;
                                    this.push(value);
                                }
                            }, levelData);
                            jsonValues[reference] = json;
                        }
                        showClickedResultLevel.set(jsonValues);
                        trackResultLevel.set(nextLevel);
                        console.log(resultLevelInfo[nextLevel - 1].levelName);
                        var levelKVPair = {};
                        for (var z = 0; z < levelData.length; z++) {
                            if (!levelKVPair.hasOwnProperty(levelData[z])) {
                                levelKVPair[levelData[z]] = resultLevelInfo[nextLevel - 1].levelName + ": " + levelData[z];
                            }
                        }
//                    $scope.levelData = levelData;
                        $scope.levelData1 = levelKVPair;
                    }
                }
                else {
                    if (k == relativeDataPath.length - 1) {
                        angular.forEach(jsonResult[id], function (value, key) {
                            if (key == relativeDataPath[k]) {
                                this.push(value);
                            }
                        }, levelData);

                        showClickedResultLevel.set(jsonValues);
                        trackResultLevel.set(nextLevel);
                        var levelKVPair = {};
                        for (var z = 0; z < levelData.length; z++) {
                            if (!levelKVPair.hasOwnProperty(levelData[z])) {
                                levelKVPair[levelData[z]] = resultLevelInfo[nextLevel - 1].levelName + ": " + levelData[z];
                            }
                        }
//                    $scope.levelData = levelData;
                        $scope.levelData1 = levelKVPair;
                    }
                    angular.forEach(jsonResult[id], function (value, key) {
                        if (key == relativeDataPath[k]) {
                            tempJsonResult = value;
                        }
                    });
                }
            }

        };

        /*
        This function is used to load the previous level of the JSON view
         */
        $scope.loadPreviousLevelData = function () {
            $route.reload();
        };

        /*
        This function redirects the developer to the page to retesting by entering the
        parameters defined by the developer
         */
        $scope.reTest = function () {
            $location.path("/testAppUserView");
        };

        /*
        This function redirects the developer back to the home page
         */
        $scope.showHome = function () {
            $location.path("/devHome");
        };

        /*
        This function gets all the result levels that the developer has defined while
        configuring the application
         */
        $http.get("/getResultLevels/" + appId)
            .success($scope.loadFirstLevelData);
    });