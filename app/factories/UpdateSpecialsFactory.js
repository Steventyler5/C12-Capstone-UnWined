'use strict';

Unwined.factory('update-specials', function ($q, $http) {
	let updateSpecials = (placeKey, textString) => {
		console.log("photo start");
		//added .json to firebase ref
		let placeRef = new Firebase(`https://unwined.firebaseio.com/places/${placeKey}/placeObj`);
	 	placeRef.update({specials: `${textString}`});
	 	console.log("photo end");
	}
	return updateSpecials;
})