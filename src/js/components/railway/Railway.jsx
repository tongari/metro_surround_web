import React from 'react';
import RailwayItem from './RailwayItem';
import railwayCss from '../../../css/components/railway.css';
import railwayConfig from '../../config/railway';

const titleColor = index => (
  {
    backgroundColor: `rgba(${railwayConfig[index].color},1)`,
  }
);

let railwayMenuHeight = 61;
let statusMenuHeight = 50;
const containerStyle = () => (
  {
    height: (window.innerHeight - railwayMenuHeight - statusMenuHeight),
  }
);

class Railway extends React.Component {

  componentDidMount() {
    const railwayMenu = document.querySelector('#js-railwayMenu');
    const statusMenu = document.querySelector('#js-statusMenu');
    railwayMenuHeight = railwayMenu.offsetHeight;
    statusMenuHeight = statusMenu.offsetHeight;
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {
      index,
      showStationDetail,
    } = this.props;

    return (
      <div style={containerStyle()}>
        <h1 className={`${railwayCss.title}`} style={titleColor(index)}>
          駅を選んでください
        </h1>
        <ul>
          {railwayConfig[index].station && railwayConfig[index].station.map((info, index_) => (
            <RailwayItem
              key={index_}
              railwayIndex={index}
              index={index_}
              info={info}
              showStationDetail={showStationDetail}
            />)
          )}
        </ul>
      </div>
    );
  }
}

export default Railway;
