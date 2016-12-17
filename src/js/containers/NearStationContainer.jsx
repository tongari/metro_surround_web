import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actions from './../actions/index';
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

  componentWillUnmount() {
    const { bActions } = this.props;
    bActions.hideNearStation();
  }

  render() {
    const { store, bActions } = this.props;
    const screenSize = (store.screenSize.width === 0)
      ? { width: window.innerWidth, height: window.innerHeight }
      : store.screenSize;

    return (
      <div>
        {store.visibleNearStation.data && <NearStation
          distance={store.visibleNearStation.data.distance}
          railwayId={store.visibleNearStation.data.railwayId}
          name={store.visibleNearStation.data.name}
          Lat={store.visibleNearStation.data.Lat}
          Long={store.visibleNearStation.data.Long}
          hideNearStation={hideNearStation(bActions.hideNearStation)}
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
export default connect(mapStateToProps, mapDispatchToProps)(NearStationContainer);
