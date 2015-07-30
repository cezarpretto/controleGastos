angular.module('starter')

.controller('TitulosController', ['$scope', 'AuthService', 'TituloModel', '$ionicModal', function($scope, auth, titulo, $ionicModal){
  auth.isLoggedIn();
  var teste = new titulo.titulo();
  console.log(teste);

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
