/**
 * Created with JetBrains WebStorm.
 * User: engage
 * Date: 8/10/16
 * Time: 1:01 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('issApp.factories').factory('ToasterService',['toaster',function(toaster){

    var defaultConfig = {
        type: 'info',
        title: '',
        body: '',
        hideDuration: "1000",
        timeOut: "1000",
        showCloseButton: true
    };
    return {
        showInfoMessage:function(title,message){
            var config = angular.copy(defaultConfig);
            config['title'] = title;
            config['body'] = message;
            config['type'] = 'info';
            toaster.pop(config);
        },
        showSuccessMessage:function(title,message){
            var config = angular.copy(defaultConfig);
            config['title'] = title;
            config['body'] = message;
            config['type'] = 'success';
            toaster.pop(config);
        },
        showErrorMessage:function(title,message){
            var config = angular.copy(defaultConfig);
            config['title'] = title;
            config['body'] = message;
            config['type'] = 'error';
            toaster.pop(config);
        }
    };
}]);
