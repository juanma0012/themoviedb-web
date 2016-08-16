'use strict';

angular.module('themoviedbApp')
    .controller('HeaderController', ['$scope', 'searchFactory', function($scope, searchFactory) {
        $scope.searchText="";
        $scope.showResults = false;
        $scope.message = "Loading ...";
        $scope.results = [];

        $scope.getResults = function(event,page) {
            
            if($scope.searchText!==""&&event.code!=="Escape") {
                searchFactory.searchAll($scope.searchText,page)
                    .then(
                        function(response) {
                            $scope.results = response.data;
                            $scope.showResults = true;
                        },
                        function(response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                        }
                    );
            } else {
                $scope.showResults = false;
                $scope.results = [];
                $scope.searchText="";
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
    .controller('MoviesController', ['$scope', '$stateParams','searchFactory', function($scope,$stateParams,  searchFactory) {
        console.log("I'm in MoviesController");
        $scope.movies = {};
        $scope.showMovies = false;
        $scope.message ="Loading ...";
        searchFactory.getMoviesByActor(parseInt($scope.person.id))
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
    }])
    .controller('IndexController', ['$scope', 'searchFactory', function($scope, searchFactory) {
        
        $scope.showResults = false;
        $scope.message = "Loading ...";
        $scope.results= [];
      
    }])
;