import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import Railway from '../components/railway/Railway';
import railwayCss from '../../css/components/railway.css';
import railwayConfig from '../config/railway';
import { transferShowCarComposition } from './logic/showCarComosition';
import { debounce, clear } from '../domain/utils/debounce';
import { bodyBg } from '../utils/view';

const getPrevPos = currentId => -1 * currentId * window.innerWidth;
const slide = (val, duration) => (
  {
    transform: `translate3d(${val}px, 0, 0)`,
    transitionProperty: 'transform',
    transitionTimingFunction: 'ease',
    transitionDuration: duration,
  }
);


let sendRailwayId;
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
      duration: '0.3s',
      isVectY: false,
      isDrag: false,
      isSlideNone: false,
    };
  }

  touchStartHandler() {
    return (e) => {
      this.setState({
        dragStartX: e.touches[0].pageX,
        dragStartY: e.touches[0].pageY,
        duration: '0s',
        isSlideNone: false,
      });
      debounce(() => {
        this.setState({
          isSlideNone: true,
        });
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
      if (moveX < moveY) {
        this.setState({ isVectY: true });
        return;
      }
      if (moveX > 15) {
        e.preventDefault();
        const movePos = getPrevPos(currentId) + (currentX - this.state.dragStartX);
        this.setState({
          isDrag: true,
          xVal: movePos,
          duration: '0s',
        });
      }
    };
  }

  touchEndHandler(currentId_, cb_) {
    const currentId = currentId_;
    const cb = cb_;
    return (e) => {
      this.setState({ isVectY: false });
      if (!this.state.isDrag) return;
      const currentX = e.changedTouches[0].pageX;
      const index = this.calcSlideIndex(currentX, currentId);
      clear();
      this.setState({
        xVal: getPrevPos(index),
        duration: '0.3s',
        isDrag: false,
        isSlideNone: false,
      });
      cb(index);
    };
  }

  calcSlideIndex(currentX_, currentId) {
    const tmp = getPrevPos(currentId) + (currentX_ - this.state.dragStartX);
    const tmpPer = (tmp / window.innerWidth) + currentId;
    let tmpId;
    if (!this.state.isSlideNone && tmpPer < -0.01) tmpId = currentId + 1;
    else if (!this.state.isSlideNone && tmpPer > 0.01) tmpId = currentId - 1;
    else if (this.state.isSlideNone && tmpPer < -0.5) tmpId = currentId + 1;
    else if (this.state.isSlideNone && tmpPer > 0.5) tmpId = currentId - 1;
    else tmpId = currentId;
    let slideIndex = tmpId;
    if (slideIndex < 0) slideIndex = 0;
    if (slideIndex >= railwayConfig.length) slideIndex = railwayConfig.length - 1;
    return slideIndex;
  }

  render() {
    const { store, bActions } = this.props;
    bodyBg(store.railwayId.current);
    const slideVal = (this.state.isDrag) ? this.state.xVal : getPrevPos(store.railwayId.current);
    sendRailwayId = store.railwayId.current;

    return (
      <div className={railwayCss.container}>
        <div
          className={railwayCss.slider}
          style={slide(slideVal, this.state.duration)}
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
                showStationDetail={({ stationId }) => {
                  transferShowCarComposition(bActions, sendRailwayId)({ stationId });
                }}
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
