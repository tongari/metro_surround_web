import React from 'react';
import { Link } from 'react-router';
import { ArrowprevIcon } from '../icon/Icon';
import carCompositionCss from '../../../css/components/carComposition.css';
import svgCss from '../../../css/components/svg.css';
import railwayConfig from '../../config/railway';
import queryCollection from '../../domain/utils/queryCollection';
import routePath from '../../config/router';


const titleAreaStyle = railwayId => (
  {
    backgroundColor: `rgba(${railwayConfig[railwayId].color},1)`,
  }
);

const prevPage = ({ railway, station }) => (
 `${routePath.STATION}?railway=${railway}&station=${station}`
);

const CarCompositionDetailTitle = (props) => {
  const {
    carNum,
    railwayId,
  } = props;

  return (
    <h1>
      <Link
        to={prevPage(queryCollection())}
        className={carCompositionCss.titleArea}
        style={titleAreaStyle(railwayId)}
      >
        <i className={`${carCompositionCss.titleIcon} ${svgCss.white}`}>
          <ArrowprevIcon />
        </i>
        <p className={carCompositionCss.title}>{carNum}両目</p>
      </Link>
    </h1>
  );
};

export default CarCompositionDetailTitle;
