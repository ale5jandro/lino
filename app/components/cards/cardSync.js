angular
  .module('cardDirective')
  .factory('cardSyncFactory', cardSyncFactory);

  function cardSyncFactory(){

    var cardOpend = false;
    var observerCallbacks = [];

    var cardSyncFactory = {
      openCard : openCard,
      closeCard : closeCard,
      getOpendCard : getOpendCard,
      registerObserverCallback: registerObserverCallback
    };

    return cardSyncFactory;

    function registerObserverCallback(callback){
      observerCallbacks.push(callback);
    };

    function notifyObservers(){
      angular.forEach(observerCallbacks, function(callback){
        callback();
      });
    };

    function openCard(){
      cardOpen=true;
      notifyObservers();
    }

    function closeCard(){
      cardOpen=false;
      notifyObservers();
    }

    function getOpendCard(){
      return cardOpen;
    }
  }
