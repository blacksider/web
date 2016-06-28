(function () {
    'use strict';
    angular.module('movie')
        .controller('MovieController', MovieController);
    MovieController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'MovieService', 'SessionStorage'];

    function MovieController($scope, $rootScope, $state, $stateParams, MovieService, SessionStorage) {
        $scope.movie = $stateParams.data;
        if (!$scope.movie) {
            $scope.movie = SessionStorage.get('movie');
        } else {
            SessionStorage.save('movie', $scope.movie);
        }

        $scope.update = function () {
            var promise = MovieService.updateMovie($scope.movie, $scope.movie._id);
            promise.then(function (data) {
                alert('update success!');
                SessionStorage.delete('movie');
                $state.go('movie.main');
            });
        };
    }

    angular.module('movie')
        .controller('MovieAddController', MovieAddController);
    MovieAddController.$inject = ['$scope', '$state', 'MovieService'];

    function MovieAddController($scope, $state, MovieService) {
        $scope.add = function () {
            var promise = MovieService.addMovie($scope.movie);
            promise.then(function () {
                alert('Add success!');
                $state.go('movie.main');
            });
        };
    }
})();