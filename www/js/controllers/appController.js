angular.module('starter')

.controller('AppController', ['AuthService', '$scope', function(auth, $scope){
  $scope.u = auth;
  $scope.showMenu = false;
  $scope.$watch('u.usuarioLogado', function(newValue){
    if(newValue !== null){
      $scope.showMenu = true;
    }
  });

  $scope.logout = function(){
    auth.logout();
    $scope.showMenu = false;
  };
}]);
