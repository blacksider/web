'use strict';

angular.module('movie', [
    'ui.router',
    'ui.bootstrap'
]);

angular.module('app', [
    'movie',
    'ui.router',
    'ui.bootstrap',
    'ngCookies'
]);

(function () {
    angular.module('app')
        .config(configure);
    configure.$inject = ['$httpProvider'];
    function configure($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = '_csrf';
    }
})();