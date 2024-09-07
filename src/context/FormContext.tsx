import { createContext, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';

export type FormDataType = {
  name: string;
  email: string;
  password: string;
};
export type UserType = {
  created_at: string;
  email: string;
  email_verified_at: string | null;
  id: number;
  name: string;
  updated_at: string;
};

const formInitState: FormDataType = {
  name: '',
  email: '',
  password: '',
};

type useFormDataContextType = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  handleChange: (e: any) => void;
  handleLogout: (e: any) => void;
  authenticate: boolean;
  setAuthenticate: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

const useFormDataContext: any = {};

export const DataFormContext =
  createContext<useFormDataContextType>(useFormDataContext);

type ChildrenType = {
  children?: ReactElement;
};

export const FormDataProvider = ({ children }: ChildrenType) => {
  const [formData, setFormData] = useState(formInitState);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState<UserType | null>(null);
  const [authenticate, setAuthenticate] = useState(false);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const getUserAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const res = await getUserAxios.post('/api/logout');
      console.log(res.data);
      setUser(null);
      setToken(null);
    } catch (error: any) {
      console.log(error.response.data.errors);
    }
  };

  const getUser = async () => {
    const response = await getUserAxios.get('/api/user');
    const data = response.data;

    setUser(data);
  };

  useEffect((): any => {
    (async () => {
      try {
        if (token) {
          return await getUser();
        }
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    })();
  }, [token]);

  return (
    <DataFormContext.Provider
      value={{
        formData,
        setFormData,
        handleChange,
        token,
        setToken,
        user,
        setUser,
        handleLogout,
        authenticate,
        setAuthenticate,
      }}
    >
      {children}
    </DataFormContext.Provider>
  );
};
