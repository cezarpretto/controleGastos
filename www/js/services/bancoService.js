angular.module('starter')

.service('BancoService', ['$http', 'AuthService', function($http, auth){
  var ip = auth.ip;
  this.insert = function(banco){
    return $http.post(ip + 'bancos/insert', banco);
  };

  this.getBancos = function(limit, offset){
    return $http.get(ip + 'bancos/getBancos/' + limit + '/' + offset);
  };

  this.consultaCep = function(cep){
    return $http.get('http://viacep.com.br/ws/' + cep + '/json/');
  };

  this.insertAgencia = function(agencia){
    return $http.post(ip + 'bancos/agencias/insert', agencia);
  };

  this.getAgencias = function(idBanco, limit, offset){
    return $http.get(ip + 'bancos/agencias/getAgencias/' + idBanco + '/' + limit + '/' + offset);
  };

  this.getContas = function(idAgencia, limit, offset){
    return $http.get(ip + 'bancos/contas/getContas/' + idAgencia + '/' + limit + '/' + offset);
  };
}]);
