(function (app) {
    'use strict';
    app.controller('LoginController', function ($scope, $rootScope, $state, UserService, SessionStorage) {
        $scope.login = function () {
            var promise = UserService.login($scope.user);
            promise.then(function (data) {
                if (data.user && data.user.username != null) {
                    SessionStorage.save('login_user', data.user);
                }
                $state.go('movie.main');
            });
        }
    });
})(angular.module('app'));