import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { documents } from '../../temp/Docs.tsx';

import "../../pages/MainPage/MainPage.css"


export const DocsList: React.FC = () => {
  return (
    <ListGroup>
      <ul className="list">
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