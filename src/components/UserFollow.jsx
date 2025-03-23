import { useNavigate } from 'react-router-dom';

function UserFollow({ id, name, image }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          navigate(`/profile/${id}`);
        }}
        className="flex items-center justify-between gap-2  p-2 rounded-2xl hover:bg-emerald-50 dark:hover:hover:bg-emerald-700"
      >
        <img src={image} className="border-1 rounded-full " width="40" alt="" />
        <p>{name}</p>
        <button
          type="submit"
          className="ml-7 w-16  xl:w-30 px-10 py-1 relative inline-flex items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
        >
          <span className="text-md">Follow</span>
          <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
            <div className="relative h-full w-10 bg-white/20"></div>
          </div>
        </button>
      </div>
    </>
  );
}

export default UserFollow;
