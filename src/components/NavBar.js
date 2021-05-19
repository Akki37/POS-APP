import React from 'react'
import {Link, useHistory} from "react-router-dom"
import swal from 'sweetalert'
import { Menu,Dropdown,Breadcrumb  } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginDone } from '../Actions/register_loginActions';
import {UserOutlined,LogoutOutlined} from "@ant-design/icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCashRegister} from "@fortawesome/free-solid-svg-icons"
import "../stylesheets/NavBar.css"

function NavBar(props) {
    const dispatch = useDispatch()
    const loggedin = useSelector(state => state.status.loggedin)
    const history = useHistory()

    const handleLogout =()=>{
        swal({text:"You want to log out",icon:"warning",buttons:["No","Yes"],dangerMode:true })
        .then((value)=>{
            if(value){
                    localStorage.removeItem("pos_token")
                    swal({ text:"Logged Out", icon:"success",timer:1000,buttons:false })
                    dispatch(loginDone(false))
                    history.push("/login")
                                               }});}

    const seperator = <span style={{color:"white"}}>|</span>

    return (
        <div className="navbar">
            <div  className="navBar_heading"><FontAwesomeIcon style={{marginRight:"10px"}} icon={faCashRegister}/>POS</div>
            <div  className="links">
                { loggedin ? 
                    
                        <div className="account">
                        <Dropdown style={{color:"white",fontSize:"40px"}} placement="bottomLeft" 
                        overlay={ <Menu className="menuItem" >
                                        <Menu.Item   onClick={()=>history.push("/main/account")}><UserOutlined />Account</Menu.Item>
                                        <Menu.Divider className="divider" />
                                        <Menu.Item  onClick={handleLogout}><LogoutOutlined />Log Out</Menu.Item>              
                                 </Menu>} >
                        <UserOutlined style={{fontSize:"30px",color:"white",padding:"10px"}}/>
                        </Dropdown>
                        </div>
                    
                    : 
                        <div className="breadCrumbs">
                            <Link className="link"  to="/">Home</Link>
                            <Breadcrumb.Separator children={seperator} ></Breadcrumb.Separator>
                            <Link className="link"  to="/register">Register</Link>
                            <Breadcrumb.Separator children={seperator} ></Breadcrumb.Separator>
                            <Link className="link"  to="/login">Login</Link>                
                        </div>
                }
            </div>
        </div>
    )
}

export default NavBar