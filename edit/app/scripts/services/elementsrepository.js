'use strict';

/**
 * @ngdoc service
 * @name overcasterApp.ElementsService
 * @description
 * # ElementsService
 * Provides access to Elements in the overcasterApp.
 */
angular.module('overcasterServices')
  .factory('ElementsRepository', function ($q) {

    var elements = [
      {
        id: 1,
        name: '2 Player Scoreboard',
        dir: '2_player_scoreboard',
        inUse: false
      },
      {
        id: 2,
        name: '4 Player Scoreboard',
        dir: '4_player_scoreboard',
        inUse: true
      },
      {
        id: 3,
        name: 'Horizontal Twitter Feed',
        dir: 'horizontal_twitter_feed',
        inUse: true
      },
      {
        id: 4,
        name: 'Spotify Stream Player',
        dir: 'spotify_stream_player',
        inUse: false
      }
    ];

    var elementsRepo = function(path){
      this.path = path;
    };

    elementsRepo.prototype.load = function (arg) {

      var matchingElements = [];

      var deferred = $q.defer();

      if (typeof arg === 'string' || typeof arg === 'number') {
        matchingElements = _.find(elements, {id: parseInt(arg)});
      }
      else if (typeof arg === 'function') {
        matchingElements = _.filter(elements, arg);
      }
      else if (typeof arg === 'object') {
        matchingElements = _.find(elements, arg);
      }
      else {
        matchingElements = elements;
      }

      deferred.resolve(matchingElements);

      return deferred.promise;
    };

    elementsRepo.prototype.save = function (element, throwIfExists) {

      var deferred = $q.defer();

      if(element.id && _.any(elements, {id: parseInt(element.id)})){

        if(throwIfExists){
          deferred.reject('Element already exists!');
          return deferred.promise;
        }

        this.delete(element.id).then(function () {
          elements.push(element);
          deferred.resolve(element);

          return deferred.promise;
        });
      }

      element.id = element.id || _.max(elements, 'id').id + 1;
      elements.push(element);
      deferred.resolve(element);

      return deferred.promise;
    };

    elementsRepo.prototype.delete = function (arg) {

      var deferred = $q.defer();

      if (typeof arg === 'string' || typeof arg === 'number') {
        elements = _.without(elements, _.findWhere(elements, {id: parseInt(arg)}));
      }
      else if (typeof arg === 'function') {
        elements = _.reject(elements, arg);
      }

      deferred.resolve();

      return deferred.promise;
    };

    return elementsRepo;
  });
