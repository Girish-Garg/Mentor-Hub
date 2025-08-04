import React from "react";
import {
  UserRoundPlus,
  Contact,
  GraduationCap,
  Calendar,
  Mail,
} from "lucide-react";
import BackgroundWrapper from "../../../../components/custom/BackgroundWrapper";
import GoBackButton from "../../../../components/custom/GoBackButton";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Toaster, toast } from "sonner";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  department: yup.string().required("Department is required"),
  position: yup.string().required("Position is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  agree: yup.boolean().oneOf([true], "Confirmation is required"),
});

const CreateAcc = () => {
  const navigate = useNavigate();

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
    <BackgroundWrapper>
      <GoBackButton onClick={() => navigate("/signup/type")} />
      <Toaster position="top-center" richColors />
      <div className="relative z-10 min-h-screen px-4">
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-xl shadow-lg px-3 py-4">
            <div className="flex justify-center mb-3">
              <div className="flex items-center justify-center w-12 h-12 border-2 border-gray-400 rounded-md text-gray-600">
                <UserRoundPlus className="w-6 h-6" />
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
                  console.log("Submitted Data:", values);
                  navigate("/signup/verify_t");
                }
              }}
            >
              {({ values }) => (
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
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                      </span>
                      <Field
                        as="select"
                        name="department"
                        className="w-full pl-10 pr-4 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="cse">Computer Science</option>
                        <option value="mech">Mechanical</option>
                        <option value="civil">Civil</option>
                        <option value="eee">Electrical and Electronics</option>
                        <option value="other">Other</option>
                      </Field>
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Position *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                      </span>
                      <Field
                        as="select"
                        name="position"
                        className="w-full pl-10 pr-4 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="professor">Professor</option>
                        <option value="hod">HOD</option>
                        <option value="staff">Staff</option>
                        <option value="other">Other</option>
                      </Field>
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
    </BackgroundWrapper>
  );
};

export default CreateAcc;
