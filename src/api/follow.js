import axiosInstance from './axiosInstance';

export const createFollow = async ({ followerId, followId }) => {
  try {
    const response = await axiosInstance.post(
      `/follow/${followerId}/${followId}`
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

export const getFollowPairs = async ({ queryKey }) => {
  try {
    const [, userToken, id] = queryKey;
    const response = await axiosInstance.get(`/follow/${userToken}/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error('Something went wrong');
    }
  }
};
