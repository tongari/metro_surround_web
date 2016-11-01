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

const onChangeNavSlide = (elm_, railwayId) => {
  const elm = elm_;
  elm.style.transform = `translateX(${getPrevPos(railwayId)}px)`;
};

const calcSlideIndex = (currentX_, railwayId) => {
  const tmp = getPrevPos(railwayId) + (currentX_ - dragStartX);
  let slideIndex = -1 * Math.round(tmp / window.innerWidth);
  if (slideIndex < 0) slideIndex = 0;
  if (slideIndex >= railwayConfig.length) slideIndex = railwayConfig.length - 1;
  return slideIndex;
};

const slide = (railwayId_) => {
  const railwayId = railwayId_;
  return {
    transform: `translateX(${getPrevPos(railwayId)}px)`,
  };
};

const touchStartHandler = (e) => {
  dragStartX = e.touches[0].pageX;
  dragStartY = e.touches[0].pageY;
};

const touchMoveHandler = (railwayId_) => {
  const railwayId = railwayId_;
  return (e) => {
    const currentX = e.changedTouches[0].pageX;
    const currentY = e.changedTouches[0].pageY;
    const moveX = Math.abs(currentX - dragStartX);
    const moveY = Math.abs(currentY - dragStartY);
    // if (moveX > moveY) e.preventDefault();
    e.preventDefault();

    const movePos = (getPrevPos(railwayId) + (currentX - dragStartX)) * 1.5;
    const tgt = e.currentTarget;
    tgt.style.transform = `translateX(${movePos}px)`;
  };
};

const touchEndHandler = (railwayId_, cb_) => {
  const railwayId = railwayId_;
  const cb = cb_;
  return (e) => {
    const currentX = e.changedTouches[0].pageX;
    const index = calcSlideIndex(currentX, railwayId);
    const tgt = e.currentTarget;
    onChangeNavSlide(tgt, railwayId);
    cb(index);
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
              current={store.getRailwayId}
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
