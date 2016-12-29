(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('cardFactory', cardFactory);

    cardFactory.$inject = ['$http'];

    /* @ngInject */
    function cardFactory($http) {

        var urlApi = 'http://172.16.248.194:4000/';


        var apiFactory = {
             getCard: getCard,
             getArrayCards: getArrayCards
        };

        return apiFactory;

        ////////////////////////////


        function getCard(callback, cardId){
            return $http.get(urlApi + 'dummyJsonCard')
            .success(function(data){
              callback(false, data);
            })
            .error(function(err){
              callback(err);
              console.log(err || true);
            });
        }

        function getArrayCards(callback){
            return $http.get(urlApi + 'dummyJsonArrayCard')
            .success(function(data){
              callback(false, data);
            })
            .error(function(err){
              callback(err || true);
              console.log(err);
            });
        }

    }
})();
