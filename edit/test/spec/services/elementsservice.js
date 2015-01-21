'use strict';

describe('Service: ElementsService', function () {

  var ElementsService;
  var $scope;

  // load the service's module
  beforeEach(module('overcasterServices'));

  // instantiate service
  beforeEach(inject(function ($rootScope, _ElementsService_) {
    ElementsService = _ElementsService_;
    $scope = $rootScope;
  }));

  it('should return a list of elements', function (done) {

    ElementsService.load().then(function (elements) {
      expect(elements.length).toBeGreaterThan(0);
      done();
    });

    $scope.$apply();
  });

  it('should one element based on a string `id`', function (done) {
    ElementsService.load('0').then(function (element) {
      expect(element).toBeDefined();
      done();
    });

    $scope.$apply();
  });

  it('should one element based on a integer `id`', function (done) {
    ElementsService.load(0).then(function (element) {
      expect(element).toBeDefined();
      done();
    });

    $scope.$apply();
  });

  it('should return a list of elements in use', function(done){
    ElementsService.load(function(element){
      return element.inUse;
    }).then(function (elementsInUse) {
      expect(elementsInUse.length).toBeGreaterThan(0);
      done();
    });

    $scope.$apply();
  });

  it('should add a new element', function(done){
    var newElement = {
      name: 'Test Element',
      dir: 'test_element',
      inUse: false
    };

    ElementsService.save(newElement).then(function (element) {
      expect(element).toBeDefined();
      expect(element.id).toBe(4);
      done();
    });

    $scope.$apply();
  });

  it('should update an existing element', function (done) {
    var existingElement = {
      id: 3,
      name: 'Spotify Player',
      dir: 'spotify_player',
      inUse: true
    };

    ElementsService.save(existingElement).then(function (element) {
      expect(element).toBeDefined();
      expect(element.id).toBe(3);
      done();
    });

    $scope.$apply();
  });

  it('should error if strict-adding an existing element', function (done) {
    var existingElement = {
      id: 3,
      name: 'Spotify Player',
      dir: 'spotify_player',
      inUse: true
    };

    ElementsService.save(existingElement, true).then(function(){
      expect(false).toBe(true);
      done();
    }, function (reason) {
      expect(reason).toBeDefined();
      done();
    });

    $scope.$apply();
  });

});