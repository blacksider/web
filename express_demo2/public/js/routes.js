(function (app) {
    'use strict';
    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/movie');
        $stateProvider
            .state('movie', {
                abstract: 'true',
                templateUrl: '/views/menu.html',
                controller: 'MenuController'
            })
            .state('login', {
                url: '/user/login',
                controller: 'LoginController',
                templateUrl: '/views/login.html'
            })
            .state('signup', {
                url: '/user/signup',
                controller: 'SignUpController',
                templateUrl: '/views/signup.html'
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
            .state('movie.add', {
                url: '/movie/add',
                controller: 'MovieAddController',
                templateUrl: '/views/add.html'
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