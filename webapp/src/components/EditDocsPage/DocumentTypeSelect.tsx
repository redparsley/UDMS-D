import React from 'react';
import { Form } from 'react-bootstrap';

// Тип для опции
export interface Option {
  value: string;
  label: string;
}

// Пропсы компонента
interface DocumentTypeSelectProps {
  value?: string; // текущее выбранное значение
  onChange?: (value: string) => void; // обработчик изменения
}

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({ value, onChange }) => {
  const options: Option[] = [
    { value: 'contract', label: 'Договор' },
    { value: 'act', label: 'Акт' },
    { value: 'additional', label: 'Доп. Соглашение' },
    { value: 'termination', label: 'Соглашение о расторжении' },
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
      aria-label="Выберите тип документа"
    >
      <option value="">Выберите тип документа</option>
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

export default DocumentTypeSelect;