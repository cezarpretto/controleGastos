angular.module('starter')

.service('UsuarioModel', function(){
  this.usuario = function(){
    this.nome = undefined;
    this.username = undefined;
    this.senha = undefined;
    this.foto = undefined;
  };
});
