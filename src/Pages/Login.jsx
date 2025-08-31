import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

export default function Login() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
   try {
     console.log(data);
     const userData= await authService.login(data)
     if(userData)
     {
       dispatch(login(userData))
       console.log("user logged in successfully")
       navigate("/")
     }
     else
     {
       console.log("userLogin is :",userData)
     }
   } catch (error) {
      console.log("error",error)
   }
  };

  return (
    <main className="flex h-[830px] w-full items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-full gap-7 p-6 bg-white border-1 border-black rounded-2xl max-w-md"
      >
        <div className="text-3xl font-[Poppins]">Login</div>

        {/* Email */}
        <div className="w-full flex flex-col gap-1">
          <Input
            className="w-full p-4 border border-slate-300"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="w-full flex flex-col gap-1">
          <Input
            type="password"
            className="w-full p-4 border border-slate-300"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:cursor-pointer text-white w-full py-2 rounded-xl hover:bg-orange-600"
        >
          Login
        </button>

        <div className="text-lg ">
          <span>create an account? </span>
          <Link to="/signup"><button type="button" className="text-orange-400 hover:cursor-pointer">
            Click here
          </button></Link>
          
        </div>
      </form>
    </main>
  );
}
