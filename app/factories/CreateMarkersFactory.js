'use strict';

//Don't even remember why this started working or why I couldn't morph it into something that would work for the nearby search results. It's been a busy weekend.

Unwined.factory('create-map-markers', function() {

	let createMapMarkers = (place) => {
		var placeLoc = place.placeObj.geometry.location;
		var image = 'https://maps.gstatic.com/mapfiles/ms2/micons/bar.png';
		var marker = new google.maps.Marker({
    	map: map,
      animation: google.maps.Animation.DROP,
    	position: placeLoc,
    	icon: image
  	});
    marker.addListener('click', toggleBounce);

    function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}


  	google.maps.event.addListener(marker, 'click', function() {
    	infowindow.setContent(`<h5>${place.placeObj.name}</h5><h6>${place.placeObj.vicinity}</h6><p>Specials: ${place.placeObj.specials}</p><button  onclick="showDetails('${place.placeObj.key}')">More Details</button>`);
    	infowindow.open(map, this);
    	console.log(placeLoc);
  	});
    google.maps.event.addListener(map, 'click', function() {
      infowindow.close();
      marker.setAnimation(null);
    });
	};

	return createMapMarkers;
});