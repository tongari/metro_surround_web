import _ from 'lodash';
import railwayConfig from '../../config/railway';

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

const nearStationList = (lat, lng, list) => {
  const addDistanceList = list.map((item) => {
    const distance = betweenDistance(lat, lng, item.Lat, item.Long);
    const id = item.id;
    const name = item.name;
    const Lat = item.Lat;
    const Long = item.Long;
    return Object.assign({}, { id, name, Lat, Long, distance });
  });
  const sortList = _.sortBy(addDistanceList, 'distance');
  const limitDistanceList = sortList.filter(item => (item.distance <= 2000));
  return (limitDistanceList.length > 20) ? limitDistanceList.slice(0, 20) : limitDistanceList;
};

let map;
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

const stationCollection = (lat, lng) => nearStationList(lat, lng, stationList());

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
    bounds.extend(item.position);
  });
  const currentPoint = new window.google.maps.LatLng(curLat, curLng);
  const adjustLat = (curLat - list[0].position.lat()) + curLat;
  const adjustLng = (curLng - list[0].position.lng()) + curLng;
  const adjustPoint = new window.google.maps.LatLng(adjustLat, adjustLng);
  bounds.extend(currentPoint);
  bounds.extend(adjustPoint);
  map.fitBounds(bounds);
  map.panTo(new window.google.maps.LatLng(curLat, curLng));
};

let showBallon;
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
  const pin = new window.google.maps.Marker({
    map,
    position: { lat, lng },
    title: '現在地',
  });
};

const getCurrentPosition = (onStart, onEnd) => {
  onStart();
  navigator.geolocation.getCurrentPosition(
    (res) => {
      onEnd();
      const lat = res.coords.latitude;
      const lng = res.coords.longitude;
      // const lat = 35.681298;
      // const lng = 139.7662469;
      setCurrentPin(lat, lng);
      const markers = stationMarkerList(stationCollection(lat, lng));
      setStationMarkers(markers);
      adjustInitialMapView(lat, lng, markers);
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

export { getCurrentPosition, isGeoLocation, makeMap };
