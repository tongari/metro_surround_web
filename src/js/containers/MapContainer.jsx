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
  map = new window.google.maps.Map(document.getElementById('gMap'), {
    center: { lat: 35.681298, lng: 139.7662469 },
    zoom: 8,
    mapTypeControl: false,
    streetViewControl: false,
  });
};

const getCurrentPosition = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      const lat = res.coords.latitude;
      const lng = res.coords.longitude;
      map.setCenter({
        lat,
        lng,
      });
      map.setZoom(16);
      console.log(nearStationList(lat, lng, stationList()));
    },
    (error) => {
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
    makeMap();
    if (isGeoLocation()) getCurrentPosition();
  }

  render() {
    // const { store, bActions } = this.props;
    return (
      <div id="gMap" style={containerStyle()} />
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
