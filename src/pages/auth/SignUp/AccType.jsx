import React, { useState } from "react";
import { ChevronLeft, UserRoundPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackgroundWrapper from "../../../../components/custom/BackgroundWrapper";
import GoBackButton from "../../../../components/custom/GoBackButton";
import { Toaster, toast } from "sonner"; 
import Combobox from "../../../../components/custom/Combobox";

const AccType = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("");

   const accountOptions = [
    { value: "Student", label: "Student" },
    { value: "HOD", label: "HOD" },
    { value: "Faculty", label: "Faculty" },
    { value: "Alumni", label: "Alumni" },
  ];

  const handleContinue = () => {
    if (!accountType) {
      toast.error("Please select an account type."); 
      return;
    }
    if (accountType === "Student") {
      navigate("/signup/create");
    } else if (accountType === "HOD") {
      navigate("/signup/create_t");
    } else if (accountType === "Faculty") {
      navigate("/signup/create_t");
    } else if (accountType === "Alumni") {
      navigate("/signup/create_a");
    }
  };

  return (
    <BackgroundWrapper>
      <Toaster position="top-center" richColors/> 
      <GoBackButton onClick={() => navigate("/login")} />
      <div className="relative z-10 min-h-screen px-4 pt-24">
        <div className="mt-12 flex justify-center">
          <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 text-gray-600 border-gray-400 border-2 rounded-md">
                <UserRoundPlus strokeWidth={2} className="w-2/3" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-1">Create your account</h2>
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
              {/* <select
                id="AccType"
                name="AccType"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Student">Student</option>
                <option value="HOD">HOD</option>
                <option value="Faculty">Faculty</option>
                <option value="Alumni">Alumni</option>
              </select> */}
              <Combobox
                options={accountOptions}
                placeholder="Select Account Type"
                onChange={setAccountType}
                className="!w-full"
              />
            </div>

            <button
              onClick={handleContinue}
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
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default AccType;
