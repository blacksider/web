(function (app) {
    'use strict';
    angular.module('app')
        .factory('SessionStorage', SessionStorage);

    SessionStorage.$inject = ['$window'];

    function SessionStorage($window) {
        var store = $window.sessionStorage;
        return {
            save: function (key, value) {
                value = angular.toJson(value);
                store.setItem(key, value);
            },
            get: function (key) {
                var value = store.getItem(key);
                if (value) {
                    value = angular.fromJson(value);
                }
                return value;
            },
            delete: function (key) {
                store.removeItem(key);
            }
        };
    }
})();