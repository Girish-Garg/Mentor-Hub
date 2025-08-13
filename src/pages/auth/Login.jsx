import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignIn, useUser, useClerk } from "@clerk/clerk-react";
import { KeyRound, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import mbmImage from "/mbm.png";
import { Logo } from "../../../components/custom";
import { Toaster, toast } from "sonner";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  agree: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

const Login = () => {
  const navigate = useNavigate();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { user, isSignedIn } = useUser();
  const { session } = useClerk();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    Object.values(errors).forEach((err) => {
      toast.error(err?.message);
    });
  }, [errors]);

  useEffect(() => {
    if (user && isLoaded) {
      toast.success("Redirecting to dashboard...");
      console.log("User type:", user || "not set");
      // navigate("/dashboard");
    }
  }, [user, isLoaded]);

  const handleLogout = useCallback(async () => {
    try {
      await session.remove();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to log out. Please try again.");
    }
  }, [session, navigate]);

  const handleCreateAccount = useCallback((e) => {
    e.preventDefault();
    navigate("/signup");
  }, [navigate]);

  const handleSignIn = useCallback(
    async (data) => {
      if (!isLoaded) {
        toast.error("Please try again later");
        return;
      }
      setIsLoading(true);
      try {
        const step1 = await signIn.create({
          identifier: data.email.trim(),
          password: data.password.trim(),
        });

        if (step1.status === "complete") {
          await setActive({ session: step1.createdSessionId });
          console.log("Sign-in successful:", step1);
        } else {
          console.error("Sign-in not complete:", step1);
        }
      } catch (error) {
        console.error("Sign-in error:", error);
        toast.error(
          error?.errors?.[0]?.message ||
          error?.message ||
          "Sign-in failed. Please check your credentials."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoaded, signIn, setActive]
  );

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-[1fr_1.5fr] bg-white">
        <div className="relative flex flex-col justify-center items-center px-8 sm:px-16 md:px-24">
          <Logo className="absolute top-2 left-2 scale-75" />

          {!isSignedIn ? (
            <form
              onSubmit={handleSubmit(handleSignIn)}
              className="w-full max-w-md space-y-6"
            >
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-12 h-12 text-gray-600 border-gray-400 border-2 rounded-md">
                  <img src="/Icon_user.svg" className="w-[22px]" />
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
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <label className="flex items-center text-sm text-gray-700">
                    <input
                      type="checkbox"
                      {...register("agree")}
                      className="mr-2"
                    />
                    You adhere to our
                    <a
                      href="#"
                      className="text-blue-600 hover:underline ml-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      platform terms
                    </a>
                  </label>
                  <a href="/" className="text-blue-600 hover:underline">
                    Forgot password
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log in"}
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
          ) : (
            <button
              className="w-full mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
              onClick={handleLogout}
            >
              Log Out
            </button>
          )}
        </div>

        <div className="hidden md:block">
          <img
            src={mbmImage}
            alt="MBM College"
            className="w-[96%] h-[96%] mt-4 ml-4 object-cover rounded-2xl"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
