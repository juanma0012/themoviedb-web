'use strict';
/*
    The themoviedbApp module contains all the application's logic. Each controller has dependency injection for objects and services.
*/
angular.module('themoviedbApp')
    // HeaderController has variables and functions to search and to list  movies and people through a text wrote in the searching bar.
    .controller('HeaderController', ['$scope', '$timeout', 'searchingService', function($scope, $timeout, searchingService) {
        //Variables
        $scope.searchText="";
        $scope.sentText = "";
        $scope.canSearch = true;
        $scope.showResults = false;
        $scope.message = "Loading ...";
        $scope.results = [];
        $scope.page = 1;

        //Functions

        //It's alert to listen each event in the searching bar.
        $scope.getResults = function(event) {
            if($scope.searchText!==""&&event.code!=="Escape") {
                $timeout(function(){$scope.callServer();}, 2000);
            } else {
                $scope.showResults = false;
                $scope.results = [];
                $scope.searchText="";
            }
        };
        //It uses the searchingService service to make a request to the server. Also, it use the $timeout object, through dependency injection, to delay the request to the server.
        $scope.callServer = function () {
            if($scope.searchText!=$scope.sentText) {
                if(!$scope.canSearch) {
                    $timeout(function(){ $scope.callServer();}, 2000);
                }
                $scope.canSearch = false;
                $scope.sentText = $scope.searchText;
                $scope.page = 1;
                searchingService.searchAll($scope.sentText,1)
                .then(
                    function(response) {
                        $scope.results = response.data;
                        $scope.showResults = true;
                        $scope.canSearch = true;
                    },
                    function(response) {
                        $scope.canSearch = true;
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );
            }
        };
        //It only accept type either person or movie.
        $scope.validResult = function(value,index, array){
            if(value.media_type=='person'||value.media_type=='movie')
                return true;
            else
                return false;
        };
        //It put the variables without information.
        $scope.cleanText = function(value,index, array){
            $scope.showResults = false;
            $scope.results = [];
            $scope.searchText="";
        };
        //It searchs with the same text, but in the next page of the API response.
        $scope.getMoreResults = function(page) {
            $scope.page = page;
            searchingService.searchAll($scope.sentText,$scope.page)
                .then(
                    function(response) {
                        $scope.results = response.data;
                        $scope.showResults = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );
        };
    }])
    // MovieController requests to the server all the information about a specific movie.
    .controller('MovieController', ['$scope', '$stateParams','searchingService', function($scope,$stateParams,  searchingService) {
        $scope.movie = {};
        $scope.showMovie = false;
        $scope.hasError = false;
        $scope.message="Loading ...";
        if(!isNaN($stateParams.id)){
            searchingService.getMovie(parseInt($stateParams.id))
                .then(
                    function(response){
                        $scope.movie = response.data;
                        $scope.showMovie=true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                        $scope.hasError = true;
                    }
                );      
        } else {
            $scope.message = " The movie ID is not valid";
            $scope.hasError = true;
        }
    }])
    // PersonController requests to the server all the information about a specific person.
    .controller('PersonController', ['$scope', '$stateParams','searchingService', function($scope,$stateParams,  searchingService) {
        
        $scope.person = {};
        $scope.showPerson = false;
        $scope.hasError = false;
        $scope.message="Loading ...";
        if(!isNaN($stateParams.id)){
            searchingService.getPerson(parseInt($stateParams.id))
                .then(
                    function(response){
                        $scope.person = response.data;
                        $scope.showPerson=true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                        $scope.hasError = true;
                    }
                );   
        } else {
            $scope.message=" The person ID is not valid";
            $scope.hasError = true;
        }   
    }])
    // ActorMoviesController requests to the server all the movies for a specific actor. 
    .controller('ActorMoviesController', ['$scope', '$stateParams','searchingService', function($scope,$stateParams,  searchingService) {
        $scope.movies = {};
        $scope.showMovies = false;
        $scope.message ="Loading ...";
        $scope.getMoreMovies = function(page) {
            if(!isNaN($scope.person.id)){
                searchingService.getMoviesByActor(parseInt($scope.person.id),page)
                    .then(
                        function(response){
                            $scope.movies = response.data;
                            $scope.showMovies=true;
                        },
                        function(response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                        }
                    );   
            } else {
                $scope.message=" The actor ID is not valid";
            } 
        };  
        $scope.getMoreMovies(1); 
    }])
    //IndexController requests to the server for the popular movies.
    .controller('IndexController', ['$scope', 'searchingService', function($scope, searchingService) {
        
        $scope.movies = {};
        $scope.showMovies = false;
        $scope.message ="Loading ...";
        searchingService.getPopularMovies()
            .then(
                function(response){
                    $scope.movies = response.data;
                    $scope.showMovies=true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );   
      
    }])
;