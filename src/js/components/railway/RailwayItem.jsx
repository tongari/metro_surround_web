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

const RailwayItem = (props) => {
  const {
    index,
    apiData,
  } = props;

  return (
    <li className={railwayCss.list}>
      <a href="">
        <i className={`${railwayCss.icon} ${svgCss.colorInherit}`} style={svgColor(index)}>
          <NumberingIcon />
        </i>
        <span className={`${typoCss.sizeLL} ${typoCss.bold}`}>渋谷</span>
        <span className={railwayCss.stationEn}>Shibuya</span>
      </a>
    </li>
  );
};

export default RailwayItem;
