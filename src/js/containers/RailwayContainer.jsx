import React from 'react';
import Railway from '../components/Railway';

const RailwayContainer = (props) => {
  const { apiData } = props;

  return (
    <div>
      <Railway apiData={apiData} />
    </div>
  );
};
export default RailwayContainer;
