"use strict";

let Unwined = angular.module("UnwinedApp", ["ngRoute", "firebase"])

// let isAuth = (authFactory) => new Promise((resolve, reject) => {
//   if (authFactory.isAuthenticated()) {
//     console.log("User is authenticated, resolve route promise");
//     resolve();
//   } else {
//     console.log("User is not authenticated, reject route promise");
//     reject();
//   }
// });

Unwined.config(["$routeProvider",
  function ($routeProvider) {
    $routeProvider.
      when("/login", {
        templateUrl: "partials/login.html",
        controller: "LoginCtrl"
        // resolve: { isAuth }
      }).
      when("/landing", {
        templateUrl: "partials/landing.html",
        controller: "LandingCtrl"
        // resolve: { isAuth }
      }).
      when("/search-new", {
        templateUrl: "partials/new-locations.html",
        controller: "SearchCtrl"
        // resolve: { isAuth }
      }).
      otherwise({
        redirectTo: "/login"
      });
  }]);

Unwined.run([
  "$location",

  ($location) => {
    let unwinedRef = new Firebase("https://unwined.firebaseio.com");

    unwinedRef.onAuth(authData => {
      if (!authData) {
        $location.path("/login");
      }
    });
  }
]);

  //Review these variables, no way all of them are actually being used now

var map;
var infowindow;
var nss = {lat: 36.132796, lng: -86.756568};
var barsObject = {};
var barIds = [];
var searchRadius = 2500;
var storedPlaces = {};
var barArray = [];

  //Google gets all mad when you put its shit outside of global scope. As in, like, the whole thing breaks. Gotta leave a lot of the stuff that deals directly with the map in here for a while until I come up with a workaround.


function initMap() {
  

  map = new google.maps.Map(document.getElementById('map'), {
    center: nss,
    zoom: 13
  });

  
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: nss,
    radius: searchRadius,
    type: ['bar']
  }, callback);
}

function callback(results, status) {
	console.log(results)
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      if (barIds.indexOf(results[i].id) === -1) {
        barIds.push(results[i].id);
        barsObject[results[i].id] = results[i];
        barArray.push(results[i])
      }
      // createMarker(results[i]);
    }
  }
  console.log(barArray);
 
}

  //Used on SearchCtrl with a timeout to add the marker to the locations from the above nearby search and callback to the map after it's done initializing
function setNearbyMarkers(){
  console.log("setNearbyMarkers fired");
  for (var i = 0; i < barArray.length; i++) {
   createMarker(barArray[i])
  }
  console.log("setNearbyMarkers ended");
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(`<h5>${place.name}</h5><button id="${place.id}" onclick="addNew('${place.id}')">Has Specials</button>`);
    infowindow.open(map, this);
    console.log(placeLoc);
//      map.addListener("click", function(){
//   console.log("click");
// })
  });
}

function addNew(buttonId) {
    //Clicking a button copies the object that was added to the barsObject via the callback from the nearby search into this variable, then adds and sets 2 new properties used in the details window populated in LandingCtrl
  let placeObj = barsObject[buttonId];
  placeObj.specials = "You tell me!";
  placeObj.image = "none";


      $.ajax({
        method: "POST",
        url: "https://unwined.firebaseio.com/places/.json",
        data: JSON.stringify({
          placeObj
        })
      })
      .done(function( msg ) {
      console.log( "Data Saved: " + msg );
      });
}
