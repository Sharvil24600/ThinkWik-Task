import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import { ProgressSpinner as Loader } from "primereact/progressspinner";
import { loaderTimer } from "../config/config";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import "./loader.css";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z\s]*$/, "Name should contain only alphanets"),
  email: Yup.string()
    .email("Invalid email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

const SignupForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useRef<Toast>(null);

  const handleSignup = (values: SignupFormValues) => {
    const newUser = {
      ...values,
      isLoggedIn: false,
    };

    // Check if the email already exists
    const existingUserString = localStorage.getItem("user");
    console.log(existingUserString);
    if (existingUserString) {
      const existingUser = JSON.parse(existingUserString);
      if (existingUser.email === values.email) {
        toast.current?.show({
          severity: "warn",
          summary: "Account Already Exists",
          detail: "An account with this email address already exists!",
        });
        return;
      }
    }
    // Show the loader spinner
    setIsLoading(true);
    // Simulate an API call with a delay of 5 seconds (loaderTimer - from config file)
    setTimeout(() => {
      // Store the user data
      localStorage.setItem("user", JSON.stringify(newUser));
      dispatch(addUser(newUser));
      // Redirect to the login page after signup
      navigate("/", { state: { signupSuccess: true } });
    }, loaderTimer);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Toast ref={toast} />
        <Card
          title="Sign Up"
          className="p-shadow-8"
          style={{ width: "400px", textAlign: "center" }}
        >
          <div className="p-fluid">
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
            >
              <Form>
                <div
                  className="p-field input-margin"
                  style={{ paddingBottom: "30px" }}
                >
                  <span className="p-float-label">
                    <Field
                      type="name"
                      id="name"
                      name="name"
                      as={InputText}
                      placeholder="Name"
                    />
                    <label htmlFor="name">Name</label>
                  </span>
                  <div style={{ color: "red" }}>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>
                <div
                  className="p-field input-margin"
                  style={{ paddingBottom: "30px" }}
                >
                  <span className="p-float-label">
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      as={InputText}
                      placeholder="Email"
                    />
                    <label htmlFor="email">Email</label>
                  </span>
                  <div style={{ color: "red" }}>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>
                <div
                  className="p-field input-margin"
                  style={{ paddingBottom: "25px" }}
                >
                  <span className="p-float-label">
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      as={InputText}
                      placeholder="Password"
                    />
                    <label htmlFor="password">Password</label>
                  </span>
                  <div style={{ color: "red" }}>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  label="Sign up"
                  className="button-margin"
                />
              </Form>
            </Formik>
          </div>
          <div className="p-d-flex p-jc-center" style={{ paddingTop: "8px" }}>
            <span className="p-text-center" style={{ marginTop: "1rem" }}>
              Already Signed Up?{" "}
              <span className="p-text-link">
                <Link to="/" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </span>
            </span>
          </div>
        </Card>
        {isLoading && (
          <div className="loader-container">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default SignupForm;
