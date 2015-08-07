angular.module('starter')

.controller('TituloController', ['$scope', 'AuthService', 'TituloModel', '$ionicModal', 'TituloService', 'MsgService', '$ionicHistory', '$state', function($scope, auth, titulo, $ionicModal, tituloService, msg, $ionicHistory, $state){
  auth.isLoggedIn();
  $scope.titulo = auth.tituloSelecionado;

  $scope.baixarTitulo = function(){
    msg.loading('show');
    tituloService.baixarTitulo($scope.titulo.id).success(function(retorno){
      msg.loading('hide');
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.main');
    }).error(function(err){
      msg.loading('hide');
      console.error(err);
      msg.alert(err.message);
    });
  };

  $ionicModal.fromTemplateUrl('templates/modals/modalNovoTitulo.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalNovoTitulo = modal;
  });

  $scope.openModalNovoTitulo = function() {
    $scope.modalNovoTitulo.show();
  };
  $scope.closeModalNovoTitulo = function() {
    $scope.modalNovoTitulo.hide();
  };
}]);
