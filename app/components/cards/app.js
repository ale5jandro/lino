(function() {
    'use strict';

    angular
        .module('cardDirective', []);
})();



(function() {
    'use strict';

    angular
        .module('cardDirective')
        .directive('cardDirective', directive);


    function directive() {
        var directive = {
            restrict: 'E',
            templateUrl: '/app/components/cards/template2.html',
            scope: {
                json: '=json',
                allCountries: '=countries',
                geoObject : '&geoObject',
                updatePerson: '&updatePerson',
                openCardEvent : '&openCard',
                closeCardEvent : '&closeCard'
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true

        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {



          ctrl.el = el;
          // console.log(ctrl)
          var height=0;
          var width=0;
          ctrl.open = function(){
            height = window.getComputedStyle(el.find('md-card')[0], null).getPropertyValue("height");
            width = window.getComputedStyle(el.find('md-card')[0], null).getPropertyValue("width");
            TweenLite.to([el.find('md-card')], 1, {height:"100vh", width:"100vw", zIndex: "9999"});
            ctrl.openCard();
            //cardSyncFactory.open = true;
            //console.log(cardSyncFactory.open)
          }

          ctrl.close = function(){
            TweenLite.to(el.find('md-card'), 2, {height:height, width:width, zIndex: "1"});
            ctrl.closeCard();
            //cardSyncFactory.open = false;
          }
        }
    }

    Controller.$inject = ['$scope', 'cardSyncFactory', '$mdDialog', '$timeout'];


    function Controller($scope, cardSyncFactory, $mdDialog, $timeout) {


        var vm = this;
        vm.showCard = true;
        vm.cardOpend = false;

        $scope.ale="ale";

        var arrayActivities = []

        // for(var i = 0 ;i <20; i++){
        //   arr.push({"campo1": "item "+i, "campo2": "hoy"});
        // }
        //
        // for(var i = 0 ;i <20; i++){
        //   arr.push({"campo1": "item "+i, "campo2": "ayer"});
        // }
        //
        // for(var i = 0 ;i <20; i++){
        //   arr.push({"campo1": "item "+i, "campo2": "mes anterior"});
        // }
        //
        // for(var i = 0 ;i <20; i++){
        //   arr.push({"campo1": "item "+i, "campo2": "año anterior"});
        // }


        $scope.$watch('vm.json', function(newValues, oldValues){
            if(newValues!=oldValues && vm.json){
              arrayActivities = vm.json.activity.activities;
            }
        });



        // COMIENZA COMPONENTE DE SCROLL INFINITO

        var DynamicItems = function() {
          /**
           * @type {!Object<?Array>} Data pages, keyed by page number (0-index).
           */
          this.loadedPages = {};
          /** @type {number} Total number of items. */
          this.numItems = 0;
          /** @const {number} Number of items to fetch per request. */
          this.PAGE_SIZE = 500;
          this.fetchNumItems_();
        };
        // Required.
        DynamicItems.prototype.getItemAtIndex = function(index) {
          var pageNumber = Math.floor(index / this.PAGE_SIZE);
          var page = this.loadedPages[pageNumber];
          if (page) {
            return page[index % this.PAGE_SIZE];
          } else if (page !== null) {
            this.fetchPage_(pageNumber);
          }
        };
        // Required.
        DynamicItems.prototype.getLength = function() {
          return this.numItems;
        };
        DynamicItems.prototype.fetchPage_ = function(pageNumber) {
          // Set the page to null so we know it is already being fetched.
          this.loadedPages[pageNumber] = null;
          // For demo purposes, we simulate loading more items with a timed
          // promise. In real code, this function would likely contain an
          // $http request.
          $timeout(angular.noop, 300).then(angular.bind(this, function() {
            this.loadedPages[pageNumber] = [];
            var pageOffset = pageNumber * this.PAGE_SIZE;
            for (var i = pageOffset; i < pageOffset + this.PAGE_SIZE; i++) {
              this.loadedPages[pageNumber].push(arrayActivities[i]);
            }
          }));
        };
        DynamicItems.prototype.fetchNumItems_ = function() {
          // For demo purposes, we simulate loading the item count with a timed
          // promise. In real code, this function would likely contain an
          // $http request.
          $timeout(angular.noop, 300).then(angular.bind(this, function() {
            this.numItems = arrayActivities.length;
          }));
        };

        vm.dynamicItems = new DynamicItems();

        // FIN COMPONENTE DE SCROLL INFINITO


        //
        // $scope.$watch('cardSyncFactory.open', function(newValue, oldValue) {
        //   console.log(newValue);
        //   console.log("cambio");
        // });


        function timeDialogController($scope){
          $scope.ale = 'jnadro'
          console.log(vm)
          $scope.json = vm.json;
        }

        vm.openTimeDialog = function(ev){
          $mdDialog.show({
            controller: timeDialogController,
            templateUrl: '/app/components/cards/time.dialog.template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
          })
          .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });
        }


        var customJson = '<div style="color:red;"><script>$( "#botoncito" ).on( "click", function() {  alert("ael" );});</script>ale<button id="botoncito">boton</button></div>'
        // console.log(cardSyncFactory)

        var customDialogController = function(){

        }

        vm.openCustomDialog = function(){
          console.log("ale");
          $mdDialog.show({
            controller: customDialogController,
            template: customJson,
            parent: angular.element(document.body),
            clickOutsideToClose:true
          })
          .then(function(answer) {
            // $scope.status = 'You said the information was "' + answer + '".';
          }, function() {
            // $scope.status = 'You cancelled the dialog.';
          });
        }

        vm.openCard = function(){
          // console.log(vm);
          vm.openCardEvent();
          vm.cardOpend = true;
          cardSyncFactory.openCard();

        }

        vm.closeCard = function(){
          vm.closeCardEvent();
          vm.cardOpend = false;
          cardSyncFactory.closeCard();
        }

        cardSyncFactory.registerObserverCallback(function(){
          vm.showCard = !cardSyncFactory.getOpendCard();
        });



        activate();

        function activate() {

        }
    }
})();
