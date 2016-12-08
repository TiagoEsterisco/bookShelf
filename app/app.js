'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.booksList',
  'myApp.book'
])

.constant('BOOKS_LIST', {
    'ITEMS_PER_PAGE': 12
})

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.otherwise({redirectTo: '/books/page/0'});
}]);