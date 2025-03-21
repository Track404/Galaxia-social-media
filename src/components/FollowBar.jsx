import UserFollow from './UserFollow';
function FollowBar() {
  const itemsFollow = [1, 2, 3];
  return (
    <div className="hidden lg:flex lg:flex-col items-center  pt-6 pl-4 pr-4   gap-8 lg:min-w-[30vw] bg-emerald-50">
      <form className="form relative ">
        <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1 ">
          <svg
            width="17"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
            class="w-5 h-5 text-gray-700"
          >
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              stroke-width="1.333"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
        <input
          className="input bg-white rounded-full px-8 xl:px-15 py-2 border-2 border-transparent focus:outline-none focus:border-emerald-400 placeholder-gray-400 transition-all duration-300 shadow-md"
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
            class="w-5 h-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </form>
      <div className="bg-white min-w-65 max-w-full shadow-md rounded-xl p-3 text-center">
        <h2 className="text-2xl font-medium mb-2">Who to follow</h2>
        {itemsFollow.map((item) => (
          <UserFollow key={item} />
        ))}
      </div>
    </div>
  );
}
export default FollowBar;
