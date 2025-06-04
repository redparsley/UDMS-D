import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import { fetchDocs } from '../../services/DocsServise'; // Импортируем функцию для загрузки документов
import { Doc } from '../../models/IDoc'; // Импортируем интерфейс Doc
import "../../pages/MainPage/MainPage.css";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

export const DocsList: React.FC = () => {
    const navigate = useNavigate();
    const [docs, setDocs] = useState<Doc[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDocuments = async () => {
            try {
                const data = await fetchDocs();
                setDocs(data);
            } catch (err) {
                setError('Не удалось загрузить документы');
                console.error('Error loading documents:', err);
            } finally {
                setLoading(false);
            }
        };

        loadDocuments();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-3">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="mt-3">
                {error}
            </Alert>
        );
    }

    if (docs.length === 0) {
        return (
            <Alert variant="info" className="mt-3">
                Документы не найдены
            </Alert>
        );
    }

    return (
        <ListGroup>
            <ul className="list">
                {docs.map((doc) => (
                    <ListGroup.Item
                        action 
                        key={doc.id} 
                        className='document'
                        as="li"
                        onClick={() => navigate('/edit-document', { state: { doc } })}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="document-name">
                            {getDocumentName(doc)} {/* Функция для формирования имени документа */}
                        </span>
                        <span className="document-status">{doc.status}</span>
                    </ListGroup.Item>
                ))}
            </ul>
        </ListGroup>
    );
};

// Вспомогательная функция для формирования названия документа
const getDocumentName = (doc: Doc): string => {
    return `Документ №#${doc.id}: ${doc.doctype} `;
};  