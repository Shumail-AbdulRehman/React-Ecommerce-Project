import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth";
import { logout } from "../store/authSlice";
import LoadingSpinner from "./LoadingSpinner";
function LogoutBtn() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [loading,setLoading]=useState(false)

  const logOut = async () => {
    setLoading(true)
    if (userStatus) {
      console.log("userData is :", userData);
      try {
        await authService.logOut();   
        // console.log("logoutCheck:  '''' :",logoutCheck)
      } catch (error) {
        console.log("Appwrite logout error:", error);
      } finally {
        dispatch(logout());   
        console.log("logout successfully");
      }
    }
    setLoading(false)
  };
  if(loading) 
  {
    return <LoadingSpinner/>
  }
  return (
    <div>
      <button  className="bg-slate-900 hover:cursor-pointer text-xl hover:bg-white hover:text-black text-white px-2 py-0 rounded-lg" onClick={logOut}>Logout</button>
    </div>
  );
}

export default LogoutBtn;
