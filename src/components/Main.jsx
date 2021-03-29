import React from 'react';
import Menu from './Menu';
import Map from './Map';

const objects = [
  {
    id: 1,
    name: 'Разведение и содержание животных',
    company: 'ООО "Межениновская птицефабрика"',
    powerAmmonia: 0.133,
    powerHydrogen: 0.0244,
    coordinates: [56.56634549675028, 85.1199625785979],
    web: [],
  },
  {
    id: 2,
    name: 'Пруд-накопитель жидких отходов',
    company: 'АО "Сибирская аграрная группа"',
    powerAmmonia: 0.41,
    powerHydrogen: 0.0188,
    coordinates: [56.57720194468607, 85.15188553597653],
    web: [],
  },
  {
    id: 3,
    name: 'Разведение и содержание животных',
    company: 'Птицефабрика "Томская" АО "Сибирская аграрная группа"',
    powerAmmonia: 0.15,
    powerHydrogen: 0.0212,
    coordinates: [56.62673517831537, 85.19611155894133],
    web: [],
  },
  {
    id: 4,
    name: 'Разведение и содержание животных',
    company: 'Свинокомплекс "Томский" АО "Сибирская аграрная группа"',
    powerAmmonia: 0.17,
    powerHydrogen: 0.0197,
    coordinates: [56.596552606042636, 85.15300890652335],
    web: [],
  },
  {
    id: 5,
    name: 'Разведение и содержание животных',
    company: 'ООО "ПЗ Заварзинский"',
    powerAmmonia: 0.15,
    powerHydrogen: 0.0189,
    coordinates: [56.440453775800684, 85.1118394819657],
    web: [],
  },
  {
    id: 6,
    name: 'Отходы птицеводства',
    company: 'Птицефабрика "Томская" АО "Сибирская аграрная группа"',
    powerAmmonia: 0.16,
    powerHydrogen: 0.0201,
    coordinates: [56.684041222104796, 85.35601199908567],
    web: [],
  },
  {
    id: 7,
    name: 'Пометохранилище',
    company: 'ООО "Межениновская птицефабрика"',
    powerAmmonia: 0.133,
    powerHydrogen: 0.0244,
    coordinates: [56.56614643922449, 85.13168228163148],
    web: [],
  },
];

export default function Main() {
  const position = [56.49476101800348, 84.98390582731155];
  const stepLat = 0.004;
  const stepLng = 0.008;

  const [gridCoordinates, setGridCoordinates] = React.useState([]);
  const [distances, setDistances] = React.useState([]);
  const [dispersions, setDispersions] = React.useState({ dispersionsY: [], dispersionsZ: [] });

  const calculate = () => {
    // РАСЧЕТ КООРДИНАТ УЗЛОВ СЕТКИ
    setGridCoordinates([]);

    const grid = [];

    // Расчет точек замера выше оси X слева
    let lng = position[1] - stepLng;
    let lat = position[0];
    for (let i = 0; i < 2; i++) {
      lat = position[0];
      for (let j = 0; j < 2; j++) {
        grid.push([lat, lng]);
        lat += stepLat;
      }
      lng -= stepLng;
    }

    // Расчет точек замера ниже оси X слева
    lng += stepLng;
    lat = position[0];
    for (let i = 0; i < 2; i++) {
      lat = position[0] - stepLat;
      for (let j = 0; j < 2; j++) {
        grid.push([lat, lng]);
        lat -= stepLat;
      }
      lng += stepLng;
    }

    // Расчет точек замера выше оси X справа
    lng = position[1];
    for (let i = 0; i < 2; i++) {
      lat = position[0];
      for (let j = 0; j < 2; j++) {
        grid.push([lat, lng]);
        lat += stepLat;
      }
      lng += stepLng;
    }

    // Расчет точек замера ниже оси X справа
    lng -= stepLng;
    lat = position[0];
    for (let i = 0; i < 2; i++) {
      lat = position[0] - stepLat;
      for (let j = 0; j < 2; j++) {
        grid.push([lat, lng]);
        lat -= stepLat;
      }
      lng -= stepLng;
    }

    setGridCoordinates(grid);
    console.log(grid);

    // РАССЧЕТ РАССТОЯНИЯ ОТ ИСТОЧНИКА ДО УЗЛА СЕТКИ
    setDistances([]);

    let dists = [];
    objects.map(({ coordinates }) => {
      for (let i = 0; i < gridCoordinates.length; i++) {
        let dist = coordinates[1] - gridCoordinates[i][1];
        dists.push(dist);

        console.log(coordinates[1]);

        // if (dist <= 0) {
        //   dists.push(dist);
        // } else {
        //   dist = 0;
        //   dists.push(dist);
        // }
      }
    });

    setDistances(dists);

    console.log('Расстояние между маркером и точками замера: ', dists);

    // РАСЧЕТ ДИСПЕРСИИ Y И X

    let dispersionYInPoint = [];
    let dispersionZInPoint = [];
    for (let i = 0; i < distances.length; i++) {
      let dispY = 0.128 * Math.pow(Math.abs(distances[i]), 0.905);
      dispersionYInPoint.push(dispY);

      let dispZ = 0.108 * Math.pow(Math.abs(distances[i]), 0.81);
      dispersionZInPoint.push(dispZ);
    }

    console.log(dispersionYInPoint);
    console.log(dispersionZInPoint);

    setDispersions({ dispersionsY: dispersionYInPoint, dispersionsZ: dispersionZInPoint });
    console.log(dispersions);
  };
  return (
    <>
      <Menu calculate={calculate} />
      <Map objects={objects} position={position} grid={gridCoordinates} />
    </>
  );
}
