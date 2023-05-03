import React, {  useState } from 'react'
import { useSelector } from 'react-redux'
import {Input} from "antd"
import {SearchOutlined} from "@ant-design/icons"
import "../stylesheets/Search.css"

function Search(props) {
    const{data,getSearch,clue,placeHolder} = props

    const[input,setInput]=useState("")

    const customers = useSelector(state=> state.BusinessData.customers)
    
    const handleSearch=(e)=>{
        const Input =e.target.value
        setInput(Input)
        if(Input.length>0){
            if(clue){
            const cust = customers.filter((customer)=>{
                return customer.mobile.includes(Input) || customer.name.toLowerCase().includes(Input.toLowerCase())
                  })
                 
            if(cust.length){
                let filterBill = []
                  cust.forEach((cutomer)=>{
                  const result = data.filter((bill)=>{
                        return cutomer._id === bill.customer
                    })
                    filterBill = [...filterBill,...result]
                })
                
                getSearch(filterBill)
            }else{
                getSearch("empty")
            }
        }else{
            const found = data.filter((item)=>{
              if(item.mobile){ return item.name.toLowerCase().includes(Input.toLowerCase()) ||  item.mobile.includes(Input)}
                         else{ return  item.name.toLowerCase().includes(Input.toLowerCase())}
            })
            if(found.length){
                getSearch(found)
            }
            else{
                getSearch("empty")
            }
                }
            }else{
                    getSearch([])
                }
            }
    return (
        <div className="searchBarAll">
            <Input type="text" className="searchInput"  value={input} prefix={<SearchOutlined />} onChange={handleSearch} placeholder={placeHolder} />
        </div>
    )
}

export default Search
