import React from 'react'

//base url for mapbox:
//https://api.mapbox.com

//my default public token:
const myAccessToken = "pk.eyJ1Ijoic3B1dXVuIiwiYSI6ImNqemxvbjN4cjBjZjMzaW15Y2F1NDFvdG4ifQ.Hxdza6WvPNtNIzMuVizeDg"
mapboxgl.accessToken = myAccessToken;

const map = new mapboxgl.Map({
    container: "map-container", // HTML container id
    style: "mapbox://styles/mapbox/dark-v9", // style URL
    center: [-76.54, 39.18], // starting position as [lng, lat]
    zoom: 10
});
// center: [10.905200, 63.445200], // starting position as [lng, lat]

//ADDS MARKER
const marker = new mapboxgl.Marker()
    .setLngLat([30.5, 50.5])
    .addTo(map);

map.on("click", function (e) {
    const clickedLng = e.lngLat.lng;
    const clickedLat = e.lngLat.lat;
    const newMarker = new mapboxgl.Marker()
        .setLngLat([clickedLng, clickedLat])
        .addTo(map);
})

//  * [the predefined Mapbox styles](https://www.mapbox.com/maps/):
//  *
//  *  * `mapbox://styles/mapbox/streets-v9`
//  *  * `mapbox://styles/mapbox/outdoors-v9`
//  *  * `mapbox://styles/mapbox/light-v9`
//  *  * `mapbox://styles/mapbox/dark-v9`
//  *  * `mapbox://styles/mapbox/satellite-v9`
//  *  * `mapbox://styles/mapbox/satellite-streets-v9`
