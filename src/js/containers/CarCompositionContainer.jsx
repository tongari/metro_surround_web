import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actions from './../actions/index';
import railwayConfig from '../config/railway';
import { directShowCarComposition } from './logic/showCarComosition';

import CarCompositionTitle from '../components/carComposition/CarCompositionTitle';
import CarCompositionDirection from '../components/carComposition/CarCompositionDirection';
import CarCompositionItem from '../components/carComposition/CarCompositionItem';
import CarCompositionEmptyItem from '../components/carComposition/CarCompositionEmptyItem';
import carCompositionCss from '../../css/components/carComposition.css';

const CarCompositionList = (props) => {
  const { data, color, direction } = props;
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
                direction={direction}
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

const containerStyleClass = isData => (
  (isData) ? carCompositionCss.container : carCompositionCss.containerHidden
);

/**
 * CarCompositionContainer
 */
class CarCompositionContainer extends React.Component {
  componentDidMount() {
    const { store, bActions } = this.props;
    directShowCarComposition(store.railwayApiData.data, bActions);
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
            direction="up"
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
            direction="down"
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
