mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/dark-v10', // style URL
        center:  campground.geometry.coordinates, // starting position [lng, lat]
        zoom: 10 // starting zoom
    });

    // Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

 new mapboxgl.Marker({ color: '#858bee', })
     .setLngLat(campground.geometry.coordinates)
     .setPopup(
         new mapboxgl.Popup({ offset: 25, }) // add popups
         .setHTML(`<h6>${campground.title}</h6><p>${campground.location}</p>`)
     )
.addTo(map);