angular.module('starter')

.controller('BancosController', ['$scope', 'AuthService', 'BancoModel', '$ionicModal', 'BancoService', 'MsgService', function($scope, auth, bancoModel, $ionicModal, bancoService, msg){
  auth.isLoggedIn();
  $scope.listaBancos = [];
  $scope.novoBanco = new bancoModel.banco();
  //console.log($scope.novoBanco);
  var limit = 10;
  var offset = 0;
  $scope.getBancos = function(limit, offset){
    msg.loading('show');
    bancoService.getBancos(limit, offset).success(function(retorno){
      $scope.listaBancos = $scope.listaBancos.concat(retorno);
      $scope.$broadcast('scroll.infiniteScrollComplete');
      //console.log(retorno);
      msg.loading('hide');
    }).error(function(err){
      console.error(err);
      msg.loading('hide');
      msg.alert(err);
    })
  };
  $scope.getBancos(limit, offset);

  $scope.loadMoreBancos = function(){
    if($scope.listaBancos.length > 0 && $scope.listaBancos.length < $scope.listaBancos[0].registros){
      console.log($scope.listaBancos[0].registros);
      if($scope.listaBancos.length < $scope.listaBancos[0].registros){
        console.log(offset);
        offset = offset + limit;
        console.log(offset);
        $scope.getBancos(limit, offset);
      }
    }else{
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
  };

  $scope.insertBanco = function(){
    bancoService.insert($scope.novoBanco).success(function(retorno){
      console.log(retorno);
      $scope.listaBancos = [];
      $scope.novoBanco = new bancoModel.banco();
      msg.alert('Banco cadastrado com sucesso!');
      $scope.modalNovoBanco.hide();
      $scope.getBancos(limit, offset);
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
