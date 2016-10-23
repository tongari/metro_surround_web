import React from 'react';
import buttonStyle from '../../../css/components/button.css';
import typoStyle from '../../../css/components/typography.css';

const Button = (props) => {
  const {
    href = '#',
    onClick = (() => {}),
    addClassName = {},
  } = props;

  return (
    <a href={href} className={addClassName} onClick={onClick}>{props.children}</a>
  );
};

const addClass = className => ((className === undefined) ? '' : className);

const PrimaryButton = (props) => {
  const result = <Button addClassName={`${buttonStyle.primary} ${typoStyle.sizeLL} ${addClass(props.className)}`}{...props}>{props.children}</Button>;
  return result;
};
const DefaultButton = props => <Button {...props}>{props.children}</Button>;

export { DefaultButton, PrimaryButton };
