import { useContext } from 'react';
import { PostContext } from './PostContext';

export const UsePostContext = () => {
  return useContext(PostContext);
};
