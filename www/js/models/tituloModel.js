angular.module('starter')

.service('TituloModel', function(){
  this.titulo = function(){
    this.valor = undefined;
    this.dtVencimento = undefined;
    this.tipo = undefined;
    this.obs = undefined;
    this.idUsuario = undefined;
  };
});
