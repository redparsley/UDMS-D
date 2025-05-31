import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

const EducationTypeSelect: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const options: Option[] = [
    { value: 'vo', label: 'ВО' },
    { value: 'dpo', label: 'ДПО' },
    { value: 'spo', label: 'СПО' },
  ];

  const handleSelect = (value: string, label: string) => {
    setSelectedValue(label);
    setIsOpen(false);
  };

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)}>
        {selectedValue || 'Выберите вид образования'}
      </div>
      
      {isOpen && (
        <div>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value, option.label)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationTypeSelect;