import React from "react";
import "./Map.css";
import {
  MapContainer,
  TileLayer,
  useMap ,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { showDataOnMap } from "../utilities";

const Maps = ({ center, zoom, countries, casesType }) => {
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }
  return (
    <div className="map">
      <MapContainer
        className="map__container"
        center={center}
        zoom={zoom}
        maxZoom={18}
      >
        {/* {console.log('from map.js')}
  {console.log(zoom)} */}
   <ChangeView center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
        
      </MapContainer>
    </div>
  );
};

export default Maps;
