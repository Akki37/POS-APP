import axios from 'axios'
import {Table,Popconfirm,message} from "antd"
import {DeleteOutlined} from "@ant-design/icons"
import React, { useEffect, useState } from 'react'
import {Link, Route, useHistory, useParams} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { removeBill } from '../Actions/CustomersProductsBillsActions'
import swal from '@sweetalert/with-react'
import BillListModal from './BillListModal'

function CustomerBill_List(props) {
    const {type:id} = useParams()
    let history = useHistory()

    const[customer,setCustomer] =useState("")

    const dispatch = useDispatch()

    const BusinessData = useSelector(state => state.BusinessData)
    const bills =BusinessData.bills

    useEffect(()=>{
       if(!localStorage.getItem("pos_token")){
            history.push("/login")
            swal({
                title:"Please Log-in first.",
                icon:"error",
                timer:500,
                button:false
            })
        }else{
        axios.get(`https://dct-billing-app.herokuapp.com/api/customers/${id}`,
        {
         "headers": {
                "Authorization": `Bearer ${localStorage.getItem("pos_token")}`
            }
        })
        .then((response)=>{
            setCustomer(response.data)
        })
        .catch((err)=>{
            alert(err.message);
        })
   }
    },[id])

    function TotalBills(_id){
        return (bills.filter((bill)=>{
               return bill.customer === _id
           })).reverse()
       } 

    const columns =[
    {title:`Name : ${customer.name}`,
    children:[{title: 'S.no',dataIndex: 'key'},  
              {title: 'Date' ,dataIndex: 'date',sorter: {
                compare: (a, b) => a.millisec - b.millisec,
                multiple:1,
            } }]},
    {title:`Mobile : ${customer.mobile}`,
    children:[{title: 'Items',dataIndex: 'items',sorter: {
                    compare: (a, b) => a.items - b.items,
                    multiple:2 }},
             {title: 'Details',dataIndex:'details'}]},
    {title:`Total Bills : ${TotalBills(id).length}`,
    children:[{title: 'Total Amount',dataIndex: 'total',sorter: {
                    compare: (a, b) => a.total - b.total,
                    multiple:3
                }},
             {title: 'Remove',dataIndex: 'remove'}]}
    ]

    const Data=()=>{ 
        let type=id
        const result = TotalBills(id).map((bill,i)=>{
        return {
                key: i+1,
                items:bill.lineItems.length,
                details:<Link to={`/main/billlist/${type}/listmodal/${bill._id}`}>view</Link>,
                date:new Date(bill.createdAt).toLocaleDateString(),
                millisec:new Date(bill.createdAt).getTime(),
                total:bill.total,
                remove: <Popconfirm
                title="Are you sure to delete this?"
                onConfirm={(e)=>{dispatch(removeBill(bill._id));message.success("Successfully deleted")}}
                onCancel={(e)=>{message.error("cancelled")}}
                okText="Yes"
                cancelText="No"
            >
            <DeleteOutlined className="delete"/>
            </Popconfirm>,
            }
          })
          return result
        }
    return (
        <>
            <Table columns={columns} bordered pagination={false} dataSource={ customer ?  Data(customer._id) : []}/>
            <Route path="/main/billlist/:type/listmodal/:id" exact component={BillListModal}/>
        </>
    )
}

export default CustomerBill_List
