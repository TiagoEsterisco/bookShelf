'use strict';

angular.module('myApp.book', [
  'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/book/:id', {
    templateUrl: 'views/book/book.html',
    controller: 'BookCtrl'
  });
}])

.controller('BookCtrl', [
  '$scope',
  '$routeParams',
  'booksListServices',
  function(
    $scope,
    $routeParams,
    booksListServices) {

    booksListServices.getBook($routeParams.id).then(function(book) {
      $scope.book = book;      
      booksListServices.getRecommendedBooks(book).then(function(recommendedBooks) {
        $scope.recommendedBooks = recommendedBooks; 
      });
    });

    $scope.title = "Books List";
  }
]);