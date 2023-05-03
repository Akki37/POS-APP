import React, {  useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CustomerForm from './CustomerForm'
import CustomersTable from './CustomersTable'
import Search from './Search'
import "../stylesheets/Customers.css"
import swal from '@sweetalert/with-react'
import { useHistory } from 'react-router'

function Customers(props) {
    const[search,setSearch]=useState([])
    let history = useHistory()
    const customers = useSelector(state => state.BusinessData.customers)
  
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
    const getSearch=(data)=>{
        setSearch(data)
    }
    
    return (
        <div style={{position:"relative"}}>
            <Search data={customers} getSearch={getSearch} placeHolder="Search customer by name/mobile..."/>
            <CustomerForm />
            {search.length ? search === "empty" ?
             <CustomersTable data={[]}/> : <CustomersTable  data={search}/> : <CustomersTable  data={customers}/>}
            
        </div>
    )
}

export default Customers
