import React, { useEffect, useState } from 'react';

import { setInLocalStorage } from '../utils/setInLocalStorage';

import './ThemeChooser.scss';
import tadaLogo from '../assets/tadaweb-logo.svg';
import lightTheme from '../assets/theme-light.svg';
import darkTheme from '../assets/theme-dark.svg';

type Props = {
  setColorsTheme: (val: 'light' | 'dark' | null) => void;
  setIsFirstLogin: (val: boolean) => void;
};

const ThemeChooser: React.FC<Props> = ({ setColorsTheme, setIsFirstLogin }) => {
  const [isFirstRender, setIsFirstRender] = useState<boolean>(false);
  const [allowUserToSelectTheme, setAllowUserToSelectTheme] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsFirstRender(true);
    }, 300)

    setTimeout(() => {
      setAllowUserToSelectTheme(true);
    }, 1500)
  }, []);

  const handleColorsTheme = (theme: 'dark' | 'light') => {
    setColorsTheme(theme);
    setInLocalStorage('colorTheme', theme);
    setIsFirstLogin(false);
    setInLocalStorage('isFirstLogin', false);
  }

  return (
    <div className={`container ${isFirstRender ? 'first-render' : ''}`}>
      <div 
        className={`dark-theme-side ${allowUserToSelectTheme ? 'allow-user-to-select' : ''}`}
        onClick={() => handleColorsTheme('dark')}
      >
        <img src={darkTheme} alt='dark-theme-logo' className='dark-theme-logo' />
      </div>

      <div 
        className={`light-theme-side ${allowUserToSelectTheme ? 'allow-user-to-select' : ''}`}
        onClick={() => handleColorsTheme('light')}
      >
        <img src={lightTheme} alt='light-theme-logo' className='light-theme-logo' />
      </div>

      <img src={tadaLogo} alt='TadaWeb Logo' className='tadaweb-logo' />

      <p className='question-theme'>What side are you on?</p>
    </div>
  )
}

export default ThemeChooser;