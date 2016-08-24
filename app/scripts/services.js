'use strict';

angular.module('themoviedbApp')
    // The baseUrl constant has the API url. it doesn't change in the services. 
	.constant("baseURL","https://themoviedb-client.herokuapp.com/")
    //The searchingService services is possible to use in each controller there in this module. It does request with the $http object to the server API.
    .service('searchingService', ['$http', 'baseURL', function($http,baseURL) {
        
        //Functions

    	this.searchAll = function (query,page ) {
            return $http.get(baseURL+"search/"+query+"/page/"+page);
        };  
        this.getMovie = function (movie_id ) {
            return $http.get(baseURL+"movie/"+movie_id);
        }; 
        this.getPerson = function (person_id ) {
            return $http.get(baseURL+"person/"+person_id);
        };  
        this.getMoviesByActor = function (actor_id,page ) {
            return $http.get(baseURL+"actor/"+actor_id+"/movies/page/"+page);
        };
        this.getPopularMovies = function () {
            return $http.get(baseURL+"movies/popular");
        };             
    }]);