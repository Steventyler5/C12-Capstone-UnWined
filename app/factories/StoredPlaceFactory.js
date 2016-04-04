'use strict';

//Holy balls, a factory that actually works like it's supposed to. Terminating prepositions make you sound cool.

Unwined.factory('get-stored-places', function($q, $http) {

	let getStoredPlaces = () => {
	 	return $q(function(resolve, reject) {
			$http.get(`https://unwined.firebaseio.com/places/.json`)
	    		.success(
	                (placesData) => resolve(placesData),
	                (error) => reject(error)
	            );
	        });
	};

	return getStoredPlaces;
});