import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../context.ts';
import { observer } from 'mobx-react-lite';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = observer(({ children, requireAdmin = false }) => {
  const { store } = useContext(Context);

  // Если приложение еще не инициализировано или идет загрузка, показываем пустой экран
  if (!store.isInitialized || store.isLoading) {
    return null;
  }

  if (!store.isAuth) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !['admin', 'red-admin'].includes(store.user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}); 