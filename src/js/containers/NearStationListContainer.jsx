import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actions from './../actions/index';
import routerPath from '../config/router';
import NearStationListTitle from '../components/map/NearStationListTitle';
import NearStationListItem from '../components/map/NearStationListItem';
import css from '../../css/components/map/nearStationList.css';

const showNearStation = onShowNearStation => (
  (params) => {
    onShowNearStation(params);
    browserHistory.push(routerPath.NEAR_STATION);
  }
);

/**
 * NearStationListContainer
 */
class NearStationListContainer extends React.Component {

  render() {
    const { store, bActions } = this.props;

    return (
      <div className={css.container}>
        <NearStationListTitle />
        <ul>
          {
            store.nearStationList.data.map((item, index) => (
              <NearStationListItem
                key={index}
                showNearStation={showNearStation(bActions.showNearStation)}
                {...item}
              />
            ))
          }
        </ul>
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
export default connect(mapStateToProps, mapDispatchToProps)(NearStationListContainer);
