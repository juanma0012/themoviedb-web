'use strict';

angular.module('themoviedbApp')
    
    .controller('ResultListController', ['$scope', 'searchFactory', function($scope, searchFactory) {
        

        $scope.showResults = false;
        $scope.message = "Loading ...";
        $scope.results= [];
        searchFactory.searchAll("Bill",1)
            .then(
                function(response) {
                    $scope.results = response.data;
                    console.log(response.data);
                    $scope.showResults = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
    }])
;