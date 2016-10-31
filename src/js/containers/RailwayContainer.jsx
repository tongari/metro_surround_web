import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import Railway from '../components/railway/Railway';
import railwayCss from '../../css/components/railway.css';
import railwayConfig from '../config/railway';

let dragStart = 0;
let dragEnd = 0;
const setNavChangeSlide = (elm_, railwayId) => {
  const elm = elm_;
  console.log(railwayId);
  dragEnd = -1 * railwayId * window.innerWidth;
  // elm.style.transform = `translateX(${dragEnd}px)`;
};

/**
 * set style slide
 * @param railwayId
 */
const slide = () => (
  {
    transform: `translateX(${dragEnd}px)`,
    border: '1px solid',
  }
);

const addEvent = (elm_, onChangeRailwayId_) => {
  const elm = elm_;
  const onChangeRailwayId = onChangeRailwayId_;

  elm.addEventListener('touchstart', (e) => {
    dragStart = e.touches[0].clientX;
  });

  elm.addEventListener('touchmove', (e) => {
    const currentX = e.touches[0].clientX;
    const calc = dragEnd + (currentX - dragStart);
    elm.style.transform = `translateX(${calc}px)`;
  });

  elm.addEventListener('touchend', (e) => {
    const currentX = e.changedTouches[0].clientX;
    const tmp = dragEnd + (currentX - dragStart);
    const slideIndex = Math.round(tmp / window.innerWidth);
    dragEnd = slideIndex * window.innerWidth;
    const maxId = railwayConfig.length - 1;
    const lastPos = -1 * maxId * window.innerWidth;
    if (dragEnd > 0) dragEnd = 0;
    if (dragEnd < lastPos) dragEnd = lastPos;
    elm.style.transform = `translateX(${dragEnd}px)`;
    onChangeRailwayId(Math.abs(slideIndex));
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
    console.log('componentDidMount');
    const { store, bActions } = this.props;
    setNavChangeSlide(this.sliderNode, store.getRailwayId);
    addEvent(this.sliderNode, bActions.onChangeRailwayId);
  }

  componentWillReceiveProps() {
    const { store } = this.props;
    setNavChangeSlide(this.sliderNode, store.getRailwayId);
    this.render();
  }

  render() {
    console.log('render!!!!');
    const { store } = this.props;

    return (
      <div className={railwayCss.container}>
        <div
          className={railwayCss.slider}
          style={slide()}
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

/*
const RailwayContainer = (props) => {
  const {
    store,
    bActions,
  } = props;

  setNavChangeSlide(store.getRailwayId);


  return (
    <div className={railwayCss.container}>
      <div
        className={railwayCss.slider}
        style={slide()}
        ref={addEvent(bActions.onChangeRailwayId)}
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
*/

const mapStateToProps = state => ({
  store: state,
});
const mapDispatchToProps = dispatch => ({
  bActions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(RailwayContainer);
