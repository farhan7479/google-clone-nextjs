"use client"
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch,useSelector } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

import { TbGridDots } from "react-icons/tb";
import { useState } from "react";

const HomeHeader = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
   
    const [userPhoto, setUserPhoto] = useState(null);

    const handleGoogleClick = async () => {
        try {
          const provider = new GoogleAuthProvider();
          const auth = getAuth(app);
    
          const result = await signInWithPopup(auth, provider);
    
          const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: result.user.displayName,
              email: result.user.email,
              photo: result.user.photoURL,
            }),
          });
          const data = await res.json();
          if (data) {
            
            setUserPhoto(data.user.photo);
          }
          dispatch(signInSuccess(data));
    
        } catch (error) {
          console.log('could not sign in with google', error);
        }
    };

    return (
        <div className="flex justify-end p-5 text-sm">
            <div className="flex  items-center space-x-4">
                <a href="https://mail.google.com">
                    <a className="hover:underline">Gmail</a>
                </a>
                <a href="https://image.google.com">
                    <a className="hover:underline">Images</a>
                </a>
                <TbGridDots className="bg-transparent hover:bg-gray-200 rounded-full text-4xl p-2"/>
                {currentUser?.user ? (
                  <img
                    src={currentUser.user.photo}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <button onClick={handleGoogleClick}>Sign in</button>
                )}
            </div>
        </div>
    );
};

export default HomeHeader;
