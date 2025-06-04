import React, { useContext } from "react"
import { Form, FormGroup, InputGroup, Button } from "react-bootstrap";
import { Context } from "../../context.ts";

import { OrganizationSelect } from "../../components/EditDocsPage/OrganizationSelect.tsx";
import DocumentTypeSelect from "../../components/EditDocsPage/DocumentTypeSelect.tsx";
import EducationTypeSelect from "../../components/EditDocsPage/EducationTypeSelect.tsx";
import FinanceSelect from "../../components/EditDocsPage/FinanceSelect.tsx";

import { Header } from "../../components/UI/Header.tsx";

export function CreateDocsPage() {
 const { store } = useContext(Context);
    return (
        <>
        <Header heading={'Создание документа'}/>
        <main className="main container">
            <Form noValidate>
                <div className="input-block mb-4">
                    <Form.Group controlId="document_id" className="inp">
                        <Form.Label>№ документа</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="number"
                                placeholder="№ документа"
                                required
                            // value={document.id}
                            />
                            <Form.Control.Feedback type="invalid">
                                Пожалуйста, укажите номер документа
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <FormGroup className="inp">
                        <OrganizationSelect />
                    </FormGroup>

                    <Form.Group controlId="fullname" className="inp">
                        <Form.Label>ФИО ответственного</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                placeholder="Иванов Иван Иванович"
                                required
                            // value={document.username}
                            />
                            <Form.Control.Feedback type="invalid">
                                Пожалуйста, укажите ФИО Ответственного
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <FormGroup className="inp">
                        <DocumentTypeSelect />
                    </FormGroup>

                    <FormGroup className="inp">
                        <EducationTypeSelect />
                    </FormGroup>

                    <FormGroup className="inp">
                        <FinanceSelect />
                    </FormGroup>

                    <Form.Group controlId="agent_fullname" className="inp">
                        <Form.Label>ФИО контрагента</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                placeholder="Иванов Иван Иванович"
                                required
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
                                required
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
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Пожалуйста, укажите сумму договора
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </div>

                <Button 
                type="submit" 
                disabled={store.isLoading}
                // onClick={}
                >
                    {store.isLoading ? 'Загрузка...' : 'Сохранить изменения'}
                </Button>
            </Form>
        </main>
        </>
    )
}