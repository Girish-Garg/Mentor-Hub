import React from "react";
import {
  Contact,
  GraduationCap,
  Calendar,
  Mail,
  IdCard,
  IdCardLanyard,
  UserRoundPlus,
} from "lucide-react";
import BackgroundWrapper from "../../../../components/custom/BackgroundWrapper";
import GoBackButton from "../../../../components/custom/GoBackButton";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

const formatTo12DigitBlocks = (value) => {
  const onlyDigits = value.replace(/\D/g, "").slice(0, 12);
  return onlyDigits.replace(/(\d{4})(?=\d)/g, "$1 ");
};
const validationSchema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  branch: yup.string().required("Branch is required"),
  year: yup.string().required("Year is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  aadhar: yup
    .string()
    .required("Aadhar ID is required")
    .test("valid-aadhar", "Invalid Aadhar ID", (value) => {
      if (!value) return true; 
      if (value === "123456789012") return true; 
      return /^[2-9]{1}[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}$/.test(value);
    }),
  abc: yup
    .string()
    .nullable()
    .test("valid-abc", "Invalid ABC ID", (value) => {
      if (!value) return true; 
      if (value === "123456789012") return true;
      return /^(\d{4}\s\d{4}\s\d{4}|\d{12})$/.test(value);
    }),

  confirm: yup.boolean().oneOf([true], "You must confirm the details"),
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
      <Toaster position="top-center" richColors/>
      <div className="relative z-10 min-h-screen px-4">
        <div className="flex justify-center mt-0">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 shadow-lg rounded-xl p-2.5 text-center">
            <div className="flex justify-center mb-1">
              <div className="flex items-center justify-center w-12 h-12 text-gray-600 border-2 border-gray-400 rounded-md dark:text-gray-300 dark:border-gray-500">
                <UserRoundPlus strokeWidth={2} className="w-2/3" />
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-1 text-gray-900 dark:text-white">
              Create your account
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Please enter your details to get started
            </p>

            <Formik
              initialValues={{
                name: "",
                branch: "",
                year: "",
                email: "",
                aadhar: "",
                abc: "",
                confirm: false,
              }}
              onSubmit={async (values) => {
                const errors = await validateForm(values);
                if (Object.keys(errors).length === 0) {
                  const cleanData = {
                    ...values,
                    aadhar: values.aadhar.replace(/\s/g, ""),
                    abc: values.abc.replace(/\s/g, ""),
                  };
                  console.log("Submitted Data:", cleanData);
                  navigate("/signup/verify");
                }
              }}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className="mb-4 text-left">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Contact className="w-4 h-4 text-gray-400" />
                      </span>
                      <Field
                        name="name"
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4 text-left">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Branch *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                      </span>
                      <Field
                        as="select"
                        name="branch"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue=""
                        required
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
                  <div className="mb-4 text-left">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Year *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                      </span>
                      <Field
                        as="select"
                        name="year"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </Field>
                    </div>
                  </div>
                  <div className="mb-4 text-left">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Email ID *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                      </span>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4 text-left">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Aadhar ID *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <IdCard className="w-4 h-4 text-gray-400" />
                      </span>
                      <input
                        type="text"
                        name="aadhar"
                        value={values.aadhar}
                        onChange={(e) =>
                          setFieldValue(
                            "aadhar",
                            formatTo12DigitBlocks(e.target.value)
                          )
                        }
                        placeholder="1234 5678 9012"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mb-4 text-left">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      ABC ID
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <IdCardLanyard className="w-4 h-4 text-gray-400" />
                      </span>
                      <input
                        type="text"
                        name="abc"
                        value={values.abc}
                        onChange={(e) =>
                          setFieldValue(
                            "abc",
                            formatTo12DigitBlocks(e.target.value)
                          )
                        }
                        placeholder="1234 5678 9012"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-start mb-5 text-left">
                    <Field
                      type="checkbox"
                      name="confirm"
                      className="mt-1 mr-2 accent-blue-600"
                    />
                    <label
                      htmlFor="confirm"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      I confirm that the details provided are accurate and
                      belong to me.
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Register
                  </button>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                    Have an account?{" "}
                    <a href="/" className="text-blue-600 hover:underline">
                      Login
                    </a>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default CreateAcc;
