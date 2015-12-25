(function (app) {
    'use strict';
    app.controller('MainController', function ($scope, $rootScope, $state, SessionStorage, MovieService, movies) {
        $rootScope.title = 'express_demo2';
        $scope.movies = movies;

        $scope.updateMovie = function (movie) {
            SessionStorage.delete('movie');
            $state.go('movie.update', {data: movie});
        };

        $scope.deleteMovie = function (id) {
            var promise = MovieService.deleteMovie(id);
            promise.then(function (data) {
                console.log(data);
                var ate = MovieService.getAllMovies();
                ate.then(function (list) {
                    $scope.movies = list;
                });
            });
        }
    });
})(angular.module('app'));