import React from 'react';
import RailwayItem from './RailwayItem';
import railwayCss from '../../../css/components/railway.css';
import railwayConfig from '../../config/railway';

const titleColor = index => (
  {
    backgroundColor: `rgba(${railwayConfig[index].color},1)`,
  }
);

const containerStyle = (index, current) => (
  {
    height: (window.innerHeight - 61),
  }
);

class Railway extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {
      index,
      current,
      showStationDetail,
    } = this.props;

    return (
      <div style={containerStyle(index, current)}>
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
