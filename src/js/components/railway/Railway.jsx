import React from 'react';
import RailwayItem from './RailwayItem';
import railwayCss from '../../../css/components/railway.css';
import railwayConfig from '../../config/railway';

const stubList = (params) => {
  let index = 0;
  const result = [];
  const max = (params === 0) ? 10 : 20;
  while (index < max) {
    result.push(index);
    index += 1;
  }
  return result;
};

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
    apiData,
  } = props;

  return (
    <div style={visibleStyle(index, current)}>
      <h1 className={`${railwayCss.title}`} style={titleColor(index)}>
        駅を選んでください
      </h1>
      <ul>
        {stubList(index).map(index_ => (
          <RailwayItem key={index_} index={index} apiData={apiData} />)
        )}
      </ul>
    </div>
  );
};

export default Railway;
