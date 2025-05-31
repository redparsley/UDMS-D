import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { documents } from '../../temp/Docs.tsx';
import "../../pages/MainPage/MainPage.css"
import { useNavigate } from 'react-router-dom';

export const DocsList: React.FC = () => {
    const navigate = useNavigate();

  return (
    <ListGroup>
      <ul className="list">
        {documents.map((doc) => (
          <ListGroup.Item
            action 
            key={doc.id} 
            className='document'
            as="li" // Явно указываем, что это элемент списка
            onClick={() => navigate('/edit-document')}
            // style={{cursor: 'pointer'}}
          >
            <p className="name">{doc.name}</p>
            <p className="status">{doc.status}</p>
          </ListGroup.Item>
        ))}
      </ul>
    </ListGroup>
  );
};