import React from 'react';
import globalNavCss from '../../css/components/globalNav.css';
import railwayConfig from '../config/railway';


const tabColor = (index, current_) => (
  {
    backgroundColor: (index === current_) ? `rgba(${railwayConfig[index].color},1)` : 'transparent',
    borderBottom: `4px solid rgba(${railwayConfig[index].color},1)`,
  }
);


const list = (index, current_) => (
  <li key={index} style={tabColor(index, current_)}>
    <a href="">{railwayConfig[index].name}</a>
  </li>
);

const GlobalMenuContainer = (props) => {
  const { current = 0 } = props;

  return (
    <div className={globalNavCss.menuArea}>
      <ul>
        {railwayConfig.map((elm, index) => list(index, current))}
      </ul>
    </div>
  );
};
export default GlobalMenuContainer;
