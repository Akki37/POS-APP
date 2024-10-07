import React from 'react'
import {Link, useHistory} from "react-router-dom"
import SweetAlert2 from 'sweetalert'
import { Menu,Dropdown,Breadcrumb  } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginDone, reset } from '../Actions/register_loginActions';
import {UserOutlined,LogoutOutlined} from "@ant-design/icons"
import "../stylesheets/NavBar.css"

function NavBar(props) {
    const dispatch = useDispatch()
    const loggedin = useSelector(state => state.status.loggedin)
    const history = useHistory()

    const handleLogout =()=>{
        SweetAlert2({text:"You want to log out",icon:"warning",buttons:["No","Yes"],dangerMode:true })
        .then((value)=>{
            if(value){
                    localStorage.removeItem("pos_token")
                    SweetAlert2({ text:"Logged Out", icon:"success",timer:1000,buttons:false })
                    dispatch(loginDone(false))
                    history.push("/login")
                    dispatch(reset())
                                               }});}

    const seperator = <span style={{color:"#1A202C"}}>|</span>

    return (
        <div className="navbar">
            <div onClick={()=>{history.push("/")}}  className="navBar_heading">POS</div>
            <div  className="links">
                { loggedin ? 
                    
                        <div className="account">
                        <Dropdown style={{color:"white",fontSize:"40px"}} placement="bottomLeft" 
                        overlay={ <Menu className="menuItem" >
                                        <Menu.Item   onClick={()=>history.push("/main/account")}><UserOutlined />Account</Menu.Item>
                                        <Menu.Divider className="divider" />
                                        <Menu.Item  onClick={handleLogout}><LogoutOutlined />Log Out</Menu.Item>              
                                 </Menu>} >
                        <UserOutlined style={{fontSize:"30px",color:"#4190F7",padding:"10px"}}/>
                        </Dropdown>
                        </div>
                    
                    : 
                        <div className="breadCrumbs">
                            <Link className="link"  to="/">Home</Link>
                            <Breadcrumb.Separator  children={seperator} ></Breadcrumb.Separator>
                            <Link className="link"  to="/register">Register</Link>
                            <Breadcrumb.Separator   children={seperator} ></Breadcrumb.Separator>
                            <Link className="link"  to="/login">Login</Link>                
                        </div>
                }
            </div>
        </div>
    )
}

export default NavBar