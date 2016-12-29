(function() {
    'use strict';

    angular
        .module('board')
        .controller('panelController', Controller);

    Controller.$inject = ['$scope', 'cardFactory'];

    /* @ngInject */
    function Controller($scope, cardFactory) {
        var pl = this;
        pl.hideContainers = 0;
        pl.arrayJson = null;

        // pl.cardMooved = function(){
        //   console.log(pl.jsonCompleto.lists);
        // }
        //
        // pl.hideColumns = function(index){
        //   pl.hideContainers = index;
        // }
        //
        // pl.showColumns = function(){
        //   pl.hideContainers = 0;
        // }

        function getArrayCardsCb(err, data){
          if(err){
            alert("error");
          }
          else{
            pl.arrayJson = data;
            console.log(pl.arrayJson);
          }
        }

        activate();

        function activate() {

          cardFactory.getArrayCards(getArrayCardsCb);

        }
    }
})();
