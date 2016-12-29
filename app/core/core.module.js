(function() {
    'use strict';

    angular
        .module('app.core', ['ui.router', 'ngMaterial','ngMessages', 'ngLocale' ])



        .config(function($mdThemingProvider) {
          $mdThemingProvider.theme('default')
            .primaryPalette('blue', {
              'default': '500',
              'hue-1': '700'
            })
            .accentPalette('deep-purple', {
              'default': 'A400' // use shade 200 for default, and keep all other shades the same
            });
        });

})();
