'use strict';

angular.module('myApp.booksList', [
  'ngRoute',
  'myApp.booksService',
  'relativeDate'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/books/page/:currentPage', {
    templateUrl: 'views/books-list/books-list.html',
    controller: 'BooksListCtrl'
  });
}])

.controller('BooksListCtrl', [
  '$scope',
  '$routeParams',
  '$filter',
  'booksListServices',
  'BOOKS_LIST',
  function(
    $scope,
    $routeParams,
    $filter,
    booksListServices,
    BOOKS_LIST) {

    this.books;
    var currentPage = parseInt($routeParams.currentPage);
    var ItemsPerPage = BOOKS_LIST.ITEMS_PER_PAGE;
    var currentItemsIndex = currentPage * ItemsPerPage; 

    // API CALL
    booksListServices.getBooks().then(function(response) {
      this.books = response.data;
      processItemsPerPage(this.books);
    }.bind(this));

    booksListServices.getGenres().then(function(possibleGenres) {
      $scope.possibleGenres = possibleGenres;
    });

    // Controller Helpers
    var combineFilter = function(books){
      if($scope.category){
        books = $filter('filter')(books, {genre: {category: $scope.category}}, true);
      }
      if($scope.name){
        books = $filter('filter')(books, {genre: {name: $scope.name}}, true);
      }
      if($scope.category && $scope.name){
        books = $filter('filter')(books, {genre: {category: $scope.category, name: $scope.name}}, true);
      }
      return books
    }

    var processItemsPerPage = function(books){
      $scope.books = books.slice(currentItemsIndex, currentItemsIndex + ItemsPerPage);
      var totalPages = Math.round(books.length / ItemsPerPage);
      $scope.totalPages = totalPages;
      $scope.currentPage = currentPage;
      $scope.prevPage = currentPage === 0 ? false : currentPage - 1;
      $scope.nextPage = currentPage === totalPages ? false : currentPage + 1;
    }

    // SCOPE ACTIONS
    $scope.categoryFilter = function(){
      var books = this.books;
      books = combineFilter(books);
      processItemsPerPage(books);
    }.bind(this);

    $scope.nameFilter = function(){
      var books = this.books;
      books = combineFilter(books);
      processItemsPerPage(books);
    }.bind(this);

    $scope.clearFilter = function(){
      $scope.category = "";
      $scope.name = "";
      $scope.searchText = "";
      processItemsPerPage(this.books);
    }.bind(this)

  }
]);