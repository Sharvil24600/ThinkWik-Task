import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loaderTimer, toastTimer } from "../config/config";
import Loader from "./Loader/Loader";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };
  const [loginError, setLoginError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    const signupSuccess = localStorage.getItem("signupSuccess");
    if (signupSuccess) {
      // Display the signup success toast
      toast.current?.show({
        severity: "success",
        summary: "Signup Successful",
        detail: "Your account has been created successfully!",
        life: toastTimer,
      });
      // Clear the signup success state from localStorage after showing the toast
      localStorage.removeItem("signupSuccess");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("logoutToastShown")) {
      toast.current?.show({
        severity: "info",
        summary: "Logged Out",
        detail: "You have been successfully logged out!",
        life: toastTimer,
      });
      localStorage.removeItem("logoutToastShown");
    }
  }, []);

  const handleLogin = (values: LoginFormValues) => {
    const userDataString = localStorage.getItem("user");
    if (userDataString !== null) {
      const userData = JSON.parse(userDataString);
      if (
        userData.email === values.email &&
        userData.password === values.password
      ) {
        // Show the loader spinner
        setLoading(true);
        setTimeout(() => {
          // Store the user data
          localStorage.setItem("loginToastShown", "true");
          dispatch(
            loginUser({ email: values.email, password: values.password })
          );
          navigate("/home");
        }, loaderTimer);
      } else {
        setLoginError(true);
      }
    } else {
      setLoginError(true);
    }
  };

  const validateForm = (values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <>
      <Toast ref={toast} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Card
          title="Login Form"
          className="p-shadow-4"
          style={{ width: "400px", textAlign: "center" }}
        >
          <div className="p-fluid">
            <Formik
              initialValues={initialValues}
              validate={validateForm}
              onSubmit={handleLogin}
            >
              <Form>
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

                <Button type="submit" label="Login" className="button-margin" />
                {loginError && (
                  <p style={{ color: "red" }}>Invalid email or password</p>
                )}
              </Form>
            </Formik>
          </div>
          <div className="p-d-flex p-jc-center" style={{ paddingTop: "8px" }}>
            <span className="p-text-center" style={{ marginTop: "1rem" }}>
              Don't have an account?{" "}
              <span className="p-text-link">
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  Sign up
                </Link>
              </span>
            </span>
          </div>
        </Card>
        {loading && <Loader />}
      </div>
    </>
  );
};

export default LoginForm;
