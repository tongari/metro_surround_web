import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import globalNavCss from '../../css/components/globalNav.css';
import railwayConfig from '../config/railway';

/**
 * set style tab color
 * @param index
 * @param current
 */
const tabColor = (index, current) => (
  {
    backgroundColor: (index === current) ? `rgba(${railwayConfig[index].color},1)` : 'transparent',
    borderBottom: `4px solid rgba(${railwayConfig[index].color},1)`,
    opacity: 1,
  }
);

/**
 * bind clickHandler
 * @param tabId_
 * @param cb_
 * @returns {function(*)}
 */
const clickHandler = (tabId_, cb_) => {
  const tabId = tabId_;
  const cb = cb_;
  return (e) => {
    cb(tabId);
    window.scrollTo(0, 0);
    e.preventDefault();
  };
};

/**
 * GlobalMenuContainer
 */
class GlobalMenuContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      listElms: [],
      slidePosList: [],
    };
  }
  componentDidMount() {
    this.slidePosList = this.state.listElms.map(item => item.offsetLeft);
  }

  list(index, current, cb) {
    return (
      <li
        key={index}
        style={tabColor(index, current)}
        ref={(elm) => { this.state.listElms.push(elm); }}
      >
        <a href="" onClick={clickHandler(index, cb)}>{railwayConfig[index].name}</a>
      </li>
    );
  }

  slide(index) {
    return (elm_) => {
      const elm = elm_;
      if (elm) elm.scrollLeft = this.state.slidePosList[index];
    };
  }

  render() {
    const {
      store,
      bActions,
    } = this.props;

    return (
      <div
        className={globalNavCss.menuArea}
        ref={this.slide(store.railwayId.current)}
      >
        <ul>
          {
            railwayConfig.map(
              (elm, index) => this.list(
                index,
                store.railwayId.current,
                bActions.onChangeRailwayId
              )
            )
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  store: state,
});
const mapDispatchToProps = dispatch => ({
  bActions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(GlobalMenuContainer);
