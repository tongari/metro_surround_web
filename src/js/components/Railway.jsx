import React from 'react';
import { ArrownextIcon, ArrowprevIcon, ClubsIcon } from './icon/Icon';
import { PrimaryButton } from './button/Button';
import typoCss from '../../css/components/typography.css';
import svgCss from '../../css/components/svg.css';

const Railway = (props) => {
  const {
    apiData,
  } = props;

  const style = {
    width: '40px',
  };
  const style2 = {
    width: '40px',
    color: '#0f0',
  };

  return (
    <div>
      <ul>
        <li style={style2} className={svgCss.colorOverride}><ArrownextIcon /></li>
        <li style={style} className={svgCss.red}><ArrowprevIcon /></li>
        <li style={style} className={svgCss.blue}><ClubsIcon /></li>
        <li>
          <PrimaryButton onClick={() => { alert('hit'); }}>
            Primary Button
          </PrimaryButton>
        </li>
        <li>
          <p className={`${typoCss.sizeLL} ${typoCss.lineLL}`} >aaa<br />bbb</p>
        </li>
      </ul>
    </div>
  );
};

export default Railway;
