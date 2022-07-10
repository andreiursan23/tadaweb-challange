import React, { useState, useEffect } from 'react';

import { setInLocalStorage } from '../../utils/setInLocalStorage';

import './ThemeSwitch.scss';

type Props = {
  colorsTheme: 'light' | 'dark' | null;
  isFirstLogin: boolean,
  setColorsTheme: (val: 'light' | 'dark' | null) => void;
}

const ThemeSwitch: React.FC<Props> = ({ colorsTheme, isFirstLogin, setColorsTheme }) => {
  const [checkboxValue, setCheckboxValue] = useState<boolean | undefined>(false);
  
  const handleChange = (e: any) => {
    if (e.target.checked) {
      setCheckboxValue(true);
      setInLocalStorage('colorTheme', 'light');
    } else {
      setCheckboxValue(false);
      setInLocalStorage('colorTheme', 'dark');
    }
  }

  useEffect(() => {
    if (colorsTheme === 'dark') {
      setCheckboxValue(false);
    }
    if (colorsTheme === 'light') {
      setCheckboxValue(true);
    }
  }, [isFirstLogin, colorsTheme]);

  useEffect(() => {
    setColorsTheme(checkboxValue === true ? 'light' : 'dark');
  }, [checkboxValue, setColorsTheme])

  return (
    <label className='switch'>
      <input type='checkbox' onChange={(e) => handleChange(e)} checked={checkboxValue}/>
      <span className='slider round'></span>
    </label>
  )
}

export default ThemeSwitch;