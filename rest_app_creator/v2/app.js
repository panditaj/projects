angular.module("Home", []);
var app = angular.module("RestApplicationService",["ngRoute", "ngSanitize", "Home"]);
app.config(function ($routeProvider, $provide) {
    $routeProvider.
        when("/", {templateUrl: "/partials/main.html", controller: "HomeController"}).
        when("/login", {templateUrl: "/partials/login.html", controller: "LoginController"}).
        when('/register', {templateUrl: "/partials/register.html", controller: "RegistrationController"}).
        when("/devHome", {templateUrl: "/partials/devHome.html", controller: "DeveloperHomeController"}).
        when("/createApp", {templateUrl: "/partials/createNewApp.html", controller: "NewApplicationController"}).
        when("/editApp", {templateUrl: "/partials/editApp.html", controller: "EditApplicationController"}).
        when("/addParameter", {templateUrl: "/partials/addParameter.html", controller: "NewParameterController"}).
        when("/viewParameter", {templateUrl: "/partials/viewParameter.html", controller: "ViewParameterController"}).
        when("/testApp", {templateUrl: "/partials/testApp.html", controller: "TestApplicationController"}).
        when("/testAppResultOption", {templateUrl: "/partials/testAppResultOption.html", controller: "TestApplicationResultOptionController"}).
        when("/testAppResult", {templateUrl: "/partials/viewTestAppResult.html", controller: "TestApplicationResultController"}).
        when("/configureResult", {templateUrl: "/partials/configureResult.html", controller: "ConfigureResultController"}).
        when("/addResultLevel", {templateUrl: "/partials/addResultLevel.html", controller: "AddResultLevelController"}).
        when("/editResultLevelDetail", {templateUrl: "/partials/editResultLevelDetail.html", controller: "EditResultLevelController"}).
        when("/selectResultLevel", {templateUrl: "/partials/selectResultLevelElement.html", controller: "SelectResultLevelElementController"}).
        when("/testAppUserView", {templateUrl: "/partials/testAppUserView.html", controller: "ApplicationUserViewController"}).
        when("/testUserViewResult", {templateUrl: "/partials/appUserViewResult.html", controller: "ApplicationUserViewResultController"}).
        when("/newService", {templateUrl: "/partials/createNewService.html", controller: "NewServiceController"}).
        when("/editService", {templateUrl: "/partials/editService.html", controller: "EditServiceController"}).
        when("/editSelectedService", {templateUrl: "/partials/editSelectedService.html", controller: "EditSelectedServiceController"}).

        when("/userHome", {templateUrl: "/partials/userHome.html", controller: "UserHomeController"}).
        when("/userAddApp", {templateUrl: "/partials/userAddApp.html", controller: "UserAddApplicationController"}).
        when("/userViewApp", {templateUrl: "/partials/userViewApp.html", controller: "UserViewApplicationController"}).
        when("/userViewAppResult", {templateUrl: "/partials/userViewAppResult.html", controller: "UserViewApplicationResultController"}).

        otherwise({templateUrl: "/partials/login.html", controller: "LoginController"});

    $provide.factory("currentWorkingApp", function () {
        var currentAppId = {};

        function set(data) {
            currentAppId = data;
        }

        function get() {
            return currentAppId;
        }

        return{
            set: set,
            get: get
        }
    });
    $provide.factory("currentWorkingResultLevel", function(){
        var currentResultLevel;
        function set(data){
            currentResultLevel = data;
        }
        function get(){
            return currentResultLevel;
        }
        return{
            set:set,
            get:get
        }
    });
    $provide.factory("showClickedResultLevel", function(){
        var result = "";
        function set(data){
            result = data;
        }
        function get(){
            return result;
        }
        return{
            set: set,
            get: get
        }
    });
    $provide.factory("currentLevelDataPath", function(){
        var path = [];
        function init(){
            path = [];
        }
        function set(data){
            path.push(data);
        }
        function get(){
            return path[path.length - 1];
        }
        function getLength() {
            return path.length;
        }
        function getFullPath(){
            var pathStr = "";
            for(var i = 0; i < path.length; i++){
                pathStr += path[i] + ".";
            }
            return pathStr.substring(0, pathStr.length-1);
        }
        function removeLast() {
            path.splice(path.length - 1, 1);
        }
        return{
            init: init,
            set: set,
            get: get,
            getLength: getLength,
            removeLast: removeLast,
            getFullPath: getFullPath
        }
    });
    $provide.factory("currentWorkingParam", function () {
        var currentParam = [];

        function set(data) {
            currentParam = data;
        }

        function get() {
            return currentParam;
        }

        return{
            set: set,
            get: get
        }
    });
    $provide.factory("appResultForLevels", function(){
        var appResult = [];

        function init(){
            appResult = [];
        }
        function set(data) {
            appResult.push(data);
        }
        function get() {
            return appResult[appResult.length - 1];
        }
        function getIndex(index){
            return appResult[index];
        }
        function getLength() {
            return appResult.length;
        }

        function removeLast() {
            appResult.splice(appResult.length - 1, 1);
        }

        return{
            set: set,
            get: get,
            getLength: getLength,
            removeLast: removeLast,
            getIndex: getIndex,
            init: init
        }
    });
    $provide.factory("testAppResult", function () {
        var appResult = [];

        function init(){
            appResult = [];
        }

        function set(data) {
            appResult.push(data);
        }

        function get() {
            return appResult[appResult.length - 1];
        }

        function getLength() {
            return appResult.length;
        }

        function removeLast() {
            appResult.splice(appResult.length - 1, 1);
        }

        return{
            set: set,
            get: get,
            getLength: getLength,
            removeLast: removeLast,
            init: init
        }
    });
    $provide.factory("trackResultLevel", function(){
        var resultLevel = [];

        function init(){
            resultLevel = [];
        }
        function set(level){
            resultLevel.push(level);
        }
        function get(){
            return resultLevel[resultLevel.length-1];
        }
        function removeLast(){
            resultLevel.splice(resultLevel.length - 1, 1);
        }
        function getLength(){
            return resultLevel.length;
        }
        return{
            init: init,
            set: set,
            get: get,
            removeLast: removeLast,
            getLength: getLength
        }
    });
    $provide.factory("currentConfigureElement", function(){
        var currentElement = [];

        function set(element){
            currentElement.push(element);
        }
        function get(){
            return currentElement[0];
        }

        return{
            set: set,
            get: get
        }
    });
    $provide.factory("userViewResultJson", function(){
        var jsonResult = "";
        function set(data){
            jsonResult = data;
        }
        function get(){
            return jsonResult;
        }
        return{
            set: set,
            get: get
        }
    });
    $provide.factory("resultEditLevelId", function(){
        var levelId = "";
        function set(id){
            levelId = id;
        }
        function get(){
            return levelId;
        }
        return {
            set: set,
            get: get
        }
    });
    $provide.factory("serviceIdHolder", function(){
        var serviceId;
        function set(id){
            serviceId = id;
        }
        function get(){
            return serviceId;
        }
        return{
            set: set,
            get: get
        }
    });
});

