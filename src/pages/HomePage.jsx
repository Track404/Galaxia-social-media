import { House } from 'lucide-react';
import { Mail } from 'lucide-react';
import { User } from 'lucide-react';
import { SendHorizonal } from 'lucide-react';
import rocket from '../assets/loginSvg.svg';
function HomePage() {
  return (
    <div className="flex">
      <nav className="flex flex-col items-center bg-emerald-50 h-screen p-2 max-w-[20vw] shadow-2xl   ">
        <div className="flex flex-col items-center md:flex-row  mb-6 ">
          <h1 className="text-sm  md:text-4xl font-semibold md:block  ">
            Galaxia
          </h1>

          <h1 className="text-2xl  md:text-4xl font-medium text-emerald-400 ">
            Home
          </h1>
        </div>
        <div className="flex flex-col gap-2 ">
          <House
            size="35"
            strokeWidth="1.5"
            className="hover:text-emerald-400"
          />
          <Mail
            size="35"
            strokeWidth="1.5"
            className="hover:text-emerald-400"
          />
          <User
            size="35"
            strokeWidth="1.5"
            className="hover:text-emerald-400"
          />
          <div className=" group relative ">
            <button className="mt-5 ">
              <SendHorizonal
                size="35"
                strokeWidth="1.5"
                className=" transform transition-transform duration-300 hover:scale-125 hover:text-emerald-400 relative"
              />
            </button>
            <span className="absolute bottom-14 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 text-sm font-bold text-white bg-gray-900 rounded-lg shadow-lg transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100">
              New Post
            </span>
          </div>
        </div>
        <div className="absolute bottom-5">
          <img
            src={rocket}
            className="border-1 p-1 rounded-full hover:border-emerald-400"
            width="50"
            alt=""
          />
        </div>
      </nav>
      <div>
        <h1>hi</h1>
      </div>
      <div></div>
    </div>
  );
}

export default HomePage;
