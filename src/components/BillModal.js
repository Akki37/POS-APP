import React, { useEffect, useState ,useRef} from 'react'
import { useHistory, useParams } from 'react-router'
import axios from 'axios'
import Draggable from 'react-draggable';
import html2pdf from "html2pdf.js"
import { useSelector } from 'react-redux'
import {Breadcrumb,Button,Modal,Table} from "antd"
import "../stylesheets/BillModal.css"

function BillModal(props) {
    const{id,type,string}= useParams()
              let history= useHistory()
              const componentRef = useRef();

    const[visible,setVisible]  =useState(true)
    const[disabled,setDisabled]=useState(true)
    const[bill,setBill]        =useState({})
    const[bounds,setBounds]    =useState({ left: 0, top: 0, bottom: 0, right: 0 })
    const[tableData,setData]   =useState([])

    const BusinessData = useSelector(state => state.BusinessData)
    const account      = BusinessData.account
    const products     =BusinessData.products
    const customers    = BusinessData.customers

    const draggleRef = React.createRef()

useEffect(()=>{
    axios.get(`http://dct-billing-app.herokuapp.com/api/bills/${id}`,
    {
        "headers":{
            "Authorization" : `Bearer ${localStorage.getItem("pos_token")}`
        }
    })
    .then((response)=>{
        setBill(response.data)
        Data(response.data)
    })
    .catch((err)=>{
        alert(err.message)
    })
},[id])
const ProductName=(id)=>{
    const result = products.find((product)=>{
    return product._id === id
    })
    if(result){
         return result.name 
    }else{
        return "not found"
    }
}
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
function handleClose(){
    setVisible(false)
}
function handlePrint(){
    window.print()
}
 const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setBounds({
        left: -targetRect?.left + uiData?.x,
        right: clientWidth - (targetRect?.right - uiData?.x),
        top: -targetRect?.top + uiData?.y,
        bottom: clientHeight - (targetRect?.bottom - uiData?.y),
    });
}
const columns =[{title: 'S.no',dataIndex: 'key'},
{title: "Product" ,
        children:[{title: 'Name'  ,dataIndex: 'name',key: 'name'},
                  {title: 'Price',dataIndex: 'price',key: 'price'}]},
{title: 'Quantity',dataIndex: 'quantity',width:200 },
{title: 'Total',dataIndex:'subTotal',width:200},
]
const Data=(data)=>{ 
    const result = data.lineItems.map((item,i)=>{
    return {
            key: i+1,
            name:ProductName(item.product),
            price:item.price,
            quantity:item.quantity,
            subTotal:item.subTotal,
        }
      })
      setData(result)
    }
   const handleDownload= ()=>{
    var opt = {
        margin:       1,
        html2canvas:  { scale: 3 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' }
      };
       let modal = document.getElementById("modalBox")
       html2pdf().from(modal).set(opt).save(`Bill-${id}`)
   }
   const buttons = <div><Button onClick={handlePrint}>Print</Button>
                        <Button onClick={handleDownload} type="primary">Download</Button></div>
    const styleEm={
      fontWeight:"400",fontSize:"15px",padding:"0 10px",color:"gray"
    }
    return (
        <Modal ref={componentRef}
            width={1000} 
            visible={visible}
            onCancel={handleClose}
            footer={buttons}
            afterClose={()=>{history.push(`/${string}/${type}`)}}
            modalRender={modal => (
            <Draggable
              disabled={disabled}
              bounds={bounds}
              onStart={(event, uiData) => onStart(event, uiData)}
            >
              <div ref={draggleRef}>{modal}</div>
            </Draggable>
          )}
            >
                <div id="modalBox">
                <div style={{ width: '100%',cursor: 'move',}} onMouseOver={() => {setDisabled(!disabled)}} onMouseOut ={() => {setDisabled(!disabled)}}>
                        <div className="modalBname">{account.businessName}</div> 
                        <div className="invoice_date"><div className="invoice">INVOICE</div><div className="date"><b>Date : </b>{new Date(bill.createdAt).toLocaleDateString()}</div></div>
                        <div className="billTo"><b>Bill To:</b><em style={styleEm}> {findCust(bill.customer,"name")} <Breadcrumb.Separator/> mob :{findCust(bill.customer,"mobile")}</em></div>
                   </div>
                    <Table columns={columns} pagination={false} dataSource={tableData} bordered scroll={{y:"300px"}}
                    footer={pageData => {
                        let totalItems = 0;
                        let totalAmount = 0;
                        let totalProducts = 0;

                        pageData.forEach(({ price,quantity }) => {
                        totalProducts += 1;
                        totalAmount += price*quantity
                        totalItems += quantity;
                        });
                        return (
                            <div>
                            <div style={{display:"flex",justifyContent:"space-between",padding:"5px 20px"}}>
                                <div><b>Total Product : </b> {totalProducts}</div>
                                <div><b>Total Items : </b>{totalItems}</div>
                                <div ><b>Total Amount : </b> {totalAmount}</div>
                            </div>
                            </div>
                            );
                        }}/>
                        </div>
      </Modal>
    )
}

export default BillModal