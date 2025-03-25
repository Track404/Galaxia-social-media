import Navbar from '../components/Navbar';
import FollowBar from '../components/FollowBar';
import Border from '../components/border';
import Post from '../components/Post';
import { useQuery } from '@tanstack/react-query';
import { getUniqueUser } from '../api/user';
import { getAllPostsByAuthorId } from '../api/post';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useParams } from 'react-router-dom';
import DialogUserChange from '../components/DialogUserInfo';
import { useState } from 'react';

function ProfilePage() {
  const userToken = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { id } = useParams();
  const { data: dataUser } = useQuery({
    queryKey: ['userProfile', id],
    queryFn: getUniqueUser,
    enabled: !!id,
  });

  const { data: dataAuthUser } = useQuery({
    queryKey: ['user', userToken],
    queryFn: getUniqueUser,
    enabled: !!userToken,
  });
  const { data: dataPost } = useQuery({
    queryKey: ['userPost', id],
    queryFn: getAllPostsByAuthorId,
    enabled: !!id,
  });
  return (
    <div className="flex dark:bg-stone-800 ">
      <Border />
      <Navbar pageName="Profile" image={dataAuthUser?.data.user.imageUrl} />
      <DialogUserChange
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(!dialogOpen);
        }}
        userInfo={dataUser?.data}
      />
      <div className="w-full h-screen overflow-auto shadow-xl relative ">
        <div>
          <div className="w-full h-35 bg-emerald-100"></div>
          <img
            src={dataUser?.data.user.imageUrl}
            className="border-1  absolute top-15 left-3 mb-20 rounded-full bg-white md:left-5 md:scale-120"
            width="100"
            alt=""
          />
          <div className="dark:bg-stone-800 dark:text-white ">
            <div className="flex justify-between p-2 border-b-1 pt-7 ">
              <div className="flex flex-col gap-3 ">
                <div>
                  <h2 className="text-lg font-medium">
                    {dataUser?.data.user.name}
                  </h2>
                  <h2 className="text-gray-500 dark:text-gray-400">
                    @{dataUser?.data.user.name}
                  </h2>
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  <div className="flex">
                    <CalendarDays />
                    <p>
                      Join{' '}
                      {dataUser &&
                        format(dataUser.data.user.createdAt, ' MMMM do')}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <p>{dataUser?.data.user._count.followers} Following</p>
                    <p>{dataUser?.data.user._count.following} Folllowers</p>
                  </div>
                </div>
              </div>
              {id == userToken ? (
                <button
                  type="submit"
                  onClick={() => {
                    setDialogOpen(!dialogOpen);
                  }}
                  className="self-end w-16  xl:w-30 mb-15 relative flex flex-col items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
                >
                  <span className="text-md">Change</span>
                  <span className="text-md">Info</span>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-10 bg-white/20"></div>
                  </div>
                </button>
              ) : null}
            </div>
            <h2 className="text-2xl font-medium p-2 border-b-1 border-emerald-500">
              Your Posts
            </h2>
            <div>
              {dataPost &&
                dataPost.data.posts.map((post) => (
                  <Post
                    key={post.id}
                    id={post.id}
                    content={post.content}
                    name={post.author.name}
                    date={post.createdAt}
                    image={post.author.imageUrl}
                    like={post._count.Likes}
                    comment={post._count.Comments}
                  />
                ))}
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
