import React from 'react';

import globalNavCss from '../../css/components/globalNav.css';

const config = [
  { name: '銀座線', color: '255,144,0' },
  { name: '丸の内線', color: '246,46,54' },
  { name: '日比谷線', color: '181,181,172' },
  { name: '東西線', color: '0,155,191' },
  { name: '千代田線', color: '0,187,133' },
  { name: '有楽町線', color: '193,164,112' },
  { name: '半蔵門', color: '143,118,214' },
  { name: '南北線', color: '0,172,155' },
  { name: '副都心線', color: '156,94,49' },
];

const current = 0;

const bgColor = val => ({ backgroundColor: `rgba(${val},1)` });
const list = (elm, index, current_) => (
  <li key={index} style={(index === current_) ? bgColor(elm.color) : null}>
    <a href="">{elm.name}</a>
  </li>
);

const GlobalMenuContainer = (props) => {
  const { apiData } = props;

  return (
    <div className={globalNavCss.menuArea}>
      <ul>
        {config.map((elm, index) => list(elm, index, current))}
      </ul>
    </div>
  );
};
export default GlobalMenuContainer;
