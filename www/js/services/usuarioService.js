angular.module('starter')

.service('UsuarioService', ['AuthService', '$http', function(auth, $http){
  var ip = auth.ip;
  this.insert = function(usuario){
    return $http.post(ip + 'usuarios/insert', usuario);
  };
}]);
