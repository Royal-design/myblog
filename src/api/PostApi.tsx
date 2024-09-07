import axios from 'axios';
// const delay = () => new Promise<void>(res => setTimeout(() => res(), 1000));
// http://127.0.0.1:8000
export const postApi = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export const getPost = async () => {
  const res = await postApi.get('/api/posts');
  return res.data;
};
export const endpoint = '/api/posts';
export const getPostID = async (endpoint: string, id: any) => {
  const res = await postApi.get(`${endpoint}/${id}`);
  return res.data;
};
