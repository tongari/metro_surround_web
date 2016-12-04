import _ from 'lodash';
import railwayConfig from '../../config/railway';

/**
 * caution effective!!
 */
let map;
let curCenterLat;
let curCenterLng;
let showBallon;
let markers;
let currentMarker;

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
    return Object.assign({}, { id, name, Lat, Long, distance });
  });
  const sortList = _.sortBy(addDistanceList, 'distance');
  const limitDistanceList = sortList.filter(item => (item.distance <= distance_));
  return (limitDistanceList.length > 20) ? limitDistanceList.slice(0, 20) : limitDistanceList;
};

const makeMap = () => {
  map = new window.google.maps.Map(document.querySelector('#gMap'), {
    center: { lat: 35.681298, lng: 139.7662469 }, // default point tokyo station
    zoom: 8,
    mapTypeControl: false,
    streetViewControl: false,
  });
};

const ballon = stationName => (
  new window.google.maps.InfoWindow({
    content: `<p>${stationName}</p>`,
  })
);

const stationCollection = (lat, lng, distance_) => (
  nearStationList(lat, lng, stationList(), distance_)
);

const stationMarkerList = list => (
  list.map((item) => {
    const lat = item.Lat;
    const lng = item.Long;
    return new window.google.maps.Marker({
      position: { lat, lng },
      title: item.name,
      animation: window.google.maps.Animation.DROP,
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
  map.fitBounds(bounds);
  map.panTo(new window.google.maps.LatLng(curLat, curLng));
};

const pinClickHandler = (item) => {
  item.addListener('click', () => {
    if (showBallon) showBallon.close();
    showBallon = ballon(item.title);
    showBallon.open(map, item);
  });
};

const setStationMarkers = (list) => {
  list.forEach((item, index) => {
    const time = 50 * (index + 1);
    setTimeout(() => {
      item.setMap(map);
    }, time);
    pinClickHandler(item);
  });
};

const setCurrentPin = (lat, lng) => {
  map.setCenter({ lat, lng });
  currentMarker = new window.google.maps.Marker({
    map,
    position: { lat, lng },
    title: '現在地',
  });
};

const clearMarkers = () => {
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


const searchCurrentPoint = (onStart, onEnd) => {
  onStart();
  navigator.geolocation.getCurrentPosition(
    (res) => {
      onEnd();
      const lat = res.coords.latitude;
      const lng = res.coords.longitude;
      // const lat = 35.681298;
      // const lng = 139.7662469;
      clearMarkers();
      setCurrentPin(lat, lng);
      markers = stationMarkerList(stationCollection(lat, lng, 5000));
      const rangePoints = stationCollection(lat, lng, 2000);
      setStationMarkers(markers);
      adjustInitialMapView(lat, lng, rangePoints);

      curCenterLat = lat;
      curCenterLng = lng;
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

const moveToCenter = () => map.panTo(new window.google.maps.LatLng(curCenterLat, curCenterLng));

const searchCenter = () => {
  const centerPoint = map.getCenter();
  clearMarkers();
  setCurrentPin(centerPoint.lat(), centerPoint.lng());
  markers = stationMarkerList(stationCollection(centerPoint.lat(), centerPoint.lng(), 5000));
  const rangePoints = stationCollection(centerPoint.lat(), centerPoint.lng(), 2000);
  setStationMarkers(markers);
  adjustInitialMapView(centerPoint.lat(), centerPoint.lng(), rangePoints);

  curCenterLat = centerPoint.lat();
  curCenterLng = centerPoint.lng();
};

export { searchCurrentPoint, isGeoLocation, makeMap, moveToCenter, searchCenter };