function UserViewApplicationResultController($route, $scope, $location, $http, showClickedResultLevel, currentWorkingApp, userViewResultJson, trackResultLevel){
    var appId = currentWorkingApp.get();
    var jsonResult = userViewResultJson.get();
    trackResultLevel.init();

    var resultLevelInfo = "";
    var firstLevelData = [];

    $scope.loadFirstLevelData = function(response){
        resultLevelInfo = response;
        var dataPath = [];
        for(var i = 0; i < resultLevelInfo.length; i++){
            if(resultLevelInfo[i].levelNumber == 1){
                var temp = resultLevelInfo[i].dataPath;
                dataPath = temp.split(".");
            }
        }

        var trackData = jsonResult;
        for(var i = 0; i < dataPath.length; i++){
            if(Array.isArray(trackData)){
                if(i == dataPath.length-1){
                    var jsonValues = {};
                    for(var j = 0; j < trackData.length; j++){
                        var json = {};
                        var reference = "";
                        angular.forEach(trackData[j], function (value, key) {
                            json[key] = value;
                            if(key == dataPath[i]){
                                reference = value;
                                this.push(value);
                            }
                        }, firstLevelData);
                        jsonValues[reference] = json;
                    }
                    showClickedResultLevel.set(jsonValues);
                    trackResultLevel.set("1");
                    var levelKVPair = {};
                    for(var z = 0; z < firstLevelData.length; z++){
                        if(!levelKVPair.hasOwnProperty(firstLevelData[z])){
                            levelKVPair[firstLevelData[z]] = resultLevelInfo[0].levelName + ": " + firstLevelData[z];
                        }
                    }
//                    $scope.levelData = firstLevelData;
                    $scope.levelData = levelKVPair;
                }
            }
            else{
                if(trackData[dataPath[i]]){
                    trackData = trackData[dataPath[i]];
                }
                else{
                    trackData = trackData[dataPath[i]];
                    i--;
                }
            }
        }
    };

    $scope.loadNextLevel = function(id){
        var jsonResult = showClickedResultLevel.get();
        var nextLevel = trackResultLevel.getLength()+1;
        var lastLevelClickedKey = trackResultLevel.get();

        var dataPath = [];
        var tempDataPath = [];
        for(var i = 0; i < resultLevelInfo.length; i++){
            if(resultLevelInfo[i].levelNumber == lastLevelClickedKey){
                tempDataPath = resultLevelInfo[i].dataPath.split(".");
            }
            if(resultLevelInfo[i].levelNumber == nextLevel){
                dataPath = resultLevelInfo[i].dataPath.split(".");
            }
        }
        var relativeDataPath = [];
        for(var j = 0; j < dataPath.length; j++){
            if(dataPath[j] != tempDataPath[j]){
                relativeDataPath.push(dataPath[j]);
            }
        }
        var tempJsonResult = jsonResult[id];
        var levelData = [];
        for(var k = 0; k < relativeDataPath.length; k++){
            if(Array.isArray(tempJsonResult)){
                if(k == relativeDataPath.length-1){
                    var jsonValues = {};
                    for(var l = 0; l < tempJsonResult.length; l++){
                        var json = {};
                        var reference = "";
                        angular.forEach(tempJsonResult[l], function (value, key) {
                            json[key] = value;
                            if(key == relativeDataPath[k]){
                                reference = value;
                                this.push(value);
                            }
                        }, levelData);
                        jsonValues[reference] = json;
                    }
                    showClickedResultLevel.set(jsonValues);
                    trackResultLevel.set(nextLevel);
                    var levelKVPair = {};
                    for(var z = 0; z < levelData.length; z++){
                        if(!levelKVPair.hasOwnProperty(levelData[z])){
                            levelKVPair[levelData[z]] = resultLevelInfo[nextLevel-1].levelName + ": " + levelData[z];
                        }
                    }
//                    $scope.levelData = levelData;
                    $scope.levelData = levelKVPair;
                }
            }
            else{
                if(k == relativeDataPath.length-1){
                    angular.forEach(jsonResult[id], function(value, key){
                        if(key == relativeDataPath[k]){
                            this.push(value);
                        }
                    }, levelData);

                    showClickedResultLevel.set(jsonValues);
                    trackResultLevel.set(nextLevel);
                    var levelKVPair = {};
                    for(var z = 0; z < levelData.length; z++){
                        if(!levelKVPair.hasOwnProperty(levelData[z])){
                            levelKVPair[levelData[z]] = resultLevelInfo[nextLevel-1].levelName + ": " + levelData[z];
                        }
                    }
//                    $scope.levelData = levelData;
                    $scope.levelData = levelKVPair;
                }
                angular.forEach(jsonResult[id], function(value, key){
                    if(key == relativeDataPath[k]){
                        tempJsonResult = value;
                    }
                });
            }
        }

    };

    $scope.loadPreviousLevelData = function(){
        $route.reload();
    };

    $scope.reTest = function(){
        $location.path("/userViewApp");
    };

    $scope.showHome = function(){
        $location.path("/userHome");
    }

    $http.get("/getResultLevels/" + appId)
        .success($scope.loadFirstLevelData);

}

