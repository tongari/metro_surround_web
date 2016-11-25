import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import Railway from '../components/railway/Railway';
import railwayCss from '../../css/components/railway.css';
import railwayConfig from '../config/railway';
import { transferShowCarComposition } from './logic/showCarComosition';
import { debounce, clear } from '../domain/utils/debounce';

const getPrevPos = currentId => -1 * currentId * window.innerWidth;
const slide = currentId => (
  {
    transform: `translate3d(${getPrevPos(currentId)}px, 0, 0)`,
    transitionProperty: 'transform',
    transitionTimingFunction: 'ease',
    transitionDuration: '0.3s',
  }
);

/**
 * RailwayContainer
 */
class RailwayContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      dragStartX: 0,
      dragStartY: 0,
      xVal: 0,
      isVectY: false,
      isDrag: false,
      isSlideNone: false,
    };
  }

  shouldComponentUpdate() {
    return true;
  }

  touchStartHandler() {
    return (e) => {
      this.state.dragStartX = e.touches[0].pageX;
      this.state.dragStartY = e.touches[0].pageY;
      debounce(() => {
        this.state.isSlideNone = true;
      }, 250);
    };
  }

  touchMoveHandler(currentId_) {
    const currentId = currentId_;
    return (e) => {
      const currentX = e.changedTouches[0].pageX;
      const currentY = e.changedTouches[0].pageY;
      const moveX = Math.abs(currentX - this.state.dragStartX);
      const moveY = Math.abs(currentY - this.state.dragStartY);

      if (this.state.isVectY) return;
      if (moveX < moveY) this.state.isVectY = true;
      if (moveX > 15) {
        this.state.isDrag = true;
        e.preventDefault();
        const movePos = getPrevPos(currentId) + (currentX - this.state.dragStartX);
        this.state.xVal = movePos;
        const tgt = e.currentTarget;
        tgt.style.transform = `translate3d(${this.state.xVal}px, 0, 0)`;
        tgt.style.transitionDuration = '0s';
      }
    };
  }

  touchEndHandler(currentId_, cb_) {
    const currentId = currentId_;
    const cb = cb_;
    return (e) => {
      this.state.isVectY = false;
      if (!this.state.isDrag) return;
      const currentX = e.changedTouches[0].pageX;
      const index = this.calcSlideIndex(currentX, currentId);
      const tgt = e.currentTarget;
      this.state.xVal = getPrevPos(index);
      const slideStyle = slide(index);
      tgt.style.transform = slideStyle.transform;
      tgt.style.transitionProperty = slideStyle.transitionProperty;
      tgt.style.transitionTimingFunction = slideStyle.transitionTimingFunction;
      tgt.style.transitionDuration = slideStyle.transitionDuration;
      cb(index);
      this.state.isDrag = false;
      window.scrollTo(0, 0);
    };
  }

  calcSlideIndex(currentX_, currentId) {
    clear();
    const tmp = getPrevPos(currentId) + (currentX_ - this.state.dragStartX);
    const tmpPer = (tmp / window.innerWidth) + currentId;

    let tmpId;
    if (!this.state.isSlideNone && tmpPer < -0.1) tmpId = currentId + 1;
    else if (!this.state.isSlideNone && tmpPer > 0.1) tmpId = currentId - 1;
    else if (this.state.isSlideNone && tmpPer < -0.5) tmpId = currentId + 1;
    else if (this.state.isSlideNone && tmpPer > 0.5) tmpId = currentId - 1;
    else tmpId = currentId;

    this.state.isSlideNone = false;

    let slideIndex = tmpId;
    if (slideIndex < 0) slideIndex = 0;
    if (slideIndex >= railwayConfig.length) slideIndex = railwayConfig.length - 1;
    return slideIndex;
  }

  render() {
    const { store, bActions } = this.props;
    return (
      <div className={railwayCss.container}>
        <div
          className={railwayCss.slider}
          style={slide(store.railwayId.current)}
          onTouchStart={this.touchStartHandler()}
          onTouchMove={this.touchMoveHandler(store.railwayId.current)}
          onTouchEnd={this.touchEndHandler(store.railwayId.current, bActions.onChangeRailwayId)}
        >
          {
            railwayConfig.map((elm, index) => (
              <Railway
                key={index}
                index={index}
                current={store.railwayId.current}
                showStationDetail={transferShowCarComposition(store, bActions)}
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
