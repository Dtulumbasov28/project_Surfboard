// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
let myMap;

const init = () => {
  const myMap = new ymaps.Map("map", {
    center: [45.03547, 38.975313],
    zoom: 12,
    controls: [],
  });

  const coords = [
    [45.017961, 39.048824],
    [45.046871, 38.980029],
    [45.041186, 39.032093],
    [45.034333, 39.138979],
  ];

  const myCollection = new ymaps.GeoObjectCollection(
    {},
    {
      draggable: false,
      iconLayout: "default#image",
      iconImageHref: "./icons/marker.svg",
      iconImageSize: [38, 53],
      iconImageOffset: [-35, -52],
    }
  );

  coords.forEach((coord) => {
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable("scrollZoom");
};

ymaps.ready(init);
