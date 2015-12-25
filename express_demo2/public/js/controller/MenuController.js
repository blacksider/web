(function (app) {
    'use strict';
    app.controller('MenuController', function ($scope, $rootScope, $state, $stateParams, UserService, SessionStorage) {
        $scope.user = SessionStorage.get('login_user');

        $scope.logout = function () {
            var promise = UserService.logout();
            promise.then(function (data) {
                console.log(data);
                SessionStorage.delete('login_user');
                $scope.user = null;
            });
        }
    });
})(angular.module('app'));