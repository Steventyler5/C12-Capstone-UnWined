'use strict';

//Don't even remember why this started working or why I couldn't morph it into something that would work for the nearby search results. It's been a busy weekend.

Unwined.factory('create-map-markers', function() {

	let createMapMarkers = (place) => {
		var placeLoc = place.placeObj.geometry.location;
		var image = 'https://maps.gstatic.com/mapfiles/ms2/micons/bar.png';
		var marker = new google.maps.Marker({
    	map: map,
    	position: placeLoc,
    	icon: image
  	});
  	google.maps.event.addListener(marker, 'click', function() {
    	infowindow.setContent(`<h5>${place.placeObj.name}</h5><h6>${place.placeObj.vicinity}</h6><p>Specials: ${place.placeObj.specials}</p><button  onclick="showDetails('${place.placeObj.key}')">More Details</button>`);
    	infowindow.open(map, this);
    	console.log(placeLoc);
  	});
	};

	return createMapMarkers;
});