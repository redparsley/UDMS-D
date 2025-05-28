import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Context } from "../../index.tsx"; // Исправленный путь к контексту
import { observer } from "mobx-react-lite"; // Добавлен observer для реактивности

export const AuthForm: React.FC = observer(() => { 
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      store.login(email, password);
    }
    console.log(store)
  };

  return (
    <Form noValidate onSubmit={handleSubmit}> 
      <Form.Group controlId="validationCustomUsername">
        <Form.Label>Адрес электронной почты</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="email" // Изменено с 'text' на 'email' для валидации
            placeholder="Email"
            aria-describedby="inputGroupPrepend"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Form.Control.Feedback type="invalid">
            Пожалуйста, укажите корректный почтовый адрес
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="validationCustom05">
        <Form.Label>Пароль</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Пароль" 
          required 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Form.Control.Feedback type="invalid">
          Пожалуйста, укажите корректный пароль
        </Form.Control.Feedback>
      </Form.Group>
      
      <Button type="submit"> {/* Добавлен type="submit" для формы */}
        Авторизоваться
      </Button>
    </Form>
  );
});