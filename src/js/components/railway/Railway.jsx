import React from 'react';
import RailwayItem from './RailwayItem';
import railwayCss from '../../../css/components/railway.css';

const stubList = () => {
  let index = 0;
  const result = [];
  while (index < 10) {
    result.push(index);
    index += 1;
  }
  return result;
};

const Railway = (props) => {
  const {
    apiData,
  } = props;

  return (
    <div>
      <h1 className={`${railwayCss.title} ${railwayCss.ginzaBackground}`}>
        駅を選んでください
      </h1>
      <ul>
        {stubList().map(index => <RailwayItem key={index} apiData={apiData} />)}
      </ul>
    </div>
  );
};

export default Railway;
