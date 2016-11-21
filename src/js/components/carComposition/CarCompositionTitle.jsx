import React from 'react';
import { ArrowprevIcon } from '../icon/Icon';
import carCompositionCss from '../../../css/components/carComposition.css';
import svgCss from '../../../css/components/svg.css';

const CarCompositionTitle = (props) => {
  const {
    title,
  } = props;

  return (
    <h1>
      <a href="" className={carCompositionCss.titleArea}>
        <i className={`${carCompositionCss.titleIcon} ${svgCss.white}`}>
          <ArrowprevIcon />
        </i>
        <p className={carCompositionCss.title}>{title}</p>
      </a>
    </h1>
  );
};

export default CarCompositionTitle;
