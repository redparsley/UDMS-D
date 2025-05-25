import { useState } from 'react';
import Button from 'react-bootstrap/Button';

export function Auth() {
    const [isAuthorised, setIsAuthorised] = useState(false);
    const [userName, setUserName] = useState("");

      // Функция для имитации авторизации
    const handleAuth = () => {
      setIsAuthorised(!isAuthorised);
      setUserName("Иван Иванов"); // Здесь должно быть реальное имя пользователя
    };

    return (  
      <>
       {isAuthorised ? (
       <>
        <p className="text">{userName}</p>
        <Button onClick={handleAuth} id="logoutBtn" className='btn'>
          Выйти из профиля
        </Button>
       </>
      ) : (
        <Button onClick={handleAuth} id='loginBtn' className='btn'>
          Авторизоваться
        </Button>
      )}
      </>  
    );
}