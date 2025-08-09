import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { KeyRound, UserRoundSearch, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import mbmImage from "/mbm.png";
import Logo from "../../../components/custom/logo";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    navigate("/");
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    navigate("/signup/type");
  };
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[1fr_1.5fr] bg-white">
      <div className="relative flex flex-col justify-center items-center px-8 sm:px-16 md:px-24">
        <Logo className="absolute top-2 left-2 scale-75" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-12 h-12 text-gray-600 border-gray-400 border-2 rounded-md">
              <UserRoundSearch strokeWidth={2} className="w-2/3" />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center mb-2">
            Login to your account
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Welcome back, please enter your details
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email ID *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                </span>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="Enter your email ID"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <KeyRound className="w-5 h-5 text-gray-400" />
                </span>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Keep me signed in
              </label>
              <a href="/" className="text-blue-600 hover:underline">
                Forgot password
              </a>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 hover:cursor-pointer"
              onClick={handleSignIn}
            >
              Log in
            </button>

            <p className="text-sm text-center text-gray-600">
              Not registered yet?{" "}
              <a
                href="/"
                className="text-blue-600 hover:underline"
                onClick={handleCreateAccount}
              >
                Create an account
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className="hidden md:block">
        <img
          src={mbmImage}
          alt="MBM College"
          className="w-[96%] h-[96%] mt-4 ml-4 object-cover rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Login;
