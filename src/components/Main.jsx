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
    coordinates: [34.458, -47.441],
    web: [],
  },
  {
    id: 2,
    name: 'Пруд-накопитель жидких отходов',
    company: 'АО "Сибирская аграрная группа"',
    powerAmmonia: 0.41,
    powerHydrogen: 0.0188,
    coordinates: [34.4688, -47.424],
    web: [],
  },
  {
    id: 3,
    name: 'Разведение и содержание животных',
    company: 'Птицефабрика "Томская" АО "Сибирская аграрная группа"',
    powerAmmonia: 0.15,
    powerHydrogen: 0.0212,
    coordinates: [34.5145, -47.402],
    web: [],
  },
  {
    id: 4,
    name: 'Разведение и содержание животных',
    company: 'Свинокомплекс "Томский" АО "Сибирская аграрная группа"',
    powerAmmonia: 0.17,
    powerHydrogen: 0.0197,
    coordinates: [34.4853, -47.425],
    web: [],
  },
  {
    id: 5,
    name: 'Разведение и содержание животных',
    company: 'ООО "ПЗ Заварзинский"',
    powerAmmonia: 0.15,
    powerHydrogen: 0.0189,
    coordinates: [34.3454, -47.444],
    web: [],
  },
  {
    id: 6,
    name: 'Отходы птицеводства',
    company: 'Птицефабрика "Томская" АО "Сибирская аграрная группа"',
    powerAmmonia: 0.16,
    powerHydrogen: 0.0201,
    coordinates: [34.5564, -47.3293],
    web: [],
  },
  {
    id: 7,
    name: 'Пометохранилище',
    company: 'ООО "Межениновская птицефабрика"',
    powerAmmonia: 0.133,
    powerHydrogen: 0.0244,
    coordinates: [34.4593, -47.4328],
    web: [],
  },
];

