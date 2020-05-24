angular.module("UserView")
    .controller("UserHomeController", function UserHomeController($scope, $location, $http, $route, currentWorkingApp) {

        $scope.executeUserApplication = function (id) {
            currentWorkingApp.set(id);
            $location.path("/userViewApp");
        };

        $scope.deleteUserApplication = function (id) {
            $http.delete("/deleteUserApp/" + id)
                .success(function () {
                    $route.reload();
                });
        };

        $scope.addApplication = function () {
            $location.path("/userAddApp");
        };

        $scope.logoutUser = function () {
            $http.get("/logout")
                .success(function (response) {
                    $location.path(response.goTo);

                });
        };

        $http.get("/userAppList")
            .success(function (response) {
                $scope.applications = response;
            });
    })
    .controller("UserAddApplicationController", function UserAddApplicationController($scope, $location, $http) {

        $scope.addAppToUserAccount = function (id) {
            $http.post("/addAppToUser", {id: id})
                .success(function () {
                    $location.path("/userHome");
                });
        };

        $http.get("/searchApp")
            .success(function (response) {
                console.log(response);
                $scope.appList = response;
            });

        $scope.back = function () {
            $location.path("/userHome");
        };

        $scope.searchText = "";
        $scope.searchApp = function () {
            $http.get("/searchApp")
                .success(function (response) {
                    $scope.appList = [];
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].name.toLowerCase().search($scope.searchText.toLowerCase()) >= 0) {
                            console.log("true");
                            $scope.appList.push(response[i]);
                        }
                    }

                    console.log($scope.appList);
                });
        }
    })
    .controller("UserViewApplicationController", function UserViewApplicationController($scope, $location, currentWorkingApp, $http, userViewResultJson) {

        var appId = currentWorkingApp.get();
        $scope.appInputs = {};

        $scope.back = function () {
            $location.path("/userHome");
        };

        $scope.clear = function () {
            for (var i = 0; i < $scope.inputParams.length; i++) {
                $scope.appInputs[$scope.inputParams[i].name] = "";
            }
        };

        $scope.execute = function () {
            $http.post("/apiCall", {appId: appId, appInput: $scope.appInputs})
                .success(function (response) {
                    userViewResultJson.set(response);
                    $location.path("/userViewAppResult");
                });
        };

        $http.get("/testApp/" + appId)
            .success(function (response) {
                $scope.inputParams = response;
            });

    })
    .controller("UserViewApplicationResultController", function UserViewApplicationResultController($route, $scope, $location, $http, showClickedResultLevel, currentWorkingApp, userViewResultJson, trackResultLevel) {
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
                        var levelKVPair = {};
                        for (var z = 0; z < firstLevelData.length; z++) {
                            if (!levelKVPair.hasOwnProperty(firstLevelData[z])) {
                                levelKVPair[firstLevelData[z]] = resultLevelInfo[0].levelName + ": " + firstLevelData[z];
                            }
                        }
//                    $scope.levelData = firstLevelData;
                        $scope.levelData = levelKVPair;
                    }
                }
                else {
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
                        var levelKVPair = {};
                        for (var z = 0; z < levelData.length; z++) {
                            if (!levelKVPair.hasOwnProperty(levelData[z])) {
                                levelKVPair[levelData[z]] = resultLevelInfo[nextLevel - 1].levelName + ": " + levelData[z];
                            }
                        }
//                    $scope.levelData = levelData;
                        $scope.levelData = levelKVPair;
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
                        $scope.levelData = levelKVPair;
                    }
                    angular.forEach(jsonResult[id], function (value, key) {
                        if (key == relativeDataPath[k]) {
                            tempJsonResult = value;
                        }
                    });
                }
            }

        };

        $scope.loadPreviousLevelData = function () {
            $route.reload();
        };

        $scope.reTest = function () {
            $location.path("/userViewApp");
        };

        $scope.showHome = function () {
            $location.path("/userHome");
        };

        $http.get("/getResultLevels/" + appId)
            .success($scope.loadFirstLevelData);

    });