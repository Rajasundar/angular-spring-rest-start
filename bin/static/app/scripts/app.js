'use strict';

/**
 * @ngdoc overview
 * @name issApp
 * @description
 * # issApp
 *
 * Main module of the application.
 */
angular
    .module('issApp', [
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'toaster',

        'issApp.factories',
        'issApp.services',
        'issApp.directives',
        'issApp.controllers',

    ])
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
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .when('/others', {
                templateUrl: 'views/others.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .otherwise({
                redirectTo: '/'
            });
        /**
         * $http configuration
         *
         * Configuring $http requests to send cookies to cross domains
         */
        //$httpProvider.defaults.withCredentials = true;
        //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    })
