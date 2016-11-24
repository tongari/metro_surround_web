import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import { directShowCarComposition } from './logic/showCarComosition';
import queryCollection from '../domain/utils/queryCollection';

import CarCompositionDetailTitle from '../components/carComposition/CarCompositionDetailTitle';
import carCompositionCss from '../../css/components/carComposition.css';

const containerStyleClass = isData => (
  (isData) ? carCompositionCss.detailContainer : carCompositionCss.detailContainerHidden
);

/**
 * CarCompositionDetailContainer
 */
class CarCompositionDetailContainer extends React.Component {
  componentDidMount() {
    const { store, bActions } = this.props;
    directShowCarComposition(store, bActions);
  }

  render() {
    const { store, bActions } = this.props;
    const queryObj = queryCollection();
    return (
      <div className={containerStyleClass(store.railwayApiData.data)}>
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
