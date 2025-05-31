import React, { useState } from 'react';
import { Option } from './Option';
import { Dropdown } from 'react-bootstrap';

const DocumentTypeSelect: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const options: Option[] = [
    { value: 'contract', label: 'Договор' },
    { value: 'act', label: 'Акт' },
    { value: 'additional', label: 'Доп. Соглашение' },
    { value: 'termination', label: 'Соглашение о расторжении' },
  ];

  const handleSelect = (value: string, label: string) => {
    setSelectedValue(label);
    setIsOpen(false);
  };

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)}>
        {selectedValue || 'Выберите вид документа'}
      </div>
      
      {isOpen && (
        <Dropdown>
          <Dropdown.Menu>
            {options.map((option) => (
            <Dropdown.Item 
              id={option.value}
              key={option.value}
              onClick={() => handleSelect(option.value, option.label)}
            >
              {option.label}
            </Dropdown.Item>
          ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default DocumentTypeSelect;