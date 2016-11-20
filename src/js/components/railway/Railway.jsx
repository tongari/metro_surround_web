import React from 'react';
import RailwayItem from './RailwayItem';
import railwayCss from '../../../css/components/railway.css';
import railwayConfig from '../../config/railway';

const titleColor = index => (
  {
    backgroundColor: `rgba(${railwayConfig[index].color},1)`,
  }
);

const visibleStyle = (index, current) => (
  {
    height: (index === current) ? 'auto' : '1px',
  }
);

const Railway = (props) => {
  const {
    index,
    current,
    showStationDetail,
  } = props;

  return (
    <div style={visibleStyle(index, current)}>
      <h1 className={`${railwayCss.title}`} style={titleColor(index)}>
        駅を選んでください
      </h1>
      <ul>
        {railwayConfig[index].station && railwayConfig[index].station.map((info, index_) => (
          <RailwayItem
            key={index_}
            railwayIndex={index}
            index={index_}
            info={info}
            showStationDetail={showStationDetail}
          />)
        )}
      </ul>
    </div>
  );
};

export default Railway;
