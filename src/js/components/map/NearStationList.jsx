import React from 'react';
import NearStationListItem from './NearStationListItem';

const NearStationList = (props) => {
  const { stationList } = props;
  return (
    <ul>
      {
        stationList && stationList.map((item, index) => (
          <NearStationListItem
            key={index}
            station={item.name}
            stationEn={item.id}
            distance={item.distance}
            railwayId={item.railwayId}
          />
        ))
      }
    </ul>
  );
};

export default NearStationList;
