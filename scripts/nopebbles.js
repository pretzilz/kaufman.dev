mapboxgl.accessToken = 'pk.eyJ1IjoicHJldHppbHoiLCJhIjoiY2p3bGdvdzFmMDNmYTRhbWN0ZGk5MGVxeSJ9.M5lPXsMlvwOa_ablXgwLyQ';

var NoPebbles = {
    Map: {},
    PointData: turf.featureCollection([]),
    Init: function() {
        this.InitializeMap();
        this.InitializeButtons();
    },

    InitializeMap: function() {
        NoPebbles.Map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-96, 37.8],
            zoom: 3
        
        });
        
        NoPebbles.Map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: false
        }));  

        NoPebbles.Map.on('load', () => {
            NoPebbles.Map.addSource("points", {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": []
                }
            });    

            NoPebbles.Map.addLayer({
                'id': 'point',
                'type': 'circle',
                'source': 'points',
                'paint': {
                    // make circles larger as the user zooms from z12 to z22
                    'circle-radius': {
                        'base': 8,
                        'stops': [[12, 2], [22, 180]]
                    },
                    'circle-color': '#00b7bf',
                    'circle-radius': 8,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#333',
                }
            });   
        })
    },

    InitializeButtons: function() {
        document.getElementById('enterTrip').addEventListener('click', this.StartTrip);
        document.getElementById('saveTrip').addEventListener('click', this.SaveTrip);
        document.getElementById('cancelTrip').addEventListener('click', this.CancelTrip);
    },

    StartTrip: function() {
        // attach a click to the map to grab the latitude and longitude, and place a marker there
        NoPebbles.Map.on('click', function (e) {
            // e.lngLat is the longitude, latitude geographical position of the event
            console.log(e.lngLat);
            
            NoPebbles.PointData.features.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": e.lngLat
                }
            });
            
            NoPebbles.Map.getSource('points').setData(NoPebbles.PointData);   
        }); 
    },

    SaveTrip: function() { 

    },

    CancelTrip: function() {

    }

}
 
NoPebbles.Init();
