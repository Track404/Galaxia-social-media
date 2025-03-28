import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/registerPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import PostPage from './pages/PostPage';
import ProtectedPage from './components/ProtectedRoute';
import LoadingHomePage from './pages/LoadingPages/LoadingHomePage';
import LoadingPostPage from './pages/LoadingPages/LoadingPostPage';
import LoadingProfilePage from './pages/LoadingPages/LoadingProfilePage';
const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    path: '/home',
    element: (
      <ProtectedPage>
        <HomePage />
      </ProtectedPage>
    ),
  },
  {
    path: '/profile/:id',
    element: (
      <ProtectedPage>
        <ProfilePage />
      </ProtectedPage>
    ),
  },
  {
    path: '/post/:id',
    element: (
      <ProtectedPage>
        <PostPage />
      </ProtectedPage>
    ),
  },
  {
    path: '/loading',
    element: (
      <ProtectedPage>
        <LoadingProfilePage />
      </ProtectedPage>
    ),
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
