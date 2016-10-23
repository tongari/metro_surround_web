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

const Arrownext = props => <Icon iconName={'arrow-next'}{...props} />;
const Arrowprev = props => <Icon iconName={'arrow-prev'}{...props} />;
const Clubs = props => <Icon iconName={'clubs'}{...props} />;
const Contrast = props => <Icon iconName={'contrast'}{...props} />;
const Current = props => <Icon iconName={'current'}{...props} />;
const Diamonds = props => <Icon iconName={'diamonds'}{...props} />;
const Direction = props => <Icon iconName={'direction'}{...props} />;
const Heart = props => <Icon iconName={'heart'}{...props} />;
const Help = props => <Icon iconName={'help'}{...props} />;
const List = props => <Icon iconName={'list'}{...props} />;
const Map = props => <Icon iconName={'map'}{...props} />;
const Navigation = props => <Icon iconName={'navigation'}{...props} />;
const Numbering = props => <Icon iconName={'numbering'}{...props} />;
const Railway = props => <Icon iconName={'railway'}{...props} />;
const Spades = props => <Icon iconName={'spades'}{...props} />;
const Swipe = props => <Icon iconName={'swipe'}{...props} />;
const Tap = props => <Icon iconName={'tap'}{...props} />;
const ToLink = props => <Icon iconName={'toLink'}{...props} />;
export { Arrownext, Arrowprev, Clubs, Contrast, Current, Diamonds, Direction, Heart, Help, List, Map, Navigation, Numbering, Railway, Spades, Swipe, Tap, ToLink };
