
angular.module('issApp.factories').factory('Session',['$window','$cookies','$location', function($window,$cookies,$location){

    return {
        put : function (key, value) {
            $cookies.put(key, value,{ path: '/' });
        },
        get : function (key) {
            return $cookies.get(key);
        },
        update : function(key,val){
            $cookies.remove(key,{ path: '/' });
            this.put(key,val);
        },

        destroy : function () {
            var path = $location.path();
            console.log(path);
            localStorage.clear();
            angular.forEach($cookies.getAll(), function(value, key) {
                $cookies.remove(key,{ path: '/' });
            });
            $location.path('/login');
/*
            if(path.indexOf('/upload') > -1 || path.indexOf('/dashboard') > -1){
             $window.location.href='../';
             }
             else{
             $window.location.href='/';
             }*/
        }
    };
}]);

