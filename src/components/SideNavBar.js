import React from 'react'
import { Link } from 'react-router-dom'
import {Layout,Menu} from "antd"
import {BarChartOutlined,AccountBookOutlined,ReconciliationOutlined,CreditCardOutlined,AuditOutlined,ContactsOutlined} from '@ant-design/icons'
import { useDispatch } from 'react-redux';
import { addbillingCustomer } from '../Actions/CustomersProductsBillsActions';
const {Sider} = Layout;
function SideNavBar(props) {
    const dispatch = useDispatch()
    return (

            <Sider width={250} className="site-layout-background">
                 <Menu  mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%',color:"rgb(255,139,91)"}}
                        >
                   <Menu.Item key="sub1" className="menuItem" icon={<BarChartOutlined />}>
                       <Link to="/main/dashboard"  onClick={()=>{dispatch(addbillingCustomer({}))}}>Dashboard</Link>
                   </Menu.Item>
                   <Menu.Divider/>
                   <Menu.Item key="sub3" icon={<ReconciliationOutlined />} >
                       <Link to="/main/products" onClick={()=>{dispatch(addbillingCustomer({}))}}>Products</Link>
                   </Menu.Item>
                   <Menu.Divider/>
                   <Menu.Item key="sub4" icon={<ContactsOutlined />} >
                       <Link to="/main/customers"  onClick={()=>{dispatch(addbillingCustomer({}))}}>Customers</Link>
                   </Menu.Item>
                   <Menu.Divider/>
                   <Menu.Item key="sub2" icon={<AccountBookOutlined />} >
                       <Link to="/main/billing">Billing</Link>
                   </Menu.Item>
                   <Menu.Divider/>
                   <Menu.Item key="sub5" icon={<AuditOutlined />}>
                       <Link to="/main/bills" onClick={()=>{dispatch(addbillingCustomer({}))}}>Bills</Link>
                   </Menu.Item>
                   <Menu.Divider/>
                   <Menu.Item key="sub6" icon={<CreditCardOutlined />} >
                       <Link to="/main/paymentmanagement" onClick={()=>{dispatch(addbillingCustomer({}))}}>Payment Management</Link>
                   </Menu.Item>
                </Menu>
            </Sider>

       
    )
}

export default SideNavBar
