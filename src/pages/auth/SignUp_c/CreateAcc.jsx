import React from "react";
import {
  Contact,
  GraduationCap,
  Calendar,
  Mail,
  IdCard,
  IdCardLanyard,
} from "lucide-react";
import { Combobox } from "../../../../components/custom";
import { toast } from "sonner";
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
      if (!value) return false; // Do not allow empty values to pass
      return /^[2-9]{1}[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}$/.test(value);
    }),
  abc: yup
    .string()
    .nullable()
    .test("valid-abc", "Invalid ABC ID", (value) => {
      if (!value) return true; 
      return /^(\d{4}\s\d{4}\s\d{4}|\d{12})$/.test(value);
    }),

  confirm: yup.boolean().oneOf([true], "You must confirm the details"),
});

const CreateAcc = ({setCurrentStep, setData}) => {
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
    
   const branchOptions = [
      { value: "Computer Science", label: "Computer Science" },
      { value: "Information Technology", label: "Information Technology" },
      { value: "Electronics", label: "Electronics" },
      { value: "Mechanical", label: "Mechanical" },
      { value: "Civil", label: "Civil" },
      { value: "Electrical", label: "Electrical" },
    ];

   const yearOptions = [
      { value: "1", label: "1st Year" },
      { value: "2", label: "2nd Year" },
      { value: "3", label: "3rd Year" },
      { value: "4", label: "4th Year" },
    ];

    
  return (
      <div className="relative z-10 w-[100vw] h-max">
        <div className="mt-0 flex justify-center">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 shadow-lg rounded-xl p-2.5 text-center">
            <div className="flex justify-center mb-1">
              <div className="flex items-center justify-center w-12 h-12 text-gray-600 border-2 border-gray-400 rounded-md dark:text-gray-300 dark:border-gray-500">
                <img src="/Add_user_icon.svg"  className="w-[20px] aspect-[0.815]" />
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
                  setData ( {
                    ...values,
                    aadhar: values.aadhar.replace(/\s/g, ""),
                    abc: values.abc.replace(/\s/g, ""),
                  });
                  setCurrentStep(3);
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
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 z-10">
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                      </span>
                      <div className="pl-10">
                        <Combobox
                          options={branchOptions}
                          placeholder="Select Branch"
                          onChange={(value) => setFieldValue("branch", value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 text-left">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Year *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 z-10">
                        <Calendar className="w-4 h-4 text-gray-400" />
                      </span>
                      <div className="pl-10">
                        <Combobox
                          options={yearOptions}
                          placeholder="Select Year"
                          onChange={(value) => setFieldValue("year", value)}
                        />
                      </div>
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
  );
};

export default CreateAcc;
