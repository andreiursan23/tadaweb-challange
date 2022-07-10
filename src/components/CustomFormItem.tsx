import React from 'react';
import { FormItem, FormItemProps } from '../model/FormItem';
import Button from './ui-elements/Button';

import './CustomFormItem.scss';

const CustomFormItem: React.FC<FormItemProps> = ({
  formItem,
  editMode,
  updateItem,
  removeItem,
  colorsTheme
}) => {
  // Edit field functions
  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    formItem.name = event.target.value;
    updateStateItem();
  } 

  const updateContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    formItem.content = event.target.value;
    updateStateItem();
  }

  const updateType = (type: String) => {
    formItem.type = type as FormItem["type"];
    updateStateItem();
  }

  const updateStateItem = () => {
    if (updateItem) {
      updateItem({id: formItem.id, name: formItem.name, content: formItem.content, type: formItem.type});
    }
  }

  const displayLabelName = formItem.name.trim() ? formItem.name : "Item " + formItem.id;

  return (
    <div className={formItem.id === -1 ? "create-field-form" : "display-data-field"}>
      {editMode && formItem.id === -1 &&
        <div className="form-field">
          <label htmlFor="field-name">Name:</label>
          <input 
            placeholder="ex: Name, age, email, birth date"
            id="field-name" 
            name="field-name"
            type="text"
            readOnly={!editMode}
            value={formItem.name}
            onChange={updateName}
          />
        </div>
      }

      {formItem.id === -1 &&
        <div className="form-field">
          <label htmlFor="field-types">Type:</label>
          <select 
            name="field-types" 
            id="field-types" 
            value={formItem.type} 
            onChange={(e) => updateType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="email">Email</option>
          </select>
        </div>
      }

      {formItem.id !== -1 && <label className='saved-data-label'>{displayLabelName}:</label>}

      <div className="form-field">
        {formItem.id === -1 && <label htmlFor="field-value">Value:</label>}
        
        <input 
          placeholder={
            formItem.id === -1 ? "ex: John Doe, 33, john.doe@gmail.com, 21/04/2014" : "No value"
          }
          id="field-value"
          className={editMode ? 'full-width' : ''}
          name="field-value"
          readOnly={!editMode} 
          type={formItem.type} 
          value={formItem.content} 
          onChange={updateContent}
        />

        {(removeItem && !editMode) && 
          <Button 
            textBtn='Remove'
            size='s'
            disabled={false}
            colorsTheme={`${colorsTheme}`}
            handleClick={() => {removeItem(formItem.id)}}
          />
        }
      </div>
    </div>
  )
}

export default CustomFormItem;