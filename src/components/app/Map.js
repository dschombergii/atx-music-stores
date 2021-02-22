import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useParams } from 'react-router-dom'
// import './Map.css'
import 'leaflet/dist/leaflet.css'

import { ListingsContext } from '../../contexts/ListingsContext'

export default function Map() {

    const { listings } = useContext(ListingsContext)
    const { id } = useParams();
    const currentListing = listings.find(listing => listing.id == id)
    const position = currentListing.position

    return (
        <div>
            <MapContainer center={position} zoom={12.5} scrollWheelZoom={false} style={{ width: '100%', height: '25rem' }}>
                <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position}>
                    <Popup>
                        {currentListing.name}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}