import axiosInstance from './axiosInstance';

export const LoginUser = async ({ data }) => {
  try {
    const response = await axiosInstance.post(`/login`, data);
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
    // Replace '/secure-user' with the actual endpoint you want to hit
    const response = await axiosInstance.get('/protected', {
      withCredentials: true,
    });

    console.log('User authenticated');
    return response.data; // Return the user data from the response
  } catch (error) {
    if (error.response) {
      console.error('Authentication failed:', error.response.data.message);
    } else {
      console.error('An error occurred:', error.message);
    }
  }
}
