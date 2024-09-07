import axios from 'axios';
import { createContext, ReactElement, useState } from 'react';
import { UseFormContext } from './UseFormContext';

export type PostType = {
  title: string;
  body: string;
};

const postState: PostType = {
  title: '',
  body: '',
};

type PostContextType = {
  postData: PostType;
  setPostData: React.Dispatch<React.SetStateAction<PostType>>;
  handleChange: (e: any) => void;
  storePost: (post: PostType) => Promise<any>;
  updatePost: (id: any, post: PostType) => Promise<any>;
  deletePost: (id: any) => Promise<any>;
};

const UsePostContext: any = {};
type ChildrenType = {
  children: ReactElement;
};

export const PostContext = createContext<PostContextType>(UsePostContext);

export const PostProvider = ({ children }: ChildrenType) => {
  const { token } = UseFormContext();
  const [postData, setPostData] = useState(postState);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setPostData(prev => ({ ...prev, [name]: value }));
  };

  const postAxios = axios.create({
    baseURL: 'https://api-drab-nu-98.vercel.app/api',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });

  const storePost = async (post: PostType) => {
    const response = await postAxios.post('/api/posts', post);
    return response.data;
  };
  const updatePost = async (id: any, post: PostType) => {
    const response = await postAxios.put(`/api/posts/${id}`, post);
    return response.data;
  };
  const deletePost = async (id: any) => {
    const response = await postAxios.delete(`/api/posts/${id}`);
    return response.data;
  };

  return (
    <PostContext.Provider
      value={{
        postData,
        setPostData,
        handleChange,
        storePost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
