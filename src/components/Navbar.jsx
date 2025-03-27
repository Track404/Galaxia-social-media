import { House } from 'lucide-react';
import { Mail } from 'lucide-react';
import { User } from 'lucide-react';
import { SendHorizonal } from 'lucide-react';
import { Ellipsis } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import DialogNewPost from './DialogNewPost';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { LogoutUser } from '../api/auth';
function Navbar({ pageName, image }) {
  const userToken = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [LogoutUserOpen, setLogoutUserOpen] = useState(false);
  const navigate = useNavigate();

  const { mutate: addLogoutMutation } = useMutation({
    mutationFn: LogoutUser,

    onSuccess: () => {
      console.log('Logout sent successfully');

      queryClient.invalidateQueries([
        'userInfo',
        'chats',
        'LastChatDetails,allUsers',
      ]);
      navigate('/login');
    },

    onError: (error) => {
      console.log(error);
    },
  });
  const handleLogout = (e) => {
    e.preventDefault();

    addLogoutMutation();
  };
  return (
    <>
      <DialogNewPost
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(!dialogOpen);
        }}
      />
      {LogoutUserOpen && (
        <div className="flex flex-col items-center  gap-2 p-6 w-40 xl:w-50   bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl shadow-xl z-[9999] fixed bottom-20 left-7 xl:left-[2vw] xl:bottom-26 2xl:left-[9vw] ">
          <button
            onClick={handleLogout}
            type="button"
            className="self-end w-30    relative inline-flex items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
          >
            <span className="text-md">Logout</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/20"></div>
            </div>
          </button>
          <button
            onClick={() => {
              navigate(`/profile/${userToken}`);
            }}
            type="button"
            className="self-end w-30   relative inline-flex items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
          >
            <span className="text-md">View Profile</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/20"></div>
            </div>
          </button>
        </div>
      )}

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
          <div
            onClick={() => {
              navigate('/home');
            }}
            className="flex gap-3 items-center xl:hover:text-emerald-400  "
          >
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
          <div
            onClick={() => {
              navigate(`/profile/${userToken}`);
            }}
            className="flex gap-3 items-center xl:hover:text-emerald-400 "
          >
            <User
              size="35"
              strokeWidth="1.5"
              className="hover:text-emerald-400  md:scale-120 xl:scale-135"
            />
            <h2 className="hidden xl:block text-2xl   font-medium">Profile</h2>
          </div>
          <div
            onClick={() => {
              setDialogOpen(!dialogOpen);
            }}
            className="flex gap-3 items-center text-end xl:hover:text-emerald-400 "
          >
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
          <div
            onClick={() => {
              setLogoutUserOpen(!LogoutUserOpen);
            }}
            className="flex gap-3 items-center hover:text-emerald-500   "
          >
            <img
              src={image}
              className="border-1   bg-white  rounded-full hover:border-emerald-400  hover:scale-100 md:hover:scale-130 md:scale-120 active:scale-110 md:active:scale-120 xl:active:scale-120 xl:hover:scale-120"
              width="50"
              alt=""
            />
            <h2 className="hidden xl:block text-3xl font-medium">Username</h2>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