function UserViewApplicationController($scope, $location, currentWorkingApp, $http, userViewResultJson){

    var appId = currentWorkingApp.get();
    $scope.appInputs = {};

    $scope.back = function(){
        $location.path("/userHome");
    };

    $scope.clear = function(){
        for(var i = 0; i < $scope.inputParams.length; i++){
            $scope.appInputs[$scope.inputParams[i].name] = "";
        }
    };

    $scope.execute = function(){
        $http.post("/apiCall", {appId: appId, appInput: $scope.appInputs})
            .success(function(response){
                userViewResultJson.set(response);
                $location.path("/userViewAppResult");
            });
    };

    $http.get("/testApp/" + appId)
        .success(function(response){
            $scope.inputParams = response;
        });

}

function UserAddApplicationController($scope, $location, $http){

    $scope.addAppToUserAccount = function(id){
        $http.post("/addAppToUser", {id: id})
            .success(function(response){
                $location.path("/userHome");
            });
    };

    $http.get("/searchApp")
        .success(function(response){
            console.log(response);
            $scope.appList = response;
        });

    $scope.back = function(){
        $location.path("/userHome");
    }

    $scope.searchText = "";
    $scope.searchApp = function(){
        $http.get("/searchApp")
            .success(function(response){
                $scope.appList = [];
                for(var i = 0; i < response.length; i++){
                    if(response[i].name.toLowerCase().search($scope.searchText.toLowerCase()) >= 0){
                        console.log("true");
                        $scope.appList.push(response[i]);
                    }
                }

                console.log($scope.appList);
            });
    }
}

