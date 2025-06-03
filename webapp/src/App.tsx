import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {AuthPage} from './pages/AuthPage/AuthPage.tsx';
import {MainPage} from './pages/MainPage/MainPage.tsx';
import {AdminPage} from './pages/AdminPage/AdminPage.tsx';
import { EditDocsPage } from './pages/EditDocsPage/EditDocsPage.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { Context } from './context.ts';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "./styles/var.css" 
import "./styles/main.css"
import { CreateUserPage } from './pages/CreateUserPage/CreateUserPage.tsx';

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        aria-label="Notification"
      />
      <Routes>
        <Route path="/auth" element={
        <AuthPage />
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin>
            <AdminPage />
          </ProtectedRoute>
        } />
        <Route path="/edit-document" element={
          <ProtectedRoute>
            <EditDocsPage />
          </ProtectedRoute>
        } />
         <Route path="/create-user" element={
          <ProtectedRoute>
            <CreateUserPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;