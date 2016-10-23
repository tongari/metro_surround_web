import React from 'react';

const Icon = (props) => {
  const {
    iconName,
    width = '100%',
    alt = '',
  } = props;

  return (
    <img src={require(`../../../asset/svg/${iconName}.svg`)} width={width} alt={alt} />
  );
};
