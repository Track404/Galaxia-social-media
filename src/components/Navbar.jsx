import { House } from 'lucide-react';
import { Mail } from 'lucide-react';
import { User } from 'lucide-react';
import { SendHorizonal } from 'lucide-react';
import rocket from '../assets/loginSvg.svg';

function Navbar() {
  return (
    <>
      <nav className="flex flex-col items-center bg-emerald-50 h-screen p-2 max-w-[20vw] shadow-xl   ">
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
                className=" transform transition-transform duration-300  hover:text-emerald-400 relative"
              />
            </button>
            <span className="absolute top-16 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 text-sm font-bold text-black bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100">
              New Post
            </span>
          </div>
        </div>
        <div className="absolute bottom-5">
          <img
            src={rocket}
            className="border-1 p-1 bg-white rounded-full hover:border-emerald-400 hover:scale-110 active:scale-110"
            width="50"
            alt=""
          />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
