(function (app) {
    'use strict';
    app.controller('MainController', function ($scope, $rootScope, $state, SessionStorage, movies) {
        $rootScope.title = 'express_demo2';
        $scope.movies = movies;

        $scope.updateMovie = function (movie) {
            SessionStorage.delete('movie');
            $state.go('movie.update', {data: movie});
        };
    });
})(angular.module('app'));