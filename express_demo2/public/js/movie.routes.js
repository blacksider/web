(function () {
    'use strict';
    angular.module('movie')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {
        $stateProvider
            .state('movie.main', {
                url: '/movie',
                controller: 'MainController',
                templateUrl: '/views/main.html',
                resolve: {
                    'movies': /* @ngInject */function (MovieService) {
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
    }

    /*moviePrepService.$inject = ['MovieService'];
    function moviePrepService(MovieService) {
        return MovieService.getAllMovies();
    }*/

})();