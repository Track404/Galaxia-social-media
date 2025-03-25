import { Dialog } from '@mui/material';

import rocket from '../assets/loginSvg.svg';
import { useState } from 'react';
import { createPost } from '../api/post';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useQueryClient } from '@tanstack/react-query';
import { CircleX } from 'lucide-react';
export default function DialogNewPost({ open, onClose }) {
  const userToken = useContext(AuthContext);
  const [validationErrors, setValidationErrors] = useState(null);
  const [invalidInput, setInvalidInput] = useState(null);
  const queryClient = useQueryClient();
  const [postInfo, setPostInfo] = useState({
    title: '',
    content: '',
  });

  const { mutate: addPostMutation } = useMutation({
    mutationFn: createPost,
    onError: (error) => {
      if (error?.data?.errors) {
        setValidationErrors(error.data.errors);
        const newErrors = {};
        error.data.errors.forEach((err) => {
          newErrors[err.path] = err.msg;
        });
        setInvalidInput(newErrors);
        console.log(invalidInput); // Store errors in state
      }
    },
    onSuccess: () => {
      setPostInfo({
        title: '',
        content: '',
      });
      onClose();

      console.log('Post created succesfully');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postInfo || !postInfo.content) {
      console.log('Post info is incomplete');
      return;
    }
    setValidationErrors(null);
    addPostMutation({
      data: {
        title: postInfo.title,
        content: postInfo.content,
      },
      userId: userToken,
    });
  };
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <div className="flex flex-col items-center p-6 pt-8 bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl shadow-xl relative">
          <CircleX
            onClick={() => {
              onClose();
            }}
            className="absolute top-2 right-2 hover:text-emerald-500 hover:scale-110"
            size="35"
            strokeWidth="1.5"
          />
          <div className="text-center mb-6 bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-900 bg-clip-text text-transparent text-3xl font-black tracking-tight">
            Create a new post
          </div>
          <div className=" flex items-center gap-3  ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
              <textarea
                name="post"
                id="post"
                rows="6"
                cols="100"
                value={postInfo.content}
                onChange={(e) => {
                  setPostInfo({ ...postInfo, content: e.target.value });
                }}
                className="w-full p-3 border resize-none border-gray-300 dark:bg-stone-800 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 bg-white text-gray-900 placeholder-gray-400"
                placeholder="What's on your mind today..."
              ></textarea>

              <button
                type="submit"
                className="self-end w-16  xl:w-30 relative inline-flex items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
              >
                <span className="text-md">Post</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/20"></div>
                </div>
              </button>
            </form>
          </div>
        </div>
      </Dialog>
      ;
    </>
  );
}
