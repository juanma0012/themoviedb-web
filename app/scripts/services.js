'use strict';

angular.module('themoviedbApp')
	.constant("baseURL","https://themoviedb-client.herokuapp.com/")
    .service('searchFactory', ['$http', 'baseURL', function($http,baseURL) {
    	this.searchAll = function (query,page ) {
            return $http.get(baseURL+"search/"+query+"/page/"+page);
        };  
        this.getMovie = function (movie_id ) {
            return $http.get(baseURL+"movie/"+movie_id);
        };             
    }]);