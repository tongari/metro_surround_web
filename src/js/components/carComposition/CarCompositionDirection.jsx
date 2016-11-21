import React from 'react';
import { DirectionIcon } from '../icon/Icon';
import carCompositionCss from '../../../css/components/carComposition.css';
import svgCss from '../../../css/components/svg.css';

const svgColor = color => (
  {
    color: `rgba(${color},1)`,
  }
);

const setIcon = isDown => (
  (isDown) ? carCompositionCss.directionReversIcon : carCompositionCss.directionIcon
);

const CarCompositionDirection = (props) => {
  const {
    name,
    color,
    isDown,
  } = props;

  return (
    <h2 className={carCompositionCss.directionArea}>
      <i className={`${setIcon(isDown)} ${svgCss.colorInherit}`} style={svgColor(color)}>
        <DirectionIcon />
      </i>
      <p className={carCompositionCss.directionTitle}>{name}</p>
    </h2>
  );
};

export default CarCompositionDirection;
