import React from 'react';
import { Link } from 'react-router';
import routerPath from '../../config/router';
import { ListIcon, ArrownextIcon } from '../../components/icon/Icon';
import css from '../../../css/components/map/nearStationBox.css';
import svgCss from '../../../css/components/svg.css';
import typoCss from '../../../css/components/typography.css';

const clickHandler = ({ name, id, distance, railwayId, Lat, Long, showNearStation }) => (
  (e) => {
    e.preventDefault();
    showNearStation({ name, id, distance, railwayId, Lat, Long });
  }
);

const NearStationBox = (props) => {
  const { name, id, distance } = props;
  return (
    <div className={css.container}>
      <a href="" className={css.infoBox} onClick={clickHandler(props)}>
        <div>
          <p className={`${typoCss.sizeL} ${typoCss.bold}`}>{name}</p>
          <p className={`${typoCss.sizeS} ${typoCss.bold}`}>{id}</p>
        </div>
        <div className={css.distanceInfo}>
          <p>およそ{Math.round(distance)}m</p>
          <i className={`${css.arrowIcon} ${svgCss.gray}`}>
            <ArrownextIcon />
          </i>
        </div>
      </a>
      <Link to={routerPath.NEAR_STATION_LIST} className={css.listIconBox}>
        <i className={`${css.listIcon} ${svgCss.white}`}>
          <ListIcon />
        </i>
      </Link>
    </div>
  );
};

export default NearStationBox;
