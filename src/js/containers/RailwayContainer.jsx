import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import Railway from '../components/railway/Railway';
import railwayCss from '../../css/components/railway.css';
import railwayConfig from '../config/railway';

let dragStart = 0;
let railwayId = 0;
let dragStartY = 0;
const getPrevPos = () => -1 * railwayId * window.innerWidth;

const onChangeNavSlide = (elm_) => {
  const elm = elm_;
  elm.style.transform = `translateX(${getPrevPos()}px)`;
};

const calcSlideIndex = (currentX_) => {
  const tmp = getPrevPos() + (currentX_ - dragStart);
  let slideIndex = -1 * Math.round(tmp / window.innerWidth);
  if (slideIndex < 0) slideIndex = 0;
  if (slideIndex >= railwayConfig.length) slideIndex = railwayConfig.length - 1;
  return slideIndex;
};

const addEvent = (elm_, onChangeRailwayId_) => {
  const elm = elm_;
  const onChangeRailwayId = onChangeRailwayId_;

  elm.addEventListener('touchstart', (e) => {
    dragStart = e.touches[0].pageX;
    dragStartY = e.touches[0].pageY;
  });

  elm.addEventListener('touchmove', (e) => {
    const draggingY = e.changedTouches[0].pageY;
    const draggDiffY = Math.abs(draggingY - dragStartY);
    if (draggDiffY < 15) e.preventDefault();

    const currentX = e.changedTouches[0].clientX;
    const movePos = getPrevPos() + (currentX - dragStart);
    elm.style.transform = `translateX(${movePos}px)`;
  });

  elm.addEventListener('touchend', (e) => {
    const currentX = e.changedTouches[0].pageX;
    const index = calcSlideIndex(currentX);
    onChangeNavSlide(elm, index);
    onChangeRailwayId(index);
    // window.scrollTo(0, 0);
  });
};

/**
 * RailwayContainer
 * @param props
 * @returns {XML}
 * @constructor
 */
class RailwayContainer extends React.Component {
  componentDidMount() {
    const { store, bActions } = this.props;
    railwayId = store.getRailwayId;
    addEvent(this.sliderNode, bActions.onChangeRailwayId);
  }

  componentDidUpdate() {
    const { store } = this.props;
    railwayId = store.getRailwayId;
    onChangeNavSlide(this.sliderNode);
  }

  render() {
    const { store } = this.props;
    return (
      <div className={railwayCss.container}>
        <div
          className={railwayCss.slider}
          ref={node => (this.sliderNode = node)}
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
  }
}

const mapStateToProps = state => ({
  store: state,
});
const mapDispatchToProps = dispatch => ({
  bActions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(RailwayContainer);
