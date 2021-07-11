import React from 'react'
import {Map as LeafletMap, TileLayer, CircleMarker, Tooltip} from "react-leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";

const Map = ({lat, long, cases, complete}) => {

    const center = [lat, long];

    return (
            <LeafletMap className="leaflet-container" 
                center={center} 
                zoom={3} 
                scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {complete.map((country, index) =>{
                    return <CircleMarker key={index}
                            center={[country?.countryInfo.lat, country?.countryInfo.long]}
                            fillColor="red"
                            color="red"
                            radius={Math.sqrt(country.cases)* 0.013}>
                            <Tooltip opacity={1}>
                                <h3>{`Total Cases: ${country.cases}`}</h3>
                            </Tooltip>
                        </CircleMarker>
                })}
            </LeafletMap>
    )
}

export default Map;
