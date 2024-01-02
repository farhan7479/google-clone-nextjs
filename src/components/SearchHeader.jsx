"use client";
import Link from "next/link";
import Image from "next/image";
import SearchBox from "./SearchBox";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { RiSettings3Line } from "react-icons/ri";
import { TbGridDots } from "react-icons/tb";
import SearchHeaderOptions from "./SearchHeaderOptions";
import { useSelector, useDispatch } from "react-redux"; // Combine import statements
import { useState } from "react";
import AuthOption from "./AuthOption";
import { app } from '../firebase';
import { signInSuccess } from '../redux/user/userSlice';

export default function SearchHeader() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [userPhoto, setUserPhoto] = useState(null);

  const [option, setOption] = useState(false); // Change SetOption to setOption for consistency
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
      console.log('Could not sign in with Google', error); // Improved error message
    }
  };

  return (
    <header className="sticky top-0 bg-white">
      <div className="flex w-full p-6 items-center justify-between">
        <Link href={"/"}>
          <Image
            width="120"
            height="40"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png"
          />
        </Link>
        <div className="flex-1">
          <SearchBox />
        </div>
        <div className="hidden md:inline-flex space-x-2">
          <RiSettings3Line className="header-icon" />
          <TbGridDots className="header-icon" />
        </div>
        {currentUser?.user ? (
          <button onClick={() => setOption(!option)}>
            <img
              src={currentUser.user.photo}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-6 py-2 font-medium rounded-md hover:brightness-105 hover:shadow-md transition-all ml-2"
            onClick={handleGoogleClick} // Corrected attribute name to onClick
          >
            Sign in
          </button>
        )}
        {option && <AuthOption />}
      </div>
      <SearchHeaderOptions />
    </header>
  );
}
