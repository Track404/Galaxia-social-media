import { Dialog } from '@mui/material';
import { useState } from 'react';
import { createPost } from '../api/post';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import ImageUploader from './ImageUploader';
import { CircleX } from 'lucide-react';
import SuccessAlert from '../components/SuccessAlert';
import ErrorAlert from '../components/ErrorAlert';

export default function DialogNewPost({ open, onClose }) {
  const userToken = useContext(AuthContext);
  const [validationErrors, setValidationErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [postInfo, setPostInfo] = useState({
    title: '',
    content: '',
    image: '',
  });

  // Mutation to add the post
  const { mutate: addPostMutation } = useMutation({
    mutationFn: createPost,
    onError: (error) => {
      if (error?.data?.errors) {
        setValidationErrors(error.data.errors);
        setShowAlertError(true);
        setTimeout(() => setShowAlertError(false), 10000);
      }
    },
    onSuccess: () => {
      setPostInfo({
        title: '',
        content: '',
        image: '',
      });
      setValidationErrors(null);
      setShowAlertSuccess(true);
      setIsLoading(false);
      setShowAlertError(false);
      setTimeout(() => setShowAlertSuccess(false), 5000);
      onClose(); // Close the dialog after successful post
      console.log('Post created successfully');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postInfo || !postInfo.content) {
      console.log('Post info is incomplete');
      return;
    }
    setIsLoading(true);
    setValidationErrors(null);
    addPostMutation({
      data: {
        title: postInfo.title,
        content: postInfo.content,
        image: postInfo.image,
      },
      userId: userToken,
    });
  };

  return (
    <>
      <SuccessAlert
        isVisible={showAlertSuccess}
        message={'Post has been created!'}
      />
      <ErrorAlert
        isVisible={showAlertError}
        validationErrors={validationErrors}
      />
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="new-post-dialog"
        aria-describedby="new-post-dialog-description"
      >
        <div className="flex flex-col items-center md:w-[600px]   p-6  pt-8 bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl shadow-xl relative">
          <CircleX
            onClick={onClose}
            className="absolute top-2 right-2 hover:text-emerald-500 hover:scale-110"
            size="35"
            strokeWidth="1.5"
          />
          <div className="text-center mb-6 bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-900 bg-clip-text text-transparent text-3xl font-black tracking-tight">
            Create a new post
          </div>
          <div className="flex items-center gap-3 w-full ">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 w-full "
            >
              <textarea
                name="post"
                id="post"
                rows="6"
                value={postInfo.content}
                onChange={(e) => {
                  setPostInfo({ ...postInfo, content: e.target.value });
                }}
                className="w-full p-3 border min resize-none border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 bg-white text-gray-900 placeholder-gray-400"
                placeholder="What's on your mind today..."
              ></textarea>
              <div className="flex justify-between items-start">
                <ImageUploader setPostInfo={setPostInfo} />
                <button
                  type="submit"
                  disabled={isLoading} // Disable button while loading
                  className={`self-end w-20 xl:w-30 md:py-2 relative inline-flex items-center justify-center overflow-hidden rounded-md ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-emerald-400'
                  } backdrop-blur-lg text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20`}
                >
                  {isLoading ? (
                    <span>Loading...</span> // Show loading text or spinner
                  ) : (
                    <span className="text-md">Post</span>
                  )}
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-10 bg-white/20"></div>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  );
}
