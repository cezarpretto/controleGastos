angular.module('starter')

.service('TituloService', ['$http', 'AuthService', function($http, auth){
  var self = this;
  var ip = auth.ip;

  this.insert = function(titulo){
    return $http.post(ip + 'contas/insert', titulo);
  };

  this.getContasDoMes = function(idUsuario, limit, offset){
    return $http.get(ip + 'contas/getContasDoMes/' + idUsuario + '/' + limit + '/' + offset);
  };
}]);
