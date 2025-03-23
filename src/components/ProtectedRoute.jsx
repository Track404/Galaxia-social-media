import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { checkUserAuthentication } from '../api/auth';
import { AuthContext } from '../context/authContext';
const ProtectedPage = ({ children }) => {
  const navigate = useNavigate();

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
      <AuthContext.Provider value={data?.user.id}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default ProtectedPage;
