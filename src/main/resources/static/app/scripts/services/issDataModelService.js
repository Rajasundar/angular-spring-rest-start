/**
 * Created with JetBrains WebStorm.
 * User: engage
 * Date: 8/5/16
 * Time: 8:56 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('issApp.factories').factory('IssDataModelService', ['IssServices','$rootScope','ToasterService','$location','IssDataModel','Session',
    function(ReverServices,$rootScope,ToasterService,$location,ReverDataModel,Session) {
        return {
            authenticateUser : function(user){
                return ReverServices.login(user).then(function(response){
                    if(response.status === 200){
                        Session.put('regus_token',response.data.result.token);
                        $rootScope.isUserLoggedIn = true;
                        $location.path('/home');
                        console.log("token",Session.get('regus_token'));
                    }
                },
                function(response) {
                    // failure callback,handle error here
                    // response.data.message will be "This is an error!"
                	alert("Invalid username and password");
                    
                }
                );
            },
        }
    }]);
