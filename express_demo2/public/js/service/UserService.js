(function () {
    'use strict';
    angular.module('app')
        .factory('UserService', UserService);
    UserService.$inject = ['$http', '$q'];
    function UserService($http, $q) {
        return {
            login: function (user) {
                var url = "http://" + window.location.hostname + ":3000/api/user/login";
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
                var url = "http://" + window.location.hostname + ":3000/api/user/";
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
                var url = "http://" + window.location.hostname + ":3000/api/user/logout";
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
        };
    }
})();