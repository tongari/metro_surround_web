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

export const Clubs = props => <Icon iconName={'clubs'}{...props} />;
export const Heart = props => <Icon iconName={'heart'}{...props} />;
export const Diamonds = props => <Icon iconName={'diamonds'}{...props} />;
export const Spades = props => <Icon iconName={'spades'}{...props} />;
export const ArrowNext = props => <Icon iconName={'arrow-next'}{...props} />;
export const ArrowPrev = props => <Icon iconName={'arrow-prev'}{...props} />;
export const Navigation = props => <Icon iconName={'navigation'}{...props} />;
export const Map = props => <Icon iconName={'map'}{...props} />;
