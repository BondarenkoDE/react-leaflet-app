import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';

export default function Map({ objects, position, grid }) {
  return (
    <MapContainer className="full-page" center={position} zoom={10}>
      /*11.5*/
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {objects.map(({ id, name, company, powerAmmonia, powerHydrogen, coordinates }) => {
        return (
          <Marker key={id} position={coordinates}>
            <Popup>
              Источник: {name}
              <br></br>
              Предприятие: {company}
              <br></br>
              Выбросы аммиака: {powerAmmonia} г/с
              <br></br>
              Выбросы сероводорода: {powerHydrogen} г/с
              <br></br>
              Координаты: {coordinates[0]} {coordinates[1]}
            </Popup>
          </Marker>
        );
      })}
      <Circle
        center={position}
        color="black"
        opacity="1"
        fillOpacity="1"
        fillColor="black"
        radius={45}
      />
      {grid.map((point, index) => {
        return (
          <Circle
            key={`${index}`}
            center={point}
            color="#red"
            opacity="0.5"
            fillOpacity="0.5"
            fillColor="red"
            radius={45}
          />
        );
      })}
    </MapContainer>
  );
}
