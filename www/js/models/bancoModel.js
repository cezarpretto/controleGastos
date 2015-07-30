angular.module('starter')

.service('BancoModel', function(){
  this.banco = function(){
    this.id = undefined;
    this.banco = undefined;
    this.idUsuario = undefined;
  };

  this.agencia = function(){
    this.idBanco = undefined;
    this.agencia = undefined;
    this.fone = undefined;
    this.logradouro = undefined;
    this.bairro = undefined;
    this.numero = undefined;
    this.cep = undefined;
    this.cidade = undefined;
    this.estado = undefined;
    this.complemento = undefined;
  };
});
