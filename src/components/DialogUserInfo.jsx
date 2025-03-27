import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import rocket from '../assets/loginSvg.svg';
import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateUser } from '../api/user';
import { useQueryClient } from '@tanstack/react-query';
import { CircleX } from 'lucide-react';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
export default function DialogUserChange({ open, onClose, userInfo }) {
  const [validationErrors, setValidationErrors] = useState(null);
  const [invalidInput, setInvalidInput] = useState(null);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const queryClient = useQueryClient();
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    id: '',
    imageUrl: '',
    name: '',
    email: '',
  });

  useEffect(() => {
    if (userInfo?.user) {
      setUpdatedUserInfo({
        id: userInfo.user.id,
        imageUrl: userInfo.user.imageUrl,
        name: userInfo.user.name,
        email: userInfo.user.email,
      });
    }
  }, [userInfo]);

  const { mutate: addUpdateUserMutation } = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      if (error?.data?.errors) {
        setValidationErrors(error.data.errors);
        const newErrors = {};
        error.data.errors.forEach((err) => {
          newErrors[err.path] = err.msg;
        });
        setInvalidInput(newErrors);
        setShowAlertError(true);
        setTimeout(() => setShowAlertError(false), 10000);
        console.log(invalidInput); // Store errors in state
      }
    },
    onSuccess: () => {
      setValidationErrors(null);
      setInvalidInput(null);
      setShowAlertSuccess(true);
      setShowAlertError(false);
      setTimeout(() => setShowAlertSuccess(false), 5000);
      queryClient.invalidateQueries(['user']);
      onClose();
      console.log('user updated succesfully');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!updatedUserInfo || !updatedUserInfo.name || !updatedUserInfo.email) {
      console.log('Update user info is incomplete');
      return;
    }
    setValidationErrors(null);
    setInvalidInput(null);
    addUpdateUserMutation({
      data: {
        name: updatedUserInfo.name,
        email: updatedUserInfo.email,
      },
      userId: updatedUserInfo.id,
    });
  };
  return (
    <>
      <SuccessAlert
        isVisible={showAlertSuccess}
        message={'User info has been updated !'}
      />
      <ErrorAlert
        isVisible={showAlertError}
        validationErrors={validationErrors}
      />
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
            Change User Info
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col items-center ">
            <div className="relative  hover:scale-105">
              <img
                src={updatedUserInfo.imageUrl || rocket}
                className="border-1 border-emerald-400 opacity-70   rounded-full mb-2 "
                width="100"
                alt=""
              />
              <Pencil
                className="absolute top-8 left-8"
                size="35"
                strokeWidth="2"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-black-800 font-semibold text-md xl:text-lg "
              >
                Username
              </label>
              <div className="mt-2 ">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={updatedUserInfo.name}
                  onChange={(e) => {
                    setUpdatedUserInfo({
                      ...updatedUserInfo,
                      name: e.target.value,
                    });
                  }}
                  className={`block w-75 h-10 rounded-md py-1.5 px-2 ring-1 ring-inset 
                      focus:text-gray-800 focus:outline-emerald-500 xl:h-11 xl:w-85 bg-white 
                      ${
                        invalidInput?.name
                          ? 'ring-red-500 focus:outline-red-500'
                          : 'ring-gray-400'
                      }`}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-black-800 font-semibold text-md xl:text-lg "
              >
                Email
              </label>
              <div className="mt-2 ">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={updatedUserInfo.email}
                  onChange={(e) => {
                    setUpdatedUserInfo({
                      ...updatedUserInfo,
                      email: e.target.value,
                    });
                  }}
                  className={`block w-75 h-10 rounded-md mb-5 py-1.5 px-2 ring-1 ring-inset 
                      focus:text-gray-800 focus:outline-emerald-500 xl:h-11 xl:w-85  bg-white 
                      ${
                        invalidInput?.email
                          ? 'ring-red-500 focus:outline-red-500'
                          : 'ring-gray-400'
                      }`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="group/button w-[300px] xl:w-85 relative inline-flex items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg px-10 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
            >
              <span className="text-lg">Confirm</span>
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                <div className="relative h-full w-10 bg-white/20"></div>
              </div>
            </button>
          </form>
        </div>
      </Dialog>
    </>
  );
}
