import axios from 'axios';
import { FormDataType } from '../context/FormContext';

export const axiosPost = axios.create({
  baseURL: 'https://api-drab-nu-98.vercel.app/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export const registerUser = async (formData: FormDataType) => {
  const response = await axiosPost.post('/api/register', formData);
  return response.data;
};

type LoginType = {
  email: string;
  password: string;
};
export const loginUser = async (formData: LoginType) => {
  const response = await axiosPost.post('/api/login', formData);
  return response.data;
};
