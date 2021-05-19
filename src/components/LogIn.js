import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import * as Yup from "yup"
import { useDispatch,useSelector } from 'react-redux'
import swal from 'sweetalert'
import "../stylesheets/LogIn.css"
import {Input,Button} from "antd"
import {MailOutlined ,LockOutlined} from "@ant-design/icons"
import { Link, useHistory } from 'react-router-dom'
import { loginError, login_net_error, startLoginUser } from '../Actions/register_loginActions'

function LogIn(props) {
     const dispatch = useDispatch()
     let history = useHistory()
     const responseError_login = useSelector(state => state.responseError.login)
     const networkError_login  = useSelector(state => state.networkError.login)
     
    useEffect(()=>{
        if(localStorage.getItem("pos_token")){
            history.push("/main/dashboard")
        }else{
      if(responseError_login){
         swal({
             text:responseError_login,
             icon:"error",
             buttons:"OK" 
         }).then((value)=>{
             if(value){
                 dispatch(loginError(""))
             }
         })
      }
      
      if(networkError_login){
          swal({
              text:networkError_login,
              icon:"error",
              buttons:"Retry"
          }).then((value)=>{
              if(value){
                  dispatch(login_net_error(""))
              }
          })
      }}
    },[responseError_login,networkError_login])
    
    const loggedIn_done=()=>{
        swal({
            text:"Logged in",
            icon:"success",
            buttons:false,
            timer:1000
        })
          history.push("/main/dashboard")
    }
    const initialValues={
        email:"",
     password:""
   }
   const onSubmit = (values)=>{
       const loginData = {
           email:values.email,
           password:values.password
       }
       dispatch(startLoginUser(loginData,loggedIn_done))
   }
    const validationSchema=Yup.object({
        email:Yup.string().required( "Enter Your Email"  ).email("Invalid Email"),
     password:Yup.string().required("Enter Your Password")
     })
    return (
        <div className="loginForm_box">
            <div className="login_title">Log In</div>
            <div className="login_form">
           <Formik
              initialValues={initialValues}
                   onSubmit={onSubmit}
           validationSchema={validationSchema}>
               <Form style={{width:"30%"}}>
                   <Field   name="email">
                   {({field})=><Input className="login_input" {...field} autoComplete="off" prefix={<MailOutlined  className="site-form-item-icon" />} placeholder="Enter Your Email"  />}
                   </Field>
                   <ErrorMessage name="email">
                       {err => <div className="login_error">{err}</div>}
                   </ErrorMessage>
                   <Field   name="password">
                   {({field})=><Input.Password className="login_input" {...field} autoComplete="off" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Enter Your Password"  />}
                   </Field>
                   <ErrorMessage name="password">
                       {err => <div className="login_error">{err}</div>}
                   </ErrorMessage>
                   <div className="login_button">
                   <Button type="primary" htmlType="submit">Log In</Button>
                   <div className="account_note">Don't have an account? <Link to="/register" className="regis_link_in_login">Register Now</Link> </div>
                   </div>
               </Form>
           </Formik>
           </div>
        </div>
    )
}

export default LogIn