export default function Main() {
  const position = [34.44, -47.46];
  const stepLat = 0.005;
  const stepLng = 0.005;

  const [gridCoordinates, setGridCoordinates] = React.useState([]);
  const [newGridCoordinates, setNewGridCoordinates] = React.useState([]);
  const [pointsWithAmmonia, setPointsWithAmmonia] = React.useState([]);
  //   const [pointsWithHydrogen, setPointsWithHydrogen] = React.useState([]);

  let newGrid = [];
  let pointsAmmonia = [];
  let pointsHydrogen = [];

  let distanceX = [];
  let distanceY = [];
  let dispersionsY = [];
  let dispersionsZ = [];
  let concentrationsAmmonia = [];
  let concentrationsHydrogen = [];

  /*   const [distanceX, setDistancesX] = React.useState([]);
    const [distanceY, setDistancesY] = React.useState([]);
    const [dispersionsY, setDispersionsY] = React.useState([]);
    const [dispersionsZ, setDispersionsZ] = React.useState([]);
    const [concentrationsAmmonia, setConcentrationsAmmonia] = React.useState([]);
    const [concentrationsHydrogen, setConcentrationsHydrogen] = React.useState([]); */

  const [wind, setWind] = React.useState('');
  const [degree, setDegree] = React.useState('');

  const updateWindValue = (e) => {
    setWind(e.target.value);
  };

  const updateDegreeValue = (e) => {
    setDegree(e.target.value);
  };

  const calculate = () => {
    // РАСЧЕТ КООРДИНАТ УЗЛОВ СЕТКИ

    /* const grid = [];
    const gridOld = [];

    // Расчет точек замера выше оси X слева
    let lng = position[1];
    let lat = position[0];

    let newLat = position[1];
    let newLng = position[0];
    for (let i = 0; i < 50; i++) {
      lat = position[0];
      newLat =
        position[0] +
        (lng - position[1]) * Math.sin(degree * (3.1415926535 / 180)) +
        (lat - position[0]) * Math.cos(degree * (3.1415926535 / 180));
      for (let j = 0; j < 50; j++) {
        newLng =
          position[1] +
          (lng - position[1]) * Math.cos(degree * (3.1415926535 / 180)) -
          (lat - position[0]) * Math.sin(degree * (3.1415926535 / 180));
        grid.push([newLat, newLng]);
        gridOld.push([lat, lng]);
        lat += stepLat;
        newLat =
          position[0] +
          (lng - position[1]) * Math.sin(degree * (3.1415926535 / 180)) +
          (lat - position[0]) * Math.cos(degree * (3.1415926535 / 180));
      }
      lng -= stepLng;
      newLng =
        position[1] +
        (lng - position[1]) * Math.cos(degree * (3.1415926535 / 180)) -
        (lat - position[0]) * Math.sin(degree * (3.1415926535 / 180));
    }

    // Расчет точек замера ниже оси X слева
    lng += stepLng;
    lat = position[0];

    newLng =
      position[1] +
      (lng - position[1]) * Math.cos(degree * (3.1415926535 / 180)) -
      (lat - position[0]) * Math.sin(degree * (3.1415926535 / 180));
    for (let i = 0; i < 50; i++) {
      lat = position[0];
      newLat =
        position[0] +
        (lng - position[1]) * Math.sin(degree * (3.1415926535 / 180)) +
        (lat - position[0]) * Math.cos(degree * (3.1415926535 / 180));
      for (let j = 0; j < 50; j++) {
        newLng =
          position[1] +
          (lng - position[1]) * Math.cos(degree * (3.1415926535 / 180)) -
          (lat - position[0]) * Math.sin(degree * (3.1415926535 / 180));
        grid.push([newLat, newLng]);
        gridOld.push([lat, lng]);
        lat -= stepLat;
        newLat =
          position[0] +
          (lng - position[1]) * Math.sin(degree * (3.1415926535 / 180)) +
          (lat - position[0]) * Math.cos(degree * (3.1415926535 / 180));
      }
      lng += stepLng;
      newLng =
        position[1] +
        (lng - position[1]) * Math.cos(degree * (3.1415926535 / 180)) -
        (lat - position[0]) * Math.sin(degree * (3.1415926535 / 180));
    }

    // Расчет точек замера выше оси X справа
    lng = position[1];

    newLng =
      position[1] +
      (lng - position[1]) * Math.cos(degree * (3.1415926535 / 180)) -
      (lat - position[0]) * Math.sin(degree * (3.1415926535 / 180));
    for (let i = 0; i < 50; i++) {
      lat = position[0];
      newLat =
        position[0] +
        (lng - position[1]) * Math.sin(degree * (3.1415926535 / 180)) +
        (lat - position[0]) * Math.cos(degree * (3.1415926535 / 180));
      for (let j = 0; j < 50; j++) {
        newLng =
          position[1] +
          (lng - position[1]) * Math.cos(degree * (3.1415926535 / 180)) -
          (lat - position[0]) * Math.sin(degree * (3.1415926535 / 180));
        grid.push([newLat, newLng]);
        gridOld.push([lat, lng]);
        lat += stepLat;
        newLat =
          position[0] +
          (lng - position[1]) * Math.sin(degree * (3.1415926535 / 180)) +
          (lat - position[0]) * Math.cos(degree * (3.1415926535 / 180));
      }
      lng += stepLng;
      newLng =
        position[1] +
        (lng - position[1]) * Math.cos(degree * (3.1415926535 / 180)) -
        (lat - position[0]) * Math.sin(degree * (3.1415926535 / 180));
    }

    // Расчет точек замера ниже оси X справа
    lng -= stepLng;
    lat = position[0];

    newLng =
      position[1] +
      (lng - position[1]) * Math.cos(degree * (3.1415926535 / 180)) -
      (lat - position[0]) * Math.sin(degree * (3.1415926535 / 180));
    for (let i = 0; i < 50; i++) {
      lat = position[0];
      newLat =
        position[0] +
        (lng - position[1]) * Math.sin(degree * (3.1415926535 / 180)) +
        (lat - position[0]) * Math.cos(degree * (3.1415926535 / 180));
      for (let j = 0; j < 50; j++) {
        newLng =
          position[1] +
          (lng - position[1]) * Math.cos(degree * (3.1415926535 / 180)) -
          (lat - position[0]) * Math.sin(degree * (3.1415926535 / 180));
        grid.push([newLat, newLng]);
        gridOld.push([lat, lng]);
        lat -= stepLat;
        newLat =
          position[0] +
          (lng - position[1]) * Math.sin(degree * (3.1415926535 / 180)) +
          (lat - position[0]) * Math.cos(degree * (3.1415926535 / 180));
      }
      lng -= stepLng;
      newLng =
        position[1] +
        (lng - position[1]) * Math.cos(degree * (3.1415926535 / 180)) -
        (lat - position[0]) * Math.sin(degree * (3.1415926535 / 180));
    }

    console.log('СЕТКА: ', grid); */

    const grid = [];

    // Расчет точек замера выше оси X слева
    let lng = position[1] - stepLng;
    let lat = position[0];
    for (let i = 0; i < 50; i++) {
      lat = position[0];
      for (let j = 0; j < 50; j++) {
        grid.push([lat, lng]);
        lat += stepLat;
      }
      lng -= stepLng;
    }

    // Расчет точек замера ниже оси X слева
    lng += stepLng;
    lat = position[0];
    for (let i = 0; i < 50; i++) {
      lat = position[0] - stepLat;
      for (let j = 0; j < 50; j++) {
        grid.push([lat, lng]);
        lat -= stepLat;
      }
      lng += stepLng;
    }

    // Расчет точек замера выше оси X справа
    lng = position[1];
    for (let i = 0; i < 50; i++) {
      lat = position[0];
      for (let j = 0; j < 50; j++) {
        grid.push([lat, lng]);
        lat += stepLat;
      }
      lng += stepLng;
    }

    // Расчет точек замера ниже оси X справа
    lng -= stepLng;
    lat = position[0];
    for (let i = 0; i < 50; i++) {
      lat = position[0] - stepLat;
      for (let j = 0; j < 50; j++) {
        grid.push([lat, lng]);
        lat -= stepLat;
      }
      lng -= stepLng;
    }

    console.log(grid);

    // ПОВОРОТ СЕТКИ

    newGrid = [];
    let newGridObjects = [];
    objects.map((item, index) => {
      for (let i = 0; i < grid.length; i++) {
        let newLng =
          item.coordinates[1] +
          (grid[i][1] - item.coordinates[1]) * Math.cos(degree * (3.1415926535 / 180)) -
          (grid[i][0] - item.coordinates[0]) * Math.sin(degree * (3.1415926535 / 180));

        let newLat =
          item.coordinates[0] +
          (grid[i][1] - item.coordinates[1]) * Math.sin(degree * (3.1415926535 / 180)) +
          (grid[i][0] - item.coordinates[0]) * Math.cos(degree * (3.1415926535 / 180));
        newGrid.push([newLat, newLng]);
      }
      newGridObjects.push(newGrid);
      newGrid = [];

      console.log('newGridObjects: ', newGridObjects);
    });

    console.log('НОВАЯ СЕТКА: ', newGridObjects);

    /* let x1 = [];
      let y1 = [];
      let x2 = [];
      let y2 = [];
      x1.push(position[0] - newLat);
      y1.push(position[1] - newLng);
      x2.push(position[0] - gridCoordinates[i][0]);
      y2.push(position[1] - gridCoordinates[i][1]);
      console.log('x, y: ', x1, x2, y1, y2);
    /* let newLng =
        gridCoordinates[i][1] +
        (position[1] - gridCoordinates[i][1]) * Math.cos(90 * (3.1415926535 / 180)) -
        (position[0] - gridCoordinates[i][0]) * Math.sin(90 * (3.1415926535 / 180));

      let newLat =
        gridCoordinates[i][0] +
        (position[1] - gridCoordinates[i][1]) * Math.sin(90 * (3.1415926535 / 180)) +
        (position[0] - gridCoordinates[i][0]) * Math.cos(90 * (3.1415926535 / 180)); 
      newGrid.push([newLat, newLng]);
    }
    console.log('НОВАЯ СЕТКА: ', newGrid); */

    // РАССЧЕТ РАССТОЯНИЯ ОТ ИСТОЧНИКА ДО УЗЛА СЕТКИ ПО X И Y

    distanceX = [];
    distanceY = [];

    let distsX = [];
    let arrayDistsX = [];
    let distsY = [];
    let arrayDistsY = [];

    objects.map((item, index) => {
      distsX = [];
      for (let i = 0; i < grid.length; i++) {
        let distX = item.coordinates[1] - grid[i][1];
        /* if (distX >= 0) {
          distsX.push(distX);
        } else {
          distX = 0;
          distsX.push(distX);
        } */

        distsX.push(distX);
      }
      arrayDistsX.push(distsX);

      distsY = [];
      for (let i = 0; i < grid.length; i++) {
        let distY = item.coordinates[0] - grid[i][0];

        distsY.push(distY);
      }
      arrayDistsY.push(distsY);
    });

    distanceX.push(arrayDistsX);
    distanceY.push(arrayDistsY);

    console.log('Расстояние по X от источников до узлов: ', arrayDistsX);
    console.log('Расстояние по Y от источников до узлов: ', arrayDistsY);

    // РАСЧЕТ ДИСПЕРСИИ Y И X

    let dispersionY = [];
    let arrayDispY = [];

    let dispersionZ = [];
    let arrayDispZ = [];

    arrayDistsX.map((distX) => {
      dispersionY = [];
      dispersionZ = [];

      for (let i = 0; i < distX.length; i++) {
        let dispY = 0.128 * Math.pow(Math.abs(distX[i]), 0.905);
        dispersionY.push(dispY);

        let dispZ = 0.108 * Math.pow(Math.abs(distX[i]), 0.81);
        dispersionZ.push(dispZ);
      }

      arrayDispY.push(dispersionY);
      arrayDispZ.push(dispersionZ);
    });

    dispersionsY.push(arrayDispY);
    dispersionsZ.push(arrayDispZ);

    console.log('Дисперсия по Y: ', arrayDispY);
    console.log('Дисперсия по Z:', arrayDispZ);

    // РАСЧЕТ КОНЦЕНТРАЦИИ
    // ДЛЯ АММИАКА

    let concAmmonia = [];
    let concentsAmmonia = [];
    let sumConcentrationAmmonia = [];

    console.log(sumConcentrationAmmonia);

    let concHydrogen = [];
    let concentsHydrogen = [];
    let sumConcentrationHydrogen = [];

    console.log(sumConcentrationHydrogen);

    objects.map((obj, index) => {
      concAmmonia = [];
      concHydrogen = [];

      for (let i = 0; i < grid.length; i++) {
        let firstPart =
          obj.powerAmmonia / (2 * Math.PI * wind * arrayDispY[index][i] * arrayDispZ[index][i]);

        let secondPart = Math.exp(
          (-1 * Math.pow(arrayDistsY[index][i], 2)) / (2 * Math.pow(arrayDispY[index][i], 2)),
        );

        let concentration = (firstPart * secondPart) / 10;

        concAmmonia.push(concentration);
      }

      concentsAmmonia.push(concAmmonia);

      for (let i = 0; i < grid.length; i++) {
        let firstPart =
          obj.powerHydrogen / (2 * Math.PI * wind * arrayDispY[index][i] * arrayDispZ[index][i]);

        let secondPart = Math.exp(
          (-1 * Math.pow(arrayDistsY[index][i], 2)) / (2 * Math.pow(arrayDispY[index][i], 2)),
        );

        let concentration = (firstPart * secondPart) / 10;

        concHydrogen.push(concentration);
      }

      concentsHydrogen.push(concHydrogen);

      //   if (concentsAmmonia.length == 0) {
      /* concAmmonia.map((item, index) => {
        concentsAmmonia[index] = item;
      }); */
      // console.log('ПРОШЛО!');
      // console.log('длина: ', concentsAmmonia.length);
      //   }

      /* concentsAmmonia.map((item, index) => {
          concentsAmmonia[index] = item + concAmmonia[index];
        }); */

      //   console.log('concAmmonia: ', concAmmonia);
      //   console.log('concentsAmmonia: ', concentsAmmonia);
    });

    objects.map((item, index) => {
      for (let i = 0; i < grid.length; i++) {
        if (concentsAmmonia[index][i] > 1) {
          pointsAmmonia.push(newGridObjects[index][i]);
        }
      }
    });

    console.log('pointsWithAmmonia: ', pointsAmmonia);

    setPointsWithAmmonia(pointsAmmonia);

    sumConcentrationAmmonia.push(concentsAmmonia);
    sumConcentrationHydrogen.push(concentsHydrogen);

    console.log('Концентрация аммиака 1: ', concentsAmmonia);
    console.log('Концентрация сероводорода 2: ', concentsHydrogen);

    for (let k = 0; k < concentsAmmonia.length; k++) {
      for (let i = 0; i < concentsAmmonia[0].length; i++) {
        for (let j = 1; j < concentsAmmonia.length; j++) {
          sumConcentrationAmmonia[0][k][i] += concentsAmmonia[j][i];
        }
      }
    }

    console.log('СУММА АММИАК 1: ', sumConcentrationAmmonia);
    // console.log('СУММА СЕРОВОДОРОД 2: ', sumConcentrationHydrogen);

    // objects.map((point, index) => {
    //   for (let i = 0; i < grid.length; i++)
    //     if (sumConcentrationAmmonia[0][index][i] <= 7) {
    //       pointsAmmonia.push(grid[i]);
    //     }
    // });

    setGridCoordinates(newGridObjects);
  };

  /* function graham() {
    let minI = 0; //номер нижней левой точки
    let min = gridCoordinates[0][0];
    // ищем нижнюю левую точку
    for (let i = 1; i < gridCoordinates.length; i++) {
      if (gridCoordinates[i][0] < min) {
        min = gridCoordinates[i][0];
        minI = i;
      }
    }
    // делаем нижнюю левую точку активной
    let ch = [];
    ch[0] = minI;
    ch[minI] = 0;

    // сортируем вершины в порядке "левизны"
    for (let i = 1; i < ch.length - 1; i++) {
      for (let j = i + 1; j < ch.length; j++) {
        let cl = classify(
          {
            x1: points[ch[0]].x,
            y1: points[ch[0]].y,
            x2: points[ch[i]].x,
            y2: points[ch[i]].y,
          },
          gridCoordinates[ch[j]][0],
          gridCoordinates[ch[j]][1],
        ); // функция classify считает векторное произведение.

        // если векторное произведение меньше 0, следовательно вершина j левее вершины i.Меняем их местами
        if (cl < 0) {
          let temp = ch[i];
          ch[i] = ch[j];
          ch[j] = temp;
        }
      }
    }

    //записываем в стек вершины, которые точно входят в оболочку
    let h = [];
    h[0] = ch[0];
    h[1] = ch[1];

    for (let i = 2; i < ch.length; i++) {
      while (
        classify(
          {
            x1: points[h[h.length - 2]].x,
            y1: points[h[h.length - 2]].y,
            x2: points[h[h.length - 1]].x,
            y2: points[h[h.length - 1]].y,
          },
          gridCoordinates[ch[i]][0],
          gridCoordinates[ch[i]][1],
        ) < 0
      ) {
        h.pop(); // пока встречается правый поворот, убираем точку из оболочки
      }
      h.push(ch[i]); // добавляем новую точку в оболочку
    }

    setArial(h);
  } */

  return (
    <>
      <Menu calculate={calculate} editWind={updateWindValue} editDegree={updateDegreeValue} />
      <Map
        objects={objects}
        position={position}
        grid={gridCoordinates}
        pointsWithAmmonia={pointsWithAmmonia}
      />
    </>
  );
}
