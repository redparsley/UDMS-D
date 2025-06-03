import React, { useContext, useEffect } from 'react';
import { DocsList } from '../../components/MainPage/DocsList.tsx';
import { Search } from "../../components/UI/Search.tsx";
import { observer } from "mobx-react-lite";
import { Header } from '../../components/UI/Header.tsx';
import { Context } from "../../context.ts";
import { Spinner, Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import "./MainPage.css"

export const MainPage: React.FC = observer(() => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  if (store.isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <Header heading='Список документов' />
      <main className="main container">
        <Button
          variant="success"
          onClick={() => navigate("/create-document")}
          className="mb-3"
        >
          Добавить документ
        </Button>
        <div className="docs-block">
          <div className="d-flex justify-content-between align-items-center mb-4">
            
          </div>
          <Search placeholder="Поиск по содержимому"/>
          <DocsList />
        </div>
      </main>
    </>  
  );
});