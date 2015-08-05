angular.module('starter')

.service('TituloModel', function(){
  this.titulo = function(){
    this.valor = undefined;
    this.dtVencimento = undefined;
    this.natureza = undefined;
    this.tipo = undefined;
    this.obs = undefined;
    this.idUsuario = undefined;
    this.nrParcelas = 1;
    this.banco = undefined;
    this.numero = undefined;
  };
});
