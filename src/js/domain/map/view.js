import { browserHistory } from 'react-router';
import railwayConfig from '../../config/railway';
import routePath from '../../config/router';
import css from '../../../css/components/map/infoWindow.css';

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
      `<p class="${css.station}">${stationName}</p>`
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

const pinClickHandler = (map, item, showBallon_) => {
  let showBallon = showBallon_;
  item.addListener('click', () => {
    if (showBallon) {
      showBallon.close();
    }
    showBallon = ballon(item.title, trimDistance(item.distance), item.isSameStation);
    showBallon.open(map, item);
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
  list.forEach((item) => {
    bounds.extend(new window.google.maps.LatLng(item.Lat, item.Long));
  });
  const currentPoint = new window.google.maps.LatLng(curLat, curLng);
  const adjustLat = (curLat - list[0].Lat) + curLat;
  const adjustLng = (curLng - list[0].Long) + curLng;
  const adjustPoint = new window.google.maps.LatLng(adjustLat, adjustLng);
  bounds.extend(currentPoint);
  bounds.extend(adjustPoint);
  map.fitBounds(bounds);
  map.panTo(new window.google.maps.LatLng(curLat, curLng));
};

export const setStationMarkers = (map, list, showBallon) => {
  list.forEach((item, index) => {
    const time = 50 * (index + 1);
    setTimeout(() => {
      item.setMap(map);
    }, time);
    pinClickHandler(map, item, showBallon);
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
