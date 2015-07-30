angular.module('starter')

.controller('MainController', ['AuthService', 'MsgService', 'TituloService', '$scope', '$state', function(auth, msg, tituloService, $scope, $state){
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
    retorno = diffDays;
    return retorno;
  }

  console.log(dateDiff('2015-07-1'));
  var getContasDoMes = function(){
    if(usuarioLogado != null){
      msg.loading('show');
      tituloService.getContasDoMes(usuarioLogado.id, limit, offset).success(function(retorno){
        msg.loading('hide');
        xLog(retorno);
        angular.forEach(retorno, function(item){
          item.idUsuario = dateDiff(item.dtVencimento) -1;
        });
        $scope.listaContas = retorno;
      }).error(function(err){
        msg.loading('hide');
        console.error(err);
        msg.alert(err);
      });
    }
  };
  getContasDoMes();

  $scope.selecionaTitulo = function(titulo){
    auth.selecionaTitulo(titulo);
    $state.go('app.titulo');
  };
}]);
