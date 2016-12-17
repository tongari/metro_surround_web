import React from 'react';
import { ArrownextIcon, ToLinkIcon } from '../icon/Icon';
import NearStationTitle from './NearStationTitle';
import css from '../../../css/components/map/nearStation.css';
import svgCss from '../../../css/components/svg.css';
import { invokeNativeMap } from '../../domain/map/index';
import { makeMap, makeMarker, moveToCenter } from '../../domain/map/station';


const mapStyle = ({ width }) => (
  {
    width,
    height: '200px',
  }
);


class NearStation extends React.Component {
  componentDidMount() {
    const { Lat, Long } = this.props;
    makeMap();
    makeMarker(Lat, Long);
  }

  render() {
    const {
      distance,
      railwayId,
      name,
      Lat,
      Long,
      hideNearStation,
      screenSize,
    } = this.props;

    moveToCenter(Lat, Long);
    return (
      <div>
        <NearStationTitle
          railwayId={railwayId}
          station={name}
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
            <a href={invokeNativeMap(Lat, Long)} target="_new">
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
