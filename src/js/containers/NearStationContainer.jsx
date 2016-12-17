import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actions from './../actions/index';
import { invokeNativeMap } from '../domain/map/index';
import { makeMap, makeMarker, moveToCenter } from '../domain/map/station';
import NearStation from '../components/map/NearStation';

const hideNearStation = onHideNearStation => (
  (e) => {
    e.preventDefault();
    onHideNearStation();
    window.history.back();
  }
);

/**
 * NearStationContainer
 */
class NearStationContainer extends React.Component {
  componentDidMount() {
    const { store } = this.props;
    makeMap();
    makeMarker(store.visibleNearStation.data.Lat, store.visibleNearStation.data.Long);
  }

  componentWillUnmount() {
    const { bActions } = this.props;
    bActions.hideNearStation();
  }

  render() {
    const { store, bActions } = this.props;

    if (store.visibleNearStation.data) {
      const screenSize = (store.screenSize.width === 0)
        ? { width: window.innerWidth, height: window.innerHeight }
        : store.screenSize;
      const Lat = store.visibleNearStation.data.Lat;
      const Long = store.visibleNearStation.data.Long;
      moveToCenter(Lat, Long);

      return (
        <div>
          {store.visibleNearStation.data && <NearStation
            hideNearStation={hideNearStation(bActions.hideNearStation)}
            screenSize={screenSize}
            invokeNativeMap={invokeNativeMap(Lat, Long)}
            {...store.visibleNearStation.data}
          />}
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  store: state,
});
const mapDispatchToProps = dispatch => ({
  bActions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(NearStationContainer);
