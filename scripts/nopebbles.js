mapboxgl.accessToken = 'pk.eyJ1IjoicHJldHppbHoiLCJhIjoiY2p3bGdvdzFmMDNmYTRhbWN0ZGk5MGVxeSJ9.M5lPXsMlvwOa_ablXgwLyQ';

var NoPebbles = {
    Map: {},

    Init: function() {
        this.InitializeMap();
        this.InitializeButtons();
    },

    InitializeMap: function() {
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-96, 37.8],
            zoom: 3
        
        });
        
        this.map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: false
        }));         
    },

    InitializeButtons: function() {
        document.getElementById('enterTrip').addEventListener('click', this.StartTrip);
        document.getElementById('saveTrip').addEventListener('click', this.SaveTrip);
        document.getElementById('cancelTrip').addEventListener('click', this.CancelTrip);
    },

    StartTrip: function() {
        // attach a click to the map to grab the latitude and longitude, and place a marker there
        NoPebbles.map.on('click', function (e) {
            // e.lngLat is the longitude, latitude geographical position of the event
            console.log(e.lngLat);
        }); 
    },

    SaveTrip: function() { 

    },

    CancelTrip: function() {

    }

}
 
NoPebbles.Init();
