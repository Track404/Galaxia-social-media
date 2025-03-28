import { House } from 'lucide-react';
import { Mail } from 'lucide-react';
import { User } from 'lucide-react';
import { SendHorizonal } from 'lucide-react';

function LoadingNavbar({ pageName }) {
  return (
    <>
      <nav className="flex flex-col  items-center align-middle bg-emerald-100  h-screen p-2 pl-4 pr-4 lg:pl-8 lg:pr-8 min-w-[10vw] max-w-[25vw] xl:min-w-[20vw] drop-shadow-sm  ">
        <div className="flex flex-col xl:flex-row xl:gap-1 items-center   mb-6 xl:mb-10 ">
          <h1 className="text-sm  md:text-2xl xl:text-4xl 2xl:text-5xl  font-semibold ">
            Galaxia
          </h1>

          <h1 className="text-2xl  md:text-4xl 2xl:text-5xl font-medium text-emerald-400  ">
            {pageName}
          </h1>
        </div>
        <div className="flex flex-col gap-2 md:gap-6 ">
          <div className="flex gap-3 items-center xl:hover:text-emerald-400  ">
            <House
              size="35"
              strokeWidth="1.5"
              className="hover:text-emerald-400  md:scale-120 xl:scale-135"
            />
            <h2 className=" hidden xl:block text-2xl   font-medium">Home</h2>
          </div>
          <div className="flex gap-3 items-center xl:hover:text-emerald-400  ">
            <Mail
              size="35"
              strokeWidth="1.5"
              className="hover:text-emerald-400  md:scale-120 xl:scale-135"
            />
            <h2 className="hidden xl:block text-2xl  font-medium">Messages</h2>
          </div>
          <div className="flex gap-3 items-center xl:hover:text-emerald-400 ">
            <User
              size="35"
              strokeWidth="1.5"
              className="hover:text-emerald-400  md:scale-120 xl:scale-135"
            />
            <h2 className="hidden xl:block text-2xl   font-medium">Profile</h2>
          </div>
          <div className="flex gap-3 items-center text-end xl:hover:text-emerald-400 ">
            <div className=" group relative ">
              <button className="mt-5 xl:mt-0 ">
                <SendHorizonal
                  size="35"
                  strokeWidth="1.5"
                  className=" transform transition-transform duration-300  hover:text-emerald-400 md:scale-120 xl:scale-135 relative"
                />
              </button>

              <span className="absolute top-16 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 text-sm font-bold text-black bg-white   rounded-lg shadow-lg transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100 xl:hidden">
                New Post
              </span>
            </div>
            <h2 className="hidden xl:block text-2xl   font-medium mb-2">
              New Post
            </h2>
          </div>
        </div>
        <div className="absolute bottom-5 xl:left-10  pt-3">
          <div className="flex gap-3 items-center hover:text-emerald-500   ">
            <div className="animate-pulse bg-gray-300  min-w-[50px] h-[50px] rounded-full md:scale-120  "></div>
            <div className="hidden xl:block animate-pulse mt-2 bg-gray-300 w-35 2xl:w-45 h-6 rounded-full"></div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default LoadingNavbar;
