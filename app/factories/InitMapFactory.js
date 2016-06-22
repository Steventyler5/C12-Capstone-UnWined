'use strict';

//This is a bust, turns out google needs all the map stuff on the global scope, something to with JSONP format and security I think. This can all just be deleted I believe

Unwined.factory('initialize-map', function($q, $http) {
	let initializeMap = function(centerLoc, searchRadius) {
  

  function initMap() {
  

  map = new google.maps.Map(document.getElementById('map'), {
    center: centerLoc,
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
        // barArray.push(results[i])
      }
      createMarker(results[i]);
    }
  }
 
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


	return initializeMap;
}	
});