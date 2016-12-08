'use strict';

angular.module('myApp.bookPreview', [])
.directive('bookPreview', function() {
  return {
    restrict: 'E',
    scope: {
      book: '=book'
    },
    templateUrl: 'views/directives/book-preview/book-preview.html'
  };
});