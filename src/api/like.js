import axiosInstance from './axiosInstance';

export const getLike = async ({ authorId }) => {
  try {
    const response = await axiosInstance.get(`/like/${authorId}'`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error('Something went wrong');
    }
  }
};

export const createLikeOnPost = async ({ postId, authorId }) => {
  try {
    console.log(postId);
    console.log(authorId);
    const response = await axiosInstance.post(
      `/like/post/${postId}/${authorId}`
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

export const createLikeOnComment = async ({ commentId, authorId }) => {
  try {
    const response = await axiosInstance.post(
      `/like/comment/${commentId}/${authorId}`
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

export const deleteLike = async ({ likeId }) => {
  try {
    const response = await axiosInstance.delete(`/like/${likeId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error('Something went wrong');
    }
  }
};
