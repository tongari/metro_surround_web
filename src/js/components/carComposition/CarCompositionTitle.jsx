import React from 'react';
import { Link } from 'react-router';
import { ArrowprevIcon } from '../icon/Icon';
import carCompositionCss from '../../../css/components/carComposition.css';
import svgCss from '../../../css/components/svg.css';

const CarCompositionTitle = (props) => {
  const {
    title,
  } = props;

  return (
    <h1>
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
