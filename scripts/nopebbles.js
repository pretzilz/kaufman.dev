mapboxgl.accessToken = 'pk.eyJ1IjoicHJldHppbHoiLCJhIjoiY2p3bGdvdzFmMDNmYTRhbWN0ZGk5MGVxeSJ9.M5lPXsMlvwOa_ablXgwLyQ';

var NoPebbles = {
    Map: {},
    PointData: [],

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

            //TODO for loading points on pageload
            // NoPebbles.Map.addSource("points", {
            //     "type": "geojson",
            //     "data": {
            //         "type": "FeatureCollection",
            //         "features": []
            //     }
            // });    

            // NoPebbles.Map.addLayer({
            //     'id': 'point',
            //     'type': 'circle',
            //     'source': 'points',
            //     'paint': {
            //         // make circles larger as the user zooms from z12 to z22
            //         'circle-radius': {
            //             'base': 8,
            //             'stops': [[12, 2], [22, 180]]
            //         },
            //         'circle-color': '#00b7bf',
            //         'circle-stroke-width': 1,
            //         'circle-stroke-color': '#333',
            //     }
            // });   
        })
    },

    InitializeButtons: function() {
        document.getElementById('enterTrip').addEventListener('click', this.StartTrip);
        document.getElementById('saveTrip').addEventListener('click', this.SaveTrip);
        document.getElementById('cancelTrip').addEventListener('click', this.CancelTrip);
    },

    StartTrip: function() {
        document.getElementById('saveTrip').classList.remove("hidden");
        document.getElementById('cancelTrip').classList.remove("hidden");
        document.getElementById('enterTrip').classList.add("hidden");
        var tripObject = {
            PointList: []    
        }
        var hasPlacedFirstPoint = false;
        // attach a click to the map to grab the latitude and longitude, and place a marker there
        NoPebbles.Map.on('click', function (e) {
            // NoPebbles.PointData.features.push({
            //     "type": "Feature",
            //     "geometry": {
            //         "type": "Point",
            //         "coordinates": e.lngLat
            //     }
            // });
            if (!hasPlacedFirstPoint) {
                var el = document.createElement('div');
                el.className = 'marker';
                firstPoint = new mapboxgl.Marker(el)
                    .setLngLat(e.lngLat)
                    .addTo(NoPebbles.Map);
                hasPlacedFirstPoint = true;
                tripObject.PointList += firstPoint;
                
            }
            else {
                var el = document.createElement('div');
                el.className = 'marker';
                point = new mapboxgl.Marker(el)
                    .setLngLat(e.lngLat)
                    .addTo(NoPebbles.Map);
                //hasPlacedFirstPoint = false;
                //draw a line between the two points
                tripObject.PointList += point;
                
            }
            
        }); 
    },

    SaveTrip: function() { 

    },

    CancelTrip: function() {
        document.getElementById('enterTrip').classList.remove("hidden");
        document.getElementById('cancelTrip').classList.add("hidden");
        document.getElementById('saveTrip').classList.add("hidden");
    }

}
 
NoPebbles.Init();
