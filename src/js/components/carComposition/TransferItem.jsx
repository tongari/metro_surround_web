import React from 'react';
import { NumberingIcon } from '../icon/Icon';
import itemCss from '../../../css/components/carCompositionItem.css';
import svgCss from '../../../css/components/svg.css';
import railwayConfig from '../../config/railway';

const svgColor = color => (
  {
    color: `rgba(${color},1)`,
  }
);

const icon = (railwayId) => {
  if (railwayId) {
    return (
      <i
        className={`${itemCss.transferIcon} ${svgCss.colorInherit}`}
        style={svgColor(railwayConfig[railwayId].color)}
      >
        <NumberingIcon />
      </i>
    );
  }
  return null;
};

const TransferItem = (props) => {
  const {
    transferData,
  } = props;

  return (
    <li className={itemCss.list}>
      <div className={itemCss.carCompositionDetailItem}>
        <div className={itemCss.transferIconContainer}>
          {icon(transferData['odpt:railway'].railwayId)}
        </div>
        <p>{transferData['odpt:railway'].name} - {transferData['odpt:necessaryTime']}分</p>
      </div>
    </li>
  );
};

export default TransferItem;
