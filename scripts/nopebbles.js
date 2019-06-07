mapboxgl.accessToken = 'pk.eyJ1IjoicHJldHppbHoiLCJhIjoiY2p3bGdvdzFmMDNmYTRhbWN0ZGk5MGVxeSJ9.M5lPXsMlvwOa_ablXgwLyQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-96, 37.8],
    zoom: 3

});

map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));

map.on('click', function (e) {
    // e.lngLat is the longitude, latitude geographical position of the event
    console.log(e.lngLat);
});

