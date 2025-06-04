import React, { useContext, useState, useEffect } from "react"
import { Form, FormGroup, InputGroup, Button } from "react-bootstrap";
import { Context } from "../../context.ts";
import { useLocation } from "react-router-dom";

import { OrganizationSelect } from "../../components/EditDocsPage/OrganizationSelect.tsx";
import DocumentTypeSelect from "../../components/EditDocsPage/DocumentTypeSelect.tsx";
import EducationTypeSelect from "../../components/EditDocsPage/EducationTypeSelect.tsx";
import FinanceSelect from "../../components/EditDocsPage/FinanceSelect.tsx";

import { Header } from "../../components/UI/Header.tsx";

import { Doc } from "../../models/IDoc.ts"
import { fetchDocs } from "../../services/DocsServise.ts";

export function EditDocsPage() {
    const location = useLocation();
    const passedDoc = location.state?.doc;
    const { store } = useContext(Context);
    const [docs, setDocs] = useState<Doc[]>([]);
    const [editingDoc, setEditingDoc] = useState<Doc | null>(passedDoc || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editingDoc) {
            setEditingDoc({
                ...editingDoc,
                [e.target.id]: e.target.value
            });
        }
    };

    const handleOrganizationChange = (selectedOrg: string) => {
    if (editingDoc) {
        setEditingDoc({
            ...editingDoc,
            organization: selectedOrg
        });
    }
    };

    useEffect(() => {
        const loadDocs = async () => {
            try {
                const data = await fetchDocs();
                setDocs(data);
            } catch (err) {
                setError('Failed to fetch documents');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadDocs();
    }, []);

    const handleSave = (updatedDoc: Doc) => {
        setDocs(docs.map(doc =>
            doc.id === updatedDoc.id ? updatedDoc : doc
        ));
        setEditingDoc(null);
    };

    const handleBtnClick = (doc: Doc) => {
        setEditingDoc(doc);
      };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <>
            <Header heading={'Редактирование документа'} />
            <main className="main container">
                <Form noValidate>
                    <div className="input-block mb-4">
                        <Form.Group controlId="document_id" className="inp">
                            <Form.Label>№ документа</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="number"
                                    placeholder="№ документа"
                                    value={editingDoc?.id || ''}
                                    disabled

                                />
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, укажите номер документа
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <FormGroup className="inp">
                            <OrganizationSelect   
                            value={editingDoc?.organization || ''}
                            onChange={handleOrganizationChange}/>
                        </FormGroup>

                        <Form.Group controlId="fullname" className="inp">
                            <Form.Label>ФИО ответственного</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder="Иванов Иван Иванович"
                                    value={editingDoc?.responsible_fullname.last_name || ''}
                                    required
                                    onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, укажите ФИО Ответственного
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <FormGroup className="inp">
                            <DocumentTypeSelect value={editingDoc?.doctype}/>
                        </FormGroup>

                        <FormGroup className="inp">
                            <EducationTypeSelect value={editingDoc?.edutype}/>
                        </FormGroup>

                        <FormGroup className="inp">
                            <FinanceSelect value={editingDoc?.finance} />
                        </FormGroup>

                        <Form.Group controlId="agent_fullname" className="inp">
                            <Form.Label>ФИО контрагента</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder="Иванов Иван Иванович"
                                    value={editingDoc?.agent_fullname.last_name || ''}
                                    required
                                    onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, укажите ФИО контрагента 
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="academy_fullname" className="inp">
                            <Form.Label>ФИО подписанта со стороны Академии</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder="Иванов Иван Иванович"
                                    value={editingDoc?.academy_fullname.last_name || ''}
                                    required
                                    onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, укажите ФИО подписанта со стороны Академии
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="agent_username" className="inp">
                            <Form.Label>Сумма договора</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="number"
                                    placeholder="₽"
                                    step="0.01"
                                    value={editingDoc?.amount || ''}
                                    required
                                    onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, укажите сумму договора
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </div>

                    <Button type="submit" disabled={store.isLoading}>
                        {store.isLoading ? 'Загрузка...' : 'Сохранить изменения'}
                    </Button>
                </Form>
            </main>
        </>
    )
}