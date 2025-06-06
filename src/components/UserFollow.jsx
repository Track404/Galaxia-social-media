import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { createFollow } from '../api/follow';
import { useQuery } from '@tanstack/react-query';
import { getFollowPairs } from '../api/follow';
import basicImage from '../assets/loginSvg.svg';
import SuccessAlert from './SuccessAlert';
function UserFollow({ id, name, image }) {
  const userToken = useContext(AuthContext);
  const [followDisabled, setFollowDisabled] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const navigate = useNavigate();
  const { data: dataFollowing } = useQuery({
    queryKey: ['follow', userToken, id],
    queryFn: getFollowPairs,
    enabled: !!userToken && !!id,
  });

  const { mutate: addFollowMutation } = useMutation({
    mutationFn: createFollow,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      console.log('success');
      setFollowDisabled(true);
      setShowAlertSuccess(true);
      setTimeout(() => setShowAlertSuccess(false), 5000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addFollowMutation({
      followId: id,
      followerId: userToken,
    });
  };

  return (
    <>
      <SuccessAlert
        isVisible={showAlertSuccess}
        message={`You now follow ${name}!`}
      />
      <div
        onClick={() => navigate(`/profile/${id}`)}
        className="flex items-center justify-between gap-2 p-2  hover:bg-emerald-100 "
      >
        <img
          src={image || basicImage}
          className=" w-[40px] h-[40px] object-cover border-1 rounded-full "
          alt="userImage"
        />
        <p>{name}</p>
        <form
          onSubmit={(e) => {
            e.stopPropagation(); // Stop navigation when submitting the form
            handleSubmit(e);
          }}
        >
          <button
            type="submit"
            disabled={followDisabled || dataFollowing?.follow}
            onClick={(e) => {
              e.stopPropagation();
            }} // Stop navigation when clicking the button
            className="ml-7 w-16 xl:w-30 px-10 py-1 disabled:opacity-50  relative inline-flex items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 active:scale-105 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
          >
            <span className="text-md">Follow</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/20"></div>
            </div>
          </button>
        </form>
      </div>
    </>
  );
}

export default UserFollow;
