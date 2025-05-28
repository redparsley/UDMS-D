import { Search } from "../../components/UI/Search.tsx";
import { observer } from "mobx-react-lite";
import { Header } from "../../components/UI/Header.tsx";
import React, { useState } from "react";
import { Table, Button, Form, InputGroup } from "react-bootstrap";
import { Popup } from "../../components/UI/Popup.tsx";


import { Users } from "../../temp/Users.ts"
import { IUser } from "../../models/IUser.ts";
import "./AdminPage.css"

export const AdminPage: React.FC = observer(() => {

  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const [users, setUsers] = useState<IUser[]>(Users);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);

  // Обработчик клика по строке
  const handleBtnClick = (user: IUser) => {
    setEditingUser(user);
  };

  // Сохранение изменений
  const handleSave = (updatedUser: IUser) => {
    setUsers(Users.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    ));
    setEditingUser(null);
  };

  const remove = () => {

  }

  return (
    <>
      <Header />
      <main className="main container">
        <Table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Email</th>
              <th>Роль</th>
              <th>Дата последней авторизации</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr
                key={user.id}
              >
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.last_login_at}</td>
                <td>
                  <Button
                    onClick={() => handleBtnClick(user)}
                  >
                    Изменить
                  </Button>
                </td>
                <td>
                  <Button variant="danger"
                  // onClick={() => remove(user)}
                  >
                    Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {editingUser && (
          <Popup isOpen={!!editingUser} onClose={() => setEditingUser(null)}>
            <div className="edit-user-popup">
              <h2>Редактировать пользователя</h2>

              <Form className="popup-form">
                <Form.Group controlId="validationFullName" className="inp">
                  <Form.Label>ФИО</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      name="full_name"
                      placeholder="ФИО"
                      required
                      value={editingUser.full_name}
                      onChange={(e) => setEditingUser({ ...editingUser, full_name: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                      Пожалуйста, укажите ФИО
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="validationEmail" className="inp">
                  <Form.Label>Email</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                      Пожалуйста, укажите корректный почтовый адрес
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="validationRole" className="inp">
                  <Form.Label>Роль</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Select
                      name="role"
                      required
                      value={editingUser.role} // Автоматически выберет соответствующую роль
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    >
                      <option value={editingUser.role === "admin" ? "admin" : "user"}>
                        {editingUser.role === "admin" ? "Админ" : "Специалист"}
                      </option>

                      <option value={editingUser.role === "admin" ? "user" : "admin"}>
                        {editingUser.role === "admin" ? "Специалист" : "Админ"}
                      </option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Пожалуйста, выберите роль
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <div className="popup-footer">
                  <Button type="submit" variant="success" className="save-btn">
                    Сохранить
                  </Button>
                </div>
              </Form>
            </div>
          </Popup>
        )}

      </main>
    </>
  );
});