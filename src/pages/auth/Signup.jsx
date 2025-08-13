import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundWrapper, GoBackButton } from "@/components/custom";
import { Toaster, toast } from "sonner";
import { SEND_OTP_MUTATION, STUDENT_SIGNUP_MUTATION } from "@/queries/query";
import useGql from "@/components/hooks/useGql";
import {
  User_select,
  CreateAcc,
  CreateAcc_T,
  EnterPass,
  OtpVerify,
  OtpVerify_T,
} from "./SignUp_c";
import { useAuth } from "@clerk/clerk-react";

const Signup = () => {
  const { gqlData, executeQuery } = useGql();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [accountType, setAccountType] = useState("");
  const [formData, setFormData] = useState({});
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [last4Digits, setLast4Digits] = useState("XXXX");
  const [isResending, setIsResending] = useState(false);
  useEffect(() => {
    if (isSignedIn) {
      toast.error("Cannot signup while logged in");
      setTimeout(() => navigate("/login"), 400);
    }
  }, [isSignedIn, navigate]);
  const sendOtp = useCallback(async () => {
    try {
      const result = await executeQuery(SEND_OTP_MUTATION, {
        sendOtpInput: formData,
      });
      if (!result || typeof result !== "object") {
        console.error("Invalid response structure:", result);
        toast.error("Invalid server response. Please try again.");
        setCurrentStep(1);
        return;
      }
      const { success, phoneNumber } = result.sendOtp || {};
      if (success) {
        toast.success("OTP sent successfully!");
        setLast4Digits(phoneNumber);
      } else {
        toast.error("Failed to send OTP. Please try again.");
        setCurrentStep(1);
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      toast.error(err?.message || "Error sending OTP");
      setCurrentStep(1);
    } finally {
      setIsResending(false);
    }
  }, [executeQuery, formData]);

  const submitData = useCallback(async () => {
    try {
      const result = await executeQuery(STUDENT_SIGNUP_MUTATION, {
        input: {
          otp: parseInt(otp, 10),
          password,
          userId: gqlData?.sendOtp?.userId,
        },
      });

      if (result?.studentSignup?.success) {
        toast.success("User created successfully!");
        setTimeout(() => navigate("/login"), 300);
      } else {
        toast.error("Failed to create user. Please try again.");
        setCurrentStep(1);
      }
    } catch (err) {
      console.error("Error creating user:", err);
      toast.error(err.message || "Error creating user");
    }
  }, [executeQuery, gqlData, otp, password, navigate]);

  useEffect(() => {
    if (currentStep === 4 && accountType === "Student" && !isResending) {
      sendOtp();
    }
  }, [currentStep, accountType, sendOtp, isResending]);

  useEffect(() => {
    if (isResending) {
      sendOtp();
    }
  }, [isResending, sendOtp]);

  return (
    <BackgroundWrapper>
      <Toaster position="top-center" richColors />
      <GoBackButton
        onClick={() =>
          currentStep !== 1
            ? setCurrentStep((step) => step - 1)
            : navigate("/login")
        }
      />
      <div className="flex flex-col justify-center items-center h-screen fixed top-0">
        {currentStep === 1 && (
          <User_select
            setCurrentStep={setCurrentStep}
            accountType={accountType}
            setAccountType={setAccountType}
          />
        )}
        {currentStep === 2 && accountType === "Student" && (
          <CreateAcc setCurrentStep={setCurrentStep} setData={setFormData} />
        )}
        {currentStep === 2 &&
          accountType !== "Student" &&
          accountType !== "Alumni" && (
            <CreateAcc_T
              setCurrentStep={setCurrentStep}
              setData={setFormData}
            />
          )}
        {currentStep === 3 && (
          <EnterPass
            password={password}
            setPassword={setPassword}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 4 && accountType === "Student" && (
          <OtpVerify
            last4Digits={last4Digits}
            Otp={otp}
            setOtp={setOtp}
            password={password}
            onSubmit={submitData}
            setisResending={setIsResending}
            isResending={isResending}
          />
        )}
        {currentStep === 4 &&
          accountType !== "Student" &&
          accountType !== "Alumni" && <OtpVerify_T Otp={otp} setOtp={setOtp} />}
      </div>
    </BackgroundWrapper>
  );
};

export default Signup;
