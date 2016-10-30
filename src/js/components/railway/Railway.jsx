import React from 'react';
import RailwayItem from './RailwayItem';
import railwayCss from '../../../css/components/railway.css';
import railwayConfig from '../../config/railway';

const stubList = () => {
  let index = 0;
  const result = [];
  while (index < 10) {
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

const Railway = (props) => {
  const {
    index,
    apiData,
  } = props;

  return (
    <div>
      <h1 className={`${railwayCss.title}`} style={titleColor(index)}>
        駅を選んでください
      </h1>
      <ul>
        {stubList().map(index_ => <RailwayItem key={index_} index={index} apiData={apiData} />)}
      </ul>
    </div>
  );
};

export default Railway;
