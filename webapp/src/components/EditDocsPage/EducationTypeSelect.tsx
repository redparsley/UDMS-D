import React from 'react';
import { Form } from 'react-bootstrap'
import { Option } from './Option';

interface DocumentTypeSelectProps {
  value?: string; // текущее выбранное значение
  onChange?: (value: string) => void; // обработчик изменения
}

const EducationTypeSelect: React.FC<DocumentTypeSelectProps> = ({ value, onChange }) => {
  const options: Option[] = [
    { value: 'vo', label: 'ВО' },
    { value: 'dpo', label: 'ДПО' },
    { value: 'spo', label: 'СПО' },
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
    >
      <option>Выберите вид образования</option>
      {options.map((option) => (
        <option
          key={option.value}
        >
          {option.label}
        </option>
      ))}
    </Form.Select>
  );
};

export default EducationTypeSelect;