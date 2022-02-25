'use strict';

/**
 * @ngdoc overview
 * @name reverApp
 * @description
 * # reverApp
 *
 * Main module of the application.
 */
angular
    .module('reverApp', [
        'ngAnimate',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',

        'reverApp.factories',
        'reverApp.services',
        'reverApp.directives',
        'reverApp.controllers',

    ])
    .run(function($rootScope,$location){
        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.showHeader = false;
            $rootScope.isUserLoggedIn = false;

            var path = $location.path();
            if(path !== '/login' && path !== '/'){
                $rootScope.showHeader = true;
            }else{
                $rootScope.showHeader = false;
            }
        });
    })
    .config(function ($routeProvider,$httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'dashboard',
                resolve : {
                    DashBoardData : function(ReverDataModelService){
                        return ReverDataModelService.getDashBoardData();
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });
        /**
         * $http configuration
         *
         * Configuring $http requests to send cookies to cross domains
         */
        $httpProvider.defaults.withCredentials = true;
    });

