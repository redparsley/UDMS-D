import { DocsList } from '../../components/MainPage/DocsList.tsx';
import { Search } from "../../components/UI/Search.tsx";
import { observer } from "mobx-react-lite";
import React from "react";
import { Header } from '../../components/UI/Header.tsx';

import { Context } from "../../index.tsx";
import Store from "../../store/store.ts";
import {useContext} from "react";
import { Navigate } from "react-router-dom";

import "./MainPage.css"

export const MainPage: React.FC = observer(() => {
 
  const { store } = useContext(Context);
      
      if (!store.isAuth) {
        // return <Navigate to="/auth" replace />;
         return <Navigate to="/admin" replace />; // ! TEMP!!
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