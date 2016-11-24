import React from 'react';
import { ArrownextIcon } from '../icon/Icon';
import itemCss from '../../../css/components/carCompositionItem.css';
import svgCss from '../../../css/components/svg.css';

const numberColor = color => (
  {
    color: `rgba(${color},1)`,
  }
);

const surroundText = data => (
  data && data.reduce((prev, cur, index) => (
    (index === 0) ? cur : `${prev}、${cur}`
  ), '')
);

const transferText = data => (
  data && data.reduce((prev, cur, index) => {
    const addText = cur['odpt:railway'].name;
    return (index === 0) ? addText : `${prev}、${addText}`;
  }, '')
);

const CarCompositionItem = (props) => {
  const {
    carNum,
    color,
    transferData,
    surroundData,
  } = props;

  return (
    <li className={itemCss.list}>
      <a href="" className={itemCss.item}>
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
      </a>
    </li>
  );
};

export default CarCompositionItem;
