import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import { makeMap, isGeoLocation, getCurrentPosition, moveToCenter } from '../domain/map/index';
import { debounce } from '../domain/utils/debounce';

const containerStyle = ({ width, height }) => (
  {
    width,
    height: height - 50,
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
    window.addEventListener('resize', () => {
      bActions.onResize({ width: window.innerWidth, height: window.innerHeight });
      debounce(() => {
        moveToCenter();
      }, 250);
    });
  }

  render() {
    const { store } = this.props;
    const screenSize = (store.screenSize.width === 0)
      ? { width: window.innerWidth, height: window.innerHeight }
      : store.screenSize;
    return (
      <div>
        <div id="gMap" style={containerStyle(screenSize)} />
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
