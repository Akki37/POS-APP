import React from 'react'
import { Link } from 'react-router-dom'
import {Menu} from "antd"
import {BarChartOutlined,AccountBookOutlined,ReconciliationOutlined,CreditCardOutlined,AuditOutlined,ContactsOutlined} from '@ant-design/icons'
import { useDispatch } from 'react-redux';
import { addbillingCustomer } from '../Actions/CustomersProductsBillsActions';
import "../stylesheets/SideNavBar.css"
function SideNavBar(props) {
    const dispatch = useDispatch()
    return (

            <div className="sideBar" >
                 <Menu  mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%',backgroundColor:"#F6F9FE"}}
                        >
                   <Menu.Item key="sub1"  icon={<BarChartOutlined />}>
                       <Link to="/main/dashboard" className="menuItem"  onClick={()=>{dispatch(addbillingCustomer({}))}}>Dashboard</Link>
                   </Menu.Item>
                   <Menu.Divider />
                   <Menu.Item key="sub3"  icon={<ReconciliationOutlined />} >
                       <Link to="/main/products" className="menuItem" onClick={()=>{dispatch(addbillingCustomer({}))}}>Products</Link>
                   </Menu.Item>
                   <Menu.Divider/>
                   <Menu.Item key="sub4"  icon={<ContactsOutlined />} >
                       <Link to="/main/customers" className="menuItem" onClick={()=>{dispatch(addbillingCustomer({}))}}>Customers</Link>
                   </Menu.Item>
                   <Menu.Divider/>
                   <Menu.Item key="sub2"  icon={<AccountBookOutlined />} >
                       <Link className="menuItem" to="/main/billing">Billing</Link>
                   </Menu.Item>
                   <Menu.Divider/>
                   <Menu.Item key="sub5"  icon={<AuditOutlined />}>
                       <Link to="/main/bills" className="menuItem" onClick={()=>{dispatch(addbillingCustomer({}))}}>Bills</Link>
                   </Menu.Item>
                   <Menu.Divider/>
                   <Menu.Item key="sub6"  icon={<CreditCardOutlined />} >
                       <Link to="/main/paymentmanagement" className="menuItem" onClick={()=>{dispatch(addbillingCustomer({}))}}>Payment Management</Link>
                   </Menu.Item>
                </Menu>
            </div>

       
    )
}

export default SideNavBar
