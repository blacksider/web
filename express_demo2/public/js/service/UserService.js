(function (app) {
    'use strict';
    app.factory('UserService', function ($http, $q) {
        return {
            login: function (user) {
                var url = "http://localhost:3000/api/user/login";
                var deferred = $q.defer();
                $http.post(url, user).then(
                    function success(respData) {
                        var user = respData.data;
                        deferred.resolve(user);
                    },
                    function error(reason) {
                        deferred.reject(reason);
                    }
                );
                return deferred.promise;
            },
            signUpUser: function (user) {
                var url = "http://localhost:3000/api/user/";
                var deferred = $q.defer();
                $http.post(url, user).then(
                    function success(respData) {
                        var user = respData.data;
                        deferred.resolve(user);
                    },
                    function error(reason) {
                        deferred.reject(reason);
                    }
                );
                return deferred.promise;
            },
            logout: function () {
                var url = "http://localhost:3000/api/user/logout";
                var deferred = $q.defer();
                $http.delete(url).then(
                    function success(respData) {
                        var user = respData.data;
                        deferred.resolve(user);
                    },
                    function error(reason) {
                        deferred.reject(reason);
                    }
                );
                return deferred.promise;
            }
        }
    });
})(angular.module('app'));