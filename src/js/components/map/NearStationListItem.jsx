import React from 'react';
import { NumberingIcon } from '../icon/Icon';
import typoCss from '../../../css/components/typography.css';
import svgCss from '../../../css/components/svg.css';
import css from '../../../css/components/map/nearStationList.css';
import railwayConfig from '../../config/railway';

const svgColor = index => (
  {
    color: `rgba(${railwayConfig[index].color},1)`,
  }
);

const NearStationListItem = (props) => {
  const { station, stationEn, distance, railwayId } = props;
  return (
    <li className={css.list}>
      <a href="">
        <i className={`${css.icon} ${svgCss.colorInherit}`} style={svgColor(railwayId)}>
          <NumberingIcon />
        </i>
        <div>
          <p className={`${typoCss.sizeLL} ${typoCss.bold} ${typoCss.lineOne}`}>{station}</p>
          <p className={`${css.stationEn} ${typoCss.lineOne}`}>{stationEn}</p>
        </div>
        <p className={`${typoCss.alignR} ${css.distance}`}>およそ{Math.round(distance)}m先</p>
      </a>
    </li>
  );
};

export default NearStationListItem;
