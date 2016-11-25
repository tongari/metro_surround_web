import React from 'react';
import { Link } from 'react-router';
import { ArrownextIcon } from '../icon/Icon';
import itemCss from '../../../css/components/carCompositionItem.css';
import svgCss from '../../../css/components/svg.css';
import routerPath from '../../config/router';
import queryCollection from '../../domain/utils/queryCollection';

const numberColor = color => (
  {
    color: `rgba(${color},1)`,
  }
);

const surroundText = (data) => {
  if (data) {
    return data.reduce((prev, cur, index) => (
      (index === 0) ? cur : `${prev}、${cur}`
    ), '');
  }
  return '-';
};

const transferText = (data) => {
  if (data) {
    return data.reduce((prev, cur, index) => {
      const addText = cur['odpt:railway'].name;
      return (index === 0) ? addText : `${prev}、${addText}`;
    }, '');
  }
  return '-';
};

const CarCompositionItem = (props) => {
  const {
    carNum,
    color,
    direction,
    transferData,
    surroundData,
  } = props;

  const queryObj = queryCollection();

  return (
    <li className={itemCss.list}>
      <Link to={`${routerPath.CAR_COMPOSITION}?railway=${queryObj.railway}&station=${queryObj.station}&direction=${direction}&num=${carNum}`} className={itemCss.item}>
        <p className={itemCss.num} style={numberColor(color)}>{carNum}</p>
        <div className={itemCss.body}>
          <div className={itemCss.textContainer}>
            <p className={itemCss.text}>
              <span className={itemCss.textIcon}>乗り換え</span>
              <span>{transferText(transferData)}</span>
            </p>
            <p className={itemCss.text}>
              <span className={itemCss.textIcon}>周辺施設</span>
              <span>{surroundText(surroundData)}</span>
            </p>
          </div>
        </div>
        <i className={`${itemCss.nextIcon} ${svgCss.gray}`}>
          <ArrownextIcon />
        </i>
      </Link>
    </li>
  );
};

export default CarCompositionItem;
