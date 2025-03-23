import Navbar from '../components/Navbar';
import FollowBar from '../components/FollowBar';
import Border from '../components/border';
import Post from '../components/Post';

import rocket from '../assets/loginSvg.svg';
import { CalendarDays } from 'lucide-react';
function ProfilePage() {
  return (
    <div className="flex ">
      <Border />
      <Navbar pageName="Profile" />
      <div className="w-full h-screen overflow-auto shadow-xl relative ">
        <div>
          <div className="w-full h-35 bg-emerald-100"></div>
          <img
            src={rocket}
            className="border-1 p-1 absolute top-15 left-3 mb-20 rounded-full bg-white md:left-5 md:scale-120"
            width="100"
            alt=""
          />
          <div className="dark:bg-stone-800 dark:text-white ">
            <div className="flex justify-between p-2 border-b-1 pt-7 ">
              <div className="flex flex-col gap-3 ">
                <div>
                  <h2 className="text-lg font-medium">Name</h2>
                  <h2 className="text-gray-500 dark:text-gray-400">
                    @UserName
                  </h2>
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  <div className="flex">
                    <CalendarDays />
                    <p>Join March 2025</p>
                  </div>
                  <div className="flex gap-3">
                    <p>10 Following</p>
                    <p>10 Folllowers</p>
                  </div>
                </div>
              </div>
              <button
                type="submit"
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
              {/*items.map((item) => (
                <Post key={item} />
              ))*/}
            </div>
          </div>
        </div>
      </div>
      <FollowBar />
      <Border />
    </div>
  );
}

export default ProfilePage;
