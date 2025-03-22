import { format } from 'date-fns';
function Post({ content, date, name, image }) {
  return (
    <div className=" flex items-center gap-3 shadow-xs dark:border-b-1 white p-3">
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
    </div>
  );
}

export default Post;
