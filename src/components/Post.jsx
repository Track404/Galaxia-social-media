import { format } from 'date-fns';
import { MessageCircle, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createLikeOnPost, deleteLike } from '../api/like';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { getLikeOnPost } from '../api/like';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import basicImage from '../assets/loginSvg.svg';
function Post({
  id,
  content,
  date,
  name,
  image,
  like,
  comment = 0,
  imagePublicId,
}) {
  const userToken = useContext(AuthContext);
  const [isLike, setIsLike] = useState(null);
  const [likeId, setLikeId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(null);
  const queryClient = useQueryClient();
  const cloudinaryBaseUrl =
    'https://res.cloudinary.com/dvansj1wq/image/upload/q_auto/f_auto/';

  const navigate = useNavigate();
  const { data: dataLike } = useQuery({
    queryKey: ['likePost', userToken, id],
    queryFn: getLikeOnPost,
    enabled: !!userToken && !!id,
  });

  const { mutate: addLikeMutation, isLoading: loadingLikeCreated } =
    useMutation({
      mutationFn: createLikeOnPost,
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        setLikeId(data.like.id);
        setIsLike(true);
        setIsDisabled(false);
        queryClient.invalidateQueries(['allPost']);
      },
    });

  const { mutate: addDeleteLikeMutation, isLoading: loadingLikeDelete } =
    useMutation({
      mutationFn: deleteLike,
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        setIsLike(false);
        setIsDisabled(false);
        queryClient.invalidateQueries(['allPost']);
      },
    });

  const handleClick = (e) => {
    e.preventDefault();
    if (isButtonDisabled) return;
    setIsDisabled(true);
    setTimeout(() => {
      if (!isLike) {
        addLikeMutation({
          postId: id,
          authorId: userToken,
        });
      } else {
        addDeleteLikeMutation({
          likeId: likeId,
        });
      }
    }, 500);
  };

  const isButtonDisabled =
    loadingLikeCreated || loadingLikeDelete || isDisabled;

  useEffect(() => {
    if (dataLike?.like.isLiked) {
      setIsLike(true);
    }
    setLikeId(dataLike?.like.likeId);
  }, [dataLike]);

  return (
    <div className=" flex items-center gap-3 shadow-sm  white p-3  w-full hover:shadow-md cursor-default  relative">
      <div
        onClick={() => {
          navigate(`/post/${id}`);
        }}
        className="flex items-start gap-2 w-full"
      >
        <img
          src={image || basicImage}
          className=" w-[40px] h-[40px] object-cover border-1  mb-20 rounded-full hover:border-emerald-400"
          alt="userImage"
        />
        <div>
          <div className="flex flex-col gap-2 ">
            <div className="flex gap-2">
              <h3 className="font-medium">{name}</h3>
              <p className="text-gray-400">{format(date, ' MMMM do')}</p>
            </div>

            <p>{content}</p>
            {imagePublicId && (
              <img
                src={`${cloudinaryBaseUrl}${imagePublicId}`}
                alt="Post"
                className="mb-8 max-h-[60vh] border-1 rounded-xs shadow-md "
              />
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 right-20 flex gap-6  p-1 pl-5 ">
        <div
          onClick={() => {
            navigate(`/post/${id}`);
          }}
          className="flex gap-0.5 hover:text-emerald-400 "
        >
          <MessageCircle size="20" strokeWidth="1.5" />
          <p>{comment}</p>
        </div>
        <div
          className={
            isLike
              ? 'text-red-600 flex gap-0.5 hover:text-red-500'
              : 'text-white-400 flex gap-0.5 hover:text-red-500'
          }
        >
          <button
            onClick={handleClick}
            disabled={isButtonDisabled}
            className="hover:scale-105 active:scale-100"
          >
            <Heart
              size="20"
              fill={isLike ? 'red' : 'white'}
              strokeWidth="1.5"
            />
          </button>

          <p className="w-3">{like}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
