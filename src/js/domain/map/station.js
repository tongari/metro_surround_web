/**
 * caution side effect!!!
 */
const state = {
  map: null,
  marker: null,
};

export const makeMarker = (lat, lng) => {
  state.marker = new window.google.maps.Marker({
    position: { lat, lng },
  });
  state.marker.setMap(state.map);
};

export const makeMap = () => {
  state.map = new window.google.maps.Map(document.querySelector('#gStationMap'), {
    center: { lat: 35.681298, lng: 139.7662469 },
    zoom: 17,
    mapTypeControl: false,
    streetViewControl: false,
  });
};

export const moveToCenter = (lat, lng) => {
  if (state.map) {
    state.map.panTo(new window.google.maps.LatLng(lat, lng));
    state.marker.setPosition(new window.google.maps.LatLng(lat, lng));
  }
};
