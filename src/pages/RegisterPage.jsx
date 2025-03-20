import rocket from '../assets/loginSvg.svg';

function RegisterPage() {
  return (
    <>
      <div className="md:flex   h-screen p-2 md:p-0  bg-emerald-50 md:bg-emerald-100 relative ">
        <div className="flex md:bg-white md:text-gray-100 md:dark:bg-gray-800 items-center justify-center md:p-2 md:w-[50vw] md:shadow-2xl ">
          <div className="flex gap-1 absolute top-2 left-2">
            <h1 className="text-4xl font-medium ">Galaxia</h1>
            <h1 className="text-4xl font-medium text-emerald-400 ">Register</h1>
          </div>

          <div className="flex flex-col mt-10 md:justify-center md:dark:text-gray-100   relative">
            <img src={rocket} alt="here" width="400" className="md:hidden" />
            <div className=" hidden md:block text-center">
              <h1 className="text-7xl font-semibold xl:text-8xl">
                Join The Space !
              </h1>
              <p className="text-xl xl:text-3xl xl:font-medium">
                {' '}
                Be part of a community
              </p>
            </div>
            <form className="flex flex-col items-center ">
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
                    id="username"
                    name="username"
                    className={`block w-75 h-10 rounded-md py-1.5 px-2 ring-1 ring-inset 
                      focus:text-gray-800 focus:outline-emerald-500 xl:h-11 xl:w-85 bg-white md:dark:bg-gray-100
                      ring-gray-400'`}
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
                    className={`block w-75 h-10 rounded-md py-1.5 px-2 ring-1 ring-inset 
                      focus:text-gray-800 focus:outline-emerald-500 xl:h-11 xl:w-85  bg-white md:dark:bg-gray-100
                      ring-gray-400'`}
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
                <div className="mt-2  ">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`block w-75 h-10 rounded-md py-1.5 px-2 ring-1 ring-inset 
                      focus:text-gray-800 focus:outline-emerald-500 xl:h-11 xl:w-85 bg-white md:dark:bg-gray-100
                      ring-gray-400'`}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-black-800 font-semibold text-md xl:text-lg "
                >
                  Confirm Password
                </label>
                <div className="mt-2 mb-5 ">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`block w-75 h-10 rounded-md py-1.5 px-2 ring-1 ring-inset 
                      focus:text-gray-800 focus:outline-emerald-500 xl:h-11 xl:w-85 bg-white md:dark:bg-gray-100
                      ring-gray-400'`}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="group/button w-[300px] xl:w-85 relative inline-flex items-center justify-center overflow-hidden rounded-md bg-emerald-400 backdrop-blur-lg px-10 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
              >
                <span className="text-lg">Register</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/20"></div>
                </div>
              </button>
            </form>
            <div className="flex justify-center   gap-1 text-sm mt-2 mb-2 font-light text-gray-500 md:dark:text-gray-100 ">
              <p>Dont have an account yet? </p>
              <a className="text-emerald-400">Register</a>
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

export default RegisterPage;
