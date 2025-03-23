import axiosInstance from './axiosInstance';

export const createPost = async ({ data, userId }) => {
  try {
    const response = await axiosInstance.post(`/post/${userId}`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error('Something went wrong');
    }
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axiosInstance.get(`/post`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getRandomPosts = async () => {
  try {
    const response = await axiosInstance.get(`/post/random`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
