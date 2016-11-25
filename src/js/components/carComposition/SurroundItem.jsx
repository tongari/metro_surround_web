import React from 'react';
import itemCss from '../../../css/components/carCompositionItem.css';

const SurroundItem = (props) => {
  const {
    surroundText,
  } = props;

  return (
    <li className={itemCss.list}>
      <div className={itemCss.carCompositionDetailItem}>
        <div className={itemCss.transferIconContainer} />
        <p>{surroundText}</p>
      </div>
    </li>
  );
};

export default SurroundItem;
