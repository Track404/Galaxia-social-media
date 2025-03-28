import UserFollow from './UserFollow';
import { useQuery } from '@tanstack/react-query';
import { getRandomUsers } from '../api/user';
import { useState } from 'react';
import { getSearchUsers } from '../api/user';
import basicImage from '../assets/loginSvg.svg';
function FollowBar() {
  const userToken = 23;
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { data } = useQuery({
    queryKey: ['RandomUser'],
    queryFn: getRandomUsers,
    enabled: !!userToken,
  });
  const { data: searchData } = useQuery({
    queryKey: ['users', searchTerm, page],
    queryFn: getSearchUsers,
    keepPreviousData: true, // Don't remove old data when fetching new page
    enabled: !!searchTerm,
  });
  return (
    <div className="hidden lg:flex lg:flex-col items-center  pt-6 pl-4 pr-4   gap-8 lg:min-w-[30vw] bg-emerald-100  drop-shadow-sm  relative  ">
      <form className="form relative  ">
        <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1 ">
          <svg
            width="17"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
            className="w-5 h-5 text-gray-700 "
          >
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth="1.333"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        <input
          className="input bg-white  rounded-full px-8 xl:w-[20vw]  2xl:w-md  py-2 border-2 border-transparent focus:outline-none focus:border-emerald-400  placeholder-gray-400  transition-all duration-300 shadow-md"
          placeholder="Search users..."
          required=""
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1); // Reset to first page on new search
          }}
          type="text"
        />
        <button
          type="reset"
          onClick={() => {
            setSearchTerm('');
          }}
          className="  absolute right-3 -translate-y-1/2 top-1/2 p-1  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-700 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </form>
      <div className="bg-white  absolute z-10 top-17 w-[28vw]  rounded-2xl shadow-xl  ">
        {searchData &&
          searchData.data.users.map((user) => (
            <UserFollow
              key={user.id}
              id={user.id}
              image={user.imageUrl || basicImage}
              name={user.name}
            />
          ))}
        {searchData && searchData?.data.users.length > 0 && (
          <div className="flex gap-2 mt-2 justify-around border-t-1 p-2">
            <button
              type="submit"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className=" w-16  xl:w-30 px-10 py-1 relative inline-flex items-center disabled:opacity-50 justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
            >
              <span className="text-md">Prev</span>
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                <div className="relative h-full w-10 bg-white/20"></div>
              </div>
            </button>
            <button
              type="submit"
              disabled={searchData?.data.users.length < 10}
              onClick={() => setPage((prev) => prev + 1)}
              className=" w-16  xl:w-30 px-10 py-1 relative inline-flex  items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl disabled:opacity-50 hover:shadow-gray-600/50 border border-white/20"
            >
              <span className="text-md">Next</span>
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                <div className="relative h-full w-10 bg-white/20"></div>
              </div>
            </button>
          </div>
        )}
        {searchData && searchData?.data.users.length <= 0 && (
          <p className="text-lg ml-4 p-2 pb-4">No User Found !</p>
        )}
      </div>

      <div className="bg-white  min-w-65 2xl:min-w-[20vw] max-w-full shadow-md rounded-xl pt-3 pb-3  text-center">
        <h2 className="text-2xl font-medium mb-2">Who to follow</h2>
        {data &&
          data.data.user.map((user) => (
            <UserFollow
              key={user.id}
              id={user.id}
              image={user.imageUrl || basicImage}
              name={user.name}
            />
          ))}
      </div>
    </div>
  );
}
export default FollowBar;
