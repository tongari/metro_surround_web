import { browserHistory } from 'react-router';
import railwayConfig from '../../config/railway';
import routePath from '../../config/router';
import css from '../../../css/components/map/infoWindow.css';

/**
 * caution effective!!
 */
const state = {
  showBallon: null,
};

const setBallonClickHandler = () => {
  const ballonItem = document.querySelector('.js-ballon');
  ballonItem.addEventListener('click', (e) => {
    e.preventDefault();
    browserHistory.push('/');
  });
};

const setNumberingColor = (color) => {
  const numbering = document.querySelector('.js-ballon-numbering');
  if (numbering) numbering.style.borderColor = color;
};

const numberingColor = railwayId => `rgba(${railwayConfig[railwayId].color},1)`;
const trimDistance = distance => Math.round(distance);

const ballonNumbering = (isSameStation, stationName) => {
  if (isSameStation) {
    return (
      `<p style="padding-top: 0.2em;">${stationName}</p>`
    );
  }
  return (
      `<div class="${css.iconBox}">
        <i class="${css.icon} js-ballon-numbering"></i>
      </div>
      <p class="${css.station}">${stationName}</p>`
  );
};

const ballon = (stationName, distance, isSameStation) => (
  new window.google.maps.InfoWindow({
    content: `<a href="#" class="${css.container} js-ballon">
                <div class="${css.body}">
                  ${ballonNumbering(isSameStation, stationName)}
                </div>
              <p class="${css.distance}">およそ${distance}m先</p>
             </a>`,
  })
);

const pinClickHandler = (map, item) => {
  item.addListener('click', () => {
    if (state.showBallon) {
      state.showBallon.close();
    }
    state.showBallon = ballon(item.title, trimDistance(item.distance), item.isSameStation);
    state.showBallon.open(map, item);

    setTimeout(setBallonClickHandler, 250);
    setTimeout(() => {
      setNumberingColor(numberingColor(item.railwayId));
    }, 250);
  });
};

/** --------------------------------------------------
 * export method
 --------------------------------------------------*/
export const adjustInitialMapView = (map, curLat, curLng, list) => {
  const bounds = new window.google.maps.LatLngBounds();
  const currentPoint = new window.google.maps.LatLng(curLat, curLng);

  const nearPoint = (list.length === 0) ?
    new window.google.maps.LatLng(list[0].position.lat(), list[0].position.lng()) :
    new window.google.maps.LatLng(list[1].position.lat(), list[1].position.lng());

  const adjustLat = (list.length === 0) ?
  (curLat - list[0].position.lat()) + curLat :
  (curLat - list[1].position.lat()) + curLat;

  const adjustLng = (list.length === 0) ?
  (curLng - list[0].position.lng()) + curLng :
  (curLng - list[1].position.lng()) + curLng;

  const adjustPoint = new window.google.maps.LatLng(adjustLat, adjustLng);

  bounds.extend(currentPoint);
  bounds.extend(nearPoint);
  bounds.extend(adjustPoint);
  map.fitBounds(bounds);
  map.panTo(new window.google.maps.LatLng(curLat, curLng));
};

export const setStationMarkers = (map, list) => {
  list.forEach((item, index) => {
    const time = 50 * (index + 1);
    setTimeout(() => {
      item.setMap(map);
    }, time);
    pinClickHandler(map, item);
  });
};

export const setCurrentPin = (map, lat, lng) => {
  map.setCenter({ lat, lng });

  const icon = new window.google.maps.MarkerImage(require('../../../asset/img/current-pin.png'),
    new window.google.maps.Size(40, 40),
    new window.google.maps.Point(0, 0),
    new window.google.maps.Point(20, 40),
  );
  return new window.google.maps.Marker({
    map,
    position: { lat, lng },
    title: '現在地',
    icon,
  });
};

export const clearMarkers = (markers_, currentMarker_) => {
  let markers = markers_;
  let currentMarker = currentMarker_;

  if (markers) {
    markers.forEach((item) => {
      item.setMap(null);
      markers = [];
    });
  }

  if (currentMarker) {
    currentMarker.setMap(null);
    currentMarker = null;
  }
};

export const makeMap = () => (
  new window.google.maps.Map(document.querySelector('#gMap'), {
    center: { lat: 35.681298, lng: 139.7662469 }, // default point tokyo station
    zoom: 8,
    mapTypeControl: false,
    streetViewControl: false,
  })
);
