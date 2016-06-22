"use strict";

Unwined.controller("LandingCtrl",
[
  "$scope",
  "$timeout",
  "$location",
  "$http",
  "get-stored-places",
  "create-map-markers",
  "update-photo",
  "update-specials",


  function ($scope, $timeout, $location, $http, getStoredPlaces, createMapMarkers, updatePhoto, updateSpecials)  {
    $timeout(initMap, 200, false);
    //When this page loads run factory that retrieves firebase info, then run callback to generate local object of objects, then run create marker to setup markers as well as info window content

    $scope.thething = () => {console.log("timeout")};

    $scope.LoadPlaces = () => {
      $timeout(getStoredPlaces, 1000, false)
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
      specials: "",
      key: ""
    }

    $scope.newString;
    $scope.specialsEl = document.getElementById("specials-el");
    $scope.specialsInputEl = document.getElementById("new-specials");
    $scope.specialsClass = [];
    $scope.editSpecialsClass = [];
    $scope.specialsInputClass = ['hidden'];
    $scope.specialsSubmitClass = ['hidden'];


    $scope.addPhoto = () => {
      let imgString = document.getElementById("photoURLInput").value;
      console.log(imgString);
      let locKey = $scope.sideInfo.key;
      updatePhoto(locKey, imgString);
      $scope.sideInfo.photo = imgString;
    }

    $scope.editSpecials = () => {
      // console.log("edit");
      document.getElementById("new-specials").value = $scope.sideInfo.specials;
      $scope.specialsInputClass.pop('hidden');
      $scope.specialsSubmitClass.pop('hidden');
      $scope.specialsClass.push('hidden');
      $scope.editSpecialsClass.push('hidden');
    }

    $scope.submitSpecials = () => {
      $scope.newString = document.getElementById("new-specials").value;
      let textString = $scope.newString;
      console.log(textString);
      let locKey = $scope.sideInfo.key;
      updateSpecials(locKey, textString);
      $scope.sideInfo.specials = textString;
      $scope.specialsInputClass.push('hidden');
      $scope.specialsSubmitClass.push('hidden');
      $scope.specialsClass.pop('hidden');
      $scope.editSpecialsClass.pop('hidden');
      $scope.LoadPlaces();
      infowindow.setContent(`<h5>${$scope.sideInfo.name}</h5><h6>${$scope.sideInfo.address}</h6><p>Specials: ${$scope.sideInfo.specials}</p><button  onclick="showDetails('${$scope.sideInfo.key}')">More Details</button>`);
      // infowindow.close();

    }

    window.showDetails = (givenKey) => {
      console.log($scope.sideInfo);
      $scope.sideInfo.name = storedPlaces[givenKey].placeObj.name;
      $scope.sideInfo.address = storedPlaces[givenKey].placeObj.vicinity;
      $scope.sideInfo.photo = storedPlaces[givenKey].placeObj.image;
      $scope.sideInfo.specials = storedPlaces[givenKey].placeObj.specials;
      $scope.sideInfo.key = storedPlaces[givenKey].placeObj.key;

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