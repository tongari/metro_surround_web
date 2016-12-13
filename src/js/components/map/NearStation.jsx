import React from 'react';
import { ArrownextIcon, ToLinkIcon } from '../icon/Icon';
import NearStationTitle from './NearStationTitle';
import css from '../../../css/components/map/nearStation.css';
import svgCss from '../../../css/components/svg.css';

const state = {
  map: null,
  marker: null,
};

const containerStyle = isVisible => (
  {
    visibility: (isVisible) ? 'visible' : 'hidden',
    position: 'absolute',
    zIndex: -1,
  }
);

const makeMap = () => (
  new window.google.maps.Map(document.querySelector('#gStationMap'), {
    center: { lat: 35.681298, lng: 139.7662469 },
    zoom: 17,
    mapTypeControl: false,
    streetViewControl: false,
  })
);

const setMap = () => {
  if (!state.map) {
    state.map = makeMap();
  }
};

const mapStyle = ({ width }) => (
  {
    width,
    height: '200px',
  }
);

const makeMarker = (lat, lng) => (
  new window.google.maps.Marker({
    position: { lat, lng },
  })
);

const setMarker = (lat = 35.681298, lng = 139.7662469) => {
  if (!state.marker) {
    state.marker = makeMarker(lat, lng);
    state.marker.setMap(state.map);
  }
};

const moveToCenter = (lat, lng) => {
  if (state.map) {
    state.map.panTo(new window.google.maps.LatLng(lat, lng));
    state.marker.setPosition(new window.google.maps.LatLng(lat, lng));
  }
};

class NearStation extends React.Component {
  componentDidMount() {
    const { lat, lng } = this.props;
    setMap();
    setMarker(lat, lng);
  }
  render() {
    const {
      isVisible,
      distance,
      railwayId,
      station,
      lat,
      lng,
      hideNearStation,
      screenSize,
    } = this.props;

    moveToCenter(lat, lng);
    return (
      <div style={containerStyle(isVisible)}>
        <NearStationTitle
          railwayId={railwayId}
          station={station}
          hideNearStation={hideNearStation}
        />
        <div id="gStationMap" style={mapStyle(screenSize)} />
        <ul>
          <li className={css.list}>
            <p>検索地点からおよそ{Math.round(distance)}m</p>
          </li>
          <li className={css.list}>
            <a href="">
              <span>この駅の車両情報を確認する</span>
              <i className={`${css.nextIcon} ${svgCss.gray}`}>
                <ArrownextIcon />
              </i>
            </a>
          </li>
          <li className={css.list}>
            <a href="">
              <span>この路線の駅一覧を確認する</span>
              <i className={`${css.nextIcon} ${svgCss.gray}`}>
                <ArrownextIcon />
              </i>
            </a>
          </li>
          <li className={css.list}>
            <a href="">
              <span>地図アプリで行き方を調べる</span>
              <i className={`${css.toLinkIcon} ${svgCss.gray}`}>
                <ToLinkIcon />
              </i>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default NearStation;
