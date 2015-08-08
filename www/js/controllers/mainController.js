angular.module('starter')

.controller('MainController', ['AuthService', 'MsgService', 'TituloService', '$scope', '$state', '$ionicHistory', function(auth, msg, tituloService, $scope, $state, $ionicHistory){
  auth.isLoggedIn();
  var xLog = function(attr){
    console.log(attr);
  };
  $scope.listaContas = [];
  var usuarioLogado = auth.usuarioLogado;
  var limit = 10;
  var offset = 0;

  var dateDiff = function(data){
    var dtAtual = new Date();
    var dt = new Date(data);
    var timeDiff = Math.abs(dtAtual.getTime() - dt.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    var retorno = diffDays;
    if(dtAtual < dt){
      retorno = -1;
    }
    return retorno;
  }

  var getContasDoMes = function(limit, offset){
    if(usuarioLogado != null){
      msg.loading('show');
      tituloService.getContasDoMes(usuarioLogado.id, limit, offset).success(function(retorno){
        msg.loading('hide');
        angular.forEach(retorno, function(item){
          item.idUsuario = dateDiff(item.dtVencimento) -1;
        });
        $scope.listaContas = $scope.listaContas.concat(retorno);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }).error(function(err){
        msg.loading('hide');
        console.error(err);
        msg.alert(err);
      });
    }
  };
  getContasDoMes(limit, offset);

  $scope.loadMoreContas = function(){
    if($scope.listaContas.length > 0 && $scope.listaContas.length < $scope.listaContas[0].registros){
      console.log($scope.listaContas[0].registros);
      if($scope.listaContas.length < $scope.listaContas[0].registros){
        console.log(offset);
        offset = offset + limit;
        console.log(offset);
        getContasDoMes(limit, offset);
      }
    }else{
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
  };

  $scope.refreshContas = function(){
    limit = 10;
    offset = 0;
    if(usuarioLogado != null){
      //msg.loading('show');
      $scope.listaContas = [];
      tituloService.getContasDoMes(usuarioLogado.id, limit, offset).success(function(retorno){
        //msg.loading('hide');
        angular.forEach(retorno, function(item){
          item.idUsuario = dateDiff(item.dtVencimento) -1;
        });
        $scope.listaContas = [];
        $scope.listaContas = retorno;
        $scope.$broadcast('scroll.refreshComplete');
      }).error(function(err){
        $scope.$broadcast('scroll.refreshComplete');;
        console.error(err);
        msg.alert(err);
      });
      //console.log($scope.listaContas);
    }
  };

  $scope.criarTitulo = function(){
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('app.titulos');
  };

  $scope.selecionaTitulo = function(titulo){
    auth.selecionaTitulo(titulo);
    $state.go('app.titulo');
  };
}]);
