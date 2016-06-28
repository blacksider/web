(function () {
    'use strict';
    angular.module('app')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'UserService', 'SessionStorage'];

    function SignUpController($scope, $rootScope, $state, $stateParams, UserService, SessionStorage) {
        $scope.signUp = function () {
            var promise = UserService.signUpUser($scope.user);
            promise.then(function (data) {
                if (data.user && data.user.username !== null) {
                    SessionStorage.save('login_user', data.user);
                }
                $state.go('movie.main');
            });
        };
    }
})();