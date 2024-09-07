import { Navigate, Outlet } from 'react-router-dom';
import { UseFormContext } from '../context/UseFormContext';
export const GuestLayout = () => {
  const { user } = UseFormContext();
  return !user ? <Outlet /> : <Navigate to="/" />;
};
