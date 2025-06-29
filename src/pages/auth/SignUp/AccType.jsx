import React from "react";
import { ChevronLeft, UserRoundPlus } from "lucide-react";
import { cn } from "../lib/utils";

const AccType = () => {
  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black">
 
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      ></div>

      <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      <div className="absolute top-4 left-4 z-10">
        <button className="flex items-center space-x-2 text-sm text-gray-700 border px-3 py-1 rounded-md hover:bg-gray-100">
          <ChevronLeft className="w-4 h-4" />
          <span>Go back</span>
        </button>
      </div>

      <div className="relative z-10 min-h-screen grid place-items-center px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
          <div className="flex justify-center mb-4">
            <UserRoundPlus strokeWidth={1} className="w-10 h-10 text-gray-600 border-gray-400 border-2 rounded-md" />
          </div>
          <h2 className="text-2xl font-semibold mb-1">Create your account</h2>
          <p className="text-sm text-gray-500 mb-6">Select your account type</p>

          <div className="text-left mb-4">
            <label
              htmlFor="AccType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Account Type *
            </label>
            <select
              id="AccType"
              name="AccType"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
              <option value="HOD">HOD</option>
              <option value="Faculty">Faculty</option>
              <option value="Super-Admin">Super-Admin</option>
              <option value="Alumni">Alumni</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Continue
          </button>

          <p className="mt-4 text-sm text-gray-600">
            Have a account?{" "}
            <a href="/" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccType;
