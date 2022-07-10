import React from 'react';
import Button from './ui-elements/Button';

import './GuidedTourIntro.scss';

type Props = {
  setShowGuidedTour: (val: true | false | null) => void;
  colorsTheme: 'light' | 'dark' | null;
}

const GuidedTourIntro: React.FC<Props> = ({ setShowGuidedTour, colorsTheme }) => {
  return (
    <div className='guided-tour-container'>
      <p className='guided-tour-text'>
        Let's get you familiar with the functionalities. This will take no more than a few minutes.
      </p>

      <p className="guided-tour-text">
        If you already used our app before, you can skip this tour, pressing <button className='skip-tour-btn' onClick={() => setShowGuidedTour(false)}>here</button>.
      </p>

      <p className='guided-tour-text'>Are you ready? Click below.</p>

      <Button 
        textBtn='Start tour' 
        colorsTheme={`${colorsTheme}`} 
        handleClick={() => setShowGuidedTour(true)}
        size='l'
        disabled={false}
      />
    </div>
  )
}

export default GuidedTourIntro;