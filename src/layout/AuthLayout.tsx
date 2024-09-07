import { Navigate, Outlet } from 'react-router-dom';
import { UseFormContext } from '../context/UseFormContext';
export const AuthLayout = () => {
  const { user } = UseFormContext();
  return user ? (
    <div className="">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
