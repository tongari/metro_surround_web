import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import railwayConfig from '../config/railway';
import { bodyBg } from '../utils/view';
import queryCollection from '../domain/utils/queryCollection';

import CarCompositionDetailTitle from '../components/carComposition/CarCompositionDetailTitle';
import carCompositionCss from '../../css/components/carComposition.css';

/**
 * CarCompositionDetailContainer
 */
class CarCompositionDetailContainer extends React.Component {
  render() {
    const { store, bActions } = this.props;
    const queryObj = queryCollection();
    bodyBg(store.railwayId.current);
    return (
      <div className={carCompositionCss.detailContainer}>
        <CarCompositionDetailTitle 
          railwayId={store.railwayId.current}
          carNum={queryObj.num}
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
export default connect(mapStateToProps, mapDispatchToProps)(CarCompositionDetailContainer);
