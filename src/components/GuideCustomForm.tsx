import React from 'react';
import { GuideSteps } from '../model/GuideSteps';

import './GuideCustomForm.scss';
import closeIcon from '../assets/close-icon.svg';

const guideStepsList: GuideSteps[] = [
  {
    id: 0,
    text: '1. Fill in your data in the 3 available fields: name, type and value.',
  },
  {
    id: 1,
    text: '2. Click on "Add" to see the information in the form that collects your data, found below.',
  },
  {
    id: 2,
    text: '3. Once you add all your data, hit "Save".',
  },
  {
    id: 3,
    text: '4. You can also edit the information, from the view accessible clicking on "Edit form" at the top right of the page.',
  },
  {
    id: 4,
    text: `5. After you finish editing, don't forget to click on "Save" again.`,
  },
]

type Props = {
  setShowGuidedTour: (val: boolean) => void;
}

const GuideCustomForm: React.FC <Props> = ({ setShowGuidedTour }) => {
  return (
    <div className='overlay'>
      <div className='guide-container'>
        <p className='guide-text'>To use this app, please follow these steps:</p>
        <ul className='guide-steps-list'>
          {guideStepsList.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
        <p className='guide-text'>Enjoy our app!</p>

        <button className='close-btn' onClick={() => setShowGuidedTour(false)}>
          <img src={closeIcon} alt="Close icon" />
        </button>
      </div>
    </div>
  )
}

export default GuideCustomForm;