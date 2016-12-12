import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import { makeMap, isGeoLocation, searchCurrentPoint, moveToCenter, searchCenter } from '../domain/map/index';
import { debounce } from '../domain/utils/debounce';
import SearchBox from '../components/map/SearchBox';
import NearStationBox from '../components/map/NearStationBox';
import NearStationList from '../components/map/NearStationList';

const containerStyle = ({ width, height }) => (
  {
    width,
    height: height - 50 - 53,
  }
);

const currentPositionSearch = (onStart, onEnd, onUpdate) => {
  if (isGeoLocation()) {
    return () => {
      searchCurrentPoint(onStart, onEnd, onUpdate);
    };
  }
  return null;
};

/**
 * MapContainer
 */
class MapContainer extends React.Component {

  componentDidMount() {
    const { bActions } = this.props;
    makeMap();
    currentPositionSearch(
      bActions.onStartLoader,
      bActions.onEndLoader,
      (data) => {
        bActions.onChangeNearStationList(data);
      }
    )();
    window.addEventListener('resize', () => {
      bActions.onResize({ width: window.innerWidth, height: window.innerHeight });
      debounce(() => {
        moveToCenter();
      }, 250);
    });
  }

  render() {
    const { store, bActions } = this.props;
    const screenSize = (store.screenSize.width === 0)
      ? { width: window.innerWidth, height: window.innerHeight }
      : store.screenSize;
    return (
      <div>
        <div id="gMap" style={containerStyle(screenSize)} />
        {store.nearStationList.data && <NearStationBox
          station={store.nearStationList.data[0].name}
          stationEn={store.nearStationList.data[0].id}
          distance={Math.round(store.nearStationList.data[0].distance)}
        />}
        <SearchBox
          onCurrentSearch={
            currentPositionSearch(
              bActions.onStartLoader,
              bActions.onEndLoader,
              (data) => {
                bActions.onChangeNearStationList(data);
              }
            )}
          onCenterSearch={searchCenter(
            (data) => {
              bActions.onChangeNearStationList(data);
            }
          )}
        />
        {store.nearStationList.data && <NearStationList stationList={store.nearStationList.data} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  store: state,
});
const mapDispatchToProps = dispatch => ({
  bActions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
