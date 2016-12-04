import React from 'react';
import { CurrentIcon, NavigationIcon } from '../../components/icon/Icon';
import css from '../../../css/components/map/searchBox.css';

const SearchBox = (props) => {
  const { onCurrentSearch, onCenterSearch } = props;

  return (
    <nav className={css.container}>
      <ul>
        <li>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              onCurrentSearch();
            }}
          >
            <i className={css.icon}>
              <NavigationIcon />
            </i>
            <span>現在位置で検索</span>
          </a>
        </li>
        <li>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              onCenterSearch();
            }}
          >
            <i className={css.icon}>
              <CurrentIcon />
            </i>
            <span>地図の中心で検索</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SearchBox;
