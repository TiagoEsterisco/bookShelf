'use strict';

describe('myApp.book module', function() {

  var BookCtrl, scope, booksListServices;
  beforeEach(module('myApp.book'));

  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();

    // Mock service
    booksListServices = {
      getBook: function(){
        var deferred = $q.defer();
        deferred.resolve('Remote call result');
        return deferred.promise;   
      }
    };

    BookCtrl = $controller("BookCtrl", {$scope: scope, booksListServices: booksListServices});
  }));

  describe('book controller', function(){
    it('should ....', function() {
      expect(BookCtrl).toBeDefined();
    });
  });
});