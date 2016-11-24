import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import railwayConfig from '../config/railway';
import queryCollection from '../domain/utils/queryCollection';
import showCarComposition from './logic/showCarComosition';

import CarCompositionTitle from '../components/carComposition/CarCompositionTitle';
import CarCompositionDirection from '../components/carComposition/CarCompositionDirection';
import CarCompositionItem from '../components/carComposition/CarCompositionItem';
import CarCompositionEmptyItem from '../components/carComposition/CarCompositionEmptyItem';
import carCompositionCss from '../../css/components/carComposition.css';

const CarCompositionList = (props) => {
  const { data, color } = props;
  return (
    <ul>
      {
        data && data.map((item, index) => {
          if (item['odpt:transferInformation'] || item['odpt:surroundingArea']) {
            return (
              <CarCompositionItem
                key={index}
                carNum={item['odpt:carNumber']}
                color={color}
                transferData={item['odpt:transferInformation']}
                surroundData={item['odpt:surroundingArea']}
              />
            );
          }
          return (
            <CarCompositionEmptyItem
              key={index}
              carNum={item['odpt:carNumber']}
              color={color}
            />
          );
        })
      }
    </ul>
  );
};

const setBodyBgColor = (index) => {
  const body = document.querySelector('body');
  body.style.backgroundColor = `rgba(${railwayConfig[index].color},1)`;
};

const isFetchData = (store, bActions) => {
  if (!store.railwayApiData.data) {
    const queryObj = queryCollection();

    let railwayId = 0;
    railwayConfig.forEach((item, index) => {
      if (item.id === queryObj.railway) {
        railwayId = index;
      }
    });
    let stationId = 0;
    railwayConfig[railwayId].station.forEach((item, index) => {
      if (item.id === queryObj.station) {
        stationId = index;
      }
    });
    showCarComposition(store, bActions, (index_) => {
      bActions.onChangeRailwayId(index_);
      setBodyBgColor(index_);
    })({ railwayId, stationId });
  }
};

const containerStyleClass = isData => (
  (isData) ? carCompositionCss.container : carCompositionCss.containerHidden
);


/**
 * CarCompositionContainer
 */
class CarCompositionContainer extends React.Component {
  componentDidMount() {
    const { store, bActions } = this.props;
    isFetchData(store, bActions);
  }

  render() {
    const { store } = this.props;
    return (
      <div className={containerStyleClass(store.railwayApiData.data)}>
        <CarCompositionTitle
          title={store.railwayApiData.data && store.railwayApiData.data.stationName}
        />
        <CarCompositionDirection
          name={railwayConfig[store.railwayId.current].direction[0].name}
          color={railwayConfig[store.railwayId.current].color}
        />
        {store.railwayApiData.data &&
          <CarCompositionList
            data={store.railwayApiData.data.up}
            color={railwayConfig[store.railwayId.current].color}
          />
        }
        <CarCompositionDirection
          name={railwayConfig[store.railwayId.current].direction[1].name}
          color={railwayConfig[store.railwayId.current].color}
          isDown={true}
        />
        {store.railwayApiData.data &&
          <CarCompositionList
            data={store.railwayApiData.data.down}
            color={railwayConfig[store.railwayId.current].color}
          />
        }
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
export default connect(mapStateToProps, mapDispatchToProps)(CarCompositionContainer);