function UserHomeController($scope, $location, $http, $route, currentWorkingApp){

    $scope.executeUserApplication = function(id){
        currentWorkingApp.set(id);
        $location.path("/userViewApp");
    };

    $scope.deleteUserApplication = function(id){
        $http.delete("/deleteUserApp/"+id)
            .success(function(response){
                $route.reload();
            });
    };

    $scope.addApplication = function(){
        $location.path("/userAddApp");
    };

    $scope.logoutUser = function(){
        $http.get("/logout")
            .success(function(response){
            $location.path(response.goTo);

        });
    };

    $http.get("/userAppList")
        .success(function(response){
           $scope.applications = response;
        });
}

function ApplicationUserViewResultController($location, $route, $scope, $http, currentWorkingApp, userViewResultJson, showClickedResultLevel, trackResultLevel){

    var appId = currentWorkingApp.get();
    var jsonResult = userViewResultJson.get();
    trackResultLevel.init();

    var resultLevelInfo = "";
    var firstLevelData = [];

    $scope.loadFirstLevelData = function(response){
        resultLevelInfo = response;
        var dataPath = [];
        for(var i = 0; i < resultLevelInfo.length; i++){
            if(resultLevelInfo[i].levelNumber == 1){
                var temp = resultLevelInfo[i].dataPath;
                dataPath = temp.split(".");
            }
        }

//        var trackData = jsonResult;
        var trackData = jsonResult;
        for(var i = 0; i < dataPath.length; i++){
            if(Array.isArray(trackData)){
                if(i == dataPath.length-1){
                    var jsonValues = {};
                    for(var j = 0; j < trackData.length; j++){
                        var json = {};
                        var reference = "";
                        angular.forEach(trackData[j], function (value, key) {
                            json[key] = value;
                            if(key == dataPath[i]){
                                reference = value;
                                this.push(value);
                            }
                        }, firstLevelData);
                        jsonValues[reference] = json;
                    }
                    showClickedResultLevel.set(jsonValues);
                    trackResultLevel.set("1");
                    console.log(resultLevelInfo[0])
                    var levelKVPair = {};
                    for(var z = 0; z < firstLevelData.length; z++){
                        if(!levelKVPair.hasOwnProperty(firstLevelData[z])){
                            levelKVPair[firstLevelData[z]] = resultLevelInfo[0].levelName + ": " + firstLevelData[z];
                        }
                    }
//                    $scope.levelData = firstLevelData;
                    $scope.levelData1 = levelKVPair;
                }
            }
            else{
//                trackData = jsonResult[dataPath[i]];
                if(trackData[dataPath[i]]){
                    trackData = trackData[dataPath[i]];
                }
                else{
                    trackData = trackData[dataPath[i]];
                    i--;
                }
            }
        }
    };

    $scope.loadNextLevel = function(id){
        var jsonResult = showClickedResultLevel.get();
        var nextLevel = trackResultLevel.getLength()+1;
        var lastLevelClickedKey = trackResultLevel.get();

        var dataPath = [];
        var tempDataPath = [];
        for(var i = 0; i < resultLevelInfo.length; i++){
            if(resultLevelInfo[i].levelNumber == lastLevelClickedKey){
                tempDataPath = resultLevelInfo[i].dataPath.split(".");
            }
            if(resultLevelInfo[i].levelNumber == nextLevel){
                dataPath = resultLevelInfo[i].dataPath.split(".");
            }
        }
        var relativeDataPath = [];
        for(var j = 0; j < dataPath.length; j++){
            if(dataPath[j] != tempDataPath[j]){
                relativeDataPath.push(dataPath[j]);
            }
        }
        var tempJsonResult = jsonResult[id];
        var levelData = [];
        for(var k = 0; k < relativeDataPath.length; k++){
            if(Array.isArray(tempJsonResult)){
                if(k == relativeDataPath.length-1){
                    var jsonValues = {};
                    for(var l = 0; l < tempJsonResult.length; l++){
                        var json = {};
                        var reference = "";
                        angular.forEach(tempJsonResult[l], function (value, key) {
                            json[key] = value;
                            if(key == relativeDataPath[k]){
                                reference = value;
                                this.push(value);
                            }
                        }, levelData);
                        jsonValues[reference] = json;
                    }
                    showClickedResultLevel.set(jsonValues);
                    trackResultLevel.set(nextLevel);
                    console.log(resultLevelInfo[nextLevel-1].levelName)
                    var levelKVPair = {};
                    for(var z = 0; z < levelData.length; z++){
                        if(!levelKVPair.hasOwnProperty(levelData[z])){
                            levelKVPair[levelData[z]] = resultLevelInfo[nextLevel-1].levelName + ": " + levelData[z];
                        }
                    }
//                    $scope.levelData = levelData;
                    $scope.levelData1 = levelKVPair;
                }
            }
            else{
                if(k == relativeDataPath.length-1){
                    angular.forEach(jsonResult[id], function(value, key){
                        if(key == relativeDataPath[k]){
                            this.push(value);
                        }
                    }, levelData);

                    showClickedResultLevel.set(jsonValues);
                    trackResultLevel.set(nextLevel);
                    var levelKVPair = {};
                    for(var z = 0; z < levelData.length; z++){
                        if(!levelKVPair.hasOwnProperty(levelData[z])){
                            levelKVPair[levelData[z]] = resultLevelInfo[nextLevel-1].levelName + ": " + levelData[z];
                        }
                    }
//                    $scope.levelData = levelData;
                    $scope.levelData1 = levelKVPair;
                }
                angular.forEach(jsonResult[id], function(value, key){
                    if(key == relativeDataPath[k]){
                        tempJsonResult = value;
                    }
                });
            }
        }

    };

    $scope.loadPreviousLevelData = function(){
        $route.reload();
    };

    $scope.reTest = function(){
        $location.path("/testAppUserView");
    };

    $scope.showHome = function(){
        $location.path("/devHome");
    };

    $http.get("/getResultLevels/" + appId)
        .success($scope.loadFirstLevelData);
}

