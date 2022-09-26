import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { Wrapper } from "../components/Wrapper/Wrapper";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required")
});

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    axios
      .get("./api/session")
      .then((response) => {
        if (response.data.session) {
          router.push("/");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <Wrapper>
      <main className="w-full flex py-2 justify-center items-center min-h-screen">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              setTimeout(() => {
                axios
                  .post("./api/login", {
                    values
                  })
                  .then((response) => {
                    if (response.status === 200) {
                      router.push("/");
                    }
                    // window.location.replace(response.data.url);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }, 400);
            }}
            handleSubmit={async (values) => {
              console.log("hi");
              await sleep(500);
              onSubmit(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded p-10 mb-4 w-full border text-red-400 flex flex-wrap"
              >
                <h2 className="text-md font-medium my-2 text-black">Login</h2>
                <div className="w-full  my-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 font-bold text-gray-600"
                  >
                    Email
                  </label>
                  <Field
                    name="email"
                    placeholder="Email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <span className="flex">
                    {errors.email && touched.email && errors.email}
                  </span>
                </div>
                <div className="w-full  my-2">
                  <label
                    htmlFor="password"
                    className="block mb-2 font-bold text-gray-600"
                  >
                    Password
                  </label>
                  <Field
                    name="password"
                    placeholder="Password"
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <span>
                    {errors.password && touched.password && errors.password}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    disabled={isSubmitting}
                    className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
                <a
                  className="inline-block align-baseline font-bold text-sm text-slate-500 hover:text-slate-800 w-full mt-2 mb-0"
                  href="#"
                >
                  Forgot Password?
                </a>
              </form>
            )}
          </Formik>
        </div>
      </main>
    </Wrapper>
  );
}
