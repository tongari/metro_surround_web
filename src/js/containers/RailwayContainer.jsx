import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import Railway from '../components/railway/Railway';
import railwayCss from '../../css/components/railway.css';
import railwayConfig from '../config/railway';

/**
 * set style slide
 * @param railwayId
 */
const slide = railwayId => (
  {
    transform: `translateX(${-100 * railwayId}%)`,
  }
);

/**
 * RailwayContainer
 * @param props
 * @returns {XML}
 * @constructor
 */
const RailwayContainer = (props) => {
  const {
    store,
  } = props;

  return (
    <div className={railwayCss.container}>
      <div className={railwayCss.slider} style={slide(store.getRailwayId)}>
        {
          railwayConfig.map((elm, index) => (
            <Railway key={index} index={index} apiData={store.apiData} />
          ))
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  store: state,
});
const mapDispatchToProps = dispatch => ({
  bActions_: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(RailwayContainer);
