angular.module('starter')

.service('MsgService', ['$ionicLoading', '$ionicPopup', function($ionicLoading, $ionicPopup){
  this.loading = function(attr){
    if(attr.toUpperCase() === 'SHOW'){
      $ionicLoading.show({
        template: 'Carregando...'
      });
    }else if(attr.toUpperCase() === 'HIDE'){
      $ionicLoading.hide();
    }else{
      console.error('The loading attribute must be "show" or "hide"');
    }
  };

  this.alert = function(msg){
    if(angular.isDefined(msg)){
      var alertPopup = $ionicPopup.alert({
         title: 'Controle de Gastos Beta',
         template: msg
       });
    }else{
      console.error('The alert attribute can\'t be null! You Motherfucker!');
    }
  }

  this.toast = function(msg){
    if(angular.isDefined(msg)){
      $ionicLoading.show({
        template: msg,
        noBackdrop: true,
        duration: 2000
      });
    }else{
      console.error('The toast attribute can\'t be null! You Motherfucker!');
    }
  };

  this.confirm = function(msg){
    var confirmPopup = $ionicPopup.confirm({
     title: 'Controle de Gastos Beta',
     template: msg,
     okText: 'SIM',
     cancelText: 'NÃO'
   });
   confirmPopup.then(function(res) {
     if(res) {
       return true;
     } else {
       return false;
     }
   });
  };
}]);
