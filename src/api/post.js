import axiosInstance from './axiosInstance';

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
