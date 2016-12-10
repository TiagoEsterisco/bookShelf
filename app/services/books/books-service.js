'use strict';

angular.module('myApp.booksService', [])

/**
 * @ngdoc service
 * @name booksListServices
 * @memberof myApp
 * @param {service} $http angular http request
 * @param {service} $q angular angular promises
 * @description 
 *   Deals with all Books / Book requests
 */
.service('booksListServices', ['$http','$q', function($http, $q) {
  
  /**
   * @ngdoc service
   * @memberof booksListServices
   * @name getBooks
   * @description 
   *   Get full list of books
   * @returns {Object} Books list  
   */
  this.getBooks = function() {
    return $http.get('/api/books.json');
  };

  /**
   * @ngdoc service
   * @memberof booksListServices
   * @name getGenres
   * @description 
   *   Get full list of Genres
   * @returns {Object} List of possible genres: Categories and Names
   */
  this.getGenres = function(){
    var deferred = $q.defer();
    var possibleGenres = {
      categories: [],
      names: []
    };

    $http.get('/api/books.json').then(function(response){
      
      angular.forEach(response.data, function(book, index){
        if(possibleGenres.names.indexOf(book.genre.name) == -1){
          possibleGenres.names.push(book.genre.name);
        }
        if(possibleGenres.categories.indexOf(book.genre.category) == -1){
          possibleGenres.categories.push(book.genre.category);
        }
      });

      deferred.resolve(possibleGenres);

    });

    return deferred.promise;
  };

  /**
   * @ngdoc service
   * @memberof booksListServices
   * @name getBook
   * @param {Integer} Book id
   * @description 
   *   Get Book by Id
   * @returns {Object} Book
   */
  this.getBook = function(id){
    var deferred = $q.defer();

    $http.get('/api/books.json').then(function(response){
      
      angular.forEach(response.data, function(book, index){
        if(book.id === id){
          deferred.resolve(book);
        }
      });

    });

    return deferred.promise;
  };

  /**
   * @ngdoc service
   * @memberof booksListServices
   * @name getRecommendedBooks
   * @param {Object} Selected Book
   * @description 
   *   Get recommended books, by comparing selected book genres.
   * @returns {Array} List of books with the same genre.
   */
  this.getRecommendedBooks = function(selectedBook){
    var deferred = $q.defer();
    var recommendations = [];

    $http.get('/api/books.json').then(function(response){
      
      angular.forEach(response.data, function(book, index){
        if( selectedBook.genre.category === book.genre.category && 
            selectedBook.genre.name === book.genre.name && 
            selectedBook.id !== book.id 
          ){
          recommendations.push(book);
        }
      });

      deferred.resolve(recommendations);
    });

    return deferred.promise;
  };
}])