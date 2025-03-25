import { format } from 'date-fns';
import { Heart } from 'lucide-react';

function Comment({ content, date, name, image, like, comment = 0 }) {
  return (
    <div className=" flex items-center gap-3 shadow-xs dark:border-b-1 white p-3 relative">
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
        <div className="flex gap-0.5 hover:text-red-400">
          <Heart size="20" strokeWidth="1.5" />
          <p>{like}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
