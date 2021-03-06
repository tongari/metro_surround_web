import React from 'react';
import NearStationListItem from './NearStationListItem';
import NearStationListTitle from './NearStationListTitle';
import css from '../../../css/components/map/nearStationList.css';

const containerStyle = isVisible => (
  {
    display: (isVisible) ? 'block' : 'none',
  }
);

const NearStationList = (props) => {
  const { stationList, isVisible, hideNearStationList, showNearStation } = props;
  return (
    <div className={css.container} style={containerStyle(isVisible)}>
      <NearStationListTitle hideNearStationList={hideNearStationList} />
      <ul>
        {
          stationList && stationList.map((item, index) => (
            <NearStationListItem
              key={index}
              name={item.name}
              id={item.id}
              distance={item.distance}
              railwayId={item.railwayId}
              Lat={item.Lat}
              Long={item.Long}
              showNearStation={showNearStation}
            />
          ))
        }
      </ul>
    </div>
  );
};

export default NearStationList;