function ApplicationUserViewController($scope, $http, $location, currentWorkingApp, userViewResultJson){

    var appId = currentWorkingApp.get();
    $scope.appInputs = {};

    $scope.back = function(){
        $location.path("/devHome");
    };

    $scope.clear = function(){
        for(var i = 0; i < $scope.inputParams.length; i++){
            $scope.appInputs[$scope.inputParams[i].name] = "";
        }
    };

    $scope.execute = function(){
        $http.post("/apiCall", {appId: appId, appInput: $scope.appInputs})
            .success(function(response){
                userViewResultJson.set(response);
                $location.path("/testUserViewResult");
            });
    };

    $http.get("/testApp/" + appId)
        .success(function(response){
            $scope.inputParams = response;
        });
}

function SelectResultLevelElementController($scope, $location, appResultForLevels, $route, currentLevelDataPath, $http, currentWorkingResultLevel) {

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
            if(typeof first[0] == "object"){
                angular.forEach(first[0], function (value, key) {
                    this.push(key);
                }, $scope.keys);
                appResultForLevels.set(first[0]);
            }
            else{
                $scope.keys = first;
                var test = [];
                var jsonElement = {};
                for(var i = 0; i < first.length; i++){
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
    }

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
    }

    $scope.confirmLevelData = function (param) {
        currentLevelDataPath.set(param);
        $http.post("/saveResultLevel", {resultDataMap: currentWorkingResultLevel.get(), dataPath: currentLevelDataPath.getFullPath()})
            .success(function (response) {
                currentLevelDataPath.removeLast();
                for(var i = appResultForLevels.length-1; i > 0; i--){
                    appResultForLevels.removeLast();
                }
                $location.path("/configureResult");
            });
    }
}

