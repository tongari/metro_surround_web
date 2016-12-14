import _ from 'lodash';
import railwayConfig from '../../config/railway';

const stationList = () => {
  const result = [];
  const station = railwayConfig.map(item => item.station);
  station.forEach((item) => {
    item.forEach((item_) => {
      result.push(item_);
    });
  });
  return result;
};

const betweenDistance = (startLat, startLng, endLat, endLng) => (
  window.google.maps.geometry.spherical.computeDistanceBetween(
    new window.google.maps.LatLng(startLat, startLng), new window.google.maps.LatLng(endLat, endLng)
  )
);

const nearStationList = (lat, lng, list, distance_) => {
  const addDistanceList = list.map((item) => {
    const distance = betweenDistance(lat, lng, item.Lat, item.Long);
    const id = item.id;
    const name = item.name;
    const Lat = item.Lat;
    const Long = item.Long;
    const railwayId = item.railwayId;
    return Object.assign({}, { id, name, Lat, Long, distance, railwayId });
  });
  const sortList = _.sortBy(addDistanceList, 'distance');
  const limitDistanceList = sortList.filter(item => (item.distance <= distance_));
  return (limitDistanceList.length > 20) ? limitDistanceList.slice(0, 20) : limitDistanceList;
};


/** --------------------------------------------------
 * export method
 --------------------------------------------------*/

export const removeSameStation = (list) => {
  const result = [];
  list.forEach((item_) => {
    const item = item_;
    const checkList = result.filter((checkItem_) => {
      const checkItem = checkItem_;
      if (checkItem.id === item.id) {
        checkItem.isSameStation = true;
        return item;
      }
      return null;
    });
    if (checkList.length === 0) {
      result.push(item);
    }
  });
  return result;
};

export const stationCollection = (lat, lng, distance_) => (
  nearStationList(lat, lng, stationList(), distance_)
);

export const stationMarkerList = list => (
  list.map((item, index) => {
    const lat = item.Lat;
    const lng = item.Long;
    // const icon = require('../../../asset/img/pin.png');
    return new window.google.maps.Marker({
      position: { lat, lng },
      title: item.name,
      id: item.id,
      railwayId: item.railwayId,
      distance: item.distance,
      animation: window.google.maps.Animation.DROP,
      // icon,
      zIndex: (900 + index),
    });
  })
);
