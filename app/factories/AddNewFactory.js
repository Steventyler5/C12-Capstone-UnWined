'use strict';

//////.......Why did I stop using this? Pretty sure it has to do with the fact that the button that fires it is in an info window that only exists after a marker is clicked, which only exist after the store places array is filled, which only happens after the map is initialized, which happens every view change. So yeah, just made the function global and used onclick :+1:



Unwined.factory("add-new", function($q, $http) {
	let firebaseRef = new Firebase('https://unwined.firebaseio.com/');

	// let addNew = (buttonId) => {
	// 	let placeObject = barsObject[buttonId];
	// 	console.log(placeObject);
	//  	// return $q(function(resolve, reject) {
	// 		// $http.post(`https://unwined.firebaseio.com/movies/.json`, placeObject)
	//   //   		.success(
	//   //               (placeData) => resolve(placeData),
	//   //               (error) => reject(error)
	//   //           );
	//   //       });
	// };

	// return addNew;
function addNew(buttonId) {
    // var geocoder = new google.maps.Geocoder;

  let placeObj = barsObject[buttonId];

  // geocoder.geocode({'placeId': placeId}, function(results, status) {
  //   if (status === google.maps.GeocoderStatus.OK) {
  //     console.log(results[0]);
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
  //   } else {
  //     window.alert('Geocoder failed due to: ' + status);
  //   }
  // });

//   $.ajax({
//   method: "POST",
//   url: "https://unwined.firebaseio.com/places/.json",
//   data: placeObject
// })
//   .done(function( msg ) {
//     console.log( "Data Saved: " + msg );
//   });
// console.log(placeId);
}


})