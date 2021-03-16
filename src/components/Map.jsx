import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => {
  const position = [56.49476101800348, 84.98390582731155];
  const arrays = [
    { x: 56.49476101800348, y: 84.98390582731155, name: '123' },
    { x: 56.49476101800348, y: 85.98390582731155, name: '213' },
  ];

  return (
    <MapContainer className="full-page" center={position} zoom={11.5}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <div>
        {arrays.map(({ x, y, name }) => {
          return (
            <Marker key={name} position={[x, y]}>
              <Popup>{name}</Popup>
            </Marker>
          );
        })}
      </div>
    </MapContainer>
  );
};

export default Map;
