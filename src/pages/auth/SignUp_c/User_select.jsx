import React, { useState } from "react";
import { UserRoundPlus } from "lucide-react";
import { Combobox } from "../../../../components/custom";
import { toast } from "sonner"


function User_select({ setCurrentStep, accountType, setAccountType }) {
    
   const accountOptions = [
      { value: "Student", label: "Student" },
      { value: "HOD", label: "HOD" },
      { value: "Faculty", label: "Faculty" },
      { value: "Alumni", label: "Alumni" },
    ];
  const handleContinue = () => {
    if (!accountType) {
      toast.error("Please select an account type");
      return;
    }
    setCurrentStep(2);
  };
  return (
    <div className="relative z-10 h-max w-[100vw]">
        <div className="flex justify-center">
          <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 text-gray-600 border-gray-400 border-2 rounded-md">
                <img src="/Add_user_icon.svg"  className="w-[20px] aspect-[0.815]" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-1">Create your account</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}>
            <p className="text-sm text-gray-500 mb-6">
              Select your account type
            </p>

            <div className="text-left mb-8">
              <label
                htmlFor="AccType"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Account Type *
              </label>
              <Combobox
                options={accountOptions}
                placeholder="Select Account Type"
                onChange={setAccountType}
                className="!w-full"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Continue
            </button>

            <p className="mt-2 text-sm text-gray-600">
              Have an account?{" "}
              <a href="/" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </form>  
          </div>
        </div>
      </div>
  )
}

export default User_select