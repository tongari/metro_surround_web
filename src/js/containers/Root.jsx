import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import RailwayContainer from './RailwayContainer';

// export class Root extends React.Component {

const Root = (props) => {
  const { store_, actions_ } = props;

  return (
    <div>
      <h1>どこチカ？ Web版</h1>
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
