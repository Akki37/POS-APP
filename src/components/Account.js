import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import {Divider} from "antd"
import "../stylesheets/Account.css"
import { useHistory } from 'react-router'
import swal from '@sweetalert/with-react'
function Account(props) {
    let history = useHistory()
    const account = useSelector(state => state.BusinessData.account)
    useEffect(()=>{
        if(!localStorage.getItem("pos_token")){
            history.push("/login")
            swal({
                text:"Please Log-in first.",
                icon:"error",
                timer:1500,
                button:false
            })
        }
    },[])
    return (
        <div className="account_box">
            <div className="Account">Account </div>
            <p className="createdAt">created on-{new Date(account.createdAt).toLocaleDateString()}<br/> last updated -{new Date(account.updatedAt).toLocaleDateString()}</p>
            <Divider orientation="left" style={{fontSize:"15px",fontWeight:"600",margin:0,padding:0}}>User Name</Divider>
            <div className="user ">{account.username}</div>
            <Divider orientation="left" style={{fontSize:"15px",fontWeight:"600",margin:0,padding:0}}>Email</Divider>
            <div className="user ">{account.email}</div>
            <Divider orientation="left" style={{fontSize:"15px",fontWeight:"600",margin:0,padding:0}}>Business Name</Divider>
            <div className="user ">{account.businessName}</div>
            <Divider orientation="left" style={{fontSize:"15px",fontWeight:"600",margin:0,padding:0}}>Address</Divider>
            <div className="user ">{account.address}</div>
        </div>
    )
}

export default Account
