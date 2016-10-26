import React from 'react';
import { NumberingIcon } from './icon/Icon';
import typoCss from '../../css/components/typography.css';
import svgCss from '../../css/components/svg.css';
import railwayCss from '../../css/components/railway.css';

const Railway = (props) => {
  const {
    apiData,
  } = props;

  return (
    <div>
      <h1 className={`${railwayCss.title} ${railwayCss.ginzaBackground}`}>
        駅を選んでください
      </h1>
      <ul>
        <li className={railwayCss.list}>
          <a href="">
            <i className={`${railwayCss.icon} ${svgCss.red}`}>
              <NumberingIcon />
            </i>
            <span className={`${typoCss.sizeL} ${typoCss.bold}`}>渋谷</span>
            <span className={railwayCss.stationEn}>Shibuya</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Railway;
