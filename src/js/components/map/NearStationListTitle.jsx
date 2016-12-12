import React from 'react';
import { ArrowprevIcon } from '../icon/Icon';
import css from '../../../css/components/nearStationList.css';
import svgCss from '../../../css/components/svg.css';

const titleAreaStyle = () => (
  {
    backgroundColor: 'rgba(0,0,0,1)',
  }
);

const NearStationListTitle = props => (
  <h1 style={titleAreaStyle()}>
    <a href="" className={css.titleArea} onClick={props.hideNearStationList}>
      <i className={`${css.titleIcon} ${svgCss.white}`}>
        <ArrowprevIcon />
      </i>
      <p className={css.title}>最寄り駅一覧</p>
    </a>
  </h1>
);

export default NearStationListTitle;
