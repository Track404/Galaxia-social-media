function LoadingUserFollow() {
  return (
    <>
      <div className="flex items-center justify-between gap-2 p-2  hover:bg-emerald-100 ">
        <div className="animate-pulse bg-gray-300   min-w-[40px] h-[40px] rounded-full"></div>

        <div className="animate-pulse mt-2 bg-gray-300 w-40 2xl:w-50 h-6 rounded-full"></div>

        <form>
          <button
            type="submit"
            disabled
            className="ml-7 w-16 xl:w-30 px-10 py-1 disabled:opacity-50  relative inline-flex items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 active:scale-105 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
          >
            <span className="text-md">Follow</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/20"></div>
            </div>
          </button>
        </form>
      </div>
    </>
  );
}

export default LoadingUserFollow;
