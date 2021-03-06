'use strict';

/**
 * @ngdoc directive
 * @name overcasterDirectives.directive:ocTileLayout
 * @description
 * # ocTileLayout
 */
angular.module('overcasterApp')
  .value('ocTileLayoutConfig', {
    tileItemClassName: 'tile-item',
    minColumns: 1,
    maxColumns: 8
  })
  .directive('ocTileLayout', function (ocTileLayoutConfig) {

    return {
      scope: {
        items: '=',
        columns: '='
      },
      restrict: 'EA',
      transclude: true,
      link: function (scope, element, attrs, parentCtrl, transcludeFn) {

        element.addClass('clearfix');
        element.css('display', 'block');

        var elements = [];
        var tiles = scope.items || [];
        var columns = scope.columns;

        scope.$watch('items', function (value) {
          tiles = value || [];
          updateLayout();
        });

        scope.$watch('columns', function (value) {

          columns = value || Math.round(ocTileLayoutConfig.maxColumns / 2);

          if (columns < ocTileLayoutConfig.minColumns) {
            columns = ocTileLayoutConfig.minColumns;
          } else if (columns > ocTileLayoutConfig.maxColumns) {
            columns = ocTileLayoutConfig.maxColumns;
          }

          updateLayout();
        });

        updateLayout();

        function updateLayout() {

          var i, childScope;

          // check if elements have already been rendered
          if (elements.length > 0) {
            // if so remove them from DOM, and destroy their scope
            for (i = 0; i < elements.length; i++) {
              elements[i].el.parent().remove();
              elements[i].scope.$destroy();
            }
            elements = [];
          }

          for (i = 0; i < tiles.length + (attrs.hasOwnProperty('endWithNull') ? 1 : 0); i++) {
            // create a new scope for every element in the collection.
            childScope = scope.$new();
            // pass the current element of the collection into that scope
            angular.extend(childScope, tiles[i]);

            (function (cScope) {
              transcludeFn(cScope, function (clone) {
                // clone the transcluded element, passing in the new scope.

                var el = angular.element('<div />').append(clone);
                el.css({
                  'padding': 10,
                  'width': (100 / columns) + '%'
                }).addClass('pull-left');

                element.append(el); // add to DOM
                var block = {};
                block.el = clone;
                block.scope = cScope;
                elements.push(block);
              });
            })(childScope);
          }
        }
      }
    };
  });
