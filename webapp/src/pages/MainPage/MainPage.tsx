import React, { useContext, useEffect } from 'react';
import { DocsList } from '../../components/MainPage/DocsList.tsx';
import { Search } from "../../components/UI/Search.tsx";
import { observer } from "mobx-react-lite";
import { Header } from '../../components/UI/Header.tsx';
import { Context } from "../../index.tsx";
import { Navigate } from "react-router-dom";
import { Spinner } from 'react-bootstrap';

import "./MainPage.css"

export const MainPage: React.FC = observer(() => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  if (!store.isAuth) {
    return <Navigate to="/auth" replace />;
  }

  if (store.isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="main container">
        <div className="docs-block">
          <h1 className="main-header">Список документов</h1>
          <Search placeholder="Поиск по содержимому"/>
          <DocsList />
        </div>
      </main>
    </>  
  );
});