import { ErrorMessage, Field, Form, Formik,useFormikContext } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Input,Button} from "antd"
import {MobileOutlined,MailOutlined,WarningOutlined,UserOutlined} from "@ant-design/icons"
import * as Yup from "yup"
import { addcustomer, EditCustomerBy_Id } from '../Actions/CustomersProductsBillsActions'
import "../stylesheets/Form.css"
import { useHistory, useParams } from 'react-router'

function CustomerForm(props) {
    const {id} = useParams()
    let history = useHistory()
    const dispatch = useDispatch()
    const customers = useSelector(state => state.BusinessData.customers)
   
    const Cust = id ? customers.find((customer)=> customer._id === id) : ""

    const initialValues={
      mobile: Cust  ? Cust.mobile : "",
        name: Cust  ? Cust.name   : "",
       email: Cust  ? Cust.email  : ""
    }
    const onSubmit= (values,Props)=>{
        const resetForm = Props.resetForm
        const formData = {
            name:values.name,
            mobile:values.mobile,
            email:values.email
        }
       id ?  dispatch(EditCustomerBy_Id(formData,id,edited)) : dispatch(addcustomer(formData,resetForm)) 
    }
    const edited = () => {
        history.push("/main/customers")
    }
    
    const validationSchema = Yup.object({
         name:Yup.string().required("required"),
         mobile:Yup.string().required("required").matches(/^[0-9]{1,10}$/,"Numbers Only").min(10,"Must be 10 digits").max(10),
         email:Yup.string().required("required").email("invalid format"),
    })
    const SubmitButton = (props)=>{
        const {formik}= props
        const {values}  = useFormikContext()
        return <>
            {id ?
                <><Button disabled={!formik.isValid} type="primary"  htmlType="submit">Edit Customer</Button>
                <Button type="text"  onClick={()=>history.push("/main/customers")}> Cancel </Button></>: 
                customers.some(customer => customer.mobile === values.mobile) ? 
            <div>
                <Button disabled={true}  type="ghost"            htmlType="submit">Add Customer</Button>
                <p className="errorInForm">Already exist</p>
            </div> :
                <Button disabled={!formik.isValid} type="primary"  htmlType="submit">Add Customer</Button>
            }    
               </>
    }
    return (
            <Formik   initialValues={initialValues}
                      onSubmit={onSubmit}
                      validationSchema={validationSchema}
                      validateOnMount>
            {formik=>(
                <Form className="formContainer">
                <div>
                <Field name="mobile" >
                    {({field})=> {
                        return <Input className="customerInputs" autoComplete="off" prefix={<MobileOutlined/>} {...field} placeholder="Mobile"/>
                    }}
                </Field>
                <ErrorMessage name="mobile">
                {err =>  <p className="errorInForm"><WarningOutlined/>{err}</p>}
                </ErrorMessage>
                </div>
                <div>
                <Field name="name" >
                    {({field})=> {
                        return <Input className="customerInputs" autoComplete="off" prefix={<UserOutlined/>}  {...field} placeholder="Name"/>
                    }}
                </Field>
                <ErrorMessage name="name">
                    {err => <p className="errorInForm"><WarningOutlined/>{err}</p>}
                </ErrorMessage>
                </div>
                <div>
                <Field name="email" >
                    {({field})=> {
                        return <Input className="customerInputs" autoComplete="off" prefix={<MailOutlined/>}  {...field} placeholder="Email"/>
                    }}
                </Field>
                <ErrorMessage name="email">
                {err =>  <p className="errorInForm"><WarningOutlined/>{err}</p>}
                </ErrorMessage>
                </div>
                <SubmitButton formik={formik}/>
            </Form>
            )}
            </Formik>
            
    )
}

export default CustomerForm
