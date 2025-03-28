import Navbar from '../components/Navbar';
import Post from '../components/Post';
import FollowBar from '../components/FollowBar';
import Border from '../components/border';
import { useQuery } from '@tanstack/react-query';
import { getUniqueUser } from '../api/user';
import { getSearchUsers } from '../api/user';
import SuccessAlert from '../components/SuccessAlert';
import ErrorAlert from '../components/ErrorAlert';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import basicImage from '../assets/loginSvg.svg';
import UserFollow from '../components/UserFollow';
import LoadingHomePage from './LoadingPages/LoadingHomePage';
import UserFollowPage from '../components/UserFollowPage';
function SearchUsers() {
  const userToken = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { data: dataUser } = useQuery({
    queryKey: ['user', userToken],
    queryFn: getUniqueUser,
    enabled: !!userToken,
  });

  const { data: searchData } = useQuery({
    queryKey: ['users', searchTerm, page],
    queryFn: getSearchUsers,
    keepPreviousData: true, // Don't remove old data when fetching new page
    enabled: !!searchTerm,
  });
  return (
    <div className="flex relative ">
      <Border />
      <Navbar
        pageName="Home"
        image={dataUser?.data.user.imageUrl || basicImage}
        name={dataUser?.data.user.name}
      />

      <div className=" w-full h-screen  overflow-auto   ">
        <form className="form relative w-full ">
          <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1  ">
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
            className="input bg-white   px-8 w-full   py-2 border-2 border-transparent focus:outline-none focus:border-emerald-400  placeholder-gray-400  transition-all duration-300 shadow-sm "
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
        <div className="bg-white  max-w-full  ">
          {searchData &&
            searchData.data.users.map((user) => (
              <UserFollowPage
                key={user.id}
                id={user.id}
                image={user.imageUrl || basicImage}
                name={user.name}
              />
            ))}
          {searchData && searchData?.data.users.length > 0 && (
            <div className="flex gap-2 mt-2 h-full justify-around border-gray-300   border-t-1 p-2">
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
      </div>
      <FollowBar />
      <Border />
    </div>
  );
}

export default SearchUsers;
