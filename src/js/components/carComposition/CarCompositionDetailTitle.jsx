import React from 'react';
import { ArrowprevIcon } from '../icon/Icon';
import carCompositionCss from '../../../css/components/carComposition.css';
import svgCss from '../../../css/components/svg.css';
import railwayConfig from '../../config/railway';


const titleAreaStyle = railwayId => (
  {
    backgroundColor: `rgba(${railwayConfig[railwayId].color},1)`,
  }
);

const CarCompositionDetailTitle = (props) => {
  const {
    carNum,
    railwayId,
  } = props;

  return (
    <h1>
      <div className={carCompositionCss.titleArea} style={titleAreaStyle(railwayId)}>
        <i className={`${carCompositionCss.titleIcon} ${svgCss.white}`}>
          <ArrowprevIcon />
        </i>
        <p className={carCompositionCss.title}>{carNum}</p>
      </div>
    </h1>
  );
};

export default CarCompositionDetailTitle;
