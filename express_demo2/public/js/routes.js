(function (app) {
    'use strict';
    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/movie');
        $stateProvider
            .state('movie', {
                abstract: 'true',
                templateUrl: '/views/menu.html'
            })
            .state('movie.main', {
                url: '/movie',
                controller: 'MainController',
                templateUrl: '/views/main.html',
                resolve: {
                    'movies': function (MovieService) {
                        return MovieService.getAllMovies();
                    }
                }
            })
            .state('movie.update', {
                url: '/movie/update',
                controller: 'MovieController',
                templateUrl: '/views/update.html',
                params: {
                    data: null
                }
            });
    });
})(angular.module('app'));