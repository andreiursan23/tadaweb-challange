import React, { useState, useRef } from 'react';
import CustomFormItem from './CustomFormItem';
import GuideCustomForm from './GuideCustomForm';
import Button from './ui-elements/Button';
import { FormItem } from '../model/FormItem';

import { getFromLocalStorage } from '../utils/getFromLocalStorage';
import { setInLocalStorage } from '../utils/setInLocalStorage';

import './CustomForm.scss';

type Props = {
  setIsFormEditable: (val: boolean) => void;
  colorsTheme: 'light' | 'dark' | null;
  showGuidedTour: true | false | null;
  setShowGuidedTour: (val: boolean) => void;
}

const CustomForm: React.FC<Props> = ({ 
  setIsFormEditable,
  colorsTheme,
  showGuidedTour,
  setShowGuidedTour
}) => {
  const defaultFormItem: FormItem = {id: -1, name: '', content: '', type: 'text'};
  const [formItem, setFormItem] = useState<FormItem>({...defaultFormItem });
  const locallySavedFormItems = getFromLocalStorage("locallySavedFormItems") || [];
  const [formItems, setFormItems] = useState<FormItem[]>(locallySavedFormItems);
  const counterFormItems = 
    useRef(formItems[formItems.length - 1]?.id || 0);

  // Form item actions
  const updateFormItem = (formItemUpdated: FormItem) => {
    setFormItem(formItemUpdated);
  }

  const addFormItem = () => {
    formItems.push({ ...formItem, id: counterFormItems.current + 1 });
    setFormItems(formItems);
    setFormItem(defaultFormItem);
    counterFormItems.current++;
  }

  const removeFormItem = (index: number) => {
    const formItemUpdated = formItems.filter((item) => item.id !== index);
    setFormItems(formItemUpdated);
    counterFormItems.current = formItemUpdated[formItemUpdated.length - 1]?.id || 0;
    if (counterFormItems.current === 0) {
      setIsFormEditable(false);
    }
  }

  const removeAllItems = () => {
    setFormItems([]);
    counterFormItems.current = 0;
    if (counterFormItems.current === 0) {
      setIsFormEditable(false);
    }
  }

  const saveFormLocally = () => {
    setInLocalStorage('locallySavedFormItems', formItems);
    if (counterFormItems.current !== 0) {
      setIsFormEditable(true);
    }
  }

  return (
    <>
      <div className='form'>
        <h2 className='add-field-form-title'>
          Add field <span className="accent-color">name</span>, <span className="accent-color">type</span> and <span className="accent-color">value</span>, then add it to your form:
        </h2>

        <div className='add-field-container'>        
          <CustomFormItem 
            formItem={formItem}
            updateItem={updateFormItem}
            editMode={true}
            colorsTheme={colorsTheme}
          />
          <Button 
            textBtn='Add'
            size='m'
            colorsTheme={`${colorsTheme}`}
            disabled={false}
            handleClick={addFormItem}
          />
        </div>

        <form className='data-form'>
          {formItems.length !== 0 && <h2 className='data-form-title'>View or delete your saved data below:</h2>}

          {formItems.map(( formItem ) =>
            <CustomFormItem 
              key={formItem.id.toString()}
              formItem={formItem}
              editMode={false}
              removeItem={removeFormItem}
              colorsTheme={colorsTheme}
            />)
          }

          {!formItems.length && 
            <p className='empty-data-text'>Your form data will be displayed here, after you add some values</p>
          }

          <div className="control-btn-container">
            {formItems.length !== 0 && 
              <Button 
              textBtn='Remove all'
              size='l'
              colorsTheme={`${colorsTheme}`}
              disabled={false}
              handleClick={removeAllItems}
              />
            }

            <Button 
              textBtn='Save'
              size='l'
              colorsTheme={`${colorsTheme}`}
              disabled={false}
              handleClick={saveFormLocally}
            />
          </div>
        </form>
      </div>

      {showGuidedTour && <GuideCustomForm setShowGuidedTour={setShowGuidedTour} />}
    </>
  )
}

export default CustomForm;