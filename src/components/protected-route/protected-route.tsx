import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  isAuthCheckedSelector,
  userDataSelector
} from '../../services/slices/userSlice';
import { Preloader } from '@ui';

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
}) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const userData = useSelector(userDataSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if ((!onlyUnAuth && !userData) || (onlyUnAuth && userData)) {
    const redirectTo = onlyUnAuth ? location.state?.from || '/' : '/login';
    return <Navigate replace to={redirectTo} state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
