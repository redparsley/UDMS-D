import { Logo } from "../../components/UI/Logo";
import { AuthForm } from "../../components/Auth/Auth.tsx";
import React from "react";
import "react-bootstrap"

// Импорт стилей
import "./AuthPage.css"

export const AuthPage: React.FC = () => {
  return (
    <>
      <header className="header container">
        <Logo />
        <h1>Авторизация</h1>
      </header>
      <main className="main container">
        <div className="auth-block">
          <AuthForm />
        </div>
      </main>
    </>
  );
};