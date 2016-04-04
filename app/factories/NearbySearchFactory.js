'use strict';

//Aw shit, this one isn't being used anymore either is it? No, I'm pretty sure the nearby search wasn't working correctly outside of the global scope. Damn. 

Unwined.factory('search-nearby', function() {
  console.log("nearby fired");
  console.log(barArray);
	let searchNearby = (place) => {
    console.log("nearby");
    var placeLocation = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: placeLocation
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(`<h5>${place.name}</h5><button id="${place.id}" onclick="addNew('${place.id}')">Has Specials</button>`);
      infowindow.open(map, this);
      console.log(placeLocation);
    });
  }
  console.log("nearby ended");

	return searchNearby;
});