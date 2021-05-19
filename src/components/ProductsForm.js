import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Input,Button} from "antd"
import {TagOutlined,WarningOutlined,ProfileOutlined} from "@ant-design/icons"
import * as Yup from "yup"
import { addProduct,EditProductBy_Id } from '../Actions/CustomersProductsBillsActions'
import "../stylesheets/Form.css"
import { useHistory, useParams } from 'react-router'


function ProductsForm(props) {
    const {id} = useParams()
    let history = useHistory()

    const dispatch = useDispatch()
    const products = useSelector(state => state.BusinessData.products)

    const Prod = id ? products.find((product)=>product._id === id):""
    const SubmitButton = (props)=>{
        const {formik} = props
        const {values} = useFormikContext()
        return <>
                {id ?
                    <>
                    <Button disabled={!formik.isValid} type="primary"  htmlType="submit">Edit Product</Button>
                    <Button type="text"  onClick={()=>history.push("/main/products")}>Cancel</Button>
                    </>: 
                    products.some(product => product.name.toLowerCase() === values.name.toLowerCase()) ? 
                    <div>
                        <Button disabled={true} type="ghost" htmlType="submit">Add Product</Button>
                        <p className="errorInForm">Already exist</p>
                    </div> :
                    <Button disabled={!formik.isValid} type="primary" htmlType="submit"> Add Product</Button>
                }    
              </>
        
    }
    const initialValues={
        name:  Prod ? Prod.name :"",
        price: Prod ? Prod.price :"",
    }
    const onSubmit= (values,Props)=>{
        const resetForm = Props.resetForm
        const formData = {
            name:values.name,
            price:values.price,
        }
        id ? dispatch(EditProductBy_Id(formData,id,edited)) : dispatch(addProduct(formData,resetForm))
    }
    const edited = () => history.push("/main/products")

    const validationSchema = Yup.object({
         name:Yup.string().required("required"),
         price:Yup.string().required("required").matches(/^[0-9]{1,10}$/,"Numbers Only"),

    })
    return (
            <Formik  initialValues={initialValues}
                      onSubmit={onSubmit}
                      validationSchema={validationSchema}
                      validateOnMount>
        {formik=>(
                <Form className="formContainer">
                    <div>
                <Field name="name" >
                    {({field})=> {
                        return <Input className="customerInputs" autoComplete="off" prefix={<ProfileOutlined />} {...field} placeholder="Product Name"/>
                    }}
                </Field>
                <ErrorMessage name="name">
                {err =>  <p className="errorInForm"><WarningOutlined/>{err}</p>}
                </ErrorMessage>
                </div>
                <div>
                <Field name="price" >
                    {({field})=> {
                        return <Input className="customerInputs" autoComplete="off" prefix={<TagOutlined />} {...field} placeholder="Product Price"/>
                    }}
                </Field>
                <ErrorMessage name="price">
                {err =>  <p className="errorInForm"><WarningOutlined/>{err}</p>}
                </ErrorMessage>
                </div>
                    <SubmitButton formik={formik}/>
                </Form>
        )}
            </Formik>

    )
}

export default ProductsForm
