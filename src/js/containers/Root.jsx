import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import RailwayContainer from './RailwayContainer';
import GlobalMenuContainer from './GlobalMenuContainer';

// export class Root extends React.Component {

const Root = (props) => {
  const { store_, actions_ } = props;

  return (
    <div>
      <GlobalMenuContainer />
      <RailwayContainer apiData={store_.apiData} />
    </div>
  );
};

const mapStateToProps = state => ({
  store_: state,
});
const mapDispatchToProps = dispatch => ({
  actions_: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Root);
