import Navbar from '../components/Navbar';
import Post from '../components/Post';
import FollowBar from '../components/FollowBar';
import Border from '../components/border';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUniqueUser } from '../api/user';
import { getAllPosts } from '../api/post';
import { createPost } from '../api/post';
import SuccessAlert from '../components/SuccessAlert';
import ErrorAlert from '../components/ErrorAlert';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
function HomePage() {
  const userToken = useContext(AuthContext);
  const [postInfo, setPostInfo] = useState({
    title: '',
    content: '',
  });
  const [validationErrors, setValidationErrors] = useState(null);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);

  const { data: dataUser } = useQuery({
    queryKey: ['user', userToken],
    queryFn: getUniqueUser,
    enabled: !!userToken,
  });

  const { data: allPostsData } = useQuery({
    queryKey: ['allPosts'],
    queryFn: getAllPosts,
    keepPreviousData: true,
    enabled: !!userToken,
  });

  const { mutate: addPostMutation } = useMutation({
    mutationFn: createPost,
    onError: (error) => {
      if (error?.data?.errors) {
        setValidationErrors(error.data.errors);
        setShowAlertError(true);
        setTimeout(() => setShowAlertError(false), 10000);
      }
    },
    onSuccess: () => {
      setPostInfo({
        title: '',
        content: '',
      });
      setShowAlertSuccess(true);
      setShowAlertError(false);
      setTimeout(() => setShowAlertSuccess(false), 5000);

      console.log('Post created succesfully');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postInfo || !postInfo.content) {
      console.log('Post info is incomplete');
      return;
    }
    setValidationErrors(null);
    addPostMutation({
      data: {
        title: postInfo.title,
        content: postInfo.content,
      },
      userId: userToken,
    });
  };

  return (
    <div className="flex relative ">
      <Border />
      <Navbar pageName="Home" image={dataUser?.data.user.imageUrl} />
      <SuccessAlert
        isVisible={showAlertSuccess}
        message={'Post has been created !'}
      />
      <ErrorAlert
        isVisible={showAlertError}
        validationErrors={validationErrors}
      />
      <div className="w-full h-screen overflow-auto shadow-xl dark:bg-stone-800 dark:text-white ">
        <h2 className="p-2 pl-4 border-b-2 bg-gray-50 dark:bg-stone-800 dark:text-white  border-emerald-300 text-2xl font-bold ">
          Hi {dataUser && dataUser.data.user.name} !
        </h2>
        <div className=" flex items-center gap-3 shadow-sm  p-3 border-b-1">
          <img
            src={dataUser?.data.user.imageUrl}
            className="border-1  mb-20 rounded-full hover:border-emerald-400"
            width="40"
            alt=""
          />
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
            <textarea
              name="post"
              id="post"
              rows="3"
              cols="100"
              value={postInfo.content}
              onChange={(e) => {
                setPostInfo({ ...postInfo, content: e.target.value });
              }}
              className="w-full p-3 border resize-none border-gray-300 dark:bg-stone-800 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 bg-white text-gray-900 placeholder-gray-400"
              placeholder="Write something..."
            ></textarea>

            <button
              type="submit"
              className="self-end w-16  xl:w-30 relative inline-flex items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
            >
              <span className="text-md">Post</span>
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                <div className="relative h-full w-10 bg-white/20"></div>
              </div>
            </button>
          </form>
        </div>
        {allPostsData &&
          allPostsData.data.posts.map((post) =>
            post.author.id === userToken ? null : (
              <Post
                key={post.id}
                id={post.id}
                content={post.content}
                name={post.author.name}
                date={post.createdAt}
                image={post.author.imageUrl}
                like={post._count.Likes}
                comment={post._count.Comments}
              />
            )
          )}
      </div>
      <FollowBar />
      <Border />
    </div>
  );
}

export default HomePage;