function AddResultLevelController($scope, $location, $http, currentWorkingApp){

    $scope.clearForm = function(){
        $scope.level.number = "";
        $scope.level.name = "";
        $scope.level.description = "";
    };

    $scope.cancelForm = function(url){
        $location.path(url);
    };

    $scope.addResultLevel = function(){
        $scope.level.appId = currentWorkingApp.get();
        $http.post("/saveAppResultLevel", $scope.level)
            .success(function(response){
                $location.path("/configureResult");
            });
    };
}

function ConfigureResultController(resultEditLevelId, $route, appResultForLevels, $scope, $location, $http, currentWorkingApp, currentWorkingResultLevel, currentLevelDataPath) {

    currentLevelDataPath.init();

    $scope.back = function () {
        $location.path("/devHome");
    };

    $scope.addLevel = function () {
        $location.path("/addResultLevel");
    };

    $http.get("/getAppResultLevel/" + currentWorkingApp.get())
        .success(function (response) {
            $scope.resultLevels = response;
        });

    $scope.configureResultLevel = function (level) {
        var temp = appResultForLevels.getIndex(0);
        appResultForLevels.init();
        appResultForLevels.set(temp);
        currentWorkingResultLevel.set(level);
        $location.path("/selectResultLevel");
    };

    $scope.deleteResultLevel = function(levelId){
        $http.delete("/deleteResultLevel/" + levelId)
            .success(function(response){
                $route.reload();
            });
    };

    $scope.editLevelName = function(id){
        resultEditLevelId.set(id);
        $location.path("/editResultLevelDetail");
    };
}

function EditResultLevelController(resultEditLevelId, $scope, $location, $http){
    var levelId = resultEditLevelId.get();
    $http.get("/getLevelDetail/" + levelId)
        .success(function(response){
            $scope.name = response.levelName;
            $scope.number = response.levelNumber;
            $scope.description = response.levelDescription;
        });

    $scope.updateResultLevel = function(){
        var levelDetails = {
            levelDescription: $scope.description,
            levelName: $scope.name,
            levelNumber: $scope.number
        };

        $http.post("/updateLevelDetail", {levelId: levelId, levelData: levelDetails})
            .success(function(response){
                $location.path("/configureResult");
            });
    }
}

