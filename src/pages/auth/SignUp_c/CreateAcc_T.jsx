import React from "react";
import {
  Contact,
  GraduationCap,
  Calendar,
  Mail,
} from "lucide-react";
import { Combobox } from "../../../../components/custom";
import { Formik, Form, Field } from "formik";
import { toast } from "sonner";
import * as yup from "yup";
const validationSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  department: yup.string().required("Department is required"),
  position: yup.string().required("Position is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  agree: yup.boolean().oneOf([true], "Confirmation is required"),
});

const CreateAcc_T = ({ setCurrentStep, setData }) => {

  const departmentOptions = [
    { value: "cse", label: "Computer Science" },
    { value: "mech", label: "Mechanical" },
    { value: "civil", label: "Civil" },
    { value: "eee", label: "Electrical and Electronics" },
    { value: "other", label: "Other" },
  ];

  const positionOptions = [
    { value: "professor", label: "Professor" },
    { value: "hod", label: "HOD" },
    { value: "staff", label: "Staff" },
    { value: "other", label: "Other" },
  ];

  const validateForm = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      return {};
    } catch (err) {
      const errors = {};
      err.inner.forEach((e) => {
        errors[e.path] = e.message;
        toast.error(e.message);
      });
      return errors;
    }
  };

  return (
      <div className="relative z-10 w-[100vw] h-max">
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-xl shadow-lg px-3 py-4">
            <div className="flex justify-center mb-3">
              <div className="flex items-center justify-center w-12 h-12 border-2 border-gray-400 rounded-md text-gray-600">
                <img src="/Add_user_icon.svg"  className="w-[20px] aspect-[0.815]" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
              Create your account
            </h2>
            <p className="text-sm text-gray-500 text-center mb-8">
              Please enter your detail to get started
            </p>
            <Formik
              initialValues={{
                fullName: "",
                department: "",
                position: "",
                email: "",
                agree: false,
              }}
              onSubmit={async (values) => {
                const errors = await validateForm(values);
                if (Object.keys(errors).length === 0) {
                    setData({
                    ...values}
                  );
                  setCurrentStep(3);
                }
              }}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className="mb-5">
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Full Name *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Contact className="w-4 h-4 text-gray-400" />
                      </span>
                      <Field
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Department *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 z-10">
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                      </span>
                      <div className="pl-10">
                        <Combobox
                          options={departmentOptions}
                          placeholder="Select Department"
                          onChange={(value) => setFieldValue("department", value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Position *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 z-10">
                        <Calendar className="w-4 h-4 text-gray-400" />
                      </span>
                      <div className="pl-10">
                        <Combobox
                          options={positionOptions}
                          placeholder="Select Position"
                          onChange={(value) => setFieldValue("position", value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Official Email ID *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                      </span>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-start mb-5 text-left text-sm">
                    <Field type="checkbox" name="agree" className="mt-1 mr-1 accent-blue-600" />
                    <label className="text-gray-600">
                      I confirm that the details provided are accurate and belong to me.
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
                  >
                    Register
                  </button>
                </Form>
              )}
            </Formik>
            <p className="text-sm text-gray-600 text-center mt-3">
              Have an account?{" "}
              <a href="/" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
  );
};

export default CreateAcc_T;
