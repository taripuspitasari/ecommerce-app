import {useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changePassword} from "../app/slices/authSlice";
import {clearNotification} from "../app/slices/authSlice";

export default function FormChangePassword({handleCloseModal}) {
  const dispatch = useDispatch();
  const {loading, errors, notification} = useSelector(state => state.auth);
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const newPasswordConfirmationRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      current_password: currentPasswordRef.current.value,
      new_password: newPasswordRef.current.value,
      new_password_confirmation: newPasswordConfirmationRef.current.value,
    };

    dispatch(changePassword(payload)).then(({meta}) => {
      if (meta.requestStatus === "fulfilled") {
        currentPasswordRef.current.value = "";
        newPasswordRef.current.value = "";
        newPasswordConfirmationRef.current.value = "";
      }
    });
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => dispatch(clearNotification()), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="w-full md:w-1/2 z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F5F5DC] p-5 rounded-lg shadow-lg ">
        <div className="border border-slate-400 p-4 rounded-md space-y-3">
          <div className="relative flex justify-center items-center">
            <h3 className="font-medium text-xl text-center">Change Password</h3>
            <button
              className="absolute top-0 right-0 cursor-pointer"
              onClick={handleCloseModal}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {loading && (
            <div className="flex justify-center items-center">
              <i className="fa-solid fa-spinner text-xl text-slate-400 animate-spin"></i>
            </div>
          )}

          {notification && (
            <div className="flex gap-2 justify-center items-center p-3 bg-[#A5D6A7] rounded-md absolute m-3 z-50 left-1/2 transform -translate-x-1/2 font-medium shadow-lg">
              <i className="fa-solid fa-check"></i>
              <p className="text-center">{notification}</p>
            </div>
          )}

          <form className="space-y-2" onSubmit={handleSubmit}>
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-slate-400">
                <label
                  htmlFor="currentPassword"
                  className="px-2 flex-shrink-0 min-w-[120px]"
                >
                  Current Password
                </label>
                <input
                  ref={currentPasswordRef}
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  className="w-full h-full focus:outline-none bg-[#F5F5DC]"
                />
              </div>
              {errors?.current_password?.[0] && (
                <p className="p-1 text-red-500">{errors.current_password[0]}</p>
              )}
            </div>
            <div className="w-full text-xs p-2 text-gray-400">
              <p>
                Password must be at least 8 characters long and include at least
                one letter, one number, and one special character.
              </p>
            </div>
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-slate-400">
                <label
                  htmlFor="newPassword"
                  className="px-2 flex-shrink-0 min-w-[120px]"
                >
                  New Password
                </label>
                <input
                  ref={newPasswordRef}
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="w-full h-full focus:outline-none bg-[#F5F5DC]"
                />
              </div>
              {errors?.new_password?.[0] && (
                <p className="p-1 text-red-500">{errors.new_password[0]}</p>
              )}
            </div>

            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-slate-400">
                <label
                  htmlFor="newPasswordConfirmation"
                  className="px-2 flex-shrink-0 min-w-[120px]"
                >
                  Confirm New Password
                </label>
                <input
                  ref={newPasswordConfirmationRef}
                  type="password"
                  name="newPasswordConfirmation"
                  id="newPasswordConfirmation"
                  className="w-full h-full focus:outline-none bg-[#F5F5DC]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-2 px-4 w-full rounded-md font-medium bg-[#A5D6A7] hover:bg-[#96c497]"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
