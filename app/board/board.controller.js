(function() {
    'use strict';

    angular
        .module('board')
        .controller('boardController', Controller);

    Controller.$inject = ['$scope', '$locale'];

    /* @ngInject */
    function Controller($scope, $locale) {
        var vm = this;
        $locale.id="es_AR";
        activate();

        function activate() {


        }
    }
})();
