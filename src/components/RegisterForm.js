import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Input, Button } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  HomeOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import * as Yup from "yup";
import SweetAlert2 from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import "../stylesheets/RegisterForm.css";
import { Link, useHistory } from "react-router-dom";
import {
  registerationError,
  registration_net_error,
  startRegisterUser,
} from "../Actions/register_loginActions";

function RegisterForm(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const networkError_registration = useSelector(
    (state) => state.networkError.registration
  );
  const responseError_registration = useSelector(
    (state) => state.responseError.registration
  );

  useEffect(() => {
    if (localStorage.getItem("pos_token")) {
      history.push("/main/dashboard");
    } else {
      if (responseError_registration) {
        SweetAlert2({
          text: `${responseError_registration} Already Exist!`,
          icon: "error",
          buttons: "OK",
        }).then((value) => {
          if (value) {
            dispatch(registerationError(""));
          }
        });
      }
      if (networkError_registration) {
        SweetAlert2({
          text: networkError_registration,
          icon: "error",
          buttons: "OK",
        }).then((value) => {
          if (value) {
            dispatch(registration_net_error(""));
          }
        });
      }
    }
  }, [networkError_registration, responseError_registration, dispatch, history]);

  const registration_done = () => {
    SweetAlert2({
      text: "Successfully Registered Please Log In Now",
      icon: "success",
      timer: 1000,
    });
    props.history.push("/login");
  };
  const initialValues = {
    username: "",
    email: "",
    password: "",
    businessName: "",
    address: "",
  };
  const onSubmit = (values) => {
    const formData = {
      username: values.username,
      email: values.email,
      password: values.password,
      businessName: values.businessName,
      address: values.address,
    };
    dispatch(startRegisterUser(formData, registration_done));
  };
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Username required"),
    email: Yup.string().required("Email required").email("Invalid format"),
    password: Yup.string()
      .required("Password required")
      .min(8, "Too short")
      .max(16),
    businessName: Yup.string().required("Business Name required"),
    address: Yup.string().required("Address required"),
  });

  return (
    <div className="registerForm_box">
      <div className="register_title">Register With Us</div>
      <div className="register_form">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <Form style={{ width: "30%" }}>
                <Field name="username">
                  {({ field }) => (
                    <Input
                      className="register_input"
                      autoComplete="off"
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Enter User Name"
                      {...field}
                    />
                  )}
                </Field>
                <br />
                <ErrorMessage name="username">
                  {(err) => <div className="register_error">{err}</div>}
                </ErrorMessage>

                <Field name="email">
                  {({ field }) => (
                    <Input
                      className="register_input"
                      autoComplete="off"
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      placeholder="Enter Email "
                      {...field}
                    />
                  )}
                </Field>
                <br />
                <ErrorMessage name="email">
                  {(err) => <div className="register_error">{err}</div>}
                </ErrorMessage>

                <Field name="password">
                  {({ field }) => (
                    <Input.Password
                      className="register_input"
                      autoComplete="off"
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      placeholder="Enter password "
                      {...field}
                    />
                  )}
                </Field>
                <br />
                <ErrorMessage name="password">
                  {(err) => <div className="register_error">{err}</div>}
                </ErrorMessage>

                <Field name="businessName">
                  {({ field }) => (
                    <Input
                      className="register_input"
                      autoComplete="off"
                      prefix={<ShopOutlined className="site-form-item-icon" />}
                      placeholder="Enter Business Name "
                      {...field}
                    />
                  )}
                </Field>
                <br />
                <ErrorMessage name="businessName">
                  {(err) => <div className="register_error">{err}</div>}
                </ErrorMessage>

                <Field name="address">
                  {({ field }) => (
                    <Input.TextArea
                      className="register_input"
                      style={{ color: "rgb(22, 22, 22)" }}
                      autoComplete="off"
                      prefix={<HomeOutlined className="site-form-item-icon" />}
                      placeholder="Enter Your Address"
                      {...field}
                    />
                  )}
                </Field>
                <br />
                <ErrorMessage name="address">
                  {(err) => <div className="register_error">{err}</div>}
                </ErrorMessage>

                <div className="register_button">
                  <Button
                    disabled={!formik.isValid || !formik.dirty}
                    type="primary"
                    htmlType="submit"
                  >
                    Register
                  </Button>
                  <div className="account_note">
                    Already have an account?{" "}
                    <Link to="/login" className="login_link_in_regis">
                      Log-in
                    </Link>{" "}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default RegisterForm;
