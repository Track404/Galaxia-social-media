import Border from '../../components/Border';
import PostLoading from '../../components/LoadingComponents/LoadingPost';
import LoadingNavbar from '../../components/LoadingComponents/LoadingNavbar';
import LoadingFollowBar from '../../components/LoadingComponents/LoadingFollowBar';
function LoadingProfilePage() {
  const count = 8;
  return (
    <div className="flex  ">
      <Border />
      <LoadingNavbar pageName="Profile" />

      <div className="w-full h-screen overflow-auto shadow-xl relative ">
        <div>
          <div className="w-full h-35 bg-emerald-200"></div>
          <div className="animate-pulse absolute top-15 left-3  bg-gray-300 mb-20  min-w-[100px] h-[100px] rounded-full"></div>

          <div className=" ">
            <div className="flex justify-between p-2 border-b-1 pt-7 ">
              <div className="flex flex-col gap-3 ">
                <div>
                  <div className="animate-pulse bg-gray-300 w-35 h-5 rounded-full mb-2"></div>

                  <div className="animate-pulse bg-gray-300 w-30 h-5 rounded-full"></div>
                </div>
                <div className="text-gray-600 ">
                  <div className="flex">
                    <div className="animate-pulse bg-gray-300 w-40 h-5 rounded-full"></div>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <div className="animate-pulse bg-gray-300 w-50 h-5 rounded-full"></div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled
                className="self-end w-16  xl:w-30 mb-15 relative flex flex-col items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
              >
                <span className="text-md">Change</span>
                <span className="text-md">Info</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/20"></div>
                </div>
              </button>
            </div>
            <h2 className="text-2xl font-medium p-2 border-b-1 border-emerald-500">
              Your Posts
            </h2>
            <div>
              {Array.from({ length: count }).map((_, index) => (
                <PostLoading key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <LoadingFollowBar />
      <Border />
    </div>
  );
}

export default LoadingProfilePage;
