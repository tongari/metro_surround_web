import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import globalNavCss from '../../css/components/globalNav.css';
import railwayConfig from '../config/railway';


const slidePosList = [];
const setSlidePosList = elm => slidePosList.push(elm.offsetLeft);

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
 * slide global navigation
 * @param index_
 * @returns {function(*)}
 */
const slide = (index_) => {
  const index = index_;
  return (elm_) => {
    const elm = elm_;
    if (elm) elm.scrollLeft = slidePosList[index];
  };
};

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
 * create list elment
 * @param index
 * @param current
 * @param cb
 */
const list = (index, current, cb) => (
  <li key={index} style={tabColor(index, current)} ref={setSlidePosList}>
    <a href="" onClick={clickHandler(index, cb)}>{railwayConfig[index].name}</a>
  </li>
);

/**
 * GlobalMenuContainer
 * @param props
 * @returns {XML}
 * @constructor
 */
const GlobalMenuContainer = (props) => {
  const {
    store,
    bActions,
  } = props;

  return (
    <div className={globalNavCss.menuArea} ref={slide(store.railwayId.current)}>
      <ul>
        {
          railwayConfig.map(
            (elm, index) => list(
              index,
              store.railwayId.current,
              bActions.onChangeRailwayId
            )
          )
        }
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  store: state,
});
const mapDispatchToProps = dispatch => ({
  bActions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(GlobalMenuContainer);
