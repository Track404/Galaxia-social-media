import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { checkUserAuthentication } from '../api/auth';
import { AuthContext } from '../context/authContext';

const ProtectedPage = ({ children }) => {
  const navigate = useNavigate();

  // Extract token from URL if present (Safari workaround)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token); // Store token in localStorage
      window.history.replaceState({}, document.title, window.location.pathname); // Remove token from URL
    }
  }, []);

  const { data, error } = useQuery({
    queryKey: ['secureRoute'],
    queryFn: checkUserAuthentication,
    retry: false,
  });

  // If authentication fails, redirect to login page
  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error, navigate]);

  return (
    <>
      <AuthContext.Provider value={data?.user?.id}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default ProtectedPage;
