import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import { makeMap, isGeoLocation, searchCurrentPoint, moveToCenter, searchCenter } from '../domain/map/index';
import { debounce } from '../domain/utils/debounce';
import SearchBox from '../components/map/SearchBox';

const containerStyle = ({ width, height }) => (
  {
    width,
    height: height - 50 - 53,
  }
);

const currentPositionSearch = (onStart, onEnd) => {
  if (isGeoLocation()) {
    return () => {
      searchCurrentPoint(onStart, onEnd);
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
      bActions.onEndLoader
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
        <SearchBox
          onCurrentSearch={currentPositionSearch(bActions.onStartLoader, bActions.onEndLoader)}
          onCenterSearch={searchCenter}
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
