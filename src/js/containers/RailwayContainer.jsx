import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import Railway from '../components/railway/Railway';
import railwayCss from '../../css/components/railway.css';
import railwayConfig from '../config/railway';

let dragStartX = 0;
let dragStartY = 0;

const getPrevPos = railwayId => -1 * railwayId * window.innerWidth;

const calcSlideIndex = (currentX_, railwayId) => {
  const tmp = getPrevPos(railwayId.current) + (currentX_ - dragStartX);
  const tmpPer = (tmp / window.innerWidth) + railwayId.current;

  console.log(tmpPer);

  let tmpId;
  if (tmpPer < -0.1) tmpId = railwayId.current + 1;
  else if (tmpPer > 0.1) tmpId = railwayId.current - 1;
  else tmpId = railwayId.current;

  let slideIndex = tmpId;
  // let slideIndex = -1 * Math.round(tmp / window.innerWidth);
  if (slideIndex < 0) slideIndex = 0;
  if (slideIndex >= railwayConfig.length) slideIndex = railwayConfig.length - 1;
  return slideIndex;
};

const slide = railwayId => (
  {
    transform: `translate3d(${getPrevPos(railwayId.current)}px, 0, 0)`,
    transitionProperty: 'transform',
    transitionTimingFunction: 'cubic-bezier(0, 0, 0.25, 1)',
    transitionDuration: '0.35s',
  }
);

const touchStartHandler = (e) => {
  dragStartX = e.touches[0].pageX;
  dragStartY = e.touches[0].pageY;
};

let isDrag = false;
const touchMoveHandler = (railwayId_) => {
  const railwayId = railwayId_;
  return (e) => {
    const currentX = e.changedTouches[0].pageX;
    const currentY = e.changedTouches[0].pageY;
    const moveX = Math.abs(currentX - dragStartX);
    const moveY = Math.abs(currentY - dragStartY);
    if (moveY > 20) return;
    if (moveX > 15) {
      isDrag = true;
      e.preventDefault();
      const movePos = getPrevPos(railwayId.current) + (currentX - dragStartX);
      const tgt = e.currentTarget;
      tgt.style.transform = `translate3d(${movePos}px, 0, 0)`;
      tgt.style.transitionDuration = '0s';
      const body = document.querySelector('body');
      body.style.overflowY = 'hidden';
    }
  };
};

const touchEndHandler = (railwayId_, cb_) => {
  const railwayId = railwayId_;
  const cb = cb_;
  return (e) => {
    if (!isDrag) return;
    const currentX = e.changedTouches[0].pageX;
    // const currentY = e.changedTouches[0].pageY;
    // const moveY = Math.abs(currentY - dragStartY);
    const index = calcSlideIndex(currentX, railwayId);
    const tgt = e.currentTarget;
    const slideStyle = slide({ current: index });
    tgt.style.transform = slideStyle.transform;
    tgt.style.transitionProperty = slideStyle.transitionProperty;
    tgt.style.transitionTimingFunction = slideStyle.transitionTimingFunction;
    tgt.style.transitionDuration = slideStyle.transitionDuration;
    cb(index);
    isDrag = false;
    const body = document.querySelector('body');
    body.style.overflowY = 'visible';
  };
};


/**
 * RailwayContainer
 * @param props
 * @returns {XML}
 * @constructor
 */

const RailwayContainer = (props) => {
  const {
    store,
    bActions,
  } = props;

  return (
    <div className={railwayCss.container}>
      <div
        className={railwayCss.slider}
        style={slide(store.getRailwayId)}
        onTouchStart={touchStartHandler}
        onTouchMove={touchMoveHandler(store.getRailwayId)}
        onTouchEnd={touchEndHandler(store.getRailwayId, bActions.onChangeRailwayId)}
      >
        {
          railwayConfig.map((elm, index) => (
            <Railway
              key={index}
              index={index}
              current={store.getRailwayId.current}
              apiData={store.apiData}
            />
          ))
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  store: state,
});
const mapDispatchToProps = dispatch => ({
  bActions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(RailwayContainer);
