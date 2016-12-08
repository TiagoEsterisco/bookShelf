'use strict';

angular.module('myApp.booksService', [])

.service('booksListServices', ['$http','$q', function($http, $q) {

  this.getBooks = function() {
    return $http.get('/api/books.json');
  };

  this.getGenres = function(id){
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