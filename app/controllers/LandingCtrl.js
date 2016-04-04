"use strict";

Unwined.controller("LandingCtrl",
[
  "$scope",
  "$timeout",
  "$location",
  "$http",
  "get-stored-places",
  "create-map-markers",


  function ($scope, $timeout, $location, $http, getStoredPlaces, createMapMarkers)  {
    $timeout(initMap, 200, false);
    //When this page loads run factory that retrieves firebase info, then run callback to generate local object of objects, then run create marker to setup markers as well as info window content

    $scope.thething = () => {console.log("timeout")};

    $scope.LoadPlaces = () => {
      $timeout(getStoredPlaces, 600, false)
      .then(
        (placesData) => {
          storedPlaces = {};
          for (let key in placesData) {
            placesData[key].placeObj.key = key;
            storedPlaces[key] = placesData[key];
          }
          console.log("storedPlaces", storedPlaces);
          for (let key in storedPlaces) {
            createMapMarkers(storedPlaces[key])
          }
        },
        (error) => console.log(error)
        )
    }
    // $timeout(LoadPlaces, 500, false);

    $scope.sideInfo = {
      name: "",
      address: "",
      photo: "",
      specials: ""
    }

    $scope.addPhoto = () => {
      console.log("add photo");
    }

    window.showDetails = (givenKey) => {
      console.log($scope.sideInfo);
      $scope.sideInfo.name = storedPlaces[givenKey].placeObj.name;
      $scope.sideInfo.address = storedPlaces[givenKey].placeObj.vicinity;
      $scope.sideInfo.photo = storedPlaces[givenKey].placeObj.image;
      $scope.sideInfo.specials = storedPlaces[givenKey].placeObj.specials;

      console.log($scope.sideInfo);
      $scope.$apply();
      return $scope.sideInfo;

    }

  	// let addNew = (buttonId) => {
   //  let placeObject = barsObject[buttonId];
   //  console.log(placeObject);
    // return $q(function(resolve, reject) {
      // $http.post(`https://unwined.firebaseio.com/movies/.json`, placeObject)
    //      .success(
    //               (placeData) => resolve(placeData),
    //               (error) => reject(error)
    //           );
    //       });
  // };

  // return addNew;
// })
  }
]);