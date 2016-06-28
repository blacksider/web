(function () {
    'use strict';
    angular.module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$rootScope', '$state', 'UserService', 'SessionStorage'];

    function LoginController($scope, $rootScope, $state, UserService, SessionStorage) {
        $scope.login = function () {
            var promise = UserService.login($scope.user);
            promise.then(function (data) {
                if (data.user && data.user.username !== null) {
                    SessionStorage.save('login_user', data.user);
                }
                $state.go('movie.main');
            });
        };
    }
})();