import React from 'react';
import { useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

function MapboxMap () {
  mapboxgl.accessToken = 'pk.eyJ1IjoicXVhbmdhbmgwMTEwIiwiYSI6ImNsdTVzcDd1YTFxZDUyamw4a3Eyd3kzeHgifQ.Cjd2-WvzHRTbBvLTQww1ew';
  const COORDINATE = [105.8431, 21.0054];
  const MARKER_INFO = '<h3>Hanoi University of Science and Technology</h3><h4>IPAC, C5-405, HUST</h4>';

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: COORDINATE,
      zoom: 17,
    });

    const marker = new mapboxgl.Marker()
      .setLngLat(COORDINATE)
      .addTo(map);

    const popup = new mapboxgl.Popup({
      offset: 10
    })
      .setHTML(MARKER_INFO);

    marker.setPopup(popup)

    map.addControl(new mapboxgl.NavigationControl());

    return () => map.remove();
  }, []);

  return <div id="map-container" style={{ width: '100%', height: '250px', borderRadius: '10px' }} />;
};

export default MapboxMap;