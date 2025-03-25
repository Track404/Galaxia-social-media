import Navbar from '../components/Navbar';
import FollowBar from '../components/FollowBar';
import Border from '../components/border';
import Post from '../components/Post';
import Comment from '../components/Comment';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getUniquePostById } from '../api/post';
import { getUniqueUser } from '../api/user';
import { MessageCircle, Heart } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { format } from 'date-fns';
import { useState } from 'react';
import { createComment } from '../api/comment';
import { useQueryClient } from '@tanstack/react-query';
function PostPage() {
  const userToken = useContext(AuthContext);
  const [commentInfo, setCommentInfo] = useState({
    title: '',
    content: '',
  });
  const [validationErrors, setValidationErrors] = useState(null);
  const [invalidInput, setInvalidInput] = useState(null);
  const queryClient = useQueryClient();
  const { data: dataUser } = useQuery({
    queryKey: ['user', userToken],
    queryFn: getUniqueUser,
    enabled: !!userToken,
  });
  const { id } = useParams();
  const { data: dataPost } = useQuery({
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
        const newErrors = {};
        error.data.errors.forEach((err) => {
          newErrors[err.path] = err.msg;
        });
        setInvalidInput(newErrors);
        console.log(invalidInput); // Store errors in state
      }
    },
    onSuccess: () => {
      setCommentInfo({
        title: '',
        content: '',
      });
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
  return (
    <div className="flex ">
      <Border />
      <Navbar pageName="Home" />
      <div className="w-full h-screen overflow-auto shadow-xl dark:bg-stone-800 dark:text-white ">
        <div className=" flex  gap-3 shadow-xs dark:border-b-1 white p-3">
          <div className="flex flex-col gap-3 ">
            <div className="flex justify-between  ">
              <div className="flex gap-2  items-center ">
                <img
                  src={dataPost?.post.author.imageUrl}
                  className="border-1 p-1 rounded-full hover:border-emerald-400"
                  width="50"
                  alt=""
                />
                <div className="flex flex-col ">
                  <h2 className="text-lg font-medium">
                    {dataPost?.post.author.name}
                  </h2>
                  <h2 className="text-gray-500 ">
                    @{dataPost?.post.author.name}
                  </h2>
                </div>
              </div>
              <button
                type="submit"
                className="self-end w-20 mb-5  xl:w-30 relative inline-flex items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
              >
                <span className="text-md">Follow</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/20"></div>
                </div>
              </button>
            </div>

            <div>
              <div className="flex flex-col gap-2 ">
                <p>{dataPost?.post.content}</p>
              </div>
              <h3 className="text-gray-500 mt-3">
                Post on
                {dataPost && format(dataPost?.post.createdAt, ' MMMM do')}
              </h3>
            </div>
          </div>
        </div>
        <div className=" flex gap-6 border-b-1 p-1 pl-5 ">
          <div className="flex  ">
            <MessageCircle size="20" strokeWidth="1.5" />
            <p>{dataPost?.post._count.Comments}</p>
          </div>
          <div className="flex">
            <Heart size="20" strokeWidth="1.5" />
            <p>{dataPost?.post._count.Likes}</p>
          </div>
        </div>
        <h2 className="text-2xl font-medium p-2 border-b-1 border-emerald-500">
          Comments
        </h2>
        <div className=" flex items-center gap-3 shadow-sm  p-3 border-b-1">
          <img
            src={dataUser?.data.user.imageUrl}
            className="border-1 x mb-20 rounded-full hover:border-emerald-400"
            width="40"
            alt=""
          />
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
            <textarea
              name="post"
              id="post"
              rows="3"
              cols="100"
              value={commentInfo.content}
              onChange={(e) => {
                setCommentInfo({ ...commentInfo, content: e.target.value });
              }}
              className="w-full p-3 border resize-none border-gray-300 dark:bg-stone-800 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 bg-white text-gray-900 placeholder-gray-400"
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
