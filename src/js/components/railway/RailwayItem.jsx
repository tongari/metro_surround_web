import React from 'react';
import { NumberingIcon } from '../icon/Icon';
import typoCss from '../../../css/components/typography.css';
import svgCss from '../../../css/components/svg.css';
import railwayCss from '../../../css/components/railway.css';
import railwayConfig from '../../config/railway';

const svgColor = index => (
  {
    color: `rgba(${railwayConfig[index].color},1)`,
  }
);

let isRender = false;
const clickHandler = (showStationDetail, index) => (
  (e) => {
    isRender = true;
    e.preventDefault();
    showStationDetail({ stationId: index });
  }
);

class RailwayItem extends React.Component {
  componentDidMount() {
    isRender = false;
  }

  shouldComponentUpdate() {
    return isRender;
  }

  render() {
    const {
      railwayIndex,
      index,
      info,
      showStationDetail,
    } = this.props;

    return (
      <li className={railwayCss.list}>
        <a href="" onClick={clickHandler(showStationDetail, index)}>
          <i className={`${railwayCss.icon} ${svgCss.colorInherit}`} style={svgColor(railwayIndex)}>
            <NumberingIcon />
          </i>
          <span className={`${typoCss.sizeLL} ${typoCss.bold}`}>{info.name}</span>
          <span className={railwayCss.stationEn}>{info.id}</span>
        </a>
      </li>
    );
  }
}

export default RailwayItem;
