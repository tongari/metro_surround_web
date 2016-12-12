import React from 'react';
import { NumberingIcon } from '../icon/Icon';
import typoCss from '../../../css/components/typography.css';
import svgCss from '../../../css/components/svg.css';
import railwayCss from '../../../css/components/railway.css';
import railwayConfig from '../../config/railway';

const svgColor = index => (
  {
    color: `rgba(${railwayConfig[index].color},1)`,
  }
);

const NearStationListItem = (props) => {
  const { station, stationEn, distance, railwayId } = props;
  return (
    <li className={railwayCss.list}>
      <a href="">
        <i className={`${railwayCss.icon} ${svgCss.colorInherit}`} style={svgColor(railwayId)}>
          <NumberingIcon />
        </i>
        <span className={`${typoCss.sizeLL} ${typoCss.bold}`}>{station}</span>
        <span className={railwayCss.stationEn}>{stationEn}</span>
        <p>{Math.round(distance)}</p>
      </a>
    </li>
  );
};

export default NearStationListItem;
