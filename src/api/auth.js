import axiosInstance from './axiosInstance';

export const LoginUser = async ({ data }) => {
  try {
    const response = await axiosInstance.post(`/login`, data);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token); // Store token for Safari
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error('Something went wrong');
    }
  }
};

export const LoginUserGithub = async () => {
  try {
    const response = await axiosInstance.post(`/login/github`);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token); // Store token for Safari
    }

    // Redirect to home page after successful login
    window.location.href = 'https://galaxiasocial.netlify.app/home'; // Ensure the redirect happens in frontend

    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error('Something went wrong');
    }
  }
};

export async function checkUserAuthentication() {
  try {
    let headers = {};
    const token = localStorage.getItem('token');

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axiosInstance.get('/protected', {
      withCredentials: true,
      headers,
    });

    console.log('User authenticated');
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Authentication failed:', error.response.data.message);
    } else {
      console.error('An error occurred:', error.message);
    }
  }
}

export const LogoutUser = async () => {
  try {
    await axiosInstance.post(`/logout`);
    localStorage.removeItem('token'); // Remove token for Safari users

    return { message: 'Logged out successfully' };
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error('Something went wrong');
    }
  }
};
