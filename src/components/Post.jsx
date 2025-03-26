import { format, set } from 'date-fns';
import { MessageCircle, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createLikeOnPost, deleteLike } from '../api/like';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { getLike } from '../api/like';
function Post({ id, content, date, name, image, like, comment = 0 }) {
  const userToken = useContext(AuthContext);
  const [isLike, setIsLike] = useState(null);
  const [likeId, setLikeId] = useState(null);
  const navigate = useNavigate();
  /*const { data: dataLike } = useQuery({
    queryKey: ['likePost', userToken, id],
    queryFn: ,
    enabled: !!userToken && !!id,
  });
*/
  const { mutate: addLikeMutation } = useMutation({
    mutationFn: createLikeOnPost,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log('success like created');
      setLikeId(data.like.id);
      setIsLike(true);
    },
  });

  const { mutate: addDeleteLikeMutation } = useMutation({
    mutationFn: deleteLike,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      console.log('success like delete');
      setLikeId(null);
      setIsLike(false);
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (!isLike) {
      addLikeMutation({
        postId: id,
        authorId: userToken,
      });

      return;
    }

    addDeleteLikeMutation({
      likeId: likeId,
    });
  };

  return (
    <div className=" flex items-center gap-3 shadow-xs dark:border-b-1 white p-3 relative">
      <div
        onClick={() => {
          navigate(`/post/${id}`);
        }}
        className="flex items-start gap-2"
      >
        <img
          src={image}
          className="border-1  mb-20 rounded-full hover:border-emerald-400"
          width="40"
          alt=""
        />
        <div>
          <div className="flex flex-col gap-2 ">
            <div className="flex gap-2">
              <h3 className="font-medium">{name}</h3>
              <p className="text-gray-400">{format(date, ' MMMM do')}</p>
            </div>

            <p>{content}</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 right-20 flex gap-6  p-1 pl-5 ">
        <div className="flex gap-0.5 hover:text-emerald-400 ">
          <MessageCircle size="20" strokeWidth="1.5" />
          <p>{comment}</p>
        </div>
        <div className="flex gap-0.5 hover:text-red-400">
          <button onClick={handleClick}>
            <Heart
              size="20"
              strokeWidth="1.5"
              className={isLike ? 'text-red-700' : 'text-white-400'}
            />
          </button>

          <p>{like}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
