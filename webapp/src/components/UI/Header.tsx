import React from 'react';
import { Logo } from "./Logo.tsx";
import Button from 'react-bootstrap/Button';
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../context.ts";
import { useNavigate, useLocation } from "react-router-dom";

type HeaderProps = {
  heading: string;
}

export const Header = observer((props: HeaderProps) => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await store.logout();
    navigate('/auth');
  };

  const isAdmin = ['admin', 'red-admin'].includes(store.user.role);

  return (
    <header className="header container">
      <div className="header-top mb-4">
        <Logo />
        <h1>{props.heading}</h1>
      </div>

      {useLocation().pathname === "/" && (
        <div className="header-bottom">
          {isAdmin && (
            <Button
              variant="primary"
              onClick={() => navigate('/admin')}
            >
              Админ-панель
            </Button>
          )}

          {store.isAuth && (
            <>
              <div className="d-flex align-items-center gap-3">
                <span className='header-username'>{store.user.full_name}</span>
                <Button variant="secondary" onClick={handleLogout}>
                  Выйти из профиля
                </Button>
              </div>
            </>
          )}
        </div>
      )}

    </header>
  );
});