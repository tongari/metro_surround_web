import React from 'react';
import { Arrownext, Arrowprev, ToLink } from './icon/Icon';
import { PrimaryButton } from './button/Button';
import typoStyle from '../../css/components/typography.css';

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
        <li style={style}><Arrownext /></li>
        <li style={style}><Arrowprev /></li>
        <li style={style}><ToLink /></li>
        <li>
          <PrimaryButton onClick={() => { alert('hit'); }}>
            Primary Button
          </PrimaryButton>
        </li>
        <li>
          <p className={`${typoStyle.sizeLL} ${typoStyle.lineLL}`} >aaa<br />bbb</p>
        </li>
      </ul>
    </div>
  );
};

export default Railway;
