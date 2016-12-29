(function() {
  angular
    .module('board')
    .config(config);

    config.$inject = ['$stateProvider'];

    function config(stateProvider) {
      stateProvider
      .state('board', {
        url: "/board",
        templateUrl: "app/board/board.html",
        controller: "boardController",
        controllerAs: 'br',
        abstract:true
      })
      .state('board.panel', {
          url: "",
          templateUrl: "app/board/panel.html",
          controller: "panelController",
          controllerAs: 'pl'
      })
      .state('board.openCard', {
          url: "/card",
          params: {
              cardId: 6,
          },
          templateUrl: "app/board/card.html",
          controller: "cardController",
          controllerAs: 'cc'
      });
    }
}());
