import React from 'react';
import { connect } from 'react-redux';
import RailwayContainer from './RailwayContainer';
import { bodyBg } from '../utils/view';

const Root = (props) => {
  const {
    store,
  } = props;

  bodyBg(store.railwayId.current);

  return (
    <div>
      <RailwayContainer />
    </div>
  );
};

const mapStateToProps = state => ({
  store: state,
});
export default connect(mapStateToProps)(Root);
