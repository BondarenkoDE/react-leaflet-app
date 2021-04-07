import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { CRS } from 'leaflet';

export default function Map({ objects, position, grid, pointsWithAmmonia }) {
  return (
    <MapContainer className="full-page" center={position} zoom={10} crs={CRS.EPSG4326}>
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
        radius={1}
      />
      {pointsWithAmmonia.map((point, index) => {
        return (
          <Circle
            key={`${index}`}
            center={point}
            color="#red"
            opacity="1"
            fillOpacity="1"
            fillColor="red"
            radius={70}
          />
        );
      })}
    </MapContainer>
  );
}
