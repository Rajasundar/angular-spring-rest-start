'use strict';

/**
 * @ngdoc function
 * @name issApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the issApp
 */
angular.module('issApp.controllers')
    .controller('LoginCtrl',['$scope','$location','IssDataModelService', function ($scope,$location,ReverDataModelService) {
        $scope.user = {username: '',password:''};
        $scope.showMsg = false;

        $scope.loginDashBoard = function(){
            if($scope.user.username !== '' && $scope.user.password !== ''){
                $scope.showMsg = false;
                ReverDataModelService.authenticateUser($scope.user);
            }else{
            	alert("Username and Password cannot be empty");
                $scope.showMsg = true;
            }
        };
        
        $scope.redirectToOthers = function(){
       	 $location.path('/others');
       };
    }]);
