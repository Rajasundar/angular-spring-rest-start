/**
 * Created by engage on 29-Jul-16.
 */
angular.module('issApp.controllers')
  .controller('MainCtrl', function ($scope,Session) {
        $scope.logout = function(){
            Session.destroy();
        };
        
        $scope.redirectToOthers = function(){
        	 $location.path('/others');
        };
  });
