(function () {
    'use strict';
    angular.module('app')
        .config(configure);

    configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function configure($stateProvider, $urlRouterProvider, $locationProvider) {
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
            });
    }
})();