import React from 'react'
import { Route } from 'react-router'
import Customers from './Customers'
import Products from './Products'
import DashBoard from './DashBoard'
import Bills from "./Bills"
import CustomerBill_List from './CustomerBill_List'
import Account from './Account'
import Billing from './Billing'
import PaymentManagement from './PaymentManagement'
import "../stylesheets/LinkContextContainer.css"
function LinkContextContainer(props) {
 
    return (
        <div className="content_box">
                <Route path="/main/dashboard" exact  component={DashBoard}/>
                <Route path="/main/customers"   component={Customers} />
                <Route path="/main/products"    component={Products}/>
                <Route path="/main/bills"       component={Bills} />
                <Route path="/main/account"     component={Account}/>
                <Route path="/main/billing"     component={Billing}/>
                <Route path="/main/billlist/:type"     component={CustomerBill_List}/>
                <Route path="/main/productsform/:id"   component={Products}/>
                <Route path="/main/customersform/:id"  component={Customers}/>
                <Route path="/main/paymentmanagement" component={PaymentManagement}/>
            </div>
    )
}

export default LinkContextContainer
