import React, { useEffect, useState } from 'react'
import {Link,Route} from "react-router-dom"
import {Table,Popconfirm,message} from "antd"
import {DeleteOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from 'react-redux'
import { removeBill} from '../Actions/CustomersProductsBillsActions'
import BillModal from './BillModal'

function BillsTable(props) {
    const{data}=props
    
    const dispatch = useDispatch()
    const customers= useSelector(state=> state.BusinessData.customers)
    const bills    = useSelector(state=> state.BusinessData.bills)

    const[tableData,setData]=useState([])
   
    useEffect(()=>{
         if(data.length){Data()}
    },[data])

    
    const findCust=(id,type)=>{
        const result = customers.find((customer)=>{
            return customer._id === id
        })
        if(result){
            const value = type === "name" ? result.name : result.mobile
            return value
        }else{
            return "not found"
        }
      }
   
    //   ---------------------------------------------------------------------------
        const columns =[{title: 'S.no',dataIndex: 'key',width:100},
        {title: 'Customer',
        children:[{title: 'Name'  ,dataIndex: 'name'  ,key: 'name'},
                {title: 'Mobile',dataIndex: 'mobile',key: 'mobile'}]},
        {title: 'Items',dataIndex: 'items',sorter: {
            compare: (a, b) => a.items - b.items,
            multiple:3,
          }},{title: 'Details',dataIndex:'details'},
        {title: 'Date' ,dataIndex: 'date' ,sorter: {
            compare: (a, b) => a.millisec - b.millisec,
            multiple:2,
          }},
        {title: 'Total Amount',dataIndex: 'total', sorter: {
            compare: (a, b) => a.total - b.total,
            multiple:1,
          }},
        {title: 'Remove',dataIndex: 'remove'}
        ]
        const Data=()=>{ 
            let type="bills"
            let string="main"
            const result = [...data].reverse().map((bill,i)=>{
            return {
                    key: i+1,
                    name: findCust(bill.customer,"name"),
                    mobile: findCust(bill.customer,"mobile"),
                    items:bill.lineItems.length,
                    details:<Link to={`/${string}/${type}/billmodal/${bill._id}`}>view</Link>,
                    date:new Date(bill.createdAt).toLocaleDateString(),
                    millisec: new Date(bill.createdAt).getTime(),
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
              setData(result)
            }
        const footer = ()=> <div style={{fontWeight:"bold",fontSize:"30px",letterSpacing:"2px",fontVariant:"small-caps"}}>Total Bills:{bills.length}</div>
                
            return (
                <>
                <Table columns={columns} bordered dataSource={tableData} footer={footer} pagination={true} scroll={{y:"450px"}}/>
                <Route path="/:string/:type/billmodal/:id"  component={BillModal}/>
            </>)
}
 
  

export default BillsTable