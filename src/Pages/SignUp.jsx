import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
 function SignUp() {
  const navigate=useNavigate()
  const {

    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    try {
      console.log(data);
      const userSignUp= await authService.createAccount(data)
      console.log(userSignUp)
      if(userSignUp)
      {
        navigate("/login")
      }
      else
      {
        console.log(userSignUp)
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <main className="flex h-full w-full items-center justify-center bg-pink-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-full gap-7 p-6 bg-white rounded-2xl max-w-md"
      >
        <div className="text-3xl font-[Poppins]">Sign Up</div>

        {/* Name */}
        <div className="w-full flex flex-col gap-1">
          <Input
            className="w-full p-4 border border-slate-300"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

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
          className="bg-orange-500 text-white w-full py-2 rounded-xl hover:bg-orange-600"
        >
          Create Account
        </button>

        <div className="text-lg">
          <span>Already have an account? </span>
          <button type="button" className="text-orange-400">
            Login
          </button>
        </div>
      </form>
    </main>
  );
}


export default SignUp
