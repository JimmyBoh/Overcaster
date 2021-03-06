'use strict';

/**
 * @ngdoc function
 * @name overcasterControllers.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the overcasterApp
 */
angular.module('overcasterApp')
  .controller('NavigationCtrl', function ($scope, $location) {
    //Variables
    $scope.selectedItem = null; //Holds reference to the selected Menu Item

    //Method Declarations
    $scope.newSession = function() {

    };

    $scope.openSession = function() {
      $location.path('/sessions');
    };

    $scope.saveSession = function() {

    };

    $scope.saveSessionAs = function() {

    };

    $scope.endCurrentSession = function() {

    };

    $scope.toggleFullscreen = function() {
      if(typeof global !== 'undefined')
      {
        global.Overcaster.Window.toggleFullscreen();
      }
    };

    $scope.shutdown = function() {
      if(typeof global !== 'undefined')
      {
        global.Overcaster.Window.close();
      }
    };

    $scope.refresh = function () {
      window.location.reload();
    };

    $scope.reboot = function () {
      window.location.href = '/';
    };

    $scope.navigateToPage = function (pageUrl) {
      $location.path(pageUrl);
    };

    $scope.openExternalLink = function(extLink) {
      if(typeof global !== 'undefined')
      {
        global.NodeWebkit.Shell.openExternal(extLink);
      }
    };

    $scope.checkForUpdates = function() {

    };

    $scope.showDevTools = function() {
      if (typeof global !== 'undefined')
      {
        global.Overcaster.Window.showDevTools();
      }
    };

    $scope.showLogs = function() {

    };

    $scope.showAbout = function() {

    };
  });
