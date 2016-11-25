import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import { directShowCarComposition } from './logic/showCarComosition';
import queryCollection from '../domain/utils/queryCollection';

import CarCompositionDetailTitle from '../components/carComposition/CarCompositionDetailTitle';
import TransferItem from '../components/carComposition/TransferItem';
import SurroundItem from '../components/carComposition/SurroundItem';
import carCompositionCss from '../../css/components/carComposition.css';
import itemCss from '../../css/components/carCompositionItem.css';

const containerStyleClass = isData => (
  (isData) ? carCompositionCss.detailContainer : carCompositionCss.detailContainerHidden
);

const transferInfoTitle = (data, direction, index) => {
  if (data && data[direction][index]['odpt:transferInformation']) {
    return (
      <h2 className={itemCss.carCompositionDetailTitle}>
        <span className={itemCss.textIcon}>乗り換え</span>
      </h2>
    );
  }
  return null;
};

const transferInfoList = (data, direction, index) => {
  if (data && data[direction][index]['odpt:transferInformation']) {
    return (
      data[direction][index]['odpt:transferInformation'].map(
        (item, index_) => <TransferItem key={index_} transferData={item} />
      )
    );
  }
  return null;
};

const surroundInfoTitle = (data, direction, index) => {
  if (data && data[direction][index]['odpt:surroundingArea']) {
    return (
      <h2 className={itemCss.carCompositionDetailTitle}>
        <span className={itemCss.textIcon}>周辺施設</span>
      </h2>
    );
  }
  return null;
};

const surroundInfoList = (data, direction, index) => {
  if (data && data[direction][index]['odpt:surroundingArea']) {
    return (
      data[direction][index]['odpt:surroundingArea'].map(
        (item, index_) => <SurroundItem key={index_} surroundText={item} />
      )
    );
  }
  return null;
};

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
    const carNum = queryObj.num;
    const index = queryObj.num - 1;
    const direction = queryObj.direction;

    return (
      <div className={containerStyleClass(store.railwayApiData.data)}>
        <CarCompositionDetailTitle
          railwayId={store.railwayId.current}
          carNum={carNum}
        />
        {transferInfoTitle(store.railwayApiData.data, direction, index)}
        {transferInfoList(store.railwayApiData.data, direction, index)}
        {surroundInfoTitle(store.railwayApiData.data, direction, index)}
        {surroundInfoList(store.railwayApiData.data, direction, index)}
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
