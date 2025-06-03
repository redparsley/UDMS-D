import React, { useState } from "react";
import { Option } from "./Option";
import {Form} from 'react-bootstrap'

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
       <Form.Select>
        <option>Выберите вид финансирования</option>
          {options.map((option) => (
            <option
              key={option.value}
              onClick={() => handleSelect(option.value, option.label)}
            >
              {option.label}
            </option>
          ))}
      </Form.Select>
  );
};

export default FinanceSelect;