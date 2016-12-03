import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import { stationList, nearStationList } from '../domain/search/station';

const containerStyle = () => (
  {
    width: window.innerWidth,
    height: window.innerHeight - 50,
  }
);

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
      map,
      position: { lat, lng },
      title: item.name,
    });
  })
);

const adjustInitialMapView = ({ current, near }) => {
  const bounds = new window.google.maps.LatLngBounds();
  const adjustLat = (current.lat() - near.lat()) + current.lat();
  const adjustLng = (current.lng() - near.lng()) + current.lng();
  const adjustPoint = new window.google.maps.LatLng(adjustLat, adjustLng);
  bounds.extend(current);
  bounds.extend(near);
  bounds.extend(adjustPoint);
  map.fitBounds(bounds);
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
  list.forEach((item) => {
    item.setMap(map);
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
      setCurrentPin(lat, lng);
      const markers = stationMarkerList(stationCollection(lat, lng));
      setStationMarkers(markers);
      adjustInitialMapView({
        current: new window.google.maps.LatLng(lat, lng),
        near: markers[0].position,
      });
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

/**
 * MapContainer
 */
class MapContainer extends React.Component {

  componentDidMount() {
    const { bActions } = this.props;
    makeMap();
    if (isGeoLocation()) {
      getCurrentPosition(
        bActions.onStartLoader,
        bActions.onEndLoader
      );
    }
  }

  render() {
    return (
      <div>
        <div id="gMap" style={containerStyle()} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  store: state,
});
const mapDispatchToProps = dispatch => ({
  bActions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
