import { Logo } from "./Logo.tsx";
import Button from 'react-bootstrap/Button';



export function Header(props) {
   
 return (
    <header className="header container">
        <Logo />

        <Button variant="secondary" >
            Выйти из профиля
        </Button>
    </header>
 );
}