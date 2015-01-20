'use strict';

describe('Controller: ElementsCtrl', function () {

  // load the controller's module
  beforeEach(module('overcasterControllers'));

  var ElementsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ElementsCtrl = $controller('ElementsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of elements to the scope', function () {
    expect(scope.element.length).toBeGreaterThan(0);
  });
});