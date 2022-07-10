import React, { useState } from 'react';
import CustomFormItem from './CustomFormItem';
import Button from './ui-elements/Button';
import { FormItem } from '../model/FormItem';

import { getFromLocalStorage } from '../utils/getFromLocalStorage';
import { setInLocalStorage } from '../utils/setInLocalStorage';

import './EditCustomForm.scss';

type Props = {
  colorsTheme: 'light' | 'dark' | null;
}

const EditCustomForm: React.FC<Props> = ({ colorsTheme }) => {
  const locallySavedFormItems = getFromLocalStorage("locallySavedFormItems") || [];
  const [formItems, setFormItems] = useState<FormItem[]>(locallySavedFormItems);

  const updateFormItem = (itemUpdated: FormItem) => {
    setFormItems(locallySavedFormItems.map((formItem: FormItem) => { 
        if (formItem.id === itemUpdated.id) {
          formItem = itemUpdated;
        }
        return formItem;
    }));
  };

  const saveFormLocally = () => {
    setInLocalStorage('locallySavedFormItems', formItems);
  };

  return (
    <form className='data-form'>
      <h2 className='data-form-title'>Edit your saved data below:</h2>

      {formItems.map(( item ) => 
        <CustomFormItem 
          key={item.id.toString()}
          formItem={item}
          updateItem={updateFormItem}
          editMode={true}
          colorsTheme={colorsTheme}
        />)
      }

      {formItems.length > 0 && 
        <Button 
          textBtn='Save'
          size='l'
          colorsTheme={`${colorsTheme}`}
          disabled={false}
          handleClick={saveFormLocally}
        />
      }
    </form>
  )
}

export default EditCustomForm;