import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";
import BackgroundWrapper from "../../../../components/custom/BackgroundWrapper";
import GoBackButton from "../../../../components/custom/GoBackButton";
import { UserRoundPlus, KeyRound, Eye, EyeOff } from "lucide-react";
import { Toaster, toast } from "sonner";

const getStrengthLabel = (score) => {
  switch (score) {
    case 0:
      return { text: "Very Weak", color: "text-red-600" };
    case 1:
      return { text: "Weak", color: "text-red-400" };
    case 2:
      return { text: "Fair", color: "text-yellow-500" };
    case 3:
      return { text: "Good", color: "text-blue-600" };
    case 4:
      return { text: "Strong", color: "text-green-600" };
    default:
      return { text: "", color: "" };
  }
};

const EnterPass = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordScore = zxcvbn(password).score;
  const strength = getStrengthLabel(passwordScore);
  const charCount = Math.min(password.length, 8);

  const isPasswordValid = password.length >= 6 && passwordScore >= 3;
  const isFormValid = isPasswordValid && agree;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (passwordScore < 3) {
      toast.error("Password must be at least Good strength");
      return;
    }
    if (!agree) {
      toast.error("You must agree to the rules and regulations");
      return;
    }

    toast.success("Password set successfully!");
    navigate("/dashboard");
  };

  return (
    <BackgroundWrapper>
      <GoBackButton onClick={() => navigate(-1)} />
      <Toaster position="top-center" richColors />
      <div className="relative z-10 min-h-screen px-4 pt-16">
        <div className="mt-12 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 text-gray-600 border-2 border-gray-400 rounded-md">
                <UserRoundPlus strokeWidth={2} className="w-6 h-6" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-1.5">
              Create your account
            </h2>
            <p className="text-sm text-gray-500 mb-6 leading-snug">
              Your details are verified successfully
              <br />
              please set your password
            </p>

            <div className="text-left mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2 flex justify-between items-center"
              >
                <span>Enter Your Password</span>
                {password && (
                  <span className="flex items-center gap-1">
                    <span className={`${strength.color} font-medium`}>
                      {strength.text}
                    </span>
                    <span className="text-gray-400">{charCount}/8</span>
                  </span>
                )}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <KeyRound className="w-5 h-5 text-gray-400" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  maxLength={20}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-start mb-6 text-left">
              <input
                id="rules"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 mr-2"
              />
              <label htmlFor="rules" className="text-sm text-gray-700">
                You adhere to the{" "}
                <a href="#" className="underline">
                  rules and regulation
                </a>{" "}
                of the platform
              </label>
            </div>

            <button
              type="submit"
              className={`w-full py-2 rounded-md transition ${
                isFormValid
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default EnterPass;
  