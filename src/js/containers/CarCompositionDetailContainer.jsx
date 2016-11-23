import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import railwayConfig from '../config/railway';
import carCompositionCss from '../../css/components/carComposition.css';

const containerStyleClass = isShow => (
  (isShow) ? carCompositionCss.container : carCompositionCss.containerHidden
);

/**
 * CarCompositionDetailContainer
 * @param props
 * @returns {XML}
 * @constructor
 */

const CarCompositionDetailContainer = (props) => {
  const {
    store,
    bActions,
  } = props;

  return (
    <div className={containerStyleClass(true)}>CarCompositionDetailContainer</div>
  );
};

const mapStateToProps = state => ({
  store: state,
});
const mapDispatchToProps = dispatch => ({
  bActions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(CarCompositionDetailContainer);
