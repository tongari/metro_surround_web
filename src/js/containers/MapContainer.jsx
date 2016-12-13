import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import { makeMap, isGeoLocation, searchCurrentPoint, moveToCenter, searchCenter } from '../domain/map/index';
import { debounce } from '../domain/utils/debounce';
import SearchBox from '../components/map/SearchBox';
import NearStationBox from '../components/map/NearStationBox';
import NearStationList from '../components/map/NearStationList';
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
        <div style={containerStyle(store.visibleNearStationList.isVisible)}>
          <div id="gMap" style={mapContainerStyle(screenSize)} />
          {store.nearStationList.data && <NearStationBox
            station={store.nearStationList.data[0].name}
            stationEn={store.nearStationList.data[0].id}
            distance={Math.round(store.nearStationList.data[0].distance)}
            showNearStationList={showNearStationList(bActions)}
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
