import React from "react";
import { Logo } from "../../components/UI/Logo"
import { Button } from "react-bootstrap";
import { DocsList } from '../../components/DocsList'
import { Search } from "../../components/Search"
import { href } from "react-router-dom";

import { useNavigate } from "react-router-dom";


export function MainPage() {

    function LoginLayout() {
      
      let navigate = useNavigate(); 
      const routeChange = () =>{ 
        let path = `../AuthPage/AuthPage.jsx`; 
        navigate(path);
    }};

    return (
      <>
        <header className="header container">
            <Logo />
            <Button variant="primary">Авторизуйтесь</Button>
        </header>
        <main className="main container">
          <div className="docs-block">
            <h1 className="main-header">Список документов</h1>
            <Search />
            < DocsList />
          </div>
        </main>
      </>  
    );
}

