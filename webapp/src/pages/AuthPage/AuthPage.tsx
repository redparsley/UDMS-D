import { Logo } from "../../components/UI/Logo.tsx";
import { AuthForm } from "../../components/Auth/Auth.tsx";
import React from "react";

// Импорт стилей
import "./AuthPage.css"


export const AuthPage: React.FC = () => {
  return (
    <>
      <header className="header container">
        <Logo />
        <h1>Авторизация</h1>
      </header>
      <main className="center-main main container">
        <div className="auth-block">
          <AuthForm />
        </div>
      </main>
    </>
  );
};