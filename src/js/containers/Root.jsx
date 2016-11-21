import React from 'react';
import { connect } from 'react-redux';
import RailwayContainer from './RailwayContainer';
import GlobalMenuContainer from './GlobalMenuContainer';
import CarCompositionContainer from './CarCompositionContainer';
import railwayConfig from '../config/railway';
import loaderCss from '../../css/components/loader.css';

const setBodyBgColor = (index) => {
  const body = document.querySelector('body');
  body.style.backgroundColor = `rgba(${railwayConfig[index].color},1)`;
};

const loaderStyle = isLoading => (
  (isLoading) ? loaderCss.loaderArea : loaderCss.loaderAreaHidden
);

const Root = (props) => {
  const {
    store,
  } = props;

  setBodyBgColor(store.railwayId.current);

  return (
    <div>
      <GlobalMenuContainer />
      <RailwayContainer />
      <CarCompositionContainer />
      <div className={loaderStyle(store.loader.isLoading)} />
    </div>
  );
};

const mapStateToProps = state => ({
  store: state,
});
export default connect(mapStateToProps)(Root);
