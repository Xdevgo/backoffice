import React ,{ useEffect} from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useParams,useLocation } from 'react-router-dom';

import mapStyles from "./mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
  height: "900px",
};
const options = {
  //styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};


export default function  MapPlan() {
  console.log('ENTRO MAPS')
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:'AIzaSyB4uI9za9_lqogkX0EPoMOFVwFhhvOJBP0',
    libraries,
  });
  const  rowLat = parseFloat(useParams().lat);
  const  rowLng = parseFloat(useParams().lng);


  console.log('---------'+useParams().lat)
  const [marker, setMarkers] = React.useState({
    lat:'',
    lng: '',
    time: ''
  });
  const [selected, setSelected] = React.useState(null);
  const [zoom, setZOOM] = React.useState(17);

  const center = {
    lat:  rowLat, 
    lng:  rowLng
  };

  const onMapClick = React.useCallback((e) => {
    setMarkers(
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    );
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    mapRef.current.setZoom(zoom);
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(zoom);
    console.log(zoom)
  }, []);



  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  


  return (
    <div>

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={zoom}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
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
      </GoogleMap>
    </div>
  );
}


