import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import Railway from '../components/railway/Railway';
import railwayCss from '../../css/components/railway.css';
import railwayConfig from '../config/railway';
import showCarComposition from './logic/showCarComosition';
import { debounce, clear } from '../domain/utils/debounce';


let dragStartX = 0;
let dragStartY = 0;
let isSlideNone = false;
let isDrag = false;
let isVectY = false;

const getPrevPos = currentId => -1 * currentId * window.innerWidth;

const calcSlideIndex = (currentX_, currentId) => {
  clear();
  const tmp = getPrevPos(currentId) + (currentX_ - dragStartX);
  const tmpPer = (tmp / window.innerWidth) + currentId;

  let tmpId;
  if (!isSlideNone && tmpPer < -0.1) tmpId = currentId + 1;
  else if (!isSlideNone && tmpPer > 0.1) tmpId = currentId - 1;
  else if (isSlideNone && tmpPer < -0.5) tmpId = currentId + 1;
  else if (isSlideNone && tmpPer > 0.5) tmpId = currentId - 1;
  else tmpId = currentId;

  isSlideNone = false;

  let slideIndex = tmpId;
  if (slideIndex < 0) slideIndex = 0;
  if (slideIndex >= railwayConfig.length) slideIndex = railwayConfig.length - 1;
  return slideIndex;
};

const slide = currentId => (
  {
    transform: `translate3d(${getPrevPos(currentId)}px, 0, 0)`,
    transitionProperty: 'transform',
    transitionTimingFunction: 'ease',
    transitionDuration: '0.3s',
  }
);

const touchStartHandler = (e) => {
  dragStartX = e.touches[0].pageX;
  dragStartY = e.touches[0].pageY;

  debounce(() => {
    isSlideNone = true;
  }, 250);
};

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
    tgt.style.transitionTimingFunction = 'ease-in-out'; // slideStyle.transitionTimingFunction;
    tgt.style.transitionDuration = slideStyle.transitionDuration;
    cb(index);
    isDrag = false;
    window.scrollTo(0, 0);
  };
};

/**
 * RailwayContainer
 */
class RailwayContainer extends React.Component {

  render() {
    const { store, bActions } = this.props;
    return (
      <div className={railwayCss.container}>
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
                showStationDetail={showCarComposition(store, bActions)}
              />
            ))
          }
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(RailwayContainer);
