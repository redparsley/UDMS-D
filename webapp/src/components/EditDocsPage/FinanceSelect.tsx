import React, { useState } from "react";
import { Option } from "./Option";

const FinanceSelect: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const options: Option[] = [
    { value: 'subsidy', label: 'Субсидия' },
    { value: 'pdd', label: 'ПДД' },
  ];

  const handleSelect = (value: string, label: string) => {
    setSelectedValue(label);
    setIsOpen(false);
  };

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)}>
        {selectedValue || 'Выберите вид финансирования'}
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

export default FinanceSelect;