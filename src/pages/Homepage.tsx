import React, { useEffect, useState } from 'react';
import ThemeChooser from '../components/ThemeChooser';
import CustomForm from '../components/CustomForm';
import GuidedTourIntro from '../components/GuidedTourIntro';
import EditCustomForm from '../components/EditCustomForm';

import ThemeSwitch from '../components/ui-elements/ThemeSwitch';
import Button from '../components/ui-elements/Button';

import { getFromLocalStorage } from '../utils/getFromLocalStorage';

import './Homepage.scss';


const Homepage = () => {
  const [colorsTheme, setColorsTheme] = useState<'light' | 'dark' | null>(null);
  const [isFirstLogin, setIsFirstLogin] = useState<boolean>(true);
  const [showGuidedTour, setShowGuidedTour] = useState<true | false | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isFormEditable, setIsFormEditable] = useState<boolean>(false)

  const getIsFirstLogin = () => {
    const isFirstLoginLocalStorage: boolean = getFromLocalStorage('isFirstLogin');

    if (isFirstLoginLocalStorage === null) {
      setIsFirstLogin(true);
    } else {
      const colorsThemeLocalStorage: 'light' | 'dark' = getFromLocalStorage('colorTheme');
      setColorsTheme(colorsThemeLocalStorage);
      setIsFirstLogin(false);
    }
  };

  const editModeToggle = () => {
    setEditMode(!editMode);
  }

  useEffect(() => {
    getIsFirstLogin();
    // Check if Edit form button should be enabled
    if (!getFromLocalStorage('locallySavedFormItems')) {
      setIsFormEditable(false);
    } else if (getFromLocalStorage('locallySavedFormItems')?.length !== 0) {
      setIsFormEditable(true);
    }
  }, []);

  return (
    <>
      {isFirstLogin && <ThemeChooser setColorsTheme={setColorsTheme} setIsFirstLogin={setIsFirstLogin} />}

      {!isFirstLogin &&
        <div className={`container ${colorsTheme}`}>
          <div className='theme-switch-container'>
            <ThemeSwitch 
              colorsTheme={colorsTheme} 
              isFirstLogin={isFirstLogin} 
              setColorsTheme={setColorsTheme}
            />
          </div>

          <div className="edit-form-btn-container">
            <Button
                textBtn={editMode ? 'Add items' : 'Edit form'}
                colorsTheme={`${colorsTheme}`}
                handleClick={editModeToggle}
                size='m'
                disabled={!isFormEditable}
              />
          </div>

          <div className="form-container">
            <h1 className='title'>Welcome to your <span className='underline'>Custom Form Collector!</span></h1>

            {showGuidedTour === null && 
              <GuidedTourIntro
                setShowGuidedTour={setShowGuidedTour} 
                colorsTheme={colorsTheme} 
              />
            }

            {((showGuidedTour === true || showGuidedTour === false) && !editMode) && 
              <CustomForm
                setIsFormEditable={setIsFormEditable}
                colorsTheme={colorsTheme}
                showGuidedTour={showGuidedTour}
                setShowGuidedTour={setShowGuidedTour}
              />
            }

            {editMode && <EditCustomForm colorsTheme={colorsTheme} />}
          </div>
        </div>
      }
    </>
  )
}

export default Homepage;