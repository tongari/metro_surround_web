import React from 'react';
import * as icons from './icon/Icon';
import { PrimaryButton } from './button/Button';

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
        <li>
          <PrimaryButton onClick={() => { alert('hit'); }}>
            Primary Button
          </PrimaryButton>
        </li>
      </ul>
    </div>
  );
};

export default Railway;
