import * as view from './view';
import * as vm from './viewModel';
import { isIOS } from '../utils/ua';

/**
 * caution side effect!!!
 */
const state = {
  map: null,
  curCenterLat: 0,
  curCenterLng: 0,
  markers: [],
  currentMarker: null,
};

const setStationInfo = (lat, lng) => {
  state.curCenterLat = lat;
  state.curCenterLng = lng;
  view.clearMarkers(state.markers, state.currentMarker);
  state.currentMarker = view.setCurrentPin(state.map, lat, lng);
  state.markers = vm.stationMarkerList(vm.stationCollection(lat, lng, 5000));
  if (state.markers.length === 0) return;
  const rangePoints = vm.removeSameStation(state.markers);
  view.setStationMarkers(state.map, rangePoints);
  view.adjustInitialMapView(state.map, lat, lng, rangePoints);
};

const isNoNearStation = list => (list.length === 0);
const alertNoNearStation = (isNoStation) => {
  if (isNoStation) window.alert('検索地点周辺には\n東京メトロの駅がありませんでした。');
};

/** --------------------------------------------------
 * export method
 --------------------------------------------------*/

export const searchCurrentPoint = (onStart, onEnd, onUpdate) => {
  onStart();
  navigator.geolocation.getCurrentPosition(
    (res) => {
      onEnd();
      const lat = res.coords.latitude;
      const lng = res.coords.longitude;
      setStationInfo(lat, lng);
      const isNoStation = isNoNearStation(state.markers);
      if (!isNoStation) onUpdate(vm.stationCollection(lat, lng, 5000));
      alertNoNearStation(isNoStation);
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

export const searchCenter = onUpdate => (
  () => {
    const centerPoint = state.map.getCenter();
    setStationInfo(centerPoint.lat(), centerPoint.lng());
    const isNoStation = isNoNearStation(state.markers);
    if (!isNoStation) onUpdate(vm.stationCollection(centerPoint.lat(), centerPoint.lng(), 5000));
    alertNoNearStation(isNoStation);
  }
);

export const isGeoLocation = () => navigator.geolocation;

export const moveToCenter = () => (
  state.map.panTo(new window.google.maps.LatLng(state.curCenterLat, state.curCenterLng))
);

export const makeMap = () => {
  state.map = view.makeMap();
};

export const getCurrentPoint = () => (
  {
    lat: state.curCenterLat,
    lng: state.curCenterLng,
  }
);

export const invokeNativeMap = (lat, lng) => {
  const url = (isIOS()) ? 'http://maps.apple.com/maps' : 'http://maps.google.com/maps';
  return `${url}?saddr=${getCurrentPoint().lat},${getCurrentPoint().lng}&daddr=${lat},${lng}`;
};
