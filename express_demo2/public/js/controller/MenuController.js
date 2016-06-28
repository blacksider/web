(function () {
    'use strict';
    angular.module('app')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'UserService', 'SessionStorage'];

    function MenuController($scope, $rootScope, $state, $stateParams, UserService, SessionStorage) {
        $scope.user = SessionStorage.get('login_user');

        $scope.logout = function () {
            var promise = UserService.logout();
            promise.then(function () {
                SessionStorage.delete('login_user');
                $scope.user = null;
            });
        };
    }
})();