import React from 'react';

import './Button.scss';

type Props = {
  textBtn: string;
  size: 's' | 'm' | 'l';
  colorsTheme: 'light' | 'dark' | null;
  disabled: boolean;
  handleClick: () => void;
}

const Button: React.FC<Props> = ({ textBtn, colorsTheme, handleClick, size, disabled }) => {
  return (
    <button 
      className={`btn ${size} ${colorsTheme}`}
      onClick={handleClick}
      disabled={disabled}
      type='button'
    >
      {textBtn}
    </button>
  )
}

export default Button;