(function (app) {
    'use strict';
    app.controller('MovieController', function ($scope, $rootScope, $state, $stateParams, MovieService, SessionStorage) {
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
    });
    app.controller('MovieAddController', function ($scope, $state, MovieService) {
        $scope.add = function () {
            var promise = MovieService.addMovie($scope.movie);
            promise.then(function () {
                alert('Add success!');
                $state.go('movie.main');
            });
        };
    });
})(angular.module('app'));