import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RailwayContainer from './RailwayContainer';
import GlobalMenuContainer from './GlobalMenuContainer';
import railwayConfig from '../config/railway';

const setBodyBgColor = (index) => {
  const body = document.querySelector('body');
  body.style.backgroundColor = `rgba(${railwayConfig[index].color},1)`;
};

const Root = (props) => {
  const {
    store,
  } = props;

  setBodyBgColor(store.railwayId.current);

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
