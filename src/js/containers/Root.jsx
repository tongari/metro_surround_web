import React from 'react';
import { connect } from 'react-redux';
import RailwayContainer from './RailwayContainer';
import GlobalMenuContainer from './GlobalMenuContainer';
import { bodyBg } from '../utils/view';

const Root = (props) => {
  const {
    store,
  } = props;

  bodyBg(store.railwayId.current);

  return (
    <div>
      <GlobalMenuContainer />
      <RailwayContainer />
    </div>
  );
};

const mapStateToProps = state => ({
  store: state,
});
export default connect(mapStateToProps)(Root);
