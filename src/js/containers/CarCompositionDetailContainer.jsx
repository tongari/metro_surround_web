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
 */
class CarCompositionDetailContainer extends React.Component {
  render() {
    const { store, bActions } = this.props;
    return (
      <div>CarCompositionDetailContainer</div>
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
