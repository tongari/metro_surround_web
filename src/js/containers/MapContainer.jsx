import _ from 'lodash';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import { makeMap, isGeoLocation, searchCurrentPoint, moveToCenter, searchCenter, getCurrentPoint } from '../domain/map/index';
import { debounce } from '../domain/utils/debounce';
import SearchBox from '../components/map/SearchBox';
import NearStationBox from '../components/map/NearStationBox';
import NearStationList from '../components/map/NearStationList';
import NearStation from '../components/map/NearStation';
import { bodyBg } from '../domain/utils/view';

const mapContainerStyle = ({ width, height }) => (
  {
    width,
    height: height - 50 - 53,
  }
);

const containerStyle = isVisible => (
  {
    visibility: (isVisible) ? 'hidden' : 'visible',
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%',
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

const showNearStationList = bActions => (
  (e) => {
    e.preventDefault();
    bActions.showNearStationList();
  }
);

const hideNearStationList = bActions => (
  (e) => {
    e.preventDefault();
    bActions.hideNearStationList();
  }
);

const showNearStation = bActions => (
  (e) => {
    e.preventDefault();
    bActions.showNearStation();
  }
);

const hideNearStation = bActions => (
  (e) => {
    e.preventDefault();
    bActions.hideNearStation();
  }
);

const hideNearStationToNearStationList = bActions => (
  (e) => {
    e.preventDefault();
    bActions.hideNearStation();
    bActions.showNearStationList();
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

  componentWillUnmount() {
    const { bActions } = this.props;
    bActions.hideNearStation();
    bActions.hideNearStationList();
  }

  render() {
    const { store, bActions } = this.props;
    const screenSize = (store.screenSize.width === 0)
      ? { width: window.innerWidth, height: window.innerHeight }
      : store.screenSize;

    return (
      <div>
        <div
          style={
            containerStyle(
              _.includes([
                store.visibleNearStationList.isVisible,
                store.visibleNearStation.isVisible,
              ], true)
            )
          }
        >
          <div id="gMap" style={mapContainerStyle(screenSize)} />
          {store.nearStationList.data && <NearStationBox
            station={store.nearStationList.data[0].name}
            stationEn={store.nearStationList.data[0].id}
            distance={Math.round(store.nearStationList.data[0].distance)}
            showNearStationList={showNearStationList(bActions)}
            showNearStation={showNearStation(bActions)}
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
        {store.nearStationList.data &&
        <NearStationList
          stationList={store.nearStationList.data}
          isVisible={store.visibleNearStationList.isVisible}
          hideNearStationList={hideNearStationList(bActions)}
          showNearStation={(params) => {
            bActions.hideNearStationList();
            bActions.showNearStation(params);
          }}
        />}
        {store.nearStationList.data &&
        <NearStation
          isVisible={store.visibleNearStation.isVisible}

          distance={(store.visibleNearStation.data)
          ? store.visibleNearStation.data.distance
          : store.nearStationList.data[0].distance}

          railwayId={(store.visibleNearStation.data)
          ? store.visibleNearStation.data.railwayId
          : store.nearStationList.data[0].railwayId}

          station={(store.visibleNearStation.data)
          ? store.visibleNearStation.data.name
          : store.nearStationList.data[0].name}

          lat={(store.visibleNearStation.data)
          ? store.visibleNearStation.data.Lat
          : store.nearStationList.data[0].Lat}

          lng={(store.visibleNearStation.data)
          ? store.visibleNearStation.data.Long
          : store.nearStationList.data[0].Long}

          hideNearStation={(store.visibleNearStation.data)
          ? hideNearStationToNearStationList(bActions)
          : hideNearStation(bActions)}
          screenSize={screenSize}
        />}
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
