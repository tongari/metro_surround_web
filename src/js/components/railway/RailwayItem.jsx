import React from 'react';
import { NumberingIcon } from '../icon/Icon';
import typoCss from '../../../css/components/typography.css';
import svgCss from '../../../css/components/svg.css';
import railwayCss from '../../../css/components/railway.css';


const RailwayItem = (props) => {
  const {
    apiData,
  } = props;

  return (
    <li className={railwayCss.list}>
      <a href="">
        <i className={`${railwayCss.icon} ${svgCss.red}`}>
          <NumberingIcon />
        </i>
        <span className={`${typoCss.sizeL} ${typoCss.bold}`}>渋谷</span>
        <span className={railwayCss.stationEn}>Shibuya</span>
      </a>
    </li>
  );
};

export default RailwayItem;
