import * as view from './view';
import * as vm from './viewModel';

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

const setStationInfo = (lat, lng) => {
  view.clearMarkers(state.markers, state.currentMarker);
  view.setCurrentPin(state.map, lat, lng);
  state.markers = vm.stationMarkerList(vm.stationCollection(lat, lng, 5000));
  const rangePoints = vm.stationCollection(lat, lng, 2000);
  view.setStationMarkers(state.map, vm.removeSameStation(state.markers), state.showBallon);
  view.adjustInitialMapView(state.map, lat, lng, rangePoints);
  state.curCenterLat = lat;
  state.curCenterLng = lng;
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
      onUpdate(vm.stationCollection(lat, lng, 5000));
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
    onUpdate(vm.stationCollection(centerPoint.lat(), centerPoint.lng(), 5000));
  }
);

export const isGeoLocation = () => navigator.geolocation;

export const moveToCenter = () => (
  state.map.panTo(new window.google.maps.LatLng(state.curCenterLat, state.curCenterLng))
);

export const makeMap = () => {
  state.map = view.makeMap();
};
