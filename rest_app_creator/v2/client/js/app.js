angular.module("Home", []);
angular.module("Login", []);
angular.module("Register", []);
angular.module("Application", []);
angular.module("Service", []);
angular.module("DeveloperHome", []);
angular.module("Parameter", []);
angular.module("TestUserView", []);
angular.module("UserView", []);
angular.module("ConfigureApplication", []);

var app = angular.module("RestApplicationService", [
    "ngRoute",
    "ngSanitize",
    "Home",
    "Login",
    "Register",
    "Application",
    "Service",
    "DeveloperHome",
    "Parameter",
    "TestUserView",
    "UserView",
    "ConfigureApplication"
]);

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
    $provide.factory("currentWorkingResultLevel", function () {
        var currentResultLevel;

        function set(data) {
            currentResultLevel = data;
        }

        function get() {
            return currentResultLevel;
        }

        return{
            set: set,
            get: get
        }
    });
    $provide.factory("showClickedResultLevel", function () {
        var result = "";

        function set(data) {
            result = data;
        }

        function get() {
            return result;
        }

        return{
            set: set,
            get: get
        }
    });
    $provide.factory("currentLevelDataPath", function () {
        var path = [];

        function init() {
            path = [];
        }

        function set(data) {
            path.push(data);
        }

        function get() {
            return path[path.length - 1];
        }

        function getLength() {
            return path.length;
        }

        function getFullPath() {
            var pathStr = "";
            for (var i = 0; i < path.length; i++) {
                pathStr += path[i] + ".";
            }
            return pathStr.substring(0, pathStr.length - 1);
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
    $provide.factory("appResultForLevels", function () {
        var appResult = [];

        function init() {
            appResult = [];
        }

        function set(data) {
            appResult.push(data);
        }

        function get() {
            return appResult[appResult.length - 1];
        }

        function getIndex(index) {
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

        function init() {
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
    $provide.factory("trackResultLevel", function () {
        var resultLevel = [];

        function init() {
            resultLevel = [];
        }

        function set(level) {
            resultLevel.push(level);
        }

        function get() {
            return resultLevel[resultLevel.length - 1];
        }

        function removeLast() {
            resultLevel.splice(resultLevel.length - 1, 1);
        }

        function getLength() {
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
    $provide.factory("currentConfigureElement", function () {
        var currentElement = [];

        function set(element) {
            currentElement.push(element);
        }

        function get() {
            return currentElement[0];
        }

        return{
            set: set,
            get: get
        }
    });
    $provide.factory("userViewResultJson", function () {
        var jsonResult = "";

        function set(data) {
            jsonResult = data;
        }

        function get() {
            return jsonResult;
        }

        return{
            set: set,
            get: get
        }
    });
    $provide.factory("resultEditLevelId", function () {
        var levelId = "";

        function set(id) {
            levelId = id;
        }

        function get() {
            return levelId;
        }

        return {
            set: set,
            get: get
        }
    });
    $provide.factory("serviceIdHolder", function () {
        var serviceId;

        function set(id) {
            serviceId = id;
        }

        function get() {
            return serviceId;
        }

        return{
            set: set,
            get: get
        }
    });
});
