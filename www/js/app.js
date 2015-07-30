// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput', 'ngMessages', 'ui.utils.masks'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    cache: false,
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppController'
  })

  .state('app.main', {
    url: '/main',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/main.html',
        controller: 'MainController'
      }
    }
  })

  .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LoginController'
        }
      }
    })
    .state('app.titulos', {
      url: '/titulos',
      cache: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/titulos.html',
          controller: 'TitulosController'
        }
      }
    })

    .state('app.titulo', {
      url: '/titulo',
      views: {
        'menuContent': {
          templateUrl: 'templates/titulo.html',
          controller: 'TituloController'
        }
      }
    })

  .state('app.bancos', {
    url: '/bancos',
    views: {
      'menuContent': {
        templateUrl: 'templates/bancos.html',
        controller: 'BancosController'
      }
    }
  })

  .state('app.agencias', {
    url: '/agencias',
    views: {
      'menuContent': {
        templateUrl: 'templates/agencias.html',
        controller: 'AgenciasController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
})

.config(['$httpProvider', function ($httpProvider) {
    //$httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    //$httpProvider.defaults.headers.delete = { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' };
}]);
