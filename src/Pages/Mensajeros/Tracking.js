import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '1000px',
  height: '800px'
};

const center = {
  lat: 14.5367637,
  lng: -90.4488549
};

function Tracking() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB4uI9za9_lqogkX0EPoMOFVwFhhvOJBP0"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
                <Marker
            key={`${center.lat}-${center.lng}`}
            position={{ lat: center.lat, lng: center.lng }}
            icon={{
              url: `/store.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        <></>
      </GoogleMap>
  ) : <></>
}

export default Tracking;