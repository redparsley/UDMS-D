import React from "react";
import { Logo } from "../../components/UI/Logo";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";

export function MainPage() {
  return (
    <>
      <header className="header container">
        <Logo />
      </header>
      <main className="main container">
        <div className="auth-block">
          {/* login */}
          <Form.Label htmlFor="inputLogin">Электронная почта</Form.Label>
          <Form.Control
            type="login"
            id="inputLogin"
          />
         
         {/* pass */}
          <Form.Label htmlFor="inputPassword5">Пароль</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
          />
          
          <Button className="btn" type="submit">
            Авторизоваться
          </Button>
        
        </div>
      </main>
    </>
  );
}
