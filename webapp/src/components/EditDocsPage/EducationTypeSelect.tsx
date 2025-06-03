import React from 'react';
import { Form } from 'react-bootstrap'
import { Option } from './Option';

const EducationTypeSelect: React.FC = () => {
  const options: Option[] = [
    { value: 'vo', label: 'ВО' },
    { value: 'dpo', label: 'ДПО' },
    { value: 'spo', label: 'СПО' },
  ];

  return (
      <Form.Select>
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