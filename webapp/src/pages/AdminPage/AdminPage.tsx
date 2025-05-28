import { Search } from "../../components/UI/Search.tsx";
import { observer } from "mobx-react-lite";
import { Header } from "../../components/UI/Header.tsx";
import React, {useState, useMemo} from "react";
import { ListGroup, ButtonGroup, Button } from "react-bootstrap";

import { Users } from "../../temp/Users.ts"


import "./AdminPage.css"

export const AdminPage: React.FC = observer(() => {
  return (
    <>
     <Header/>
      <main className="main container">
        <div className="users-block">
            <Search placeholder="Поиск по почте" />
            <ListGroup>
              <ul className="list">
                {Users.map((user) => (
                  <ListGroup.Item 
                    action 
                    key={user.id} 
                    className='list-item'
                    as="li" // Явно указываем, что это элемент списка
                  >
                    <span className="user-email">{user.email}</span>
                    <span className="user-full_name">{user.full_name}</span>
                    <span className="user-role">{user.role}</span>
                    <span className="user-last_login_at">{user.last_login_at}</span>
                    <ButtonGroup>
                      <Button variant="primary">
                          Изменить 
                      </Button>
                      <Button variant="danger">
                          Удалить 
                      </Button>
                    </ButtonGroup>
                  </ListGroup.Item>
                ))}
              </ul>
            </ListGroup>
        </div>
      </main>
    </>  
  );
});