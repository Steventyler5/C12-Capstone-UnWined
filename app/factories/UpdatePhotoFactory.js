'use strict';

Unwined.factory('update-photo', function ($q, $http) {
	let updatePhoto = (placeKey, urlString) => {
		console.log("photo start");
		//added .json to firebase ref
		let placeRef = new Firebase(`https://unwined.firebaseio.com/places/${placeKey}/placeObj`);
	 	placeRef.update({image: `${urlString}`});
	 	console.log("photo end");
	}
	return updatePhoto;
})