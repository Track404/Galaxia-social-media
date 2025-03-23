import { format } from 'date-fns';
import { MessageCircle, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Post({ id, content, date, name, image, like, comment }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/post/${id}`);
      }}
      className=" flex items-center gap-3 shadow-xs dark:border-b-1 white p-3 relative"
    >
      <div className="flex items-start gap-2">
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
        <div className="flex gap-0.5  ">
          <MessageCircle size="20" strokeWidth="1.5" />
          <p>{comment}</p>
        </div>
        <div className="flex gap-0.5">
          <Heart size="20" strokeWidth="1.5" />
          <p>{like}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
