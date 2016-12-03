import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import { makeMap, isGeoLocation, getCurrentPosition } from '../domain/map/index';

const containerStyle = () => (
  {
    width: window.innerWidth,
    height: window.innerHeight - 50,
  }
);

/**
 * MapContainer
 */
class MapContainer extends React.Component {

  componentDidMount() {
    const { bActions } = this.props;
    makeMap();
    if (isGeoLocation()) {
      getCurrentPosition(
        bActions.onStartLoader,
        bActions.onEndLoader
      );
    }
  }

  render() {
    return (
      <div>
        <div id="gMap" style={containerStyle()} />
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
