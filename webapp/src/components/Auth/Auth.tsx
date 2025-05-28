import React, { useContext, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Context } from "../../index.tsx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

export const AuthForm: React.FC = observer(() => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validated, setValidated] = useState(false);
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (email && password) {
      try {
        await store.login(email, password);
        navigate('/');
      } catch (e) {
        // Error is handled in store
      }
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <div className="input-block">
        <Form.Group controlId="validationCustomUsername" className="inp">
          <Form.Label>Адрес электронной почты</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={store.isLoading}
            />
            <Form.Control.Feedback type="invalid">
              Пожалуйста, укажите корректный почтовый адрес
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="validationCustom05" className="inp">
          <Form.Label>Пароль</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Пароль" 
            required 
            minLength={5}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={store.isLoading}
          />
          <Form.Control.Feedback type="invalid">
             Пожалуйста, укажите корректный пароль
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      
      <Button type="submit" disabled={store.isLoading}>
        {store.isLoading ? 'Загрузка...' : 'Авторизоваться'}
      </Button>
    </Form>
  );
});