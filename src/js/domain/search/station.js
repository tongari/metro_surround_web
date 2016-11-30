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

const nearStationList = (lat, lng, list) => {
  const addDistanceList = list.map((item) => {
    const distance = betweenDistance(lat, lng, item.Lat, item.Long);
    const id = item.id;
    const name = item.name;
    const Lat = item.Lat;
    const Long = item.Long;
    return Object.assign({}, { id, name, Lat, Long, distance });
  });
  const sortList = _.sortBy(addDistanceList, 'distance');
  const limitDistanceList = sortList.filter(item => (item.distance <= 5000));
  return (limitDistanceList.length > 20) ? limitDistanceList.slice(0, 20) : limitDistanceList;
};

export { stationList, nearStationList };
