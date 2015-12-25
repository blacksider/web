(function (app) {
    'use strict';
    app.controller('SignUpController', function ($scope, $rootScope, $state, $stateParams, UserService, SessionStorage) {
        $scope.signUp = function () {
            var promise = UserService.signUpUser($scope.user);
            promise.then(function (data) {
                if (data.user && data.user.username != null) {
                    SessionStorage.save('login_user', data.user);
                }
                $state.go('movie.main');
            });
        };
    });
})(angular.module('app'));