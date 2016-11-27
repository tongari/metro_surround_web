import React from 'react';
import { connect } from 'react-redux';
import RailwayMenuContainer from './RailwayMenuContainer';
import StatusMenuContainer from './StatusMenuContainer';
import loaderCss from '../../css/components/loader.css';

const loaderStyle = isLoading => (
  (isLoading) ? loaderCss.loaderArea : loaderCss.loaderAreaHidden
);

const App = (props) => {
  const {
    store,
    children,
  } = props;

  return (
    <div>
      <RailwayMenuContainer />
      {children}
      <StatusMenuContainer />
      <div className={loaderStyle(store.loader.isLoading)} />
    </div>
  );
};

const mapStateToProps = state => ({
  store: state,
});
export default connect(mapStateToProps)(App);
