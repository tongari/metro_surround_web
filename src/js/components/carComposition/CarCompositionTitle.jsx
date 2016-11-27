import React from 'react';
import { Link } from 'react-router';
import { ArrowprevIcon } from '../icon/Icon';
import railwayConfig from '../../config/railway';
import carCompositionCss from '../../../css/components/carComposition.css';
import svgCss from '../../../css/components/svg.css';

const titleAreaStyle = railwayId => (
  {
    backgroundColor: `rgba(${railwayConfig[railwayId].color},1)`,
  }
);

const CarCompositionTitle = (props) => {
  const {
    title,
    railwayId,
  } = props;

  return (
    <h1 style={titleAreaStyle(railwayId)}>
      <Link to="/" className={carCompositionCss.titleArea}>
        <i className={`${carCompositionCss.titleIcon} ${svgCss.white}`}>
          <ArrowprevIcon />
        </i>
        <p className={carCompositionCss.title}>{title}</p>
      </Link>
    </h1>
  );
};

export default CarCompositionTitle;
