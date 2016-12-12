import React from 'react';
import { ListIcon, ArrownextIcon } from '../../components/icon/Icon';
import css from '../../../css/components/map/nearStationBox.css';
import svgCss from '../../../css/components/svg.css';
import typoCss from '../../../css/components/typography.css';

const NearStationBox = (props) => {
  const { station, stationEn, distance, showNearStationList } = props;
  return (
    <div className={css.container}>
      <a href="" className={css.infoBox}>
        <div>
          <p className={`${typoCss.sizeL} ${typoCss.bold}`}>{station}</p>
          <p className={`${typoCss.sizeS} ${typoCss.bold}`}>{stationEn}</p>
        </div>
        <div className={css.distanceInfo}>
          <p>およそ{distance}m</p>
          <i className={`${css.arrowIcon} ${svgCss.gray}`}>
            <ArrownextIcon />
          </i>
        </div>
      </a>
      <a href="" className={css.listIconBox} onClick={showNearStationList}>
        <i className={`${css.listIcon} ${svgCss.white}`}>
          <ListIcon />
        </i>
      </a>
    </div>
  );
};

export default NearStationBox;
