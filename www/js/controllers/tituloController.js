angular.module('starter')

.controller('TituloController', ['$scope', 'AuthService', 'TituloModel', '$ionicModal', function($scope, auth, titulo, $ionicModal){
  auth.isLoggedIn();
  $scope.titulo = auth.tituloSelecionado;
  console.log($scope.titulo);

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
