import rocket from '../assets/loginSvg.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { LoginUser, LoginUserGithub } from '../api/auth';
import SuccessAlert from '../components/SuccessAlert';
import ErrorAlert from '../components/ErrorAlert';
function LoginPage() {
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState(null);
  const [invalidInput, setInvalidInput] = useState(null);
  const navigate = useNavigate();

  // Basic login mutation
  const { mutate: addUserMutation } = useMutation({
    mutationFn: LoginUser,
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
      }
    },
    onSuccess: () => {
      console.log('success');
      setShowAlertSuccess(true);
      setShowAlertError(false);
      setTimeout(() => setShowAlertSuccess(false), 5000);
      setValidationErrors(null);
      setInvalidInput(null);

      setTimeout(() => {
        navigate('/home');
      }, 1000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInfo || !userInfo.email || !userInfo.password) {
      console.log('User info is incomplete');
      return;
    }
    setValidationErrors(null);
    setInvalidInput(null);
    addUserMutation({
      data: {
        email: userInfo.email,
        password: userInfo.password,
      },
    });
  };
  //Github Login Redirect
  const handleClickGithub = (e) => {
    e.preventDefault();
    window.location.href =
      'https://galaxia-social-media-backend-production.up.railway.app/login/github'; // Redirect to backend auth route
  };
  return (
    <>
      <div className="md:flex   h-screen p-2 md:p-0  bg-emerald-50 md:bg-emerald-100 relative ">
        <SuccessAlert
          isVisible={showAlertSuccess}
          message={'Confirm Login !'}
        />
        <ErrorAlert
          isVisible={showAlertError}
          validationErrors={validationErrors}
        />
        <div className="flex md:bg-white  items-center justify-center md:p-2 md:w-[50vw] md:shadow-2xl ">
          <div className="flex gap-1 absolute top-2 left-2">
            <h1 className="text-4xl font-medium ">Galaxia</h1>
            <h1 className="text-4xl font-medium text-emerald-400 ">Login</h1>
          </div>

          <div className="flex flex-col mt-10 md:justify-center   relative">
            <img src={rocket} alt="here" width="400" className="md:hidden" />
            <div className=" hidden md:block text-center">
              <h1 className="text-7xl font-semibold xl:text-8xl">Hi There !</h1>
              <p className="text-xl xl:text-3xl xl:font-medium">
                {' '}
                Welcome to Galaxia
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center "
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-black-800 font-semibold text-md xl:text-lg "
                >
                  Email
                </label>
                <div className="mt-2 ">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={userInfo.email}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, email: e.target.value });
                    }}
                    className={`block w-75 h-10 rounded-md py-1.5 px-2 ring-1 ring-inset 
                      focus:text-gray-800 focus:outline-emerald-500 xl:h-11 xl:w-85  bg-white 
                      ${
                        invalidInput?.email
                          ? 'ring-red-500 focus:outline-red-500'
                          : 'ring-gray-400'
                      }`}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-black-800 font-semibold text-md xl:text-lg "
                >
                  Password
                </label>
                <div className="mt-2 mb-5 ">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={userInfo.password}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, password: e.target.value });
                    }}
                    className={`block w-75 h-10 rounded-md py-1.5 px-2 ring-1 ring-inset 
                      focus:text-gray-800 focus:outline-emerald-500 xl:h-11 xl:w-85  bg-white 
                      ${
                        invalidInput?.password
                          ? 'ring-red-500 focus:outline-red-500'
                          : 'ring-gray-400'
                      }`}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="group/button w-[300px]  xl:w-85 relative inline-flex items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg px-10 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 active:scale-105 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
              >
                <span className="text-lg">Log In</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/20"></div>
                </div>
              </button>

              <button
                type="button"
                onClick={handleClickGithub}
                className="group/button mt-2 w-[300px] xl:w-85 relative inline-flex items-center justify-center overflow-hidden rounded-md bg-black backdrop-blur-lg px-10 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 active:scale-105 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
              >
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 438.549 438.549"
                  >
                    <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"></path>
                  </svg>
                  <span className="ml-1 text-lg text-white">
                    Log In with Github
                  </span>
                </div>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/20"></div>
                </div>
              </button>
              <button
                onClick={() => {
                  addUserMutation({
                    data: {
                      name: 'guestUser',
                      email: 'guest.user@gmail.com',
                      password: 'guestuser1234',
                      confirmPassword: 'guestuser12"4',
                    },
                  });
                }}
                type="submit"
                className="group/button w-[300px] mt-2 xl:w-85 relative inline-flex items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg px-10 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 active:scale-105 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
              >
                <span className="text-lg">Guest User</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/20"></div>
                </div>
              </button>
            </form>
            <div className="flex justify-center   gap-1 text-sm mt-2 mb-2 font-light text-gray-500  ">
              <button onClick={handleClickGithub}>here</button>
              <p>Dont have an account yet? </p>
              <Link to="/register" className="text-emerald-400">
                Register
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden  md:flex md:flex-col md:w-[50vw] md:justify-center md:items-center text-center">
          <img src={rocket} alt="here" width="400" />
          <h1 className="text-5xl font-semibold xl:text-7xl">
            Join the Space{' '}
          </h1>
          <p className="text-lg xl:text-2xl  w-[40vw] text-gray-500 ">
            {' '}
            Join the biggest community of the world and connect with them
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
