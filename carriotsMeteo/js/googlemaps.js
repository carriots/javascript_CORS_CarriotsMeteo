var MapsGoogle = function () {

    var mapMarker = function () {
        var map = new GMaps({
            div: '#gmap_marker',
            lat: 40.4390875,
            lng: -3.6262663
        });
        map.addMarker({
            lat: 40.4390875,
            lng: -3.6262663,
            title: 'Marker with InfoWindow',
			icon: "img/map_marker.png",
            infoWindow: {
                content: '<img src="img/logo_registered.png"/>'
            }
        });
    }

    
    return {
        //main function to initiate map samples
        init: function () {
            mapMarker();
        }

    };

}();