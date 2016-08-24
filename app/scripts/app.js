'use strict';

angular.module('themoviedbApp', ['ui.router'])
    // The states are declared in this section to show the correct view when in the url change the information.
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            // route for the person details page
            .state('app.person', {
                url: 'person/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/persondetail.html',
                        controller  : 'PersonController'
                    }
                }
            })

            // route for the movie details page
            .state('app.movie', {
                url: 'movie/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/moviedetail.html',
                        controller  : 'MovieController'
                   }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })
;