import { useDispatch, useSelector } from 'react-redux';
import {
  signOutUserFailure,
    signOutUserStart,
    signOutUserSuccess
} from '../redux/user/userSlice';

const AuthOption = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout', {
        method: 'DELETE',
        body: JSON.stringify({
          email: currentUser.email,
        }),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className="flex items-center">
      {currentUser && 
        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign Out
        </button>
       }
    </div>
  );
};

export default AuthOption;
