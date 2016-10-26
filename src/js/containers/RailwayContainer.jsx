import React from 'react';
import Railway from '../components/railway/Railway';

const RailwayContainer = (props) => {
  const { apiData } = props;

  return (
    <div>
      <Railway apiData={apiData} />
      <Railway apiData={apiData} />
      <Railway apiData={apiData} />
    </div>
  );
};
export default RailwayContainer;
