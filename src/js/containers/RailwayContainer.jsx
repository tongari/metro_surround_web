import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import Railway from '../components/railway/Railway';
import railwayCss from '../../css/components/railway.css';
import railwayConfig from '../config/railway';

let dragStartX = 0;
let dragStartY = 0;

const getPrevPos = currentId => -1 * currentId * window.innerWidth;

const calcSlideIndex = (currentX_, currentId) => {
  const tmp = getPrevPos(currentId) + (currentX_ - dragStartX);
  const tmpPer = (tmp / window.innerWidth) + currentId;

  let tmpId;
  if (tmpPer < -0.1) tmpId = currentId + 1;
  else if (tmpPer > 0.1) tmpId = currentId - 1;
  else tmpId = currentId;

  let slideIndex = tmpId;
  if (slideIndex < 0) slideIndex = 0;
  if (slideIndex >= railwayConfig.length) slideIndex = railwayConfig.length - 1;
  return slideIndex;
};

const slide = currentId => (
  {
    transform: `translate3d(${getPrevPos(currentId)}px, 0, 0)`,
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
let isVectY = false;
const touchMoveHandler = (currentId_) => {
  const currentId = currentId_;
  return (e) => {
    const currentX = e.changedTouches[0].pageX;
    const currentY = e.changedTouches[0].pageY;
    const moveX = Math.abs(currentX - dragStartX);
    const moveY = Math.abs(currentY - dragStartY);

    if (isVectY) return;
    if (moveX < moveY) isVectY = true;
    if (moveX > 15) {
      isDrag = true;
      e.preventDefault();
      const movePos = getPrevPos(currentId) + (currentX - dragStartX);
      const tgt = e.currentTarget;
      tgt.style.transform = `translate3d(${movePos}px, 0, 0)`;
      tgt.style.transitionDuration = '0s';
      const body = document.querySelector('body');
      body.style.overflowY = 'hidden';
    }
  };
};

const touchEndHandler = (currentId_, cb_) => {
  const currentId = currentId_;
  const cb = cb_;
  return (e) => {
    isVectY = false;
    if (!isDrag) return;
    const currentX = e.changedTouches[0].pageX;
    const index = calcSlideIndex(currentX, currentId);
    const tgt = e.currentTarget;
    const slideStyle = slide(index);
    tgt.style.transform = slideStyle.transform;
    tgt.style.transitionProperty = slideStyle.transitionProperty;
    tgt.style.transitionTimingFunction = slideStyle.transitionTimingFunction;
    tgt.style.transitionDuration = slideStyle.transitionDuration;
    cb(index);
    isDrag = false;
    const body = document.querySelector('body');
    body.style.overflowY = 'visible';
    window.scrollTo(0, 0);
  };
};

const bgColor = index => (
  {
    backgroundColor: `rgba(${railwayConfig[index].color},1)`,
  }
);

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
    <div className={railwayCss.container} style={bgColor(store.railwayId.current)}>
      <div
        className={railwayCss.slider}
        style={slide(store.railwayId.current)}
        onTouchStart={touchStartHandler}
        onTouchMove={touchMoveHandler(store.railwayId.current)}
        onTouchEnd={touchEndHandler(store.railwayId.current, bActions.onChangeRailwayId)}
      >
        {
          railwayConfig.map((elm, index) => (
            <Railway
              key={index}
              index={index}
              current={store.railwayId.current}
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
