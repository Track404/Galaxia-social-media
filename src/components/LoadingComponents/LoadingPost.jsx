import { MessageCircle, Heart } from 'lucide-react';

function PostLoading() {
  return (
    <div className=" flex items-center gap-3 shadow-sm h-28 white p-3 w-full hover:shadow-md cursor-default  relative">
      <div className="flex items-start gap-2 w-full">
        <div className="flex flex-row gap-2">
          <div className="animate-pulse bg-gray-300 w-12 h-12 rounded-full"></div>
          <div className="flex flex-col gap-2">
            <div className="animate-pulse bg-gray-300 w-90 h-5 rounded-full"></div>
            <div className="animate-pulse bg-gray-300 w-99 h-5 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 right-20 flex gap-6  p-1 pl-5 ">
        <div className="flex gap-0.5 hover:text-emerald-400 ">
          <MessageCircle size="20" strokeWidth="1.5" />
        </div>
        <div className={'text-white-400 flex gap-0.5 hover:text-red-500'}>
          <button className="hover:scale-105 active:scale-100">
            <Heart size="20" strokeWidth="1.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostLoading;
