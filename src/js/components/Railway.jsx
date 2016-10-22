import React from 'react';
import * as icons from './icon/Icon';

const Railway = (props) => {
  const {
    apiData,
  } = props;

  const style = {
    width: '20px',
  };

  return (
    <div>
      <ul>
        <li style={style}><icons.ArrowNext /></li>
        <li style={style}><icons.ArrowPrev /></li>
      </ul>
    </div>
  );
};

export default Railway;
