import { browserHistory } from 'react-router';
import _ from 'lodash';
import railwayConfig from '../../config/railway';
import routePath from '../../config/router';

/**
 * caution effective!!
 */
const state = {
  map: null,
  curCenterLat: 0,
  curCenterLng: 0,
  showBallon: null,
  markers: [],
  currentMarker: null,
};

const stationList = () => {
  const result = [];
  const station = railwayConfig.map(item => item.station);
  station.forEach((item) => {
    item.forEach((item_) => {
      result.push(item_);
    });
  });
  return result;
};

const betweenDistance = (startLat, startLng, endLat, endLng) => (
  window.google.maps.geometry.spherical.computeDistanceBetween(
    new window.google.maps.LatLng(startLat, startLng), new window.google.maps.LatLng(endLat, endLng)
  )
);

const nearStationList = (lat, lng, list, distance_) => {
  const addDistanceList = list.map((item) => {
    const distance = betweenDistance(lat, lng, item.Lat, item.Long);
    const id = item.id;
    const name = item.name;
    const Lat = item.Lat;
    const Long = item.Long;
    const railwayId = item.railwayId;
    return Object.assign({}, { id, name, Lat, Long, distance, railwayId });
  });
  const sortList = _.sortBy(addDistanceList, 'distance');
  const limitDistanceList = sortList.filter(item => (item.distance <= distance_));
  return (limitDistanceList.length > 20) ? limitDistanceList.slice(0, 20) : limitDistanceList;
};

const makeMap = () => {
  state.map = new window.google.maps.Map(document.querySelector('#gMap'), {
    center: { lat: 35.681298, lng: 139.7662469 }, // default point tokyo station
    zoom: 8,
    mapTypeControl: false,
    streetViewControl: false,
  });
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
  numbering.style.borderColor = color;
};

const numberingColor = railwayId => `rgba(${railwayConfig[railwayId].color},1)`;
const trimDistance = distance => Math.round(distance);

const ballon = (stationName, distance) => (
  new window.google.maps.InfoWindow({
    content: `<a href="#" class="js-ballon" style="color: #000;">
                <div style="display: table; width: 100%;">
                  <div style="display: table-cell; width: 18px; vertical-align: middle;">
                    <i style="display:inline-block; width:18px; height: 18px; border: 2px solid; #000; border-radius: 50%; vertical-align: middle;" class="js-ballon-numbering"></i>
                  </div>
                  <p style="display: table-cell; vertical-align: middle; padding: 0.2em 0 0 0.5em;">${stationName}</p>
                </div>
              <p style="margin-top: 8px;">およそ${distance}m先</p>
             </a>`,
  })
);

const stationCollection = (lat, lng, distance_) => (
  nearStationList(lat, lng, stationList(), distance_)
);

const stationMarkerList = list => (
  list.map((item, index) => {
    const lat = item.Lat;
    const lng = item.Long;
    const icon = require('../../../asset/img/pin.png');
    return new window.google.maps.Marker({
      position: { lat, lng },
      title: item.name,
      id: item.id,
      railwayId: item.railwayId,
      distance: item.distance,
      animation: window.google.maps.Animation.DROP,
      icon,
      zIndex: (900 + index),
    });
  })
);

const adjustInitialMapView = (curLat, curLng, list) => {
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
  state.map.fitBounds(bounds);
  state.map.panTo(new window.google.maps.LatLng(curLat, curLng));
};

const pinClickHandler = (item) => {
  item.addListener('click', () => {
    if (state.showBallon) {
      state.showBallon.close();
    }
    state.showBallon = ballon(item.title, trimDistance(item.distance));
    state.showBallon.open(state.map, item);
    setTimeout(setBallonClickHandler, 250);
    setTimeout(() => {
      setNumberingColor(numberingColor(item.railwayId));
    }, 250);
  });
};

const setStationMarkers = (list) => {
  list.forEach((item, index) => {
    const time = 50 * (index + 1);
    setTimeout(() => {
      item.setMap(state.map);
    }, time);
    pinClickHandler(item);
  });
};

const setCurrentPin = (lat, lng) => {
  state.map.setCenter({ lat, lng });

  const icon = new window.google.maps.MarkerImage(require('../../../asset/img/current-pin.png'),
    new window.google.maps.Size(40, 40),
    new window.google.maps.Point(0, 0),
    new window.google.maps.Point(20, 40),
  );
  state.currentMarker = new window.google.maps.Marker({
    map: state.map,
    position: { lat, lng },
    title: '現在地',
    icon,
  });
};

const clearMarkers = () => {
  if (state.markers) {
    state.markers.forEach((item) => {
      item.setMap(null);
      state.markers = [];
    });
  }

  if (state.currentMarker) {
    state.currentMarker.setMap(null);
    state.currentMarker = null;
  }
};


const searchCurrentPoint = (onStart, onEnd) => {
  onStart();
  navigator.geolocation.getCurrentPosition(
    (res) => {
      onEnd();
      const lat = res.coords.latitude;
      const lng = res.coords.longitude;
      clearMarkers();
      setCurrentPin(lat, lng);
      state.markers = stationMarkerList(stationCollection(lat, lng, 5000));
      const rangePoints = stationCollection(lat, lng, 2000);
      setStationMarkers(state.markers);
      adjustInitialMapView(lat, lng, rangePoints);

      state.curCenterLat = lat;
      state.curCenterLng = lng;
    },
    (error) => {
      onEnd();
      let errorText = '現在値が取得できませんでした。\nお手数ですが再度、お試しください。';
      if (error.code === 1) {
        errorText = '位置情報の取得が許可されませんでした。';
      }
      window.alert(errorText);
    },
    {
      timeout: 8000,
      maximumAge: 5000,
    }
  );
};

const isGeoLocation = () => navigator.geolocation;

const moveToCenter = () => (
  state.map.panTo(new window.google.maps.LatLng(state.curCenterLat, state.curCenterLng))
);

const searchCenter = () => {
  const centerPoint = state.map.getCenter();
  clearMarkers();
  setCurrentPin(centerPoint.lat(), centerPoint.lng());
  state.markers = stationMarkerList(stationCollection(centerPoint.lat(), centerPoint.lng(), 5000));
  const rangePoints = stationCollection(centerPoint.lat(), centerPoint.lng(), 2000);
  setStationMarkers(state.markers);
  adjustInitialMapView(centerPoint.lat(), centerPoint.lng(), rangePoints);

  state.curCenterLat = centerPoint.lat();
  state.curCenterLng = centerPoint.lng();
};

export { searchCurrentPoint, isGeoLocation, makeMap, moveToCenter, searchCenter };
