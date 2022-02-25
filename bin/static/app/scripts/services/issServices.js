/**
 * Created with JetBrains WebStorm.
 * User: engage
 * Date: 8/5/16
 * Time: 8:49 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('issApp.factories').factory('IssServices', ['$http','Assets','Session',
    function ($http,Assets,Session) {
        return {
            loginURL : 'auth/sign-in',
            uploadDataURL : 'upload',
            dashboardDataURL : '',
            login : function(data){
                return $http({
                    method: 'POST',
                    data: data,
                    headers: {'Content-Type': 'application/json'},
                    url :Assets.apiurl+ this.loginURL
                });
            }

        }
    }]);