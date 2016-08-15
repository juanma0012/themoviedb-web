'use strict';

angular.module('themoviedbApp', ['ui.router','ngResource'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'itemList': {
                        templateUrl : 'views/resultList.html',
                        controller  : 'ResultListController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            });
    
        $urlRouterProvider.otherwise('/');
    })
;