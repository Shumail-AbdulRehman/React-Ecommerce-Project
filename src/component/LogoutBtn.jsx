import React from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth";
import { logout } from "../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const logOut = async () => {
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
  };

  return (
    <div>
      <button  className="bg-orange-500 text-white px-4 py-2 rounded-xl" onClick={logOut}>LogOut</button>
    </div>
  );
}

export default LogoutBtn;
