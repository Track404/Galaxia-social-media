import axiosInstance from './axiosInstance';

export const createComment = async ({ data, postId, userId }) => {
  try {
    const response = await axiosInstance.post(
      `/comment/${postId}/${userId}`,
      data
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error('Something went wrong');
    }
  }
};
