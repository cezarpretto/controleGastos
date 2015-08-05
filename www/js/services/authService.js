angular.module('starter')

.service('AuthService', ['$http', '$state', '$ionicHistory', 'MsgService', function($http, $state, $ionicHistory, msg){
  var self = this;
  this.ip = 'http://192.168.0.21/CoreOS/';
  this.usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado'));
  this.tituloSelecionado = JSON.parse(window.localStorage.getItem('tituloSelecionado'));

  this.isLoggedIn = function(){
    if(self.usuarioLogado === null){
      console.log('Voce nao esta logado!!');
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.login');
    }
  };

  this.login = function(usuario){
    msg.loading('show');
    return $http.post(self.ip + 'usuarios/login', usuario).success(function(retorno){
      window.localStorage.setItem('usuarioLogado', JSON.stringify(retorno));
      self.usuarioLogado = retorno;
      msg.loading('hide');
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.main');
    }).error(function(err, code){
      msg.loading('hide');
      console.error(err);
      if(code === 401){
        console.error('Incorrect username or password!');
      }
    });
  };

  this.logout = function(){
    window.localStorage.setItem('usuarioLogado', JSON.stringify(null));
    window.localStorage.setItem('tituloSelecionado', JSON.stringify(null));
    self.usuarioLogado = null;
    self.tituloSelecionado = null;
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('app.login');
  };

  this.selecionaTitulo = function(titulo){
    window.localStorage.setItem('tituloSelecionado', JSON.stringify(titulo));
    self.tituloSelecionado = titulo;
  }
}]);
