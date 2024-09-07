import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { FormDataProvider } from './context/FormContext.tsx';
import App from './App.tsx';
import './index.css';
import { PostProvider } from './context/PostContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <FormDataProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </FormDataProvider>
    </ChakraProvider>
  </StrictMode>
);
