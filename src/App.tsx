import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { RegisterPage } from './Pages/RegisterPage';
import { LoginPage } from './Pages/LoginPage';
import { Navbar } from './components/navbar/Navbar';
import { GuestLayout } from './layout/GuestLayout';
import { AuthLayout } from './layout/AuthLayout';
import { ErrorPage } from './Pages/ErrorPage';
import { PostPage } from './Pages/PostPage';
import { PostShowPage } from './Pages/PostShowPage';
import { EditPostPage } from './Pages/EditPostPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/posts/:id" element={<PostShowPage />} />
          <Route path="/post/edit/:id" element={<EditPostPage />} />
        </Route>
        <Route element={<GuestLayout />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
