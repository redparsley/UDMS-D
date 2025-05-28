import React from 'react';
import { Logo } from "./Logo.tsx";
import Button from 'react-bootstrap/Button';
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../index.tsx";
import { useNavigate } from "react-router-dom";

export const Header = observer(() => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await store.logout();
    navigate('/auth');
  };

  return (
    <header className="header container">
      <Logo />
      {store.isAuth && (
        <div className="d-flex align-items-center gap-3">
          <span className="text-light">{store.user.full_name}</span>
          <Button variant="secondary" onClick={handleLogout}>
            Выйти из профиля
          </Button>
        </div>
      )}
    </header>
  );
});