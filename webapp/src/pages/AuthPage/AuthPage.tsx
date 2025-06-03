import { AuthForm } from "../../components/Auth/Auth.tsx";
import { Header } from "../../components/UI/Header.tsx";
import React from "react";

// Импорт стилей
import "./AuthPage.css"


export const AuthPage: React.FC = () => {
  return (
    <>
      <Header heading="Авторизация"/>
      <main className="center-main main container">
        <div className="auth-block">
          <AuthForm />
        </div>
      </main>
    </>
  );
};