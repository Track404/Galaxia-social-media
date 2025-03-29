import Navbar from '../components/Navbar';
import FollowBar from '../components/FollowBar';
import Border from '../components/border';
import Comment from '../components/Comment';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getUniquePostById } from '../api/post';
import { getUniqueUser } from '../api/user';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useState } from 'react';
import SuccessAlert from '../components/SuccessAlert';
import ErrorAlert from '../components/ErrorAlert';
import Post from '../components/Post';
import { createFollow, getFollowPairs } from '../api/follow';
import { createComment } from '../api/comment';
import { useQueryClient } from '@tanstack/react-query';
import basicImage from '../assets/loginSvg.svg';
import LoadingPostPage from './LoadingPages/LoadingPostPage';
function PostPage() {
  const userToken = useContext(AuthContext);
  const [commentInfo, setCommentInfo] = useState({
    title: '',
    content: '',
  });
  const [followDisabled, setFollowDisabled] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertSuccessFollow, setShowAlertSuccessFollow] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const queryClient = useQueryClient();
  const { data: dataUser, isLoading: loadingUser } = useQuery({
    queryKey: ['user', userToken],
    queryFn: getUniqueUser,
    enabled: !!userToken,
  });
  const { id } = useParams();
  const { data: dataPost, isLoading: loadingPost } = useQuery({
    queryKey: ['uniquePost', id],
    queryFn: getUniquePostById,
    keepPreviousData: true,
    enabled: !!id,
  });

  const { mutate: addPostMutation } = useMutation({
    mutationFn: createComment,
    onError: (error) => {
      if (error?.data?.errors) {
        setValidationErrors(error.data.errors);
        setShowAlertError(true);
        setTimeout(() => setShowAlertError(false), 10000);
      }
    },
    onSuccess: () => {
      setCommentInfo({
        title: '',
        content: '',
      });
      setValidationErrors(null);
      setShowAlertSuccess(true);
      setShowAlertError(false);
      setTimeout(() => setShowAlertSuccess(false), 5000);
      queryClient.invalidateQueries(['uniquePost']);
      console.log('Comment created succesfully');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentInfo || !commentInfo.content) {
      console.log('Post info is incomplete');
      return;
    }
    setValidationErrors(null);
    addPostMutation({
      data: {
        title: commentInfo.title,
        content: commentInfo.content,
      },
      postId: id,
      userId: userToken,
    });
  };
  const { data: dataFollowing } = useQuery({
    queryKey: ['userPostFollow', userToken, dataPost?.post.author.id],
    queryFn: getFollowPairs,
    enabled: !!userToken && !!dataPost?.post.author.id,
  });
  const { mutate: addFollowMutation } = useMutation({
    mutationFn: createFollow,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      console.log('success follow');
      setFollowDisabled(true);
      setShowAlertSuccessFollow(true);

      setTimeout(() => setShowAlertSuccessFollow(false), 4000);
    },
  });

  const handleClickFollow = (e) => {
    e.preventDefault();
    if (!dataPost?.post.author.id) {
      console.log('no user id');
      return;
    }
    addFollowMutation({
      followId: dataPost?.post.author.id,
      followerId: userToken,
    });
  };

  if (loadingUser || loadingPost) {
    return <LoadingPostPage />;
  }
  return (
    <div className="flex relative ">
      <Border />
      <Navbar
        pageName="Post"
        image={dataUser?.data.user.imageUrl || basicImage}
        name={dataUser?.data.user.name}
      />
      <SuccessAlert
        isVisible={showAlertSuccess}
        message={'Comment has been created !'}
      />
      <SuccessAlert
        isVisible={showAlertSuccessFollow}
        message={`You now follow ${dataPost?.post.author.name}`}
      />
      <ErrorAlert
        isVisible={showAlertError}
        validationErrors={validationErrors}
      />
      <div className="w-full h-screen overflow-auto shadow-xl pt-2 ">
        <div className=" flex  gap-3 white relative ">
          {dataPost && (
            <Post
              id={dataPost.post.id}
              content={dataPost.post.content}
              name={dataPost.post.author.name}
              date={dataPost.post.createdAt}
              image={dataPost.post.author.imageUrl || basicImage}
              like={dataPost.post._count.Likes}
              imagePublicId={dataPost.post.imagePublicId}
            />
          )}
          {userToken !== dataPost?.post.author.id && (
            <>
              <div className="absolute right-3 top-2">
                <button
                  type="submit"
                  onClick={handleClickFollow}
                  disabled={followDisabled || dataFollowing?.follow}
                  className="self-end  w-20 mb-5 disabled:opacity-50  xl:w-30 relative inline-flex items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
                >
                  <span className="text-md">Follow</span>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-10 bg-white/20"></div>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>

        <h2 className="text-2xl font-medium p-2 border-b-1 border-emerald-500">
          Comments
        </h2>
        <div className=" flex items-center gap-3 shadow-sm  p-3 border-b-1">
          <img
            src={dataUser?.data.user.imageUrl || basicImage}
            className="border-1 x mb-20 rounded-full hover:border-emerald-400"
            width="40"
            alt=""
          />
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
            <textarea
              name="comment"
              id="comment"
              rows="3"
              cols="100"
              value={commentInfo.content}
              onChange={(e) => {
                setCommentInfo({ ...commentInfo, content: e.target.value });
              }}
              className="w-full p-3 border resize-none border-gray-300  rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 bg-white text-gray-900 placeholder-gray-400"
              placeholder="Post your reply..."
            ></textarea>

            <button
              type="submit"
              className="self-end w-16  xl:w-30 relative inline-flex items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
            >
              <span className="text-md">Reply</span>
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                <div className="relative h-full w-10 bg-white/20"></div>
              </div>
            </button>
          </form>
        </div>
        {dataPost &&
          dataPost?.post.Comments.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              content={comment.content}
              name={comment.author.name}
              date={comment.createdAt}
              image={comment.author.imageUrl}
              like={comment._count.Likes}
            />
          ))}
      </div>
      <FollowBar />
      <Border />
    </div>
  );
}

export default PostPage;
