import Navbar from '../components/Navbar';
import FollowBar from '../components/FollowBar';
import Border from '../components/border';
import rocket from '../assets/loginSvg.svg';
import Post from '../components/Post';
import { MessageCircle, Heart } from 'lucide-react';
function PostPage() {
  return (
    <div className="flex ">
      <Border />
      <Navbar pageName="Home" />
      <div className="w-full h-screen overflow-auto shadow-xl dark:bg-stone-800 dark:text-white ">
        <div className=" flex  gap-3 shadow-xs dark:border-b-1 white p-3">
          <div className="flex flex-col gap-3 ">
            <div className="flex justify-between  ">
              <div className="flex gap-2  items-center ">
                <img
                  src={rocket}
                  className="border-1 p-1 rounded-full hover:border-emerald-400"
                  width="50"
                  alt=""
                />
                <div className="flex flex-col ">
                  <h2 className="text-lg font-medium">Name</h2>
                  <h2 className="text-gray-500 ">@UserName</h2>
                </div>
              </div>
              <button
                type="submit"
                className="self-end w-20 mb-5  xl:w-30 relative inline-flex items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
              >
                <span className="text-md">Follow</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/20"></div>
                </div>
              </button>
            </div>

            <div>
              <div className="flex flex-col gap-2 ">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Ullam aperiam cumque quasi doloremque amet nisi eos saepe,
                  quidem exercitationem, quibusdam voluptatem sint error nihil
                  molestiae. Quisquam voluptas illo reiciendis neque!
                </p>
              </div>
              <h3 className="text-gray-500 mt-3">Date Here March 2025</h3>
            </div>
          </div>
        </div>
        <div className=" flex gap-6 border-b-1 p-1 pl-5 ">
          <div className="flex  ">
            <MessageCircle size="20" strokeWidth="1.5" />
            <p>10</p>
          </div>
          <div className="flex">
            <Heart size="20" strokeWidth="1.5" />
            <p>10</p>
          </div>
        </div>
        <h2 className="text-2xl font-medium p-2 border-b-1 border-emerald-500">
          Comments
        </h2>
        <div className=" flex items-center gap-3 shadow-sm  p-3 border-b-1">
          <img
            src={rocket}
            className="border-1 p-1 mb-20 rounded-full hover:border-emerald-400"
            width="40"
            alt=""
          />
          <form className="flex flex-col gap-2 ">
            <textarea
              name="post"
              id="post"
              rows="3"
              cols="100"
              className="w-full p-3 border resize-none border-gray-300 dark:bg-stone-800 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 bg-white text-gray-900 placeholder-gray-400"
              placeholder="Post your reply..."
            ></textarea>

            <button
              type="submit"
              className="self-end w-16  xl:w-30 relative inline-flex items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
            >
              <span className="text-md">Reply</span>
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                <div className="relative h-full w-10 bg-white/20"></div>
              </div>
            </button>
          </form>
        </div>
        {/*items.map((item) => (
          <Post key={item} />
        ))*/}
      </div>
      <FollowBar />
      <Border />
    </div>
  );
}

export default PostPage;
