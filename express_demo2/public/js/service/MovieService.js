(function (app) {
    'use strict';
    angular.module('app')
        .factory('MovieService', MovieService);
    MovieService.$inject = ['$http', '$q'];
    function MovieService($http, $q) {
        return {
            getAllMovies: function () {
                var url = "http://" + window.location.hostname + ":3000/api/movie/all";
                var deferred = $q.defer();
                $http.get(url).then(
                    function success(respData) {
                        var movies = respData.data;
                        deferred.resolve(movies);
                    },
                    function error(reason) {
                        deferred.reject(reason);
                    }
                );
                return deferred.promise;
            },
            updateMovie: function (movie, id) {
                var url = "http://" + window.location.hostname + ":3000/api/movie/" + id;
                var deferred = $q.defer();
                $http.put(url, movie).then(
                    function success(respData) {
                        var movies = respData.data;
                        deferred.resolve(movies);
                    },
                    function error(reason) {
                        deferred.reject(reason);
                    }
                );
                return deferred.promise;
            },
            addMovie: function (movie) {
                var url = "http://" + window.location.hostname + ":3000/api/movie/";
                var deferred = $q.defer();
                $http.post(url, movie).then(
                    function success(respData) {
                        var movies = respData.data;
                        deferred.resolve(movies);
                    },
                    function error(reason) {
                        deferred.reject(reason);
                    }
                );
                return deferred.promise;
            },
            deleteMovie: function (id) {
                var url = "http://" + window.location.hostname + ":3000/api/movie/" + id;
                var deferred = $q.defer();
                $http.delete(url).then(
                    function success(respData) {
                        var movies = respData.data;
                        deferred.resolve(movies);
                    },
                    function error(reason) {
                        deferred.reject(reason);
                    }
                );
                return deferred.promise;
            }
        };
    }
})();