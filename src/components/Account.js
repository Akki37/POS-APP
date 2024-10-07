import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import {Divider} from "antd"
import "../stylesheets/Account.css"
import { useHistory } from 'react-router'
import SweetAlert2 from 'react-sweetalert2';
function Account(props) {
    let history = useHistory()
    const account = useSelector(state => state.BusinessData.account)
    useEffect(()=>{
        if(!localStorage.getItem("pos_token")){
            history.push("/login")
            SweetAlert2({
                text:"Please Log-in first.",
                icon:"error",
                timer:1500,
                button:false
            })
        }
    },[history])
    const styleDivider = {fontSize:"15px",fontWeight:"600",width:"100%",margin:0,padding:"0 63px"}
    return (
        <div className="account_box">
            <div className="Account">Account <p className="createdAt">created on-{new Date(account.createdAt).toLocaleDateString()} | last updated -{new Date(account.updatedAt).toLocaleDateString()}</p></div>
            <div className="data_box">
                <div className="userTitle ">User Name</div>
                <div className="userData ">{account.username}</div>
            </div>
            <Divider  style={styleDivider}/>
            <div className="data_box">
                <div className="userTitle ">Email ID</div>
                <div className="userData ">{account.email}</div>
            </div>
            <Divider  style={styleDivider}/>
            <div className="data_box">
                <div className="userTitle ">Business Name</div>
                <div className="userData ">{account.businessName}</div>
            </div>
            <Divider  style={styleDivider}/>
            <div className="data_box">
                <div className="userTitle ">Address</div>
                <div className="userData ">{account.address}</div>
            </div>
        </div>
    )
}

export default Account
