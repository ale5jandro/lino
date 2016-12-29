(function() {
    'use strict';

    angular
        .module('boardDirective', []);
})();


(function() {
    'use strict';

    angular
        .module('boardDirective')
        .directive('boardDirective', directive);


    function directive() {
        var directive = {
            restrict: 'E',
            templateUrl: '/app/components/board/board.template.html',
            scope: {
                urlOpen: '@',
                jsonCompleto: '=json'
                // allCountries: '=countries',
                // geoObject : '&geoObject',
                // updatePerson: '&updatePerson',
                // openCardEvent : '&openCard',
                // closeCardEvent : '&closeCard'
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'pl',
            bindToController: true

        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {


          //chequeo la resolucion para saber si mostrar en formato mobile o web
          // console.log(ctrl);
          window.addEventListener('resize', function () {
            if(el[0].clientWidth >= 1280 ){
              ctrl.mobile = false;
            }else{
              ctrl.mobile = true;
            }
            scope.$apply();
          });

          ctrl.changeBackground = function(color){
            el.css( "background-color", color);
          }



          activate();

          function activate(){

            if(el[0].clientWidth >= 1280 ){
              ctrl.mobile = false;
            }else{
              ctrl.mobile = true;
            }
          }
        }
    }

    Controller.$inject = ['$scope'];


    function Controller($scope) {

        var pl = this;

        pl.mobileData = {
          selectedIndex : 0
        };

        pl.boardColor = null;

        activate();

        pl.moveCardVertically = function(arr, oldIndex, newIndex, e){
          arr.splice(oldIndex, 1);
          arr.splice(newIndex, 0, e);
        }

        pl.moveCardHorizontally = function(oldArray, newArray, oldIndex, e) {
          oldArray.splice(oldIndex, 1);
          newArray.push(e);
        }

        $scope.$watch('pl.boardColor', function(newValue, oldValue) {
          if(oldValue!=newValue)
            pl.changeBackground(newValue);
        });

        function activate() {

        }

//         pl.models = {
//     selected: null,
//     lists: {"A": [], "B": []}
// };

// Generate initial model
// for (var i = 1; i <= 3; ++i) {
//     pl.models.lists.A.push({label: "Item A" + i});
//     pl.models.lists.B.push({label: "Item B" + i});
// }

// Model to JSON for demo purpose
// $scope.$watch('models', function(model) {
//     $scope.modelAsJson = angular.toJson(model, true);
// }, true);
        //
        // pl.moveCard = function(event, index, external, type){
        //   console.log(type)
        // }



                // pl.jsonCompleto = {
                //   "selected" : null,
                //   "lists": {
                //     "A":[],
                //     "B":[],
                //     "C":[],
                //     "D":[]
                //   }
                // };
                //
                // pl.json = {"ale":"ale"}
                //
                //
                //
                // pl.jsonCompleto.lists.A.push(pl.json);
                // pl.jsonCompleto.lists.A.push(pl.json);
                // pl.jsonCompleto.lists.B.push(pl.json);
                // pl.jsonCompleto.lists.B.push(pl.json);
                // pl.jsonCompleto.lists.C.push(pl.json);
                // pl.jsonCompleto.lists.C.push(pl.json);
                // pl.jsonCompleto.lists.D.push(pl.json);
                // pl.jsonCompleto.lists.D.push(pl.json);


    }
})();
