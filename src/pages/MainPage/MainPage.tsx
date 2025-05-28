import { Logo } from "../../components/UI/Logo.tsx";
import { DocsList } from '../../components/DocsList.tsx';
import { Search } from "../../components/UI/Search.tsx";
import { Navigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { Context } from "../../index.tsx";
import React, { useContext } from "react";

import "./MainPage.css"

export const MainPage: React.FC = observer(() => {
  const { store } = useContext(Context);
  
  if (!store.isAuth) {
    return <Navigate to="/auth" replace />;
  }
  
  return (
    <>
      <header className="header container">
          <Logo />
      </header>
      <main className="main container">
        <div className="docs-block">
          <h1 className="main-header">Список документов</h1>
          <Search />
          <DocsList />
        </div>
      </main>
    </>  
  );
});