import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actions from './../actions/index';
import routerPath from '../config/router';
import { makeMap, isGeoLocation, searchCurrentPoint, moveToCenter, searchCenter } from '../domain/map/index';
import { debounce } from '../domain/utils/debounce';
import SearchBox from '../components/map/SearchBox';
import NearStationBox from '../components/map/NearStationBox';
import { bodyBg } from '../domain/utils/view';

const mapContainerStyle = ({ width, height }) => (
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


const showNearStation = onShowNearStation => (
  (params) => {
    onShowNearStation(params);
    browserHistory.push(routerPath.NEAR_STATION);
  }
);

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

    bodyBg();
  }

  render() {
    const { store, bActions } = this.props;
    const screenSize = (store.screenSize.width === 0)
      ? { width: window.innerWidth, height: window.innerHeight }
      : store.screenSize;

    return (
      <div>
        <div id="gMap" style={mapContainerStyle(screenSize)} />
        {store.nearStationList.data && <NearStationBox
          name={store.nearStationList.data[0].name}
          id={store.nearStationList.data[0].id}
          distance={store.nearStationList.data[0].distance}
          railwayId={store.nearStationList.data[0].railwayId}
          Lat={store.nearStationList.data[0].Lat}
          Long={store.nearStationList.data[0].Long}
          showNearStation={showNearStation(bActions.showNearStation)}
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
