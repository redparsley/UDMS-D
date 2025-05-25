import React from "react";
import { Logo } from "../../components/UI/Logo";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export function MainPage() {
  return (
    <>
      <header className="header container">
        <Logo />
      </header>
      <main className="main container">
        <div className="auth-block">
          <Form.Label htmlFor="inputLogin">Электронная почта</Form.Label>
          <Form.Control
            type="login"
            id="inputLogin"
            aria-describedby="loginHelpBlock"
          />
          <Form.Text id="loginHelpBlock" muted>
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </Form.Text>
          <Form.Label htmlFor="inputPassword5">Пароль</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
          />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </Form.Text>
        </div>
      </main>
    </>
  );
}
