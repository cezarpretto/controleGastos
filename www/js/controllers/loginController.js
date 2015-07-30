angular.module('starter')

.controller('LoginController', ['AuthService', '$scope', '$ionicModal', 'UsuarioModel', 'UsuarioService', function(auth, $scope, $ionicModal, usuario, usuarioService){
  $scope.usuario = new usuario.usuario();
  console.log($scope.usuario);

  $scope.doLogin = function(){
    auth.login($scope.usuario);
    $scope.usuario = new usuario.usuario();
  };

  $scope.insertUsuario = function(){
    $scope.usuario.foto = 'Mysasasa';
    usuarioService.insert($scope.usuario).success(function(retorno){
      console.log(retorno);
      $scope.closeModalCadastro();
    }).error(function(err){
      console.error(err);
    });
  };

  $ionicModal.fromTemplateUrl('templates/modals/modalCadastroUsuario.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalCadastro = modal;
  });

  $scope.openModalCadastro = function() {
    $scope.usuario = new usuario.usuario();
    $scope.modalCadastro.show();
  };
  $scope.closeModalCadastro = function() {
    $scope.modalCadastro.hide();
  };
}]);
