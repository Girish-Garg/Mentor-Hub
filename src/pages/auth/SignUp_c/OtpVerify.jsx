
import React, { useState, useEffect } from "react";
import {  MessageSquareMore } from "lucide-react";

const OtpVerify = ({otp, setOtp}) => {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!agreed) {
      setError("You must agree to the rules and regulations.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResendTimer(60);
    } catch (err) {
      console.error("Error resending OTP", err);
    } finally {
      setIsResending(false);
    }
  };

  return (
      <div className="relative z-10 h-max w-[100vw]">
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 text-gray-600 border-2 border-gray-400 rounded-md">
                <img src="/Add_user_icon.svg"  className="w-[20px] aspect-[0.815]" />
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-1.5">Create your account</h2>
            <p className="text-sm text-gray-500 mb-6 leading-snug">
              Your details are verified. Enter the OTP
              <br />
              sent to your registered mobile number.
            </p>

            <div className="text-left mb-6">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter your OTP (mobile number ending - XX09)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MessageSquareMore className="w-5 h-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="text-right mb-6">
              <button
                type="button"
                disabled={resendTimer > 0 || isResending}
                onClick={handleResendOtp}
                className={`text-sm underline ${
                  resendTimer > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:text-blue-700"
                }`}
              >
                {isResending
                  ? "Resending..."
                  : resendTimer > 0
                  ? `Resend OTP in ${resendTimer}s`
                  : "Resend OTP"}
              </button>
            </div>

            <div className="flex items-start mb-6 text-left">
              <input
                id="rules"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 mr-2 w-4 h-4"
              />
              <label htmlFor="rules" className="text-sm text-gray-700">
                You adhere to the{" "}
                <a href="#" className="underline">
                  rules and regulations
                </a>{" "}
                of the platform
              </label>
            </div>

            {error && (
              <p className="text-red-600 text-sm mb-4 text-left">{error}</p>
            )}

            <button
              type="submit"
              className="w-full mb-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
  );
};

export default OtpVerify;
