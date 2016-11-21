import React from 'react';
import itemCss from '../../../css/components/carCompositionItem.css';

const numberColor = color => (
  {
    color: `rgba(${color},0.5)`,
  }
);

const CarCompositionEmptyItem = (props) => {
  const {
    carNum,
    color,
  } = props;

  return (
    <li className={itemCss.list}>
      <div className={itemCss.emptyItem}>
        <p className={itemCss.numSmall} style={numberColor(color)}>{carNum}</p>
      </div>
    </li>
  );
};

export default CarCompositionEmptyItem;
