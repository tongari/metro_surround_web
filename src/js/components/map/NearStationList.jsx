import React from 'react';
import NearStationListItem from './NearStationListItem';
import NearStationListTitle from './NearStationListTitle';

const containerStyle = isVisible => (
  {
    display: (isVisible) ? 'block' : 'none',
  }
);

const NearStationList = (props) => {
  const { stationList, isVisible, hideNearStationList } = props;
  return (
    <div style={containerStyle(isVisible)}>
      <NearStationListTitle hideNearStationList={hideNearStationList} />
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
    </div>
  );
};

export default NearStationList;
