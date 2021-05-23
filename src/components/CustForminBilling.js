import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Input,Button,Steps} from "antd"
import {MobileOutlined,MailOutlined,WarningOutlined,UserOutlined,CheckCircleFilled} from "@ant-design/icons"
import { addbillingCustomer, addcustomer } from '../Actions/CustomersProductsBillsActions'
import "../stylesheets/CustForminBilling.css"
const {Step} =Steps
function CustForminBilling(props) {
    const  dispatch = useDispatch()
    
    const customers = useSelector(state => state.BusinessData.customers)
    const billingCustomer  = useSelector(state => state.BusinessData.billingCustomer)

    const[mobile,setMobile]=useState( "")
    const[name  ,  setName]=useState("")
    const[email , setEmail]=useState("")
    const[formError,setFormError]=useState({})
    const[steps,setSteps]=useState(0)

    useEffect(()=>{
        if(Object.keys(billingCustomer).length){
            setMobile(billingCustomer.mobile)
            setName(billingCustomer.name)
            setEmail(billingCustomer.email)
            setSteps(4)
        }else{
            setMobile("")
            setEmail("")
            setName("")
            setSteps(0)
        }
    },[billingCustomer])

    function checkExistence(input){
        const found = customers.find((customer)=>{
        return customer.mobile === input
        })
            if(found){
                dispatch(addbillingCustomer(found))
                setFormError({})
                setSteps(4)
            }else{
                setSteps(1)
                setName("")
                setEmail("")
            }
    } 

    const handleMobile=(e)=>{
        const Input = e.target.value       
        if(Input.length>0){
                if(!(/^[0-9]{1,10}$/).test(Input)){
                    setFormError({...formError,mobile:"Numbers Only"})
                    setSteps(0)
                }else{
                            if(Input.length<10){
                                setFormError({...formError,mobile:"Must be 10 digits"})
                                setSteps(0)
                            }else{
                                setFormError({...formError,mobile:""})
                                setSteps(1)
                                checkExistence(e.target.value)
                            }
                }
        }else{
            setFormError({...formError,mobile:"Required"})
            dispatch(addbillingCustomer({}))
            setSteps(0)
        }
        setMobile(Input)
    }

    const handleName=(e)=>{
        const Input = e.target.value
        if(Input.length>0){
            setFormError({...formError,name :""}) 
            setSteps(2)
        }else{
            setFormError({...formError,name :"Required"}) 
            setSteps(1)
        }
        setName(Input)
    }
    const handleEmail=(e)=>{
        const Input = e.target.value
        if(Input.length>0){
            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(Input)){
                setFormError({...formError,email : "Invalid Format"})
                setSteps(2)
            }else{
                setFormError({...formError,email : ""})
                setSteps(3)
            }
        }else{
            setFormError({...formError,email : "Required"})
            setSteps(2)
    }
    setEmail(Input)
}
    const handleSubmit =(e)=>{
        e.preventDefault()
        if(mobile.length && name.length && email.length){
        if(!formError.name || !formError.mobile || !formError.email){
            setFormError({})
            const formData={
                name:name,
                mobile:mobile,
                email:email
            }
        dispatch(addcustomer(formData))   
        }
    }
    }
    return (

            <form onSubmit={handleSubmit}>
                <div className="addCustForm">
                 <div>  
                <Input type="text"  className="customerInputs"  prefix={<MobileOutlined />} name="mobile"  autoComplete="off" placeholder="Mobile" value={mobile} onChange={handleMobile} maxLength={10} />
                {formError.mobile ? <p  className="error"><WarningOutlined style={{padding:"0 2px 0 0"}}/>{formError.mobile}</p>:null}
                </div>
                
                <div>
                <Input type="text" disabled={!mobile.length} autoComplete="off" className="customerInputs"  prefix={<UserOutlined />} name="name"   placeholder="Name"   value={name}   onChange={handleName}/>
                {formError.name ? <p className="error"><WarningOutlined style={{padding:"0 2px 0 0"}}/>{formError.name}</p>:null}
                </div>
                
                <div>
                <Input type="email" disabled={!mobile.length || !name.length}className="customerInputs" name="email" autoComplete="off" placeholder="Email" prefix={<MailOutlined/>}  value={email}  onChange={handleEmail}/>
                {formError.email ? <p className="error"><WarningOutlined style={{padding:"0 2px 0 0"}}/>{formError.email}</p>:null}
                </div>
                <div>
                { steps === 4  ? <CheckCircleFilled className="checkIcon" />
                : <Button className="form_submit"  type={"primary"} disabled={!name.length || !email.length || !name.length || formError.name || formError.email || formError.mobile} htmlType="submit">Add Customer</Button>}
                </div>
                </div>
            </form>
           
    )
}

export default CustForminBilling
