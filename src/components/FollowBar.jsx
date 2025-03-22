import UserFollow from './UserFollow';
import { useQuery } from '@tanstack/react-query';
import { getRandomUsers } from '../api/user';
function FollowBar() {
  const userToken = 23;
  const { data } = useQuery({
    queryKey: ['RandomUser'],
    queryFn: getRandomUsers,
    enabled: !!userToken,
  });

  return (
    <div className="hidden lg:flex lg:flex-col items-center  pt-6 pl-4 pr-4   gap-8 lg:min-w-[30vw] bg-emerald-50 dark:bg-emerald-500 drop-shadow-sm   ">
      <form className="form relative  ">
        <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1 ">
          <svg
            width="17"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
            className="w-5 h-5 text-gray-700 dark:text-white"
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
          className="input bg-white dark:bg-stone-800 dark:text-white rounded-full px-8 xl:w-[20vw]  2xl:w-md  py-2 border-2 border-transparent focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-50 placeholder-gray-400 dark:placeholder-white transition-all duration-300 shadow-md"
          placeholder="Search..."
          required=""
          type="text"
        />
        <button
          type="reset"
          className="  absolute right-3 -translate-y-1/2 top-1/2 p-1  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-700 dark:text-white"
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
      <div className="bg-white dark:bg-stone-800 dark:text-white min-w-65 2xl:min-w-[20vw] max-w-full shadow-md rounded-xl p-3 text-center">
        <h2 className="text-2xl font-medium mb-2">Who to follow</h2>
        {data &&
          data.data.user.map((user) => (
            <UserFollow key={user.id} image={user.imageUrl} name={user.name} />
          ))}
      </div>
    </div>
  );
}
export default FollowBar;
