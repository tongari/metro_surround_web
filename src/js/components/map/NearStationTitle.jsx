import React from 'react';
import { ArrowprevIcon } from '../icon/Icon';
import css from '../../../css/components/map/nearStation.css';
import svgCss from '../../../css/components/svg.css';
import railwayConfig from '../../config/railway';

const titleAreaStyle = railwayId => (
  {
    backgroundColor: `rgba(${railwayConfig[railwayId].color},1)`,
  }
);

const NearStationTitle = (props) => {
  const { railwayId, station, hideNearStation } = props;
  return (
    <h1 style={titleAreaStyle(railwayId)}>
      <a href="" className={css.titleArea} onClick={hideNearStation}>
        <i className={`${css.titleIcon} ${svgCss.white}`}>
          <ArrowprevIcon />
        </i>
        <p className={css.title}>{station}</p>
      </a>
    </h1>
  );
};

export default NearStationTitle;
