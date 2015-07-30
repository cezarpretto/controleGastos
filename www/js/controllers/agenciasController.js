angular.module('starter')

.controller('AgenciasController', ['$scope', 'AuthService', 'BancoModel', '$ionicModal', 'BancoService', 'MsgService', function($scope, auth, bancoModel, $ionicModal, bancoService, msg){
  auth.isLoggedIn();
  $scope.listaBancos = [];
  $scope.novaAgencia = new bancoModel.agencia();
  $scope.forms = {};
  $scope.camposBloqueados = true;
  var xLog = function(attr){
    //console.log(attr);
  };

  /*$scope.$watch('forms.frmCadastroAgencia', function(newValue) {
    newValue.$setDirty();
    console.log(newValue);
  });*/

  var getBancos = function(){
    msg.loading('show');
    bancoService.getBancos(5000, 0).success(function(retorno){
      $scope.listaBancos = retorno;
      xLog(retorno);
      msg.loading('hide');
    }).error(function(err){
      msg.loading('hide');
      msg.alert(err);
      console.error(err);
    });
  };
  getBancos();

  $scope.consultaCep = function(){
    msg.loading('show');
    bancoService.consultaCep($scope.novaAgencia.cep).success(function(retorno){
      $scope.camposBloqueados = false;
      $scope.novaAgencia.logradouro = retorno.logradouro;
      $scope.novaAgencia.bairro = retorno.bairro;
      $scope.novaAgencia.complemento = retorno.complemento;
      $scope.novaAgencia.cidade = retorno.localidade;
      $scope.novaAgencia.estado = retorno.uf;
      msg.loading('hide');
      if(retorno.logradouro === ""){
        document.getElementById('txtLogradouro').focus();
      }else{
        document.getElementById('txtNumero').focus();
      }
    }).error(function(err){
      console.error(err);
    });
  };

  $scope.podeVerificarCep = function(){
    if(angular.isDefined($scope.novaAgencia.cep)){
      if($scope.novaAgencia.cep.length === 8){
        $scope.consultaCep();
      }
    }
  };

  $scope.insertAgencia = function(){
    bancoService.insertAgencia($scope.novaAgencia).success(function(retorno){
      $scope.novaAgencia = new bancoModel.agencia();
      msg.alert('Agência inserida com sucesso!');
      $scope.camposBloqueados = true;
    }).error(function(err){
      console.error(err);
      msg.alert(err);
    });
  };

  $ionicModal.fromTemplateUrl('templates/modals/modalCadastroBanco.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalNovoBanco = modal;
  });

  $scope.openModalNovoBanco = function() {
    $scope.modalNovoBanco.show();
  };
  $scope.closeModalNovoBanco = function() {
    $scope.modalNovoBanco.hide();
  };
}]);
