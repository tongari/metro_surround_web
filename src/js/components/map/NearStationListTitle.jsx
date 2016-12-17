import React from 'react';
import { Link } from 'react-router';
import routePath from '../../config/router';
import { ArrowprevIcon } from '../icon/Icon';
import css from '../../../css/components/map/nearStationList.css';
import svgCss from '../../../css/components/svg.css';

const titleAreaStyle = () => (
  {
    backgroundColor: 'rgba(0,0,0,1)',
  }
);

const NearStationListTitle = props => (
  <h1 style={titleAreaStyle()}>
    <Link to={routePath.MAP} className={css.titleArea}>
      <i className={`${css.titleIcon} ${svgCss.white}`}>
        <ArrowprevIcon />
      </i>
      <p className={css.title}>最寄り駅一覧</p>
    </Link>
  </h1>
);

export default NearStationListTitle;
