import React from 'react';
import Railway from '../components/railway/Railway';
import railwayCss from '../../css/components/railway.css';
import railwayConfig from '../config/railway';

const RailwayContainer = (props) => {
  const { apiData } = props;

  return (
    <div className={railwayCss.container}>
      <div className={railwayCss.slider}>
        {
          railwayConfig.map((elm, index) => (
            <Railway key={index} index={index} apiData={apiData} />
          ))
        }
      </div>
    </div>
  );
};
export default RailwayContainer;
