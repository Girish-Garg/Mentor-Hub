import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundWrapper, GoBackButton } from "@/components/custom";
import { Toaster, toast } from "sonner";
import useGql from "../../../hooks/useGql";
import {
  User_select,
  CreateAcc,
  CreateAcc_T,
  EnterPass,
  OtpVerify,
  OtpVerify_T,
} from "./SignUp_c";
import { useUser } from "@clerk/clerk-react";

const Signup = () => {
  const { gqlData, loading, error, executeQuery } = useGql();
  const { getToken } = useUser();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [accountType, setAccountType] = useState("");
  const [data, setData] = useState({});
  const [password, setPassword] = useState("");
  const [Otp, setOtp] = useState("");
  const [last4Digits, setLast4Digits] = useState("XXXX");
  const [submit, setSubmit] = useState(false);
  const [isResending, setisResending] = useState(false);
  const SEND_OTP_MUTATION = `
    mutation StudentSignup($sendOtpInput: SendOtpInput!) {
      sendOtp(input: $sendOtpInput) {
        success
        userId
        phoneNumber
      }
    }
  `;

  const STUDENT_SIGNUP_MUTATION = `
    mutation StudentSignup($input: StudentSignupInput!) {
      studentSignup(input: $input) {
        userType
        success
      }
    }
  `;
   const submitData = async ()=>{
    try {
          await executeQuery(STUDENT_SIGNUP_MUTATION, {
            input: {
              otp: parseInt(Otp),
              password: password,
              userId: gqlData.sendOtp.userId,
            }
          });
          setSubmit(false);
        } catch (err) {
          console.log("Error in creating user: ", err.message);
          toast.error(err.message);
    }
          setSubmit(false);

   }    
  useEffect(() => {
    if (submit && currentStep === 4 && accountType === "Student") {
      console.log("Submitting data...");
      submitData();
    }
  },[submit]);
  useEffect(() => {
    console.log(data);
    console.log("gqlData: ", gqlData);
    if (gqlData) {
      if(!gqlData?.sendOtp?.success || !gqlData?.studentSignup?.success) {
        toast.error("Failed to send OTP. Please try again.");
        setCurrentStep(1);
        return;
      }
      else{
        toast.success("OTP sent successfully!");
      }
      setLast4Digits(gqlData?.sendOtp?.phoneNumber);
    } 
  }, [gqlData]);
  useEffect(()=>{
    if (currentStep === 4 && accountType === "Student", isResending){
      async function sendOtp() {
        try {
          await executeQuery(SEND_OTP_MUTATION, {
            sendOtpInput: data,
          });
          setTimeout(() => {
          setisResending(false);
          }, 2);
        } catch (err) {
          console.log("Error in sending otp: ", err);
          toast.error(error);
        }
      }
      sendOtp();
      console.log('Called sendOtp');
    }
  },[isResending]);
  useEffect(() => {
    if (currentStep === 4 && accountType === "Student" ) {
      async function sendOtp() {
        try {
          // const token = await getToken();
          await executeQuery(SEND_OTP_MUTATION, {
            sendOtpInput: data,
          });

        } catch (err) {
          console.log("Error in sending otp: ", err);
          toast.error(error);
        }
      }
      sendOtp();
      console.log('Called sendOtp');
    }
  }, [data, currentStep , accountType]);

  useEffect(() => {

  },[submit]);
  return (
    <BackgroundWrapper> 
      <Toaster position="top-center" richColors />
      <GoBackButton
        onClick={() => {
          currentStep !== 1
            ? setCurrentStep((newnum) => (newnum = currentStep - 1))
            : navigate("/login");
        }}
      />
      <div className="flex flex-col justify-center items-center h-[100vh] fixed top-0">
        {currentStep === 1 && (
          <User_select
            setCurrentStep={setCurrentStep}
            accountType={accountType}
            setAccountType={setAccountType}
          />
        )}
        {currentStep === 2 && accountType === "Student" && (
          <CreateAcc setCurrentStep={setCurrentStep} setData={setData} />
        )}
        {currentStep === 2 &&
          accountType !== "Student" &&
          accountType !== "Alumni" && (
            <CreateAcc_T setCurrentStep={setCurrentStep} setData={setData} />
          )}
        {currentStep === 3 && (
          <EnterPass
            password={password}
            setPassword={setPassword}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 4 && accountType === "Student" && (
          <OtpVerify  last4Digits={last4Digits} Otp={Otp} setOtp={setOtp} password={password} setSubmit={setSubmit} setisResending={setisResending} isResending={isResending}  />
        )}
        {currentStep === 4 &&
          accountType !== "Student" &&
          accountType !== "Alumni" && <OtpVerify_T  Otp={Otp} setOtp={setOtp} />}
      </div>
    </BackgroundWrapper>
  );
};

export default Signup;
