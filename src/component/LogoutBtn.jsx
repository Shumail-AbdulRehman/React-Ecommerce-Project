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
      <button  className="bg-orange-600 hover:cursor-pointer hover:bg-orange-700 text-white px-4 py-2 rounded-xl" onClick={logOut}>LogOut</button>
    </div>
  );
}

export default LogoutBtn;
