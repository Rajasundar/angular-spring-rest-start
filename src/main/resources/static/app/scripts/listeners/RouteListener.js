
angular.module('issApp').run(['$rootScope','$window','Session','ContentLoaderService','$location',
    function ($rootScope,$window,Session,ContentLoaderService,$location) {
// Page Loading Overlay


        $rootScope.$on('$routeChangeStart', function(e, toState, toParams, fromState, fromParams) {
            ContentLoaderService.showContentLoader();
            $rootScope.showHeader = false;

            var path = $location.path();
            if(path !== '/login' && path !== '/'){
                $rootScope.showHeader = true;
            }else{
                $rootScope.showHeader = false;
            }

            if(Session.get('regus_token')){
                if($location.path() === '/' || $location.path() === '/login'){
                    $location.path('/home');
                }
            }
            else{
                Session.destroy();
            }
        });

        $rootScope.$on('$routeChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
            $($window).scrollTop(0);
            ContentLoaderService.hideContentLoader();
        });

    }]);
