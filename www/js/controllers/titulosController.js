angular.module('starter')

.controller('TitulosController', ['$scope', 'AuthService', 'TituloModel', '$ionicModal', 'BancoService', 'MsgService', '$ionicPopup', 'TituloService', function($scope, auth, titulo, $ionicModal, bancoService, msg, $ionicPopup, tituloService){
  auth.isLoggedIn();
  var usuarioLogado = auth.usuarioLogado;
  $scope.novoTitulo = new titulo.titulo();
  console.log($scope.novoTitulo);
  $scope.listaTitulosInserir = [];
  $scope.isCheque = false;
  $scope.listaBancos = [];
  $scope.listaAgencias = [];
  $scope.listaContas = [];
  $scope.listaTipos = [];
  //console.log(msg.confirm('Tem certeza?'));

  var getBancos = function(){
    msg.loading('show');
    bancoService.getBancos(10000, 0).success(function(retorno){
      $scope.listaBancos = retorno;
      msg.loading('hide');
    }).error(function(err){
      msg.loading('hide');
      msg.alert(err);
      console.error(err);
    });
  };
  getBancos();

  var getTipos = function(){
    msg.loading('show');
    tituloService.getTipos().success(function(retorno){
      msg.loading('hide');
      $scope.listaTipos = retorno;
      console.log(retorno);
    }).error(function(err){
      msg.loading('hide');
      console.error(err);
    });
  };
  getTipos();

  $scope.getAgencias = function(){
    msg.loading('show');
    bancoService.getAgencias($scope.novoTitulo.banco.id, 1000, 0).success(function(retorno){
      msg.loading('hide');
      $scope.listaAgencias = retorno;
      console.log(retorno);
    }).error(function(err){
      msg.loading('hide');
      console.error(err);
    });
  };

  $scope.getContas = function(){
    msg.loading('show');
    bancoService.getContas($scope.novoTitulo.banco.agencias.id, 1000, 0).success(function(retorno){
      msg.loading('hide');
      console.log(retorno);
      $scope.listaContas = retorno;
    }).error(function(err){
      msg.loading('hide');
      console.error(err);
    });
  };

  $scope.gerarTitulo = function(){
    $scope.listaTitulosInserir = [];
    var totalDividido = $scope.novoTitulo.valor / $scope.novoTitulo.nrParcelas;
    var dtVencimento = moment($scope.novoTitulo.dtVencimento);
    var totalParcelas = 0;
    for (var i = 0; i < $scope.novoTitulo.nrParcelas; i++) {
      totalParcelas++;
      //console.log(dtVencimento.add(i, 'months').format('YYYY-MM-DD'));
      var tt = new titulo.titulo();
      if(i > 0){
        tt.dtVencimento = dtVencimento.add(1, 'months').format('YYYY-MM-DD');
      }else{
        tt.dtVencimento = dtVencimento.add(0, 'months').format('YYYY-MM-DD');
      }
      tt.idUsuario = usuarioLogado.id;
      tt.obs = $scope.novoTitulo.obs;
      tt.natureza = $scope.novoTitulo.natureza;
      tt.valor = $scope.novoTitulo.valor;
      tt.banco = $scope.novoTitulo.banco;
      tt.tipo = $scope.novoTitulo.tipo;
      if(angular.isUndefined($scope.novoTitulo.numero)){
        tt.numero = 0;
      }else{
        tt.numero = $scope.novoTitulo.numero;
      }
      $scope.listaTitulosInserir.unshift(tt);
    }

    if(totalParcelas > 1){
      $scope.listaTitulosInserir.reverse();
      var i = 0;
      angular.forEach($scope.listaTitulosInserir, function(item){
        i++;
        item.obs = item.obs + ' ' + i + '/' + totalParcelas;
      });
    }

    if($scope.novoTitulo.nrParcelas > 1){
      var confirmPopup = $ionicPopup.confirm({
       title: 'Controle de Gastos Beta',
       template: 'Deseja reajustar o valor das parcelas mês a mês?',
       okText: 'SIM',
       cancelText: 'NÃO'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('Abre modal reajusta preco');
         $scope.openModalReajustaPreco();
       } else {
         $scope.salvarTitulo();
       }
     });
   }else{
      $scope.salvarTitulo();
   }
    console.log($scope.listaTitulosInserir);
  };

  $scope.salvarTitulo = function(){
    console.log('passou aqui');
    msg.loading('show');
    tituloService.insert($scope.listaTitulosInserir).success(function(retorno){
      msg.loading('hide');
      console.log(retorno);
      $scope.closeModalReajustaPreco();
      $scope.closeModalNovoTitulo();
      $scope.listaTitulosInserir = [];
      $scope.novoTitulo = new titulo.titulo();
    }).error(function(err){
      msg.loading('hide');
      console.error(err.message);
      msg.alert(err);
    });
    //todo arrumar aqui
    /*var total = 0;
    angular.forEach($scope.listaTitulosInserir, function(retorno){
      total += retorno.valor;
    });
    if(total != $scope.novoTitulo.valor){
      msg.alert('O valor da soma das parcelas é diferente do valor total do título!');
    }else{
      msg.loading('show');
      tituloService.insert($scope.listaTitulosInserir).success(function(retorno){
        msg.loading('hide');
        console.log(retorno);
        $scope.closeModalReajustaPreco();
        $scope.closeModalNovoTitulo();
        $scope.listaTitulosInserir = [];
        $scope.novoTitulo = new titulo.titulo();
      }).error(function(err){
        msg.loading('hide');
        console.error(err.message);
        msg.alert(err);
      });
    }*/
  };

  $ionicModal.fromTemplateUrl('templates/modals/modalNovoTitulo.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalNovoTitulo = modal;
    //modal.show();
  });

  $scope.openModalNovoTitulo = function() {
    $scope.modalNovoTitulo.show();
  };
  $scope.closeModalNovoTitulo = function() {
    $scope.modalNovoTitulo.hide();
  };

  $ionicModal.fromTemplateUrl('templates/modals/modalReajustaPreco.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalReajustaPreco = modal;
    //modal.show();
  });

  $scope.openModalReajustaPreco = function() {
    $scope.modalReajustaPreco.show();
  };
  $scope.closeModalReajustaPreco = function() {
    $scope.modalReajustaPreco.hide();
  };
}]);
