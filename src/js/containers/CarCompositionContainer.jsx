import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import CarCompositionTitle from '../components/carComposition/CarCompositionTitle';
import CarCompositionDirection from '../components/carComposition/CarCompositionDirection';
import CarCompositionItem from '../components/carComposition/CarCompositionItem';
import CarCompositionEmptyItem from '../components/carComposition/CarCompositionEmptyItem';
import railwayConfig from '../config/railway';
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

const onPrevRaiywayHandler = cb => (
  (e) => {
    e.preventDefault();
    cb();
  }
);

const containerStyleClass = isShow => (
  (isShow) ? carCompositionCss.container : carCompositionCss.containerHidden
);

/**
 * CarCompositionContainer
 * @param props
 * @returns {XML}
 * @constructor
 */

const CarCompositionContainer = (props) => {
  const {
    store,
    bActions,
  } = props;

  return (
    <div className={containerStyleClass(store.carComposition.isShow)}>
      <CarCompositionTitle
        title={railwayConfig[store.railwayId.current].name}
        onPrevRaiyway={onPrevRaiywayHandler(bActions.onGoTransitRailway)}
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
};

const mapStateToProps = state => ({
  store: state,
});
const mapDispatchToProps = dispatch => ({
  bActions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(CarCompositionContainer);
