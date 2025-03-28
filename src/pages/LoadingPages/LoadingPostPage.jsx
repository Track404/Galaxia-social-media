import Border from '../../components/border';
import LoadingFollowBar from '../../components/LoadingComponents/LoadingFollowBar';
import LoadingNavbar from '../../components/LoadingComponents/LoadingNavbar';
import PostLoading from '../../components/LoadingComponents/LoadingPost';
import LoadingComment from '../../components/LoadingComponents/CommentLoading';
function LoadingPostPage() {
  const count = 6;
  return (
    <div className="flex relative ">
      <Border />
      <LoadingNavbar pageName="Post" />

      <div className="w-full h-screen overflow-auto shadow-xl pt-2 ">
        <div className=" flex  gap-3 white relative ">
          <PostLoading />
        </div>

        <h2 className="text-2xl font-medium p-2 border-b-1 border-emerald-500">
          Comments
        </h2>
        <div className=" flex items-center gap-3 shadow-sm  p-3 border-b-1">
          <div className="animate-pulse bg-gray-300 mb-20  min-w-[40px] h-[40px] rounded-full"></div>

          <form className="flex flex-col gap-2 ">
            <textarea
              name="comment"
              id="comment"
              rows="3"
              cols="100"
              disabled
              className="w-full p-3 border resize-none border-gray-300  rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 bg-white text-gray-900 placeholder-gray-400"
              placeholder="Post your reply..."
            ></textarea>

            <button
              type="submit"
              disabled
              className="self-end w-16  xl:w-30 relative inline-flex items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
            >
              <span className="text-md">Reply</span>
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                <div className="relative h-full w-10 bg-white/20"></div>
              </div>
            </button>
          </form>
        </div>
        {Array.from({ length: count }).map((_, index) => (
          <LoadingComment key={index} />
        ))}
      </div>
      <LoadingFollowBar />
      <Border />
    </div>
  );
}

export default LoadingPostPage;
