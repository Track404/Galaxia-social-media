import axiosInstance from './axiosInstance';

export const postUser = async ({ data }) => {
  try {
    const response = await axiosInstance.post(`/user`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error('Something went wrong');
    }
  }
};
export const getUniqueUser = async ({ queryKey }) => {
  try {
    const [, userToken] = queryKey;
    if (!userToken) throw new Error('Missing userId');
    const response = await axiosInstance.get(`/user/${userToken}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(`/user`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getRandomUsers = async () => {
  try {
    const response = await axiosInstance.get(`/user/random`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
