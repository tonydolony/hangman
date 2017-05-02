/**
 * Created by TD-pc on 2016-12-31.
 */
(function(){
    angular
        .module('ndog')
        .service('mainService' , mainService);
    function mainService($http) {
        this.load = function(){
            return $http.get('assets/answers.json')
        }
    }

})();