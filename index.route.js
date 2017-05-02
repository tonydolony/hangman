(function() {
  'use strict';
  angular
    .module('ndog')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/templates/home.html',
        controller: 'homeController',
        controllerAs: 'home'
      });
    $urlRouterProvider.otherwise('/');
  }

})();
