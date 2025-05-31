import React, { useState } from 'react';
import { Option } from './Option';

export const OrganizationSelect: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const options: Option[] = [
    { value: 'finance', label: 'Факультет финансов' },
    { value: 'international', label: 'Факультет международных отношений и бизнеса' },
    { value: 'hospitality', label: 'Факультет гостеприимства и индустрии спорта' },
    { value: 'management', label: 'Факультет менеджмента и инноватики' },
    { value: 'marketing', label: 'Факультет маркетинга' },
    { value: 'project', label: 'Факультет проектного управления' },
    { value: 'governance', label: 'Институт "Высшая школа государственного управления"' },
    { value: 'social', label: 'Институт общественных наук' },
    { value: 'cis', label: 'Центр Базовой организации СНГ по подготовке кадров в области государственного правления ФБ «Международная деятельность»' },
    { value: 'economics', label: 'Общеэкономический факультет' },
    { value: 'science', label: 'Управление наукометрии и рейтингового продвижения' },
    { value: 'informatics', label: 'Институт экономики, математики и информационных технологий' },
    { value: 'law', label: 'Институт права и национальной безопасности' },
    { value: 'logistics', label: 'Центр логистики, планирования и учета нагрузки ИГСУ' },
    { value: 'education', label: 'Центр дополнительного профессионального образования ИГСУ' },
    { value: 'postgraduate', label: 'Управление аспирантуры и докторантуры' },
    { value: 'initiatives', label: 'Дирекция приоритетных образовательных инициатив' },
    { value: 'lyceum', label: 'Лицей' },
    { value: 'college', label: 'Колледж многоуровневого профессионального образования' },
  ];

  const handleSelect = (value: string, label: string) => {
    setSelectedValue(label);
    setIsOpen(false);
  };

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue || 'Выберите факультет/институт'}
      </div>
      
      {isOpen && (
        <div>
          {options.map((option) => (
            <div
              key={option.value}
              className="p-2 hover:bg-gray-100 cursor-pointer"
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