function TestApplicationResultController($scope, $http, $location, $route, testAppResult){
    $scope.result = testAppResult.get();
    $scope.keys = [];

    angular.forEach($scope.result, function(value, key){
        var k;
        if(typeof value == "object"){
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

    $scope.loadMore = function(id){
        var temp = testAppResult.get();
        $scope.keys = [];
        angular.forEach(temp[id], function (value, key) {
            this.push(key);
        }, $scope.keys);
        testAppResult.set(temp[id]);
        $route.reload();
    }

    $scope.back = function(){
        var length = testAppResult.getLength();
        if(length == 1){
            testAppResult.removeLast();
            $location.path("/devHome");
        }
        else{
            testAppResult.removeLast();
            $route.reload();
        }
    }

    $scope.retest = function(){
        testAppResult.init();
        $location.path("/testApp");
    };

    $scope.configureResult = function(){
        $location.path("/configureResult");
    }

}

function TestApplicationResultOptionController($scope, $location){
    $scope.viewJsonResult = function(){
        $location.path("/testAppResult");
    };

    $scope.configureResult = function(){
        $location.path("/configureResult");
    };

    $scope.back = function(){
        $location.path("/devHome");
    }
}

function TestApplicationController($scope, $http, $location, currentWorkingApp, testAppResult, appResultForLevels){
    var appId = currentWorkingApp.get();
    appResultForLevels.init();
    $scope.appInputs = {};

    $http.get("/testApp/" + appId)
        .success(function(response){
            $scope.inputParams = response;
        });

    $scope.back = function(){
        $location.path("/devHome");
    };

    $scope.run = function(){
        $http.post("/apiCall", {appId: appId, appInput: $scope.appInputs})
            .success(function(response){
                testAppResult.set(response);
                appResultForLevels.set(response);
                $location.path("/testAppResultOption");
            });
    };
}

function ViewParameterController($scope, $http, $location, currentWorkingParam, currentWorkingApp){
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

    $scope.back = function(){
        $location.path("/editApp");
    };

    $scope.clear = function(){
        $scope.name = "";
        $scope.label = "";
        $scope.paramType = "";
        $scope.dataType = "";
        $scope.order = "";
        $scope.defaultValue = "";
        $scope.format = "";
        $scope.userVisibility = "";
    };

    $scope.updateParam = function(){
        var param = {
            name: $scope.name,
            label: $scope.label,
            paramType: $scope.paramType,
            dataType: $scope.dataType,
            order: $scope.order,
            defaultValue:$scope.defaultValue,
            format: $scope.format,
            userVisibility: $scope.userVisibility,
            appId: currentWorkingApp.get()
        }
        $http.post("/updateParam", {id: paramId, param: param})
            .success(function(response){
               $location.path("/editApp");
            });
    }
}

function NewParameterController($scope, $http, $location, currentWorkingApp){

    $scope.registerParam = function(){
        $scope.newParam.appId = currentWorkingApp.get();
        $http.post("/registerParam", $scope.newParam)
            .success(function(response){
                $location.path("/editApp");
            });
    };

    $scope.back = function(){
        $location.path('/editApp');
    };

    $http.get("/getParamTypes")
        .success(function(response){
            $scope.parameters = [];
            for(var i = 0; i < response.length; i++){
                $scope.parameters.push(response[i].name);
            }
        });

    $http.get("/getParamDataTypes")
        .success(function(response){
            $scope.dataTypes = [];
            for(var i = 0; i < response.length; i++){
                $scope.dataTypes.push(response[i].name);
            }
        });
}

function EditApplicationController($scope, $http, $location, currentWorkingApp, $route, currentWorkingParam){

    $scope.currentApp = currentWorkingApp.get();
    $http.post("/getParams", {appId: $scope.currentApp})
        .success(function(response){
            $scope.parameters = response;
        });

    $scope.back = function(){
        $location.path("/devHome");
    };

    $scope.addParameter = function(){
        $location.path('/addParameter');
    };

    $scope.deleteParam = function(paramId){
        $http.delete("/deleteParam/" + paramId)
            .success(function(response){
                $route.reload();
            });
    };

    $scope.viewParam = function(paramId){
        $http.get("/getParam/" + paramId)
            .success(function(response){
                currentWorkingParam.set(response);
                $location.path("/viewParameter");
            });
    }
}


function EditSelectedServiceController($scope, $location, $http, serviceIdHolder){
    var serviceId = serviceIdHolder.get();
    $http.get("/getService/" + serviceId)
        .success(function(response){
            $scope.service = {
                name: response.name,
                url: response.url,
                desc: response.desc,
                keyLabel: response.keyLabel,
                keyValue: response.keyValue
            }
        });

    $scope.updateService = function(){
        $http.post("/updateService", {service: $scope.service, id: serviceId})
            .success(function(response){
                $location.path("/editService");
            });
    };

    $scope.back = function(){
        $location.path("/editService");
    }
}

function EditServiceController($scope, $http, $location, serviceIdHolder){

    $scope.serviceList = "";
    $http.get("/getAPIServices")
        .success(function(response){
            console.log(response);
            $scope.serviceList = response;
        });

    $scope.editSelectedService = function(id){
        serviceIdHolder.set(id);
        $location.path("/editSelectedService");
    }

    $scope.back = function(){
        $location.path("/createApp");
    }
}

function NewServiceController($scope, $http, $location){

    $scope.createNewService = function(){
        $http.post("/registerService", $scope.newService)
            .success(function(){
                $location.path('/createApp');
            });
    };

    $scope.back = function(path){
        $location.path(path);
    }
}

function NewApplicationController($scope, $http, $location){

    $scope.back = function(path){
        $location.path(path);
    }

    $scope.createService = function(){
        $location.path('/newService');
    };

    $scope.editService = function(){
        $location.path("/editService");
    };


    $scope.createApplication = function(){
        $http.post("/registerApp", $scope.newApp)
            .success(function(response){
                $location.path("/devHome");
            });
    };

    $scope.updateUrl = function(){
        $scope.newApp.url = $scope.newApp.api.url;
    };

    /*

     */
    $http.get("/getAPIServices")
        .success(function(response){
            $scope.apiServices = response;
        });
}

function DeveloperHomeController($scope, $http, $location, $route, currentWorkingApp, $window){

    $scope.publishStatus = false;
    $scope.publishApp = function(id){
        $http.post("/publishApp/" + id)
            .success(function(response){
                if(response.status){
                    $scope.publishStatus = true;
                    $scope.message = "App published successfully";
                }
                else{
                    $scope.publishStatus = true;
                    $scope.message = "App already published";
                }
            });
    };

    $scope.unpublishApp = function(id){
        $http.post("/unpublishApp/" + id)
            .success(function(response){
                if(response.status){
                    $scope.publishStatus = true;
                    $scope.message = "App unpublished successfully";
                }
                else{
                    $scope.publishStatus = true;
                    $scope.message = "App already unpublished";
                }
            });
    };

    $scope.testApplication = function(id){
        currentWorkingApp.set(id);
        $location.path("/testApp");
    };

    $scope.testApplicationUserView = function(id){
        currentWorkingApp.set(id);
        $location.path("/testAppUserView");
    };

    $scope.editApplication = function(id){
        currentWorkingApp.set(id);
        $location.path('/editApp');
    };

    $scope.deleteApplication = function(id){
        $http.delete("/deleteApp/" + id)
            .success(function(response){
                $route.reload();
            });
    };

    $scope.createApplication = function(path){
        $location.path(path);
    };

    /*
    This method is called when the user clicks the logout button
    We tell the server to end the user session and redirect the
    user back to the login screen
     */
    $scope.redirectToLogin = function(response){
        $location.path(response.goTo);
    };
    $scope.logoutUser = function(path){
        $http.get("/logout")
            .success($scope.redirectToLogin);
    };

    /*
    We are checking the authentication of the user and requesting the
    server for all applications part of the user
     */
    $http.get("/getApplications")
        .success(function(response){
            $scope.applications = response.applications;
            $location.path(response.goTo);
        });
}

function RegistrationController($scope, $http, $location){

    /*
     This method is called when the user clicks the Cancel button on the
     registration page. The user gets redirected to the homepage
     */
    $scope.openMainPage = function(path){
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
    $scope.clearRegistrationPage = function(){
        $scope.register.userType = "";
        $scope.register.name = "";
        $scope.register.email = "";
        $scope.register.username = "";
        $scope.register.password = "";
        $scope.register.gender = "";
    };

}

function LoginController($scope, $http, $location){

    $scope.loginFailed = false;
    /*
     This method is called when the user submits the login information
     The user is authenticated with the database and if the user is valid
     we redirect them to the Developer homepage else they are asked to
     enter their login credentials again
     */
    $scope.validateLogin = function() {
        $http.post("/login", $scope.login)
            .success(function(path){
                if(path.goTo == "/devHome"){
                    $location.path(path.goTo);
                }
                else if(path.goTo == "/userHome"){
                    $location.path(path.goTo);
                }
                else{
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
    $scope.openMainPage = function(path){
        $location.path(path);
    }
}

/*
MainPage Controller handling the New User and Login Page
 */
//function HomeController($scope,$location, $http){
//
///*
//    This method is called when the user clicks on to register with the application
//    User gets redirected to the registration page
//*/
//    $scope.openRegistrationPage = function(path){
//        $location.path(path);
//    };
//
//
///*
//    This method is called when the user requests for the login screen
//    The user gets redirected to the login page
//*/
//    $scope.openLoginPage = function(path){
//        $location.path(path);
//    };
//
//    $http.post("/loadParameterOptions")
//        .success(function(response){
//        });
//}

