(function() {
    'use strict';

    angular
        .module('board')
        .controller('cardController', Controller);

    Controller.$inject = ['$scope', 'cardFactory'];

    /* @ngInject */
    function Controller($scope, cardFactory) {
        var cc = this;
// cc.json



        function getCardCb(err, data){
          if(err){
            alert("error: ", err);
          }
          else{
            cc.json = data;
          }
        }

        activate();

        function activate() {

          cardFactory.getCard(getCardCb, 4)

        }
    }
})();
