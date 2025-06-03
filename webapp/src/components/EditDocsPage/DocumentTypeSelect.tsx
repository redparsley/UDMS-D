import React from 'react';
import { Option } from './Option';
import { Form } from 'react-bootstrap';

const DocumentTypeSelect: React.FC = () => {

  const options: Option[] = [
    { value: 'contract', label: 'Договор' },
    { value: 'act', label: 'Акт' },
    { value: 'additional', label: 'Доп. Соглашение' },
    { value: 'termination', label: 'Соглашение о расторжении' },
  ];

  return (
            <Form.Select>
            <option>Выберите тип документа</option>
            {options.map((option) => (
              <option
                id={option.value}
                key={option.value}
              >
                {option.label}
              </option>
            ))}
          </Form.Select>
      )
};

export default DocumentTypeSelect;