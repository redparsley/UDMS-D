import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

interface Document {
  name: string;
  status: string;
  id: number;
}

const documents: Document[] = [
  {
    name: "Служебная записка №123141",
    status: "Не подписан",
    id: 1
  },
  {
    name: "Служебная записка №1421241441",
    status: "Подписан",
    id: 2
  },
];

export const DocsList: React.FC = () => {
  return (
    <ListGroup>
      <ul className="docs-list">
        {documents.map((doc) => (
          <ListGroup.Item 
            action 
            key={doc.id} 
            className='document'
            as="li" // Явно указываем, что это элемент списка
          >
            <p className="name">{doc.name}</p>
            <p className="status">{doc.status}</p>
          </ListGroup.Item>
        ))}
      </ul>
    </ListGroup>
  );
};