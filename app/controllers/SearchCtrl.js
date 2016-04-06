'use strict';

Unwined.controller("SearchCtrl", [
	"$scope",
	"$timeout",
	// "initialize-map",
	"search-nearby",

	function ($scope, $timeout, searchNearby) {
		//Wait a bit for the page to load then re-initialize the map (and callbacks)
		$timeout(initMap, 200, false);
		//Add a delay to the set marker call so that the map is definitely done loading
		$timeout(setNearbyMarkers, 600, false);
		let newBarArray = [];


		//Not even being used ranymore lol $timeout to the rescue
		$scope.reloadMarkers = () =>{
			setNearbyMarkers();
	}

		var nss = {lat: 36.132796, lng: -86.756568};

		$scope.reloadMap = function() {
			// searchRadius = $scope.newRadius;
			// window.nss.lat = parseFloat($scope.latitude);
			// window.nss.lng = parseFloat($scope.longitude);
			// $scope.newLocation = {};
			// initMap($scope.newLocation, $scope.newRadius)
			geocodeAddress(geocoder, map);
			// initMap();
			$timeout(setNearbyMarkers, 1000, false);
		}
	}
]);