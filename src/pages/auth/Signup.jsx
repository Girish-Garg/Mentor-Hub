import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundWrapper, GoBackButton } from "../../../components/custom";
import { Toaster } from "sonner"
import {User_select, CreateAcc, CreateAcc_T, EnterPass, OtpVerify, OtpVerify_T } from "./SignUp_c";

const Signup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [accountType, setAccountType] = useState("");
  const [data, setData] = useState({});
  const [password, setPassword] = useState("");
  const [Otp, setOtp] = useState("");

  useEffect(() => {
    console.log(data)
  }, [data]);

  return (
    <BackgroundWrapper>
      <Toaster position="top-center" richColors/> 
      <GoBackButton onClick={() => {currentStep != 1 ? setCurrentStep((newnum) => newnum = currentStep - 1) : navigate("/login") }} />
     <div className="flex flex-col justify-center items-center h-[100vh] fixed top-0">
      {currentStep === 1 && (
        <User_select setCurrentStep={setCurrentStep} accountType={accountType} setAccountType={setAccountType} />
      )}
      {currentStep === 2 && accountType == "Student" && (
        <CreateAcc  setCurrentStep={setCurrentStep} setData={setData}/>
      )}
      {currentStep === 2 && accountType != "Student" && accountType != "Alumni" && (
        <CreateAcc_T  setCurrentStep={setCurrentStep} setData={setData}/>
      )}
      {currentStep === 3 && (
        <EnterPass password={password} setPassword={setPassword} setCurrentStep={setCurrentStep}/>
      )}
      {currentStep === 4 && accountType == "Student" && (
        <OtpVerify Otp={Otp} setOtp={setOtp}/>
      )}
      {currentStep === 4 && accountType != "Student" && accountType != "Alumni" && (
        <OtpVerify_T Otp={Otp} setOtp={setOtp}/>
      )}
      </div>
    </BackgroundWrapper>
  );
};

export default Signup;
