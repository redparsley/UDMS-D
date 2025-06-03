import React, { useContext } from "react"
import { Header } from "../../components/UI/Header.tsx";
import { Form, Button, InputGroup, FormGroup } from 'react-bootstrap'
import { Context } from "../../context.ts";



export function CreateUserPage() {
    const { store } = useContext(Context);
    const isAdmin = ['admin', 'red-admin'].includes(store.user.role);

    return (
        <>
            <Header heading="Создать нового пользователя"/>
            <main className="main container">
                <Form noValidate>
                    <Form.Group controlId="user_fullname" className="inp">
                        <Form.Label>ФИО сотрудника</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                placeholder="Иванов Иван Иванович"
                                required
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="user_dateofbirth" className="inp">
                        <Form.Label>Дата рождения</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="date"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Пожалуйста, укажите дату рождения
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="user_email" className="inp">
                        <Form.Label>Email</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="email"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Пожалуйста, укажите корректный email адрес
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="user_phone" className="inp">
                        <Form.Label>Телефон</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="phone"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Пожалуйста, укажите корректный телефон
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="employee_role" className="mb-3">
                        <Form.Label>Роль сотрудника</Form.Label>
                        <div>
                            <Form.Check
                                inline
                                label="Админ"
                                name="employee_role"
                                type="radio"
                                id="inline-checkbox-admin"
                                value="admin"
                            />

                            {isAdmin && (
                                <Form.Check
                                    inline
                                    label="Супер-админ"
                                    name="employee_role"
                                    type="radio"
                                    id="inline-checkbox-super-admin"
                                    value="super_admin"
                                />
                            )}

                            <Form.Check
                                inline
                                label="Специалист"
                                name="employee_role"
                                type="radio"
                                id="inline-checkbox-specialist"
                                value="specialist"
                            />
                        </div>
                        <Form.Control.Feedback type="invalid">
                            Пожалуйста, укажите роль сотрудника
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit" disabled={store.isLoading}>
                        {store.isLoading ? 'Загрузка...' : 'Сохранить изменения'}
                    </Button>
                </Form>
            </main>
        </>
    );
}