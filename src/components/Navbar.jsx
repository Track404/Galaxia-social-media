import { House } from 'lucide-react';
import { Mail } from 'lucide-react';
import { User } from 'lucide-react';
import { SendHorizonal } from 'lucide-react';
import { Ellipsis } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import DialogNewPost from './DialogNewPost';
function Navbar({ pageName, image }) {
  const userToken = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex flex-col  items-center align-middle bg-emerald-50 dark:bg-emerald-600 h-screen p-2 pl-4 pr-4 lg:pl-8 lg:pr-8 min-w-[10vw] max-w-[25vw] xl:min-w-[20vw] drop-shadow-sm  ">
        <div className="flex flex-col xl:flex-row xl:gap-1 items-center   mb-6 xl:mb-10 ">
          <h1 className="text-sm  md:text-2xl xl:text-4xl 2xl:text-5xl  font-semibold ">
            Galaxia
          </h1>

          <h1 className="text-2xl  md:text-4xl 2xl:text-5xl font-medium text-emerald-400 dark:text-emerald-50 ">
            {pageName}
          </h1>
        </div>
        <div className="flex flex-col gap-2 md:gap-6 ">
          <div
            onClick={() => {
              navigate('/home');
            }}
            className="flex gap-3 items-center xl:hover:text-emerald-400 xl:dark:hover:text-emerald-50 "
          >
            <House
              size="35"
              strokeWidth="1.5"
              className="hover:text-emerald-400 dark:hover:text-emerald-50 md:scale-120 xl:scale-135"
            />
            <h2 className=" hidden xl:block text-2xl   font-medium">Home</h2>
          </div>
          <div className="flex gap-3 items-center xl:hover:text-emerald-400 xl:dark:hover:text-emerald-50 ">
            <Mail
              size="35"
              strokeWidth="1.5"
              className="hover:text-emerald-400 dark:hover:text-emerald-50 md:scale-120 xl:scale-135"
            />
            <h2 className="hidden xl:block text-2xl  font-medium">Messages</h2>
          </div>
          <div
            onClick={() => {
              navigate(`/profile/${userToken}`);
            }}
            className="flex gap-3 items-center xl:hover:text-emerald-400 xl:dark:hover:text-emerald-50"
          >
            <User
              size="35"
              strokeWidth="1.5"
              className="hover:text-emerald-400 dark:hover:text-emerald-50 md:scale-120 xl:scale-135"
            />
            <h2 className="hidden xl:block text-2xl   font-medium">Profile</h2>
          </div>
          <div
            onClick={() => {
              setDialogOpen(!dialogOpen);
            }}
            className="flex gap-3 items-center text-end xl:hover:text-emerald-400 xl:dark:hover:text-emerald-50"
          >
            <div className=" group relative ">
              <button className="mt-5 xl:mt-0 ">
                <SendHorizonal
                  size="35"
                  strokeWidth="1.5"
                  className=" transform transition-transform duration-300  hover:text-emerald-400 dark:hover:text-emerald-50 md:scale-120 xl:scale-135 relative"
                />
              </button>

              <span className="absolute top-16 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 text-sm font-bold text-black bg-white dark:bg-stone-800 dark:text-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100 xl:hidden">
                New Post
              </span>
            </div>
            <h2 className="hidden xl:block text-2xl   font-medium mb-2">
              New Post
            </h2>
          </div>
        </div>
        <div className="absolute bottom-5 xl:border-t-1 pt-3">
          <div className="flex gap-3 items-center ">
            <img
              src={image}
              onClick={() => {
                navigate(`/profile/${userToken}`);
              }}
              className="border-1  dark:border-emerald-50 bg-white dark:bg-stone-800 rounded-full hover:border-emerald-400 xl:hover:border-black hover:scale-100 md:hover:scale-130 md:scale-120 active:scale-110 md:active:scale-120 xl:active:scale-120 xl:hover:scale-120"
              width="50"
              alt=""
            />
            <h2 className="hidden xl:block text-2xl font-medium">Username</h2>
            <Ellipsis
              size="60"
              strokeWidth="1.5"
              className="ml-5 hover:text-emerald-400 dark:hover:text-emerald-100 p-4 hidden xl:block"
            />
          </div>
        </div>
        <DialogNewPost
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(!dialogOpen);
          }}
        />
      </nav>
    </>
  );
}

export default Navbar;
