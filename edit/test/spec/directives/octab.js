'use strict';

describe('Directive: ocTab', function () {

  // load the directive's module
  beforeEach(module('overcasterApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<oc-tab></oc-tab>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ocTab directive');
  }));
});