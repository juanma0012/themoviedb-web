'use strict';

angular.module('themoviedbApp')
	.constant("baseURL","https://themoviedb-client.herokuapp.com/")
    .service('searchFactory', ['$http', 'baseURL', function($http,baseURL) {
        this.searchAll = function (query,page ) {
            return $http.get(baseURL+"search/"+query+"/page/"+page);
        };             
    }]);