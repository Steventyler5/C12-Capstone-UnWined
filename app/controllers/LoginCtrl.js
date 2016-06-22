"use strict";

Unwined.controller("LoginCtrl",
[
  "$scope",
  "$location",
  "$http",
  "authFactory",

  function ($scope, $location, $http, authFactory, firebaseURL)  {

  	let ref = new Firebase("https://unwined.firebaseio.com");

  	$scope.account = { email: "", password: "" };
  	$scope.message = "";

	  if ($location.path() === "/logout") {
  	  ref.unauth();
  	}

  	$scope.register = function () {
  		console.log("thing");
      ref.createUser({
        email    : $scope.account.email,
        password : $scope.account.password
      }, function (error, userData) {
        if (error) {
          console.log(`Error creating user: ${error}`);
        } else {
          console.log(`Created user account with uid: ${userData.uid}`);
          $scope.login();
        }
      });
    };

    $scope.login = function() {
      authFactory
        .authenticate($scope.account)
        .then(() => {
          $location.path("/landing");
          $scope.$apply();  // Needed for $location.path() to succeed
        });
    }
  }
]);