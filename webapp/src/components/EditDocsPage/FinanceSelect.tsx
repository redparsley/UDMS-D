import React from "react";
import { Form } from 'react-bootstrap';
import { Option } from "./Option";

// Пропсы компонента
interface FinanceSelectProps {
  value?: string; // текущее выбранное значение (value опции)
  onChange?: (value: string) => void; // обработчик изменения
}

const FinanceSelect: React.FC<FinanceSelectProps> = ({ value, onChange }) => {
  const options: Option[] = [
    { value: 'subsidy', label: 'Субсидия' },
    { value: 'pdd', label: 'ПДД' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  
  return (
    <Form.Select
      value={value || ''}
      onChange={handleChange}
      aria-label="Выберите вид финансирования"
    >
      <option value="">Выберите вид финансирования</option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </Form.Select>
  );
};

export default FinanceSelect;