import React from 'react';
import { ArrownextIcon, ToLinkIcon } from '../icon/Icon';
import NearStationTitle from './NearStationTitle';
import css from '../../../css/components/map/nearStation.css';
import svgCss from '../../../css/components/svg.css';
import { makeMap, makeMarker, moveToCenter } from '../../domain/map/station';


const containerStyle = isVisible => (
  {
    visibility: (isVisible) ? 'visible' : 'hidden',
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
  }
);

const mapStyle = ({ width }) => (
  {
    width,
    height: '200px',
  }
);

class NearStation extends React.Component {
  componentDidMount() {
    const { lat, lng } = this.props;
    makeMap();
    makeMarker(lat, lng);
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
