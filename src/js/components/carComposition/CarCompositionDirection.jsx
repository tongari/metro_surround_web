import React from 'react';
import { DirectionIcon, DownDirectionIcon } from '../icon/Icon';
import carCompositionCss from '../../../css/components/carComposition.css';
import svgCss from '../../../css/components/svg.css';

const svgColor = color => (
  {
    color: `rgba(${color},1)`,
  }
);

const setIcon = isDown => (
  (isDown) ? <DownDirectionIcon /> : <DirectionIcon />
);

const CarCompositionDirection = (props) => {
  const {
    name,
    color,
    isDown,
  } = props;

  return (
    <h2 className={carCompositionCss.directionArea}>
      <i className={`${carCompositionCss.directionIcon} ${svgCss.colorInherit}`} style={svgColor(color)}>
        {setIcon(isDown)}
      </i>
      <p className={carCompositionCss.directionTitle}>{name}</p>
    </h2>
  );
};

export default CarCompositionDirection;
