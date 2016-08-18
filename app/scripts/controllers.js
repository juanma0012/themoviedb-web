'use strict';

angular.module('themoviedbApp')
    .controller('HeaderController', ['$scope', '$timeout', 'searchFactory', function($scope, $timeout, searchFactory) {
        $scope.searchText="";
        $scope.sentText = "";
        $scope.canSearch = true;
        $scope.showResults = false;
        $scope.message = "Loading ...";
        $scope.results = [];
        $scope.page = 1;

        $scope.getResults = function(event) {
            if($scope.searchText!==""&&event.code!=="Escape") {
                $timeout(function(){$scope.callServer();}, 2000);
            } else {
                $scope.showResults = false;
                $scope.results = [];
                $scope.searchText="";
            }
        };

        $scope.callServer = function () {
            if($scope.searchText!=$scope.sentText) {
                if(!$scope.canSearch) {
                    $timeout(function(){ $scope.callServer();}, 2000);
                }
                $scope.canSearch = false;
                $scope.sentText = $scope.searchText;
                $scope.page = 1;
                searchFactory.searchAll($scope.sentText,1)
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
        $scope.validResult = function(value,index, array){
            if(value.media_type=='person'||value.media_type=='movie')
                return true;
            else
                return false;
        };

        $scope.cleanText = function(value,index, array){
            $scope.showResults = false;
            $scope.results = [];
            $scope.searchText="";
        };
        $scope.getMoreResults = function(page) {
            $scope.page = page;
            searchFactory.searchAll($scope.sentText,$scope.page)
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
    .controller('MovieController', ['$scope', '$stateParams','searchFactory', function($scope,$stateParams,  searchFactory) {
        
        $scope.movie = {};
        $scope.showMovie = false;
        $scope.message="Loading ...";
        searchFactory.getMovie(parseInt($stateParams.id))
            .then(
                function(response){
                    $scope.movie = response.data;
                    console.log(response.data);
                    $scope.showMovie=true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );      
    }])
    .controller('PersonController', ['$scope', '$stateParams','searchFactory', function($scope,$stateParams,  searchFactory) {
        
        $scope.person = {};
        $scope.showPerson = false;
        $scope.message="Loading ...";
        searchFactory.getPerson(parseInt($stateParams.id))
            .then(
                function(response){
                    $scope.person = response.data;
                    console.log(response.data);
                    $scope.showPerson=true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );      
    }])
    .controller('ActorMoviesController', ['$scope', '$stateParams','searchFactory', function($scope,$stateParams,  searchFactory) {
        $scope.movies = {};
        $scope.showMovies = false;
        $scope.message ="Loading ...";
        $scope.getMoreMovies = function(page) {
            searchFactory.getMoviesByActor(parseInt($scope.person.id),page)
                .then(
                    function(response){
                        $scope.movies = response.data;
                        console.log(response.data);
                        $scope.showMovies=true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );   
        };  
        $scope.getMoreMovies(1); 
    }])
    .controller('IndexController', ['$scope', 'searchFactory', function($scope, searchFactory) {
        
        $scope.movies = {};
        $scope.showMovies = false;
        $scope.message ="Loading ...";
        searchFactory.getPopularMovies()
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