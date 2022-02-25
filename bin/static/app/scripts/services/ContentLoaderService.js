

angular.module('issApp.factories').service('ContentLoaderService', ['$rootScope', function ($rootScope) {
    $rootScope.showContentLoader = false;


    return{
        showContentLoader: function () {
            $rootScope.showContentLoader = true;
        },
        hideContentLoader: function () {
            $rootScope.showContentLoader = false;
        }
    }
}]);