import React from 'react';
import Style from '../../../css/components/button.css';

const Button = (props) => {
  const {
    href = '#',
    onClick = (() => {}),
    className = {},
  } = props;

  return (
    <a href={href} className={className} onClick={onClick}>{props.children}</a>
  );
};

const PrimaryButton = (props) => {
  const result = <Button className={Style.primary}{...props}>{props.children}</Button>;
  return result;
};
const DefaultButton = props => <Button {...props}>{props.children}</Button>;

export { DefaultButton, PrimaryButton };